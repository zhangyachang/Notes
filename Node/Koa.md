```js
request  superagent   // 后台去访问其他资源
cheerio      // 把html的字符串文件 变为 dom类型的去操作
fs-extra     // 集成了fs
koa-router   // 路由
koa-static   // 静态资源
koa-body     // post数据解析
@koa/cors     // 跨域
koa-session  //后台 session
```

#Koa

##安装

```js
npm i -S koa
```

## 基本使用

```js
const Koa = require('koa');
const app = new Koa();
app.use(async (ctx,next)=>{
    // ctx 差不多是req res的集成 
});

app.listen(3000);
console.log('3000服务启动成功');
```

## 中间件

洋葱模型

```js
const Koa = require('koa');
const app = new Koa();
app.use(async (ctx,next)=>{
    console.log('11');
    await next(); // 交出控制权是主动的  回来是自动的
    console.log('1出来');
});
app.use(async (ctx,next)=>{
    console.log(2);
    await next();
    console.log('2出来');
});
app.use(async (ctx,next)=>{
    console.log(3);
});
app.listen(3000);
console.log('3000服务启动成功');
```

##ctx中的属性

```js
app.use(async (ctx,next)=>{
    ctx.body = '返回数据';  // 这是返回数据 和那个 res.write()差不多
    ctx.body += '  追加数据';
    ctx.body = '返回';  // 这个会覆盖 上面两条就无效了
    
    ctx.request.url
    ctx.url  // 发送的url
    ctx.method // 请求方法
    
    ctx.path // 路径
   	ctx.status  // 状态码
    ctx.query // 请求信息
    ctx.type // 响应文档类型
});
```



## 路由

```js
const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();

app.use(async (ctx,next)=>{
    await next();
});
// localhost:3000  index页面
router.get('/',async (ctx,next)=>{
    console.log('中间件1接收get请求---》');
    await next();
    console.log('中间件1 响应请求');
}, async (ctx,next)=>{
    console.log('中间件2接收get请求---》');
    await next();
    console.log('中间件2 响应请求');
});


app
    .use(router.routes())
    .use(router.allowedMethods());
app.listen(3000);
console.log('3000端口服务启动成功');
```

上面的代码中间可以换成

```js
router.get('/',async (ctx,next)=>{
    ctx.body = '<h1>根目录</h1>';
});
router.get('/home',async (ctx,next)=>{
    ctx.body = '<h1>/home页面</h1>';
});
router.get('/article',async (ctx,next)=>{
    ctx.body = '<h1>article页面</h1>'
});
```



## 分模块

把所有的路由都写到app.js里面会显得杂乱，特别多，所以可以分文件去处理

+ app.js

```js
const Koa = require('koa');
const app = new Koa();
const router = require('./router/index');  // 去引入自己写的路由

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3000);
console.log(`服务启动成功`);
```

+ router/index.js

```js
const Router = require('koa-router');
const router = new Router();
const logic = require('../logic/logic');

router.get('/',logic.getG);
router.get('/home',logic.getHome);
router.get('/article',logic.getArticle);
module.exports = router;
```

+ logic/logic.js

```js
exports.getG = async function (ctx,next) {
    ctx.body = '<h1>根目录</h1>';
};
exports.getHome = async function (ctx,next) {
    ctx.body = '<h1>修改后/home页面</h1>';
};
exports.getArticle = async function (ctx,next) {
    ctx.body = '<h1>article页面</h1>'
};
```



## 设置静态目录

为什么要设置静态目录？来看一个例子

有三个html文件对应的引入了三个css文件，于是我们写出来三个路由

```js
const fs = require('fs');
exports.getG = async function (ctx,next) {
    console.log(__dirname);
    ctx.body = fs.readFileSync('./public/index.html','utf8');
};
exports.getHome = async function (ctx,next) {
    ctx.body = fs.readFileSync('./public/home.html','utf8');
};
exports.getArticle = async function (ctx,next) {
    ctx.body = fs.readFileSync('./public/article.html','utf8');
};
```

但是我们访问的时候发现html文件引入的css文件并不生效打开控制台发现引入css文件404

```js
报错信息
GET http://localhost:3000/css/home.css net::ERR_ABORTED 404 (Not Found)
```

看到network下面发现请求了css资源，于是我们写下来三条路由

```js
router.get('/css/index.css',async ctx=>{
    ctx.type = 'text/css';
    ctx.body = fs.readFileSync('./public/css/index.css','utf8');
});
router.get('/css/home.css',async ctx=>{
    ctx.type = 'text/css';
    ctx.body = fs.readFileSync('./public/css/home.css','utf8');
});
router.get('/css/article.css',async ctx=>{
    ctx.type = 'text/css';
    ctx.body = fs.readFileSync('./public/css/article.css','utf8');
});
```

我就问你烦不烦，每一个css文件，每一张图片的请求都需要写一个路由吗？？ 所以我们引入了静态资源

**koa-static**

```js
npm i -S koa-static
```

```js
const Koa = require('koa');
const app = new Koa();
const koaStatic = require('koa-static');
const path = require('path');

app.use(koaStatic(path.join(__dirname,'/public')));  // 在这里设置就好了



```



## post数据解析

get请求可以很容易的获取到请求的信息

```js
//get 请求
ctx.url   ctx.path   ctx.query
```

**koa-body**

```js
npm i -S koa-body
```

**使用方法**

```js
const koaBody = require('koa-body');

app.use(koaBody());

// 接收请求信息
ctx.request.body
```



**解决跨域**

**@koa/cors **

```js
$ npm install @koa/cors@2 --save
```

```js
const Koa = require('koa');
const cors = require('@koa/cors');
const app = new Koa();
app.use(cors());
```



## cookie

```js
ctx.cookies.set('username':username,{
                // 前端只能设置过期时间
                domain:'localhost',
                path: '/'
                maxAge: 1000*60*60,
                httpOnly: true,  //  客户端有没有权利来访问这条数据  true没有权利
                overwrite: false,  // 不能被覆盖
                //signed:true // 签名   可以去看看这个东西
})  // 设置

ctx.cookies.get("username"); // 获取
```



## session

```js
// 自带了一个 
ctx.session.isNew

ctx.session = null;  // 手动删除 过期
app.keys = ['some secret hurr'];
 
const CONFIG = {
  key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  autoCommit: true, /** (boolean) automatically commit headers (default true) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};
 
app.use(session(CONFIG, app));
```



## 文件上传

###koa-multer

```js
const Koa = require('koa');
const Router = require('koa-router');
const multer = require('koa-multer');
const path = require('path');
const router = new Router();
const app = new Koa();
let storage = multer.diskStorage({
    // 存储的位置
    destination: path.join(__dirname,'upload'),
    // 文件名
    filename: (ctx,file,cb)=>{
        cb(null,file.originalname);
    }
});
let fileFilter = (ctx,file,cb)=>{
    // 过滤上传的后缀为txt的文件
    if(file.originalname.split('.').splice(-1) == 'txt'){
        cb(null,false);
    }else{
        cb(null,true);
    }
};

let upload = multer({
    storage: storage,
    fileFilter:fileFilter
});

router.post('/uploadFile',upload.single('file'),async ctx=>{
    console.log(ctx);
    console.log('到了这里了');
    if(ctx.req.file){
        ctx.body = 'upload success';
    }else{
        ctx.body = 'upload error';
    }
});

app.use(router.routes()).use(router.allowedMethods());
app.listen(3000,()=>{
    console.log(`3000服务启动成功`);
});
```

前台文件

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<form action="http://www.localhost:3000/uploadFile" method="post" enctype="multipart/form-data">
    <input type="file" name="file">
    <button>提交</button>
</form>
</body>
</html>
```

### koa-body

```js
const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body');
const path = require('path');
const app = new Koa();

app.use(koaBody({
    multipart: true,
    formidable: {
        // 上传存储的路径
        uploadDir: path.join(__dirname,'upload'),
        // 保持后缀不变
        keepExtensions: true,
        // 文件大小
        maxFileSize: 1024000,
        onFileBegin: (name,file) =>{
            // 取后缀
            const reg = /\.[A-Za-z]+$/g;
            const ext = file.name.match(reg)[0];

            // 修改上传文件名
            file.path = path.join(__dirname,'upload/' + Date.now() + ext);
        },
        onError(err){
            console.log(err);
        }
    }
}));

app.use(async (ctx) => {
    // 表单数据在body
    console.log(ctx.request.body);
    // 文件在files
    console.log(ctx.request.files);
    ctx.body = "上传成功"
});

app.listen(3000,()=>{
    console.log(`服务启动成功`);
});
```

​	

​	有一个问题啊，所有的后台服务都是一套代码，他是如何区分是不同的人访问的呢？
