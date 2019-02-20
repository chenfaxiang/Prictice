# JavaScript对象，我们真的需要模拟类吗

在刚进入 JavaScript 世界并通过公司实习的时候就发现，在使用 JavaScript 编写代码的过程中随处可见的 function 配合 new 关键字来操作，这就是以前常见的 JavaScript “模拟面向对象”。  
  
在上一篇文章中已经知道 JavaScript 本身就是面向对象的，它并不需要模拟，只是它实现面向对象的方式和主流的流派不太一样，所以才让很多人产生误会。  
  
那么，随着理解的思路继续深入，这些“模拟面向对象”实际上做的事情就是“模拟基于类的面向对象”。  
  
尽管我认为“类”并非面向对象的全部，但是我们不应该责备社区出现这样的方案；但是 JavaScript 在“原型运行时”的基础上引入了 new、this等语言特性，使之看起来更像基于类的面向对象语言 Java，这种半吊子模拟，缺少了继承等关键特性，才导致大家视图对它进行修补，进而产生了种种解决方案。  
  
庆幸的是，从 ES6 开始， JavaScript 提供了 class 关键字来定义类，尽管，这样的方案仍然是基于原型运行时系统的模拟，但是它修正了之前的一些常见的“坑”，统一了社区方案。实际上，我认为“基于类”并非面向对象的唯一形态，如果我们把视线从“类”移开，Brenan 当年选择的原型系统，就是一个非常优秀的抽象对象的形式。

## 什么是原型？

什么是原型，原型就是顺应人类自然思维的产物，中文有个成语叫“照猫画虎”，这里的猫看起来就是老虎的原型；  
  
在上一节学习面向对象的时候知道，在不同的编程语言中，设计者也利用各种不同的语言特性来描述对象；最为成功的流派是使用“类”的方式来描述对象，诸如 c++、Java 等流行的基于类的编程语言。  
  
还有一种就是基于原型的编程语言，它们利用原型来描述对象，JavaScript 就是之中的代表。  
  
“基于类”的编程提倡使用一个关注分类和类之间关系开发模型；在这类语言中，总是先有类，再从类去实例化一个对象，类与类之间又可能会形成继承、组合等关系，类又往往与语言的类型系统整合，形成一定编译时的能力。  
与此相对，“基于原型”的编程看起来更为提倡程序员去关注一系列对象实例的行为，而后才去关心如何将这些对象，划分到最近的使用方式相似的原型对象，而不是将它们分成类。  
  
基于原型和基于类都能够满足基本的复用和抽象需求，但是使用的场景不太相同。  

在 JavaScript 之前，原型系统就更多与高动态性语言配合，并且多数基于原型的语言提倡运行时的原型修改，我想，这应该是 Brendan 选择原型系统很重要的理由。  
  
原型系统的“复制操作”有两种实现思路：

- 一个是并不真的去复制原型对象，而是使得新对象持有一个原型的引用
- 另一个是切实的复制对象，从此两个对象再无关联

历史上的基于原型语言因此产生了两个流派，显然，JavaScript 显然选择了前一种方式。  

## JavaScript 的原型

抛开 JavaScript 用于模拟 Java 类的复杂语法设施（如 new、Funtion Object 等），原型系统可以说相当简单，概括成两条：

- 所有对象都有私有字段[[prototype]]，就是对象的原型
- 读一个属性，如果对象本身没有，则会继续访问对象的原型，知道原型为空或者找到为止

这个模型在 ES 的各个历史版本中没有很大变化，但是从 ES6 以来，JavaScript 提供了一系列内置函数，以便更直接的访问操纵原型；三个方法分别为：

- Object.create 根据指定的原型创建对象，原型可以是 null
- Object.getPrototypeOf 获得一个对象的原型
- Object.setPrototypeOf 设置一个对象的原型

利用这三个方法，完全可以抛开类的思维，利用原型来实现抽象和复用。如下：

``` javascript
var cat = {
  say() {
    console.log('miao ~~')
  },
  jump() {
    console.log('jump')
  }
}

var tiger = Object.create(cat, {
  say: {
    writable: true,
    configurable: true,
    enumerable: true,
    value: function() {
      console.log('roar ~~')
    }
  }
})

var anotherCat = Object.create(cat);
anotherCat.say(); // miao ~~

var anotherTiger = Object.create(tiger);
anotherTiger.say(); // roar ~~
```

这里创建了一个 cat 对象，又根据猫做了一些修改创建了 tiger 对象，之后就直接用 Object.create() 来创建另外两个 cat 和 tiger 对象，我们可以用过“原始cat对象”和“原始tiger对象”来控制cat和tiger的行为。  
但是，在更早的版本中我们只能通过 Java 风格的类接口来操纵原型运行时，由于 new 和 prototype 属性等基础设施今天仍然很多人使用，下面去追溯一下早年的 JavaScript 中的原型和类。

## 早期版本中的类与原型

在早期版本的 JavaScript 中，“类”的定义是一个私有属性[[class]]，语言标准为内置类型诸如 Number、String、Date 等制定了[[class]]属性，以表示它们的类。语言使用者唯一可以访问[[class]]属性的方式时 Object.prototype.toString。  
下面展示了所有具有内置class属性的对象：

``` javascript
var o = new Object;
var n = new Number;
var s = new String;
var b = new Boolean;
var d = new Date;
var arg = function() {return arguments}();
var r = new RegExp;
var f = new Function;
var arr = new Array;
var e = new Error;
console.log([o,n,s,b,d,arg,r,f,arr,e].map(v => Object.prototype.toString.call(v)));
```

因此，在 ES3 和之前的版本， JavaScript 中类的概念相当弱，它仅仅是运行时的一个字符串属性。  

而我们把 new 理解成 JavaScript 面向对象的一部分，它究竟做了哪些具体的操作呢？

- 以构造器的 prototype 属性（注意与私有字段[[prototype]]的区分）为原型，创建新对象
- 将 this 和调用参数传给构造器执行
- 如果构造器返回的是对象，则返回，否则返回第一步创建的对象

new 这样的行为，试图让函数对象在语法上跟类变得相似；但是，它在客观上提供了两种方式：

1. 在构造器中添加属性
2. 在构造器的 prototype 属性上添加属性

如下:

``` javascript
function c1() {
  this.p1 = 1;
  this.p2 = function() {
    console.log(this.p1)
  }
}
var o1 = new c1();
o1.p2();

function c2() {}
c2.prototype.p1 = 1;
c2.prototype.p2 = function() {
  console.log(this.p1);
}
var o2 = new c2();
o2.p2();
```

方法一是直接在构造器中修改 this，给 this 添加属性  
方法二是在构造器的 prototype 属性指向的对象上做修改，它是从这个构造器构造出来的所有对象的原型

## ES6 中的类

前面是通过 new 和构造器进行搭配创建新实例，而在 ES6 中加入了新特性 class 关键字，从此，基于类的编程方式成为了 JavaScript 的官方编程范式，如下：

``` javascript
class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }

  // getter
  get area() {
    return this.calcArea();
  }

  // method
  calcArea() {
    return this.height * this.width;
  }
}
```

在现有的类语法中，getter/setter 和 method 是兼容性最好的，这里类的写法实际上也是有原型运行时来承载的，逻辑上 JavaScript 认为每个类是有共同原型的一组对象，类中定义的方法和属性则会被卸载原型对象之上。此外，最终的是类提供了继承的能力，代码如下：

``` javascript
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(this.name + 'make a noise.');
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name);
    // call the super class constructor and pass in the name parameter
  }

  speak() {
    console.log(this.name + 'barks.');
  }
}

let d = new Dog('mitt');
d.speak();
// mitt barks
```

这里通过 extends 关键字让 Dog 继承了 Animal 类，比用 new 和 prototype 原型链来实现继承更加方便。  
所以，在你的工作中，是不是将 ES6 语法已经提上日程或者正在使用呢？