// module.exports = {
//     devServer: {
//         proxy: {
//             '/api': {
//               target: 'http://127.0.0.1:8000',
//               ws: true,
//               changeOrigin: true,  // 是否跨域
//               // pathRewrite: {
//               // 	'^/api': ''  //通过pathRewrite重写地址，将前缀/api转为/
//               // }
//             },
//             '/mmbiz_jpg/': {
//                 target: 'https://mmbiz.qpic.cn/mmbiz_jpg',
//                 ws: true,
//                 changeOrigin: true // 是否跨域
//             }
//         }
//     }
// }
