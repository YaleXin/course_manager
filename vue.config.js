// vue.config.js
module.export={
    devServer: {
          proxy: {
                '/proxy':{
                      target: 'http:// your.proxy.site', // 
                      ws: true, // websockets
                      changeOrigin: true,  // needed for virtual hosted sites
                      pathRewrite: {
                            '^/proxy': ''
                      }
                }
          }
    }
  
}

