module.exports = {
  // 基本路径
  baseUrl: '/view/h5/app/seed',
  // 输出文件目录
  outputDir: 'dist',
  runtimeCompiler: true, //关键点在这  
  lintOnSave:false,  // 关闭eslint
  // webpack-dev-server 相关配置
  devServer: {
    port: 8080,
  },
}
