## TypeScript 问题汇总

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

2. TODO
