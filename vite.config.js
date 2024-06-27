import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import { visualizer } from 'rollup-plugin-visualizer';
import uniSubpackagePlugin from './uni_modules/xzh-subpackage-plugin/js_sdk/index.js';
import { resolve } from "path"

const define = {};

if (process.env.UNI_PLATFORM === 'mp-alipay') {
	define.global = 'my';
	define.wx = 'my';
}

export default defineConfig({
	define: define,
	plugins: [
		uni(),
        uniSubpackagePlugin({ exclude: ['@tuniao'] }),
		visualizer({
			gzipSize: false,
			brotliSize: true,
			emitFile: false,
			open: false, //如果存在本地服务端口，将在打包后自动展示,
			filename: resolve(__dirname, "stats.html")
		})
	],
});