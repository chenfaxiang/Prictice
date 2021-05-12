const path = require('path')

module.exports = {
  // 单文件入口时 entry: './src/index.js',只能是一个字符串
  // 多文件入口时 entry 是一个对象，可以写多个入口文件
  entry: {
    index: './src/index.js',
    search: './src/search.js'
  },
  // 单入口时 filename 可以直接指定名称
  // 多入口是 filename 则需要使用 [] 占位符，保证多入口文件名不同
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js' // [] 是一个占位符，保证多入口的不同文件名
  },
  mode: 'production',
  module: {
    /*
     * rules数组中存放不同的loader
     * loader 的作用：
     * webpack开箱即用只支持js和json两种文件类型，通过loaders去支持其他文件类型并且把它们转化成有效的模块并添加到依赖图中
     * webpack本身是一个函数，接受源文件作为参数，返回转换后的结果
     */
    rules: [
      {
        test: /\.txt$/,   // 指定匹配规则
        use: 'raw-loader' // 指定使用的loader名称
      }
    ]
    /* 常见的 loader 及其作用：
     * babel-loader  -> 转换 es6、es7 等 js 新特性
     * css-loader    -> 支持 css 文件的加载和解析
     * less-loader   -> 将 less 语法转换成 css
     * ts-loader     -> 将 ts 转换成 js
     * file-loader   -> 进行图片、字体等的打包
     * raw-loader    -> 将文件以字符串的形式导入
     * thread-loader -> 多进行打包 js 和 css
     * ...
     */
  },
  /**
   * 插件用于 bundle 文件的优化、资源管理和环境变量注入，作用于整个构建过程
   * 常见的 plugin 及其作用：
   * CommonsChunkPlugin       -> 将 chunks 相同的模块代码提取成公共的js
   * CleaWebpackPlugin        -> 清理构建目录
   * ExtractTextWebpackPlugin -> 将 css 从 bundle 文件里提取成一个单独的 css 文件
   * CopyWebpackPlugin        -> 将文件或者文件夹拷贝到构建的输出目录
   * HtmlWebpackPlugin        -> 创建 html 文件去承载输出的 bundle
   * UglifyjsWebpackPlugin    -> 压缩js
   * ZipWebpackPlugin         -> 将打包出的资源生成一个 zip 包
   * ...
   */
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
}