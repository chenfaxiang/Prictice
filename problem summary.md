## 问题汇总

1. type 和 interface 的区别是什么？
> type 是定义类型别名的关键字，通常用于定义联合类型、交叉类型、原始类型等；
> interface 可以合并，比如定义多个同名接口它们会合并到一个，而 type 不可以；
> 因此，通常我们描述对象的单个数据结构可以用 interface，如果描述的对象又多种数据结构的可能，我们可以定义多个接口用联合类型，然后用 type 给这个联合类型定义一个别名
```javascript
// for example
interface Dog {}

interface Cat {}

type Pet = Dog | Cat
```

2. for in，Object.keys，for of 的区别
> **for in**
> - **遍历对象** 及其原型链上 **可枚举** 的属性
> - **遍历数组** 除遍历数组元素外，还会遍历在数组上 **自定义的可枚举属性** 以及其 **原型链上的可枚举属性**
> - 遍历对象返回的属性名和遍历数组返回的索引值都是 string 类型
```javascript
Array.prototype.getLength = function() {
  return this.length;
}
var arr = [1 ,2, 3];
arr.name = 'arr name';
Object.defineProperty(arr, 'age', {
  enumerable: true,
  value: 20,
  writable: true,
  configurable: true,
});

for(var item in arr) {
  console.log('for in arr:', item);
  // 输出：0, 1, 2, name, age, getLength
  // 如果将 age 的 enumerable 设为 false，则输出：0, 1, 2, name, getLength
}
```

> **Object.keys**
> - 返回 **对象** 自身 **可枚举** 属性组成的数组
> - **不会遍历** 对象的 **原型链** 上的属性以及 **Symbol 属性**
> - 对 **数组的遍历** 与 for in 一致
```javascript
function Person() {
  this.name = 'person name';
}
Person.prototype.getName = function() {
  return this.name;
}
var person = new Person();
Object.defineProperty(person, 'age', {
  enumerable: true,
  writable: true,
  configurable: true,
  value: 20,
});

console.log(Object.keys(person));
// 输出：['name', 'age']

var arr = [1 ,2, 3];
arr.name = 'arr name';
Array.prototype.getLength = function() {
  return this.length;
}
Object.defineProperty(arr, 'age', {
  enumerable: true,
  value: 20,
  writable: true,
  configurable: true,
});
console.log(Object.keys(arr));
// 输出：['0', '1', '2', 'name', 'age']
```

> **for of**
> - es6新增的循环遍历方法
> - 支持遍历数组、类数组对象(如: DOM NodeList)、字符串、Map对象、Set对象
> - 不支持遍历普通对象
> - 遍历后输出的结果为数组元素的值
> - 经常和 Object.entries 方法使用，同时输出数组的内容和索引值
```javascript
// 不会遍历对象属性及其原型属性
var arr = [1 ,2, 3];
arr.name = 'arr name';
Array.prototype.getLength = function() {
  return this.length;
}
Object.defineProperty(arr, 'age', {
  enumerable: true,
  value: 20,
  writable: true,
  configurable: true,
});
for(var item of arr) {
  console.log('for of item:', item);
  // 输出：1, 2, 3
}

// 遍历对象，可以与 Object.keys 配合
var person = {
  name: 'person name',
  age: 20,
  city: 'beijing',
};
for (var item of Object.keys(person)) {
  console.log('for of object', person[item]);
  // 输出：person name, 20, beijing
  // 如果直接遍历 person 对象，会报 person 不是 iterable 的错误
}

// 结合 Object.entries 方法输出 **数组**、**对象** 的键值
var arr = ['a', 'b', 'c'];
for(var [index, value] of Object.entries(arr)) {
  console.log(`使用Object.entries遍历数组，输出索引和值；索引：${index}，值：${value}`);
  // index: 0, value: 'a'
  // index: 1, value: 'b'
  // index: 2, value: 'c'
}
var person = {
  name: 'Bob',
  age: 20,
  city: 'beijing',
}
for (var [key, value] of Object.entries(person)) {
  console.log(`使用Object.entries遍历对象，输出属性和值；属性：${key}，值：${value}`);
  // key: 'name', value: 'Bob'
  // key: 'age', value: 20
  // key: 'city', value: 'beijing'
}
var person = {
  name: 'Bob',
  age: 26,
  city: 'beijing',
  child: {
    name: 'bill',
    age: 2,
    city: 'beijing'
  },
}
for (var [key, value] of Object.entries(person)) {
  console.log(`使用Object.entries遍历对象，输出属性和值；属性：${key}，值：${value}`);
  console.log(value);
  // key: 'name', value: 'Bob'
  // key: 'age', value: 20
  // key: 'city', value: 'beijing'
  // key: 'child', value: { name: 'bill', age: 2, city: 'beijing' }
}

// Symbol 属性会被忽略
var obj = {
  [Symbol()]: 123,
  name: 'June',
  age: 17,
};
console.log(Object.entries(obj));
// 输出：['name', 'June'], ['age', 17]
```

3. 在一个 DOM 上同时绑定两个点击事件：一个用捕获，一个用冒泡。事件会执行几次？先执行冒泡还是捕获？
> 冒泡是从下向上，一个 dom 元素绑定的事件被触发时，此时该元素为目标元素，目标元素执行后，它的祖先元素绑定的事件会依次向上执行
> 捕获是从上向下，目标元素被触发后，会从目标元素的最顶层祖先元素往下执行到目标元素位置
> **addEvnetListner** 方法可以传入第三个参数，true 表示捕获，false 则表示冒泡（默认值）
> 问题1：绑定了几个事件就会执行几次，则同时绑定两个事件则执行两次
> 问题2：W3C 标准说明，先发生捕获事件，再发生冒泡事件；则执行顺序是 其它元素捕获事件 -> 本元素绑定的事件 -> 其它元素冒泡事件，在执行捕获和冒泡的阶段，两者事件互不干扰，即捕获阶段只有绑定的捕获事件触发，冒泡阶段只有绑定的冒泡事件触发

4. src 和 href 的区别？
> 两者的作用都是用于 **引入外部资源**，但是使用各有不同
> 1. **src** 属性使用的标签有：script、img、input、iframe
> - script 标签上的 src 属性用于引入外部 js 资源
> - img 标签上的 src 属性用于引入外部 图片 资源
> - input 标签上的 src 属性和 type="image" 一起使用，用于引入外部图片资源
> - iframe 标签上的 src 属性用于引入外部图片，如 `<iframe src='gril.fig'></iframe>`

> 2. **href** 属性使用的标签有：link、a
> - link 标签上的 href 属性用于引入外部 图片、stylesheet、icon 等资源
> - a 标签上的 href 属性用于加载一个超链接，用于跳转

> **注意**：link 标签的 **rel** 属性常有：stylesheet(加载css资源)、icon(加载图标)、preload(预加载css等资源)、apple-touch-icon(ios设备上用于添加到主屏的图标) 等

4. 常用的 meta 标签？
> meta 标签由 name 和 content 属性定义，用来描述网页文档的属性，除了 HTTP 标准规定的一些 name 外，还可以自定义 name；
> 常用的 meta 标签有：
> - `<meta charset="utf-8" />` 描述网页文档的编码类型
> - `<meta name="keywords" content="网页关键字" />`
> - `<meta name="description" content="网页描述内容" />`
> - `<meta http-equiv="refresh" content="0;url=" />`
> - `<meta name="robots" content="index,follow" />`
>   - 搜索引擎索引方式，其中 content 参数有以下几种：
>     - all，文件将被检索，且页面上的链接可以被查询
>     - none，文件将不被检索，且页面上的链接不可以被查询
>     - index，文件将被检索
>     - fllow，页面上的链接可以被查询
>     - noindex，文件将被不检索
>     - nofllow，页面上的链接不可以被查询
> - `<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, viewport-fit=cover" />`
>   - 当 name="viewport" 时，content 内容有以下几种：
>   - width: viewport 的宽度，可以是 with=数值/device-width
>   - height: viewport 的高度，可以是 height=数值/device-height
>   - initial-scale: 初始缩放比例
>   - maximum-scale: 最大缩放比例
>   - minimum-scale: 最小缩放比例
>   - user-scalable: 是否允许用户缩放
>   - viewport-fit: iPhone X 及之后的带刘海的屏幕适配属性，[其值有](https://juejin.cn/post/6963941148163473445)
>     - auto：默认值。这个值不影响初始布局视窗，整个 Web 页面是可视的，与Contain表现一致
>     - contain：最初的布局视窗和视觉布局视窗被设置为最大的矩形
>     - cover：初始布局视窗和视觉布局视窗被设置为设备物理屏幕的限定矩形

5. TODO
