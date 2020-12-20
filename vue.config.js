// vue.config.js
module.exports = {

    devServer: {
        port: 8081,
        proxy: {
            '/testJson4servlet': {
                target: 'http://localhost:8080/testJson4servlet/',
                ws: false,
                changeOrigin: true,
                pathRewrite: {
                    '^/testJson4servlet': '',
                }
            }
        },
        disableHostCheck: true,
    }

}

