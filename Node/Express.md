# Node.js

创建服务器的框架Express

## 基础知识

### 洋葱模型

```js
koa和express都是中间件类型的，也都可以想象成 洋葱模型

express中间件感觉挺容易理解的，见到next才会向下执行，应该也是send会结束上下文
```

### 1.node目录的配置

```js
// 简介
1. package.json 配置文件
2. router 目录 用来存放路由文件
3. views目录 用来存放html模板文件
4. module 目录 自己写的一些模块
```

+ 配置文件 package.json

```html
package.json 这是一个说明文件 
安装方式 npm
dependencies: 当前项目所使用的依赖模块
      安装方式 npm install 自动读取package.json自动安装
```

```js
{
    "name": "app",
    "version": "0.0.1",
    "dependencies": { // 当前项目所使用到的依赖模块
        "express": "^4.16.4" // 使用的依赖和版本
    }
}
```

### 2.搭建一个简单的服务器环境

app.js

```js
const express = require('express');
const app = express();
const {join} = require('path');

// 响应浏览器的方法
// 第一个参数是浏览器请求对象   第二个是响应浏览器对象
app.get('/', function (req, res) {
    // send 响应数据的方法之一
    res.send('Hello world');
    // 绝对路径
    res.sendFile(join(process.cwd(), 'public/index.html'));
    // 响应一个json数据
    res.json();
});

app.listen(3000, () => {
    console.log('3000端口服务启动成功');
});
```

```js
// 在网上看到还有另外的形式 比如那个socket.io那里,创建服务器就是用http模块createServer创建的 都可以
const express = require('express'),
    //初始化
    app = express();
app.get('/', (req, res) => {
    res.send('123');
})
http.createServer(app).listen(3000, () => {
    console.log('3000端口服务启动成功');
});
```

### 3. router目录

+ 用来存放路由文件

```js
上面那个get就是一个路由
// 访问什么路径 做什么事就是一个路由
```

```js
const express = require('express'),
      router = express.Router();
/*
router.get('/',(req,res)=>{
    res.send(process.cwd());
});

router.get('/123',(req,res)=>{
    res.send('word');
});
router.get('/456',(req,res)=>{
    res.sendFile(process.cwd() + '/view/index.html');
});
*/
module.exports = router;
```

```js
//访问当前路径的时候  使用index里面的路由方法
//访问当前路径的时候  交给 index处理
const http = require('http'),
      express = require('express'),
      app = express();

app.use('/',require('./router/index'));
http.createServer(app).listen(3000);
```

### 4.views目录

+ 用来存放html模板文件

```html
<html>
    <head></head>
    <body></body>
</html>
```

### 5.module目录

+ 自己写的一些模块

### 6.路由匹配规则

+ 匹配路由规则，那个匹配规则

```js
app.use('/', require('./router/index.js'));
app.use('/admin',require('./router/admin.js'));
```

**正则**

```js
router.get('/a+b+/'.(req,res)=>{
    res.send('index.js')
})
```

可以故意写错一下看一看正则规则

## 功能配置

### 1.设置模板引擎

+ 这里先用ejs模板引擎来代替
+ 有好多模板引擎，只需要安装相对应的就可以了，都是以这种方式 jade pug ejs swig等等，具体的用法可以查看官方文档

```js
安装ejs模板引擎
cnpm i -S ejs
```

app.js文件中 设置模板引擎的目录

```js
// 设置模板引擎的目录
app.set('views', join(__dirname,'/views'));
// 设置使用的模板引擎是什么
app.set('view engine', 'ejs');
```

**响应模板引擎**

```js
router.get('/', (req, res) => {
    // render用来响应模板引擎文件的
    res.render('index'); // 后缀名和目录上面都已经配置好了，所以可以省略
})
```

**给模板引擎传递数据**

```js
router.get('/abc', (req, res) => {
    res.render('news', {
        name: '狗蛋'
    })
});

router.get('/aaa', (req, res) => {
    let obj = {
        a: '1',
        b: '这里是b',
        c: '这里是c'
    };
    //res.render('index.ejs',{name:'<h1>我这里是h1标签</h1>'});
    res.render('obj', {data: obj})
});
```

新建一个views文件，里面的html文件**以ejs结尾**

```html
ejs文件中的写法
这里是header.ejs
<% include hader.ejs %>
<!-- 接收的方式 <%=  %>  -->

转义就是不解析标签
<%= name %> 不解析标签

// 没有转义的 没有转义就是解析标签
<%- name %> 解析标签

<!-- 主要是用来写js代码 -->

<% for(var i = 0;i<6;i++){ %>
    <p>1</p>
<% } %>
```

ejs非常适合前端学习node的模板引擎，好像性能比pug差一些，但是还可以。

**响应模板引擎** 

向模板传递值的另外一种方式，有时候传的值不存在的时候会报错，可以用下面的方式传值。

```js
router.get('/', (req, res) => {
    console.log('没有执行到吗');
    res.render('news', {
        name: '111',
        age: '1231'
    });
});

// 里面的数据全部都可以在  locals里面
<%= locals.name  %>
<p><%= locals.age %></p>
```

第二种取值方式

```js
router.get('/ejs', (req, res) => {
    res.locals.name = '这里是这样添加的';
    res.render('news');
});
```

### 2. 设置静态资源目录

静态资源目录是直接可以用那种路径就可以响应了，就不需要去再去配置那种请求的路由了

```js
#直接在url地址后面匹配
// 把public设置为静态资源目录
app.use(express.static('public'));
// 可以用其他的方式设置路径也可以
app.use(express.static(join(__dirname,'public')))

#在url地址前面还需要加上这个配置的路径
localhost:3000/abc   这个才是静态资源目录的地址， 静态资源还是 在public下面
app.use('/abc', express.static('public'));
```

### 3. 获取post数据body-parser

```js
// 只有安装了这个才可以获取到post提交的东西
npm i -S body-parser
```

```js
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
//表单提交  网址上的数据 true就是可以接收任何数据类型的数据
app.use(bodyParser.urlencoded( {expended:true} )); 
// 上面的那个可以让后台接收到x-www-form-urlencoded 
app.use(bodyParser.json()); 
// 这个可以接收到请求头为 content-type:application/json的，在括号内部还可以设置请求json文件的大小，没有试过，但是见过
app.use(bodyParser.json({limit:'50mb'}));
```

```js
router.post('/reg',(req,res)=>{
       console.log(req.body);  //{name: 'aaa', pass : 'ffff'};
})
```

### 4.三种获取请求参数

+ get请求

```js
router.get('/data', (req, res) => {
    console.log(req.query);
    res.send('获取到了路径上面的参数吗');
});
```

+ post请求

```js
router.post('/data', (req, res) => {
    console.log(req.body);
    res.send('post提交');
});
```

+ 动态路由

```js
router.get('/data/:id', (req, res) => {
    console.log(req.params);  id可以匹配后面的一切东西
    res.send('动态路由');
});

// 这里的动态不仅仅只是可以接受一个参数，他可以接收多个
router.get('/aa/:id/:search', (req, res) => {
    //  {id:xxx, search: xxx}
})
```

+ 同时接受get 和 post 的请求是有的

```js
router.all('/all', (req, res) => {
    console.log(req.method);
});

router.use('/all', (req, res) => {
    console.log(req.method);
})

// 有一种东西的使用方法可以是这样的
创建模块化路由很有帮助，减少冗余和拼写错误 见官网
app.route('/book')
  .get(function (req, res) {
    res.send('Get a random book')
  })
  .post(function (req, res) {
    res.send('Add a book')
  })
  .put(function (req, res) {
    res.send('Update the book')
  })
```

### 5.响应数据

res.send()

```js
res.send();
res.sendFile();

// 设置响应状态码

res.status(500).send('Hello world');
```

### 6.cookie的操作

```js
// 1. 安装模块  cookie—parser

// 要找到一个前端不可以修改cookie的配置  现在暂时还没有找的到
```

```js
// app.js
var cookieParser = require('cookie-parser')

// 后来我没有设置秘钥也获取到了啊.. 2018-12-29日
app.use(cookieParser('skefjksdjfkj'));  //密钥 不设置密钥我获取不到

app.use(cookieParser())
```

```js
//设置cookie
//1.cookie的名称 2.数据   3.过期时间(毫秒)
res.cookie('login',{name:user},{maxAge:1000*60*60*24*365})

// 设置cookie   csdn上面看到的，官网为什么不详细的介绍呢？？
app.get('/setc',function(req,res){
    res.cookie('resc', '设置到cookie里的值', { expires: new Date(Date.now() + 900000), httpOnly: true });
    res.end('cookies set ok')
});
```

```js
//获取cookie
req.cookies;
```

```js
// 清空所有cookie
res.clearCookie('login');  //清除cookie
```

### 7.session

​    可以去看看http那里，cookie，session，token三种机制的区别。

​    虽然session保存在服务器，对客户端是透明的，它的正常运行仍然需要客户端浏览器的支持。这是因为session需要使用cookie作为识别访问。http协议是无状态的，session不能依据http连接来判断是否为同一用户，因此服务器向客户端浏览器发送一个名为JSESSIONID的Cookie，它的值为该Session的id（也就是HttpSession.getId()的返回值）。Session依据该Cookie来识别是否为同一用户。

该Cookie为服务器自动生成的，它的maxAge属性一般为–1，表示仅当前浏览器内有效，并且各浏览器窗口间不共享，关闭浏览器就会失效

因此同一机器的两个浏览器窗口访问服务器时，会生成两个不同的Session。但是由浏览器窗口内的链接、脚本等打开的新窗口（也就是说不是双击桌面浏览器图标等打开的窗口）除外。这类子窗口会共享父窗口的Cookie，因此会共享一个Session。

```js
// 1. 安装模块 express-session

express-session中间件，这个是在百度上查询到的资料，不知道准不准，那个koa-session感觉是存在文件中的
就是重启服务之后还是存在的

express-session中间件，默认是放在内存里的，可以通过其他方法存储
可以再去对比一下，如果有错误再回来这里整理一下。


//下面是用法
const session = require('express-session');

app.use(session( { secret:'node' } ));// 密钥

//  session 所有后台页面都是可以访问到的
//  保存到服务器上面的
//  session 在关闭页面的时候 session下面保存的所有数据 会清空
req.session.admin = Number(data[0]['admin']);
```

app.js

```js
session = require('express-session');

aap.use(session({ secret:'aaa' }));//设置秘钥

app.use(session({
    resave:false,       //添加 resave 选项
    saveUninitialized:true,////添加 saveUninitialized 选项
    secret:'node',   //密钥
}));
// 上面的那种是关闭浏览器结束会话

app.use(session({
    secret: '12345',
       name: 'testapp',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    cookie: {maxAge: 80000 },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
    resave: false,
    saveUninitialized: true,
}));
// 这种模式重启node服务我发现req.session会消失，应该还是把session存到了内存中 koa-session的肯定是文件存储，因为它重启服务session还会存在 去验证一下再来回来证明
```

**保存状态**

**注意** session是所有后台页面都可以访问的到的

```js
router.get('/login', (req, res) => {
    req.session.login = 'aaa';
    // 我这样做的话是那种 我只要关闭浏览器就消失了它 就不再是它了就没有这个信息了
})

req.session.admin = data[0]['admin'];
```

有一个持久化存储的mongodb模块

```js
connect-mongo
可以在网上看一看，我不怎么想实现一次呢怎么 哈哈哈
```

### 8.上传文件的模块multer

这个东西可以用来处理form表单上传的文件，只不过只能处理form表单上面那种类型的，去查看官网，说的非常清楚，具体的用法也可以百度一下，多练习。写成中间件的形式。

```js
cnpm i -S multer
```

form表单上面有个属性可以设置上传文件的东西

enctype

```js
<form action="/admin/article" enctype="multipart/form-data" method="post" >
```

表单上传多个东西

```html
<input class="file" type="file" multiple="multiple" name="wulv1"><br />
<input class="file" type="file" multiple="multiple" name="wulv1"><br />
```

```js
router.post('/article',upload.fields([{ name: 'aaa', maxCount: 4 }, { name: 'bbb', maxCount: 8 }]),(req,res)=>{
    //console.log(req.upload);
});
```

```js
file 上传的文件的信息都保存在这个里面
function(req, file, cb){}
```

```js
multer

const multer = require('multer'),
    path = require('path');

// 上传路径处理  上传之后重命名
let storage = multer.diskStorage({
    //上传路径处理
    destination : path.join(process.cwd(),'public/down'),
    filename:function (req,file,callback) {
        //console.log(file);
        let filename = (file.originalname).split('.');
        callback(null,`${Date.now()}.${filename[filename.length-1]}`);
    }
});
let fileFilter = function (req,file,cb) {
    //当设置这个判断后 没允许的 && 没设置的类型  拒绝
    //console.log(file);
    if(file.mimetype === 'image/jpeg'){
        console.log('进去了吗');
        cb(null,true);
    }else{
        console.log('没有进去吗');
        req.upload = '123';
        cb(null,false);
    }
};
let upload = multer({
   storage : storage,
   limits:{
       //限制上传文件的大小   这个单位好像是MB，不太清楚以后可以测试
   },
    fileFilter:fileFilter
});

module.exports = upload;
```

### 9.打印日志

```js
cnpm i -S morgan
require('morgan')
```

## 一些优化

### 1.路由分文件

​    当项目越来越大的时候，有时候把所有的路由文件不好找到，所以可以把一项功能放到一个文件夹里面

```js
router.use('/login', require('./router/login'));
// 这句话的意思是  当访问网址 /login的时候交给 login.js文件处理
```

### 2.改造代码

所有的代码都放到app里面太乱了

app.js

```js
module.exports = app; // 把app暴露出去
```

module里面新建一个 configdata.js

```js
const app require('../app'),
    sql = require('./mysql'),
    navdata = requir4e('./nav');

app.use(function(req,res,next){})
```
