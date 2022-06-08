# 问题汇总

## HTML
1. src 和 href 的区别？
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

2. 常用的 meta 标签？
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

3. TODO
