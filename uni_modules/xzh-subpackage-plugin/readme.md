# xzh-subpackage-plugin

一个微信小程序分包的 vite 插件，主要是对 vendor.js 这个文件进行分包

详情请下载示例项目

### 使用方式：

创建 vite.config.js。参考地址[uni-app 官网 (dcloud.net.cn)](https://uniapp.dcloud.net.cn/collocation/vite-config.html)

引用插件

```javascript
import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import uniSubpackagePlugin from './uni_modules/xzh-subpackage-plugin/js_sdk/index.js';

export default defineConfig({
    plugins: [
        uni(),
        uniSubpackagePlugin({
            // 忽略文件，因为有些文件分包后会报错，所以要忽略掉，可以使用相对路径比如 /pages/index/index.js
            exclude: ['@tuniao']
        })
    ]
});
```

跨分包 JS 代码引用

```javascript
import('../../sub-pagesB/utils/day.js').then((dayjs) => {
    this.time = dayjs().format('YYYY-MM-DD');
});
```
