## webpack 的一些常用功能

### Tree Shaking 的使用和原理分析 （借鉴Rollup）
- **概念：**
没用该插件时，一个模块包含多个方法，只要有一个方法被使用，则征哥文件都会被打包到 bundle 里去，tree shaking 就是把用到的方法打包到 bundle 里面去，没用到的方法会在 uglify 的时候给删除掉。
- **使用：**
webpack默认支持，在 .babelrc 里设置 model: false 即可。如果是编译 production 的代码的情况下是默认开启的。
- **要求：**
tree shaking 要生效必须是 ES6 的语法，cjs 的语法方式不支持。
- **原理：**
  -利用 es6 的模块特点：
    - 只能作为模块顶层的语句出现
    - import 的模块只能是字符串常量
    - import 的模块是不能动态改变的
  - 利用这些特点，即 tree shaking 作为静态分析的场景使用，它编译时会给未使用的地方打上标识，在 uglify 的时候给删除。

### Scope Hoisting （借鉴Rollup）
- **原理：**
将所有模块的大妈按照引用顺序存放在一个函数作用域里，然后适当的重命名一些变量以防止命名冲突。
- **作用：**
通过 scope hoisting 可以减少函数声明代码和内存开销。

### 代码分割
- **定义：**
大于大型web应用来讲，将所有的代码都放在一个文件中显然是不够高效的，特别是某些代码在特殊时刻才会被用到。而 webpack 有一个功能就是讲代码库分割成 chunks(语块)，当代码运行到需要他们的时候再加载。
- **适用场景：**
  - 抽离相同代码到一个共享块
  - 脚本懒加载，使得初始下载的代码更小
- **懒加载js脚本的方式：**
  - CJS: require.ensure
  - ES6: 动态 import（目前还没有原生支持，需要babel转换）
    1. 对应的 babel 插件： @babel/plugin-syntax-dynamic-import
    2. 放入 .babelrc 文件的 plugin 中
    ```javascript
    {
      "presets": [...]
      "plugins": ["@babel/plugin-syntax-dynamic-import"]
    }
    ```
  