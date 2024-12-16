import fs from 'node:fs';
import path from 'node:path';

import {
    EXTNAME_JS_RE,
    normalizePath,
    hasJsonFile,
    removeExt,
    isCSSRequest,
    isMiniProgramAssetFile,
    DEFAULT_ASSETS_RE,
    dynamicImportPolyfill,
    decodeBase64Url
} from '@dcloudio/uni-cli-shared';

const uniPagePrefix = 'uniPage://';
const uniComponentPrefix = 'uniComponent://';

const chunkFileNameBlackList = ['main', 'pages.json', 'manifest.json'];

export function isVueJs(id) {
    return id.includes('\0plugin-vue:export-helper');
}

export function parseVirtualPagePath(uniPageUrl) {
    return decodeBase64Url(uniPageUrl.replace(uniPagePrefix, ''));
}

export function parseVirtualComponentPath(uniComponentUrl) {
    return decodeBase64Url(uniComponentUrl.replace(uniComponentPrefix, ''));
}

export function isUniPageUrl(id) {
    return id.startsWith(uniPagePrefix);
}

export function isUniComponentUrl(id) {
    return id.startsWith(uniComponentPrefix);
}

function staticImportedByEntry(id, getModuleInfo, cache, importStack = []) {
    if (cache.has(id)) {
        return cache.get(id);
    }
    if (importStack.includes(id)) {
        // circular deps!
        cache.set(id, false);
        return false;
    }
    const mod = getModuleInfo(id);
    if (!mod) {
        cache.set(id, false);
        return false;
    }

    if (mod.isEntry) {
        cache.set(id, true);
        return true;
    }
    const someImporterIs = mod.importers.some((importer) =>
        staticImportedByEntry(importer, getModuleInfo, cache, importStack.concat(id))
    );
    cache.set(id, someImporterIs);
    return someImporterIs;
}

export default function uniSubpackagePlugin(options) {
    if (!process.env.UNI_PLATFORM || !process.env.VITE_USER_NODE_ENV) {
        throw Error('请在uniapp的vue3环境中运行');
    }

    const { exclude } = options || {};

    const plugin = {
        name: 'uni-subpackage-plugin',
        enforce: 'post',
        apply: 'build'
    };

    // 判断是否是小程序
    if (
        process.env.UNI_PLATFORM === 'mp-weixin' ||
        process.env.UNI_PLATFORM === 'mp-alipay' ||
        process.env.UNI_PLATFORM === 'mp-toutiao' ||
        process.env.UNI_PLATFORM === 'mp-qq'
    ) {
        const { renderDynamicImport } = dynamicImportPolyfill();
        // 获取项目路径
        const inputDir = normalizePath(process.env.UNI_INPUT_DIR || '');

        // 实例化pages.json
        const pages = JSON.parse(
            fs
                .readFileSync(path.resolve(inputDir, 'pages.json'))
                .toString()
                .replace(/\s\/\/.*|\/\*[\s\S]*?\*\//g, '')
        );

        // 获取分包信息
        const subPackages = (pages?.subPackages || []).map((item) => {
            return {
                name: item.root,
                subPath: normalizePath(path.resolve(inputDir, item.root)),
                split: false
            };
        });

        const subPackageInfoList = new Map();
        const getSubPackageInfo = (moduleInfo) => {
            return subPackages.find(({ subPath }) => {
                const subPathWithSlash = subPath + '/';
                if (moduleInfo.importers && moduleInfo.dynamicImporters) {
                    return ![...moduleInfo.importers, ...moduleInfo.dynamicImporters].some(
                        (item) => !item.startsWith(subPathWithSlash)
                    );
                }
                return !moduleInfo.some((item) => !item.startsWith(subPathWithSlash));
            });
        };

        const vueCache = new Set();

        return Object.assign(plugin, {
            config(config) {
                try {
                    const cache = new Map();
                    // 为了支持小程序的 vendor.js 文件分包
                    config.build.chunkSizeWarningLimit = 1024;
                    // config.build.rollupOptions.output.experimentalMinChunkSize = 1024;
                    config.build.rollupOptions.output['manualChunks'] = (id, { getModuleInfo }) => {
                        const normalizedId = normalizePath(id);
                        const filename = normalizedId.split('?')[0];
                        const isExclude = exclude?.some((item) => {
                            if (typeof item === 'string') {
                                return normalizedId.includes(item);
                            } else if (item instanceof RegExp) {
                                return item.test(normalizedId);
                            }
                            return false;
                        });
                        // 处理资源文件
                        if (DEFAULT_ASSETS_RE.test(filename)) {
                            const moduleInfo = getModuleInfo(id);
                            const subPackageInfo =
                                subPackageInfoList.get(filename) || getSubPackageInfo(moduleInfo);
                            if (!isExclude && subPackageInfo?.name) {
                                return subPackageInfo?.name + '/common/assets';
                            }
                            return 'common/assets';
                        }

                        // 处理项目内的js,ts文件
                        if (EXTNAME_JS_RE.test(filename)) {
                            const moduleInfo = getModuleInfo(id);
                            const subPackageInfo =
                                subPackageInfoList.get(filename) || getSubPackageInfo(moduleInfo);

                            if (
                                filename.startsWith(inputDir) &&
                                !filename.includes('node_modules')
                            ) {
                                const chunkFileName = removeExt(
                                    normalizePath(path.relative(inputDir, filename))
                                );
                                if (
                                    !chunkFileNameBlackList.includes(chunkFileName) &&
                                    !hasJsonFile(chunkFileName) // 无同名的page,component
                                ) {
                                    // 为了支持小程序的跨分包 JS 文件，这是控制输出的路径
                                    if (
                                        !isExclude &&
                                        subPackageInfo &&
                                        !filename.startsWith(subPackageInfo?.subPath)
                                    ) {
                                        subPackageInfo.split = true;
                                        subPackageInfoList.set(filename, subPackageInfo);
                                        if (vueCache.has(removeExt(id))) {
                                            return `${subPackageInfo?.name}/common/vendor`;
                                        }
                                        return `${subPackageInfo?.name}/${chunkFileName}`;
                                    }
                                    if (vueCache.has(removeExt(id))) {
                                        return chunkFileName + 'Init';
                                    }
                                    return chunkFileName;
                                }
                                if (vueCache.has(removeExt(id))) {
                                    return chunkFileName + 'Init';
                                }
                                return;
                            } else if (isExclude) {
                                return 'common/vendor';
                            } else if (filename.includes('node_modules')) {
                                if (
                                    subPackageInfo?.split ||
                                    (subPackageInfo?.name &&
                                        !moduleInfo.importers.some((item) =>
                                            item.includes('node_modules')
                                        ))
                                ) {
                                    subPackageInfo.split = true;
                                    subPackageInfoList.set(filename, subPackageInfo);
                                    return subPackageInfo?.name + '/common/vendor';
                                }
                            }

                            // vendor.js 文件分包
                            if (subPackageInfo?.name) {
                                return subPackageInfo?.name + '/common/vendor';
                            }
                        }

                        // 这里是uni的默认逻辑，不太清楚是干嘛的
                        if (
                            isVueJs(normalizedId) ||
                            (normalizedId.includes('node_modules') &&
                                !isCSSRequest(normalizedId) &&
                                // 使用原始路径，格式化的可能找不到模块信息 https://github.com/dcloudio/uni-app/issues/3425
                                staticImportedByEntry(id, getModuleInfo, cache))
                        ) {
                            return 'common/vendor';
                        }
                    };
                } catch (error) {
                    console.error('[uni-subpackage-plugin] error:', error);
                }
                return config;
            },
            load(id) {
                if (id.endsWith('.vue')) {
                    vueCache.add(removeExt(id));
                    // vueCache.add(removeExt(id.replace(inputDir + '/', '')))
                }
            },
            renderDynamicImport(options) {
                const { targetModuleId } = options;
                if (targetModuleId && isMiniProgramAssetFile(targetModuleId)) {
                    return {
                        left: 'Promise.resolve(require(',
                        right: '))'
                    };
                }

                if (isUniPageUrl(targetModuleId) || isUniComponentUrl(targetModuleId)) {
                    return renderDynamicImport.call(this, options);
                }

                if (process.env.UNI_PLATFORM === 'mp-qq') {
                    return {
                        left: 'new Promise((resolve) => {\nconst model = require(',
                        right: ');\nresolve(model.default);\n})'
                    };
                }

                return {
                    left: 'require.async(',
                    right: ')'
                };
            }
        });
    }

    return plugin;
}
