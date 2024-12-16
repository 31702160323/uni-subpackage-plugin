import { defineConfig, loadEnv } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import Unocss from 'unocss/vite';
import { visualizer } from 'rollup-plugin-visualizer';
import { resolve } from 'path';
import { replaceManifest } from './env/utils';
// import uniSubpackagePlugin from './plugin';
import uniSubpackagePlugin from './src/uni_modules/xzh-subpackage-plugin/js_sdk/index.js';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
    /** 解析后环境变量 */
    const config = loadEnv(mode, './env');

    console.log(command);
    console.log(config);

    const object: Record<string, string> = {};
    if (config.VITE_APP_ID) object.appid = `"${config.VITE_APP_ID}"`;
    if (config.VITE_WEIXIN_APP_ID) object['mp-weixin.appid'] = `"${config.VITE_WEIXIN_APP_ID}"`;

    // 动态修改 manifest.json
    replaceManifest(object);

    const plugins: any[] = [];
    plugins.push(
        uni['default'](),
        Unocss(),
        uniSubpackagePlugin({
            exclude: ['@tuniao']
        })
    );

    if (mode === 'production') {
        plugins.push(
            visualizer({
                gzipSize: false,
                brotliSize: true,
                emitFile: false,
                open: false //如果存在本地服务端口，将在打包后自动展示
            })
        );
    }

    const define: Record<string, string> = {};

    if (process.env.UNI_PLATFORM === 'mp-alipay') {
        define.global = 'my';
        define.wx = 'my';
    }

    return {
        envDir: resolve(__dirname, 'env'),
        plugins: plugins,
        define: define,
        resolve: {
            // 配置别名
            alias: {
                '@': resolve(__dirname, 'src')
            }
        },
        esbuild: {
            // 生产环境清除console
            drop: mode === 'production' ? ['console', 'debugger'] : []
        },
        build: {
            sourcemap: true,
            minify: 'esbuild'
            // minify: mode === 'production' ? 'esbuild' : false
            // minify: mode === 'production' ? 'terser' : false,
            // minify: false,
            // terserOptions: {
            //     compress: {
            //         drop_console: mode === 'production',
            //         drop_debugger: mode === 'production'
            //     }
            // }
        }
    };
});
