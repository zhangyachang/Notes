# pug

```js
npm i -S pug
```

把模板引擎注册到koa上， pug是视图工具。

```js
npm i -S koa-views  // 借助koa-views 让koa与视图模板结合在一起
```



```js
const Koa = require('koa');
const views require('koa-views');
const {join} = require('path');
// pug不需要引入进来

const app = new Koa();

app.use(views(join(__dirname,'views'),{
    extension: 'pug'
}))
app.listen(3000,()=>{
    console.log('服务启动成功');
})
```



## 基本的使用规则

```js
#{变量}  这样去渲染数据
//   注释 
```

## 属性

```pug
a(href="http://baidu.com")  ----> <a href="http://www.baidu.com"></a>
a(class="button" href="http://www.baidu.com")  ------->  <a class="button" href="12312"></a>
a(class="button", href="http://www.baidu.com")
```

## 分支条件

```js
- var friends = 10
case friends
  when 0
    p 您没有朋友
  when 1
    p 您有一个朋友
  default
    p 您有 #{friends} 个朋友


---------------------------
- var friends = 1
case friends
  when 0: p 您没有朋友
  when 1: p 您有一个朋友
  default: p 您有 #{friends} 个朋友
```

## 判断

```js
- var user = { description: 'foo bar baz' }
- var authorised = false
#user
  if user.description
    h2.green 描述
    p.description= user.description
  else if authorised
    h2.blue 描述
    p.description.
      用户没有添加描述。
      不写点什么吗……
  else
    h2.red 描述
    p.description 用户没有描述
```



## 循环

```js
- for (var x = 0; x < 3; x++)
  li item

------------------------------------
- var list = ["Uno", "Dos", "Tres", "Cuatro", "Cinco", "Seis"]
each item in list
  li= item

```

## 包含

```html
//- index.pug
doctype html
html
  include includes/head.pug
  body
    h1 我的网站
    p 欢迎来到我这简陋得不能再简陋的网站。
    include includes/foot.pug
```

```html
//- includes/head.pug
head
  title 我的网站
  script(src='/javascripts/jquery.js')
  script(src='/javascripts/app.js')
```

```js
//- includes/foot.pug
footer#footer
  p Copyright (c) foobar
```

**结果**

```html
<!DOCTYPE html>
<html>
<head>
  <title>我的网站</title>
  <script src="/javascripts/jquery.js"></script>
  <script src="/javascripts/app.js"></script>
</head>

<body>
  <h1>我的网站</h1>
  <p>欢迎来到我这简陋得不能再简陋的网站。</p>
  <footer id="footer">
    <p>Copyright (c) foobar</p>
  </footer>
</body>
</html>
```
