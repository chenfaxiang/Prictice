const path = require('path')
const { webpack } = require('webpack')

module.exports = {
  /**
   * 单文件入口时 entry: './src/index.js',只能是一个字符串
   * 多文件入口时 entry 是一个对象，可以写多个入口文件
   * 多入口文件时可以依赖 glob npm包将入口文件进行规则处理，glob 会返回一个文件路径数组
   * entry: glob.sync(path.join(__dirname,'./src/~/index.js'))
   */
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
  /**
   * 用来指定当前环境的构建环境，有三个值：production、development、none
   * 设置 mode 可以使用 webpack 内置的函数，默认值就是 production
   * development   -> 设置 process.env.NODE_ENV === 'development'，开启 NamedChunksPlugin 和 NameModulesPlugin，在代码热更新（HMR）阶段可以打印出当前的模块是哪个文件等信息。
   * production    -> 设置 process.env.NODE_ENV === 'production'，开启 FLagDependencyUsagePlugin，FlagIncludedChunksPlugin，ModuleConcatenationPlugin，NoEmitOnErrorsPlugin，OccurrenceOrderPlugin，SideEffectsFlagPlugin和TerserPlugin。
   * none          -> 不开启任何优化选项
   */
  mode: 'production',
  /**
   * 使用 devtool 时，mode 一般不为 production
   * eval/source-map/inline-source-map/cheap-source-map
   */
  devtool: 'eval',
  /**
   * 加载 loader
   */
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
     * raw-loader    -> 将文件以字符串的形式导入，如首页的 meta 信息抽成一个 html 文档后，可以通过该插件直接内联导入
     * thread-loader -> 多进行打包 js 和 css
     * ...
     */
  },
  /**
   * 插件用于 bundle 文件的优化、资源管理和环境变量注入，作用于整个构建过程
   * 常见的 plugin 及其作用：
   * CommonsChunkPlugin       -> 将 chunks 相同的模块代码提取成公共的js（webpack3.*时存在的plugin）
   * SplitChunksPlugin        -> 进行公共脚本分离（webpack4.*的时候出来），官方建议使用该插件替换掉 CommonsChunkPlugin
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
    }),
    /**
     * webpack4.* mode 为 production 时默认开启且必须是 es6 语法，cjs 不支持
     * webpack3.* 时需要用以下的方法处理:
     * 增加 scope hoisting插件，将所有模块的代码按照引用顺序存放在一个作用域内，减少函数声明和内存开销
     */
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
}