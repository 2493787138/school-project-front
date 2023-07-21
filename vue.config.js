const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  devServer: {
    // host: 'localhost', // 本地的IPv4地址
    // port: '8080', // 默认端口为8080，此端口冲突，也会出现代理异常的情
    proxy: {
    
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite:{"^/api":"/api"}
      },
 
    }
  }

  
})
