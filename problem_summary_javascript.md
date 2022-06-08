# 问题汇总

## JavaScript
1. type 和 interface 的区别是什么？
> - type 是定义类型别名的关键字，通常用于定义联合类型、交叉类型、原始类型等；
> - interface 可以合并，比如定义多个同名接口它们会合并到一个，而 type 不可以；
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
> - 冒泡是从下向上，一个 dom 元素绑定的事件被触发时，此时该元素为目标元素，目标元素执行后，它的祖先元素绑定的事件会依次向上执行
> - 捕获是从上向下，目标元素被触发后，会从目标元素的最顶层祖先元素往下执行到目标元素位置
> - **addEvnetListner** 方法可以传入第三个参数，true 表示捕获，false 则表示冒泡（默认值）
> - 问题1：绑定了几个事件就会执行几次，则同时绑定两个事件则执行两次
> - 问题2：W3C 标准说明，先发生捕获事件，再发生冒泡事件；则执行顺序是 其它元素捕获事件 -> 本元素绑定的事件 -> 其它元素冒泡事件，在执行捕获和冒泡的阶段，两者事件互不干扰，即捕获阶段只有绑定的捕获事件触发，冒泡阶段只有绑定的冒泡事件触发

4. `new` 操作符的实现原理
> `new` 操作符在对构造函数进行实例化时，通过执行构造函数或者 js 内置构造函数生成一个实例对象
> 其大致分为以下 4 步：
> - 创建一个空对象
> - 将构造函数的 `prototype` 赋值给新创建的空对象 `__proto__`
> - 通过 `apply` 将构造函数的 `this` 指向新创建的对象并执行
> - 判断构造函数执行后的返回结果，如果是值类型则返回当前新创建的对象，如果是引用类型则返回当前结果值

```javascript
// 通过 demo 看以上步骤
function Person(name) {
  this.name = name;
}
const p = new Person('xiaozhang');
console.log(p); // { name: 'xiaozhang' }
console.log(p.__proto__ === Person.prototype) // true
// new 操作符执行构造函数后，返回了一个内部创建的新对象，包含着属性信息，并且以这个新对象为上下文执行了 Person 函数
// 同时将对象 p 的原型属性指向构造函数的原型，这样实例就能访问到构造函数原型中的方法和属性了

function Person1(name) {
  this.name = name;
  return { age: 18 }
}
const p1 = new Person1('wangwu');
console.log(p1); // { age: 18 }
console.log(p1.__proto__ === Person1.prototype); // false，p1是一个新对象，其原型指向 Object
console.log(p1.__proto__ === Object.prototype); // true
// 构造函数存在返回值的情况，如果构造函数最后返回了一个对象，就会直接将其返回，而不是返回内部创建的新对象
// 只要构造函数返回的类型为引用类型object、function就会直接返回该结果，其它基本类型则会返回内部创建的新对象
```

```javascript
// 自己实现一个 new 操作
function myNew() {
  // 首先，将构造函数和参数信息进行初始化处理
  const args = Array.prototype.slice.call(arguments, 1);
  const ctr = Array.prototype.shift.call(arguments);
  if (typeof ctr !== 'function') {
    console.error('类型错误');
    return;
  }

  // 1. 创建新的空对象，并将 构造函数的 prototype 赋值给空对象的 __proto__
  const obj = {};
  obj.__proto__ = ctr.prototype;
  // 以上两步操作可以简单处理如下
  // const obj = Object.create(ctr.prototype);

  // 2. 执行构造函数并将 this 指向新创建的对象，目的是给新创建的对象增加属性
  const result = ctr.apply(obj, args);

  // 3. 判断结果类型并返回
  if ((result !== null && typeof result === 'object') || typeof result === 'function') {
    return result;
  }
  return obj;
}

// 使用
myNew(构造函数, 参数信息)
```

5. TODO

