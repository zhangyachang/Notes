# http

要使用http服务器与客户端，需要 `require('http')`

为了支持各种可能的HTTP应用，Node.js的http API是非常底层的。它只涉及流处理与消息解析。它把一个消息解析成消息头和消息主体，但不解析具体的消息头或消息主体。



##创建一个简单的http服务器

```js
//安装好node就有的一个模块  
//用来创建http服务器的 核心模块
const http = require('http');

let server = http.createServer((request,response)=>{
    // request 请求对象 浏览器请求服务器的所有内容都会保存到这里
    // response 响应对象 服务器响应到浏览器 所有的方法
    
    // 响应头部  http状态码200  响应类型
    res.writeHeader(200,{"Content-Type":"text/plain;charset=utf-8"});
    // 这个write可以写多次，都会拼接起来
    res.write('Hello world!');
    res.write('Hi');
    
    res.end('!!'); 
    // 要显式的调用此方法结束此次响应(本次会话) 最后调用 传非字符串和buffer之外的都会报错
    
    res.end('..');
    res.write('what are');
    console.log('后面的还会执行吗'); 
    // 他后面的东西并不会并响应到页面中
    // 但是它后面的代码还是会执行的 
    // 可能会发现一个问题，你只打开一个网页请求了一次，它会打印两遍是为什么呢？ 可以打开前端页面 network那里，你会发现它有两次请求，/localhost /favicon.ico
});

server.listen(3000); // 监听端口 自定义的端口号
// 运行指令 node 文件名.js 
// 此刻打开浏览器输入 localhost:3000  就可以看到我们的东西了
```

ctrl + c 重启

**注意点：**  上下文就是环境的意思，可以理解为第一次执行 end()之后，就没有上下文了

​		`http.createServer()`方法会返回他自身，可以直接listen(端口号)



##request对象

```js
req 这个浏览器请求服务器对象里面的东西太多了，简单介绍两个
console.log(req.headers);
req.method; // 请求类型 大写
req.url;  // 请求路由 /  /article 的东西
```



##根据不同的路由返回不同的页面

```js
const http = require('http');
let server = http.createServer((req,res)=>{
    res.writeHeader(200,{'Content-Type':'text/plain; charset=utf-8'});
    let reqMethod = req.method.toLowerCase();
    let reqURL = req.url;
    if(reqMethod === 'get'){
        switch (reqURL) {
            case '/':
                res.write('首页');
                break;
            case '/home':
                res.write('/home页面');
                break;
            case '/article':
                res.write('/文件页面');
                break;
            default :
                res.write('404页面');
                break;
        }
    }
    res.end();
});
server.listen(3000);
console.log('服务启动成功了');
```



## 响应一个html页面

**第一种 fs.readFileSync**

```js
// 此处省略
const fs = require('fs');
http.createServer((req,res)=>{
    res.writeHeader(200,{'Content-Type':'text/html; charset=utf8'});
    res.write(fs.readFileSync('./index.html'),'utf-8'); // 此处读文件用的是同步的方式
    res.end();
})
```

**第二种 fs.readFile 回调函数**

```js
fs.readFile('./index.html','utf8',(err,data)=>{
    if(err) throw err;
    res.end(data);
});
```

**第三种 stream 流**

```js
let server = http.createServer((req,res)=>{
    res.writeHeader(200,{'Content-Type':'text/html; charset=utf8'});
    fs.createReadStream('./index.html').pipe(res); // 使用这种流式读取文件的方式传入到res中
});
```





## 解决CORS 跨域问题

之前我们看到页面的方式是在浏览器地址输入的 `localhost:3000` 这样查看的，同域名，同端口，同协议



现在我们新建一个html页面，在里面写上一个ajax请求，然后返回数据

index.html

```js
document.onclickc = function(){
    $.ajax({
        url: 'localhost:3000',
        type: 'get',
        success: function(res){
            console.log(res);
        }
    })
}
```

后台app.js

```js
const http = require('http');
const fs = require('fs');
let server = http.createServer((req,res)=>{
    res.writeHeader(200,{'Content-Type':'text/html; charset=utf8'});
    let obj = {
        name: '狗蛋',
        age: 18
    };
    obj = JSON.stringify(obj); // 转为字符串
    res.write(obj);
    res.end();

});
server.listen(3000);
console.log('3000 服务启动成功了');
```

```js
在index.html页面下点击发出请求，打开控制台发现报错了，这样的就是说跨域了，后台服务器其实已经把数据返回了，但是浏览器限制了它，
//用文件直接打开 可以在network里面查看到返回的数据
// webstrom带端口号的  不知道为什么在network中看不到

Failed to load http://localhost:3000/?name=%E7%8B%97%E8%9B%8B&age=18: No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost:63342' is therefore not allowed access.
```

要解决这个问题很简单，只需要我们在后台设置一下请求头就可以了。

```js
let server = http.createServer((req,res)=>{
    res.setHeader('Access-Control-Allow-Origin','*');  // 在这里加上这一条就可以了
    res.writeHeader(200,{'Content-Type':'text/html; charset=utf8'});
    let obj = {
        name: '狗蛋',
        age: 18
    };
    obj = JSON.stringify(obj); // 转为字符串
    res.write(obj);
    res.end();
});
```



## 跨域解决2 

我们从上面已经知道就是其实跨域是浏览器这个东西搞出来的，服务器并没有什么限制问题，这样我们就可以把请求发送给一个已经信任的服务器，然后让这台服务器去请求拿到想要的数据，再把数据返回来，做一个类似代理的模式。

**图解**

前台    服务器1       服务器2

**背景 **前台与服务器1是信任的，而且服务器1也设置了刚才的那个请求头的

**需求** 我们前端需要去请求服务器2中的数据，但是服务器2没有设置那个请求头也就是没有解决CORS跨域问题，我们现在可以把请求发送到服务器1中，然后让服务器1代替我们去请求服务器2中的数据，然后拿到之后返回前台



先测试一下两台服务器相互通讯

test.js

```js
const http = require('http');
let options = {
    hostname: 'localhost',
    port: 3001,
    path: '/',
    methods: 'get'
};
let req = http.request(options,(res)=>{
    res.setEncoding('utf8');
    res.on('data',(chunk)=>{
        console.log(`返回的信息${chunk}`);
    });
    res.on('end',()=>{
        console.log(`请求结束`);
    })
});

req.on('error',(e)=>{
    console.log(`错误信息 ${e.message}`);
});
req.write('');
req.end();
// 这里可以看到打印的信息  返回的信息 {服务器2中的obj}
```



服务器2  server.js

```js
const http =require('http');
const server = http.createServer((req,res)=>{
    let obj = {
        a: 1,
        b: 2,
        server: 'server.js'
    };
    obj = JSON.stringify(obj);
    res.write(obj);
    res.end();
});
server.listen(3001);
console.log('3001服务启动成功');
```

前台

```js
$.ajax({
    url: 'http://localhost:3000',
    type: 'get',
    data: {
        info: '老大哥，帮我去3001端口去拿一下数据呗',
        hostname:'localhost',
        port:'3001',
        url: '/'
    },
    success: function (msg) {
        console.log(msg);
    }
})
```

服务器1

```js
// 真正测验了
const http = require('http');

let fn = (response,reqObj)=>{
    let options = {
        hostname: reqObj.hostname,
        port: reqObj.port,
        path: reqObj.url,
        methods: 'get'
    };
    let data;
    let req = http.request(options,(res)=>{
        res.setEncoding('utf8');
        res.on('data',(chunk)=>{
            console.log(`返回的信息${chunk}`);
            data = chunk;
        });
        res.on('end',()=>{
            console.log(data);
            // 此刻返回数据就好了
            response.end(data);
        })
    });
    req.on('error',(e)=>{
        console.log(`错误信息 ${e.message}`);
    });
    req.write('');
    req.end();
};
let server = http.createServer((req,res)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    // 处理get请求的数据
    var data = decodeURIComponent(req.url).slice(2);
    let reqArr = data.split('&');
    let reqObj = {};
    for(var i=0,len=reqArr.length;i<len;i++){
        var item = reqArr[i].split('=');
        reqObj[item[0]] = (item[1]);
    }
    console.log(reqObj);
    fn(res,reqObj);
});

server.listen(3000);
console.log('3000 服务启动成功了');
```