// module.exports = {
//     // devServer: {
//     // 	port: 8000,
//     //     proxy: {
//     //         '/tutorials_api': {
//     //           target: 'http://47.107.168.243:8100/api',
//     //           ws: true,
//     //           changeOrigin: true,  // 是否跨域
//     //           // pathRewrite: {
//     //           // 	'^/tutorials_api': '/api'  //通过pathRewrite重写地址，将前缀/api转为/
//     //           // }
//     //         },
//     //         '/mmbiz_jpg/': {
//     //             target: 'https://mmbiz.qpic.cn/mmbiz_jpg',
//     //             ws: true,
//     //             changeOrigin: true // 是否跨域
//     //         }
//     //     }
//     // },
// 	productionSourceMap: false,
// 	productionGzip: true,
// }

const path = require('path');
function resolve(dir) {
    return path.join(__dirname, dir)
}
// 导入compression-webpack-plugin
const CompressionWebpackPlugin = require('compression-webpack-plugin')
// 定义压缩文件类型
const productionGzipExtensions = ['js', 'css']

module.exports = {
    // baseUrl: "/",
    // 输出目录
    outputDir: 'dist',  
    lintOnSave: true,
    // 是否为生产环境构建生成 source map？
    productionSourceMap: false,
    // alias 配置
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('src'))

    },
    // 简单的方式
    // configureWebpack: {
    //     plugins: [
    //         new CompressionWebpackPlugin({
    //             asset: '[path].gz[query]', // 提示 compression-webpack-plugin@3.0.0的话asset改为filename
    //             algorithm: 'gzip',
    //             test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
    //             threshold: 10240,
    //             minRatio: 0.8
    //         })
    //     ]
    // },
    // 高级的方式
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            // 生产环境
            config.plugins.push(
                new CompressionWebpackPlugin({
                    filename: '[path].gz[query]',  // 提示 compression-webpack-plugin@3.0.0的话asset改为filename
                    algorithm: 'gzip',
                    test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                    threshold: 10240,
                    minRatio: 0.8
                })
            );

        } else {
            // 开发环境
        }
    },
    // CSS 相关选项
    css: {
        extract: true,
        // 是否开启 CSS source map？
        sourceMap: false,
        // 为预处理器的 loader 传递自定义选项。比如传递给
        // sass-loader 时，使用 `{ sass: { ... } }`。
        loaderOptions: {}, // 为所有的 CSS 及其预处理文件开启 CSS Modules。

        modules: false
    },
    // 在多核机器下会默认开启。
    parallel: require('os').cpus().length > 1,
    // PWA 插件的选项。   
    pwa: {},
    // 配置 webpack-dev-server 行为。
    // devServer: {
    //     open: process.env.NODE_ENV === "development",
    //     host: 'localhost',
    //     port: 8888,
    //     https: false,
    //     hotOnly: false,
    //     open: true,
    //     proxy: '', // string | Object
    //     before: app => {}
    // },
    // 第三方插件的选项
    // pluginOptions: {}
}

