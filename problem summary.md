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

3. TODO
