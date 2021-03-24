[TOC]





## websocket

​	就是不http /https协议了

​	而是 ws/wss协议

服务器和浏览器  <==> 浏览器  双向通信  及时通讯

websocket 服务器也有支持还是不支持  iis8以下的不支持的



需要引入模块了,  安装

```js
npm i -S socket.io
```

下载好之后，可以在mode_modules有四个socket文件夹

socket.io.client 这个是前端页面的一个库

```js
dist里面是前端使用websocket协议封装好的一个插件
将里面的socket.js放到public里面去
```

```js
还可以是就是如果后台服务配置好的话，就可以直接在前台页面中请求这个路径
localhost:3000/socket.io/socket.io.js
这个可能是连接好配置之后，io那个模块给前台发送的，用这个连接就可以了。
```





**app.js**

```js
ws = require('socket.io');

//需要用一个变量把这个东西保存下来
let server = http.createServer(app).listen(3000);
//用ws监控这个东西
let io = ws(server); //所有的消息都会通过这个东西

//io.on()  on是监听事件的
//connection 当打开前端页面的时候
io.on('connection',socket=>{
    console.log(socket);  
    
    //发送消息的方法   参数 1.发送的名称 2.正式的内容
    io.emit('wulv'，{name:'欢迎加入'});  //当监听到上面的东西时，就发送
    
    //监听
    socket.on('xiexie',(data)=>{
        console.log(data);
    })
});

```



**html文件**

```html
//将那个socket插件引入过来
<script src="socket.io.min.js"></script>>
//查看一下this 会在全局下面发现一个io
//this.io
```

**js代码**

```js
//当引入socket的时候会在window下添加一个io的全局
//用io来连接 第一个参数网址(/代表当前的根目录啥的)
//在前台很难看出来
//websocket 建立过程
	1.通过http的链接方式进行链接 并且告诉服务器是要创建一个websocket链接
    2.服务器 说 好的没问题
    3.正式建立 websocket链接

//用一个变量存起来
const socket = io.connect('/');
//这个on也是用来监听的
socket.on('wulv',(err,data)=>{
    console.log(data);
    //前台给后台发送
    socket.emit('xiexie',{name:'收到');
   
});


```



在network的all里面查看一下那个东西

```js
当前的文件
js的插件
下面的都是一些 相互传递的东西
```



#### 加入聊天室



#### 退出聊天室

刷新浏览器 或者退出浏览器会触发的事件

```js
socket.on('disconnect',()=>{
    
})
```



**app.js代码**

**回调里的 socket 每个用户都是独立的  这个非常重要**

```js
// io.on() 监听事件的
// connection 当打开有前端的页面  监听websocket连接
let userList = {},
     usernum = 0;
// 回调里的 socket 每个用户都是独立的  这个非常重要
io.on('connection', socket =>{
    //console.log(socket);
    socket.on('jrlt',data =>{
        // 加入房间的方法
        socket.join('lt');
        io.sockets.in('lt').emit('hello','欢迎加入聊天房间')
    });
    socket.on('tclt',data =>{
       socket.leave('lt');
       io.sockets.in('lt').emit('hello','欢迎离开聊天房间')
    });
    
    
    // io.emit() 发送消息的方法 1.发送的名称 2.内容
    /*io.emit('wulv' ,{ name:'欢迎加入' } );
     socket.on('xiexie',(data) => {
     console.log(data);
     })*/
    //接收前端发送过来的聊天内容
    socket.on('msg',(data) => {
        console.log(data);
        //把内容广播出去
        io.emit('liaotian',data)
    });
    socket.on('login',(data) => {
        userList[data.userid] = data.name;
        socket.name = data.name;
        socket.userid = data.userid;
        usernum++;
        data.num = usernum;
        // 当有用户加入的时候 把加入的用户广播出去
        io.emit('login',{ data:data , userList:userList })
    });
    // disconnect 退出触发的事件
    socket.on('disconnect',() => {
        delete userList[socket.userid];
        usernum--;
        //console.log('当前退出的用户是' + socket.name);
        io.emit('out',{ name:socket.name , num:usernum ,userList:userList})
    })
});
```

```js
//返回值需要注意的东西
io.on('connection', function(socket){
  socket.emit('request', /* */); // emit an event to the socket
  io.emit('broadcast', /* */); // emit an event to all connected sockets
  socket.on('reply', function(){ /* */ }); // listen to the event
});
```



前端页面**

```js
// 当引入socket的时候会在window下添加一个 io 全局
// websocket
//     1.http 连接方式进行连接 并且 告诉服务器要创建一个websocket连接
//     2.服务器 没问题
//     3.正式建立 websocket 连接
const jinru = document.querySelector('.jinru'),
    msg = document.querySelector('.msg'),
    num = document.querySelector('.num'),
    userList = document.querySelector('.userList'),
    liaotian = document.querySelector('.liaotian'),
    likai = document.querySelector('.likai');
let socket,
    name,
    userid;
jinru.onclick = function (){
    name = document.querySelector('.name').value;
    init(name)
};

liaotian.onclick = function (){
    socket.emit('jrlt',{  });
    socket.on('hello',(data) => {
        console.log(data);
    });
};
likai.onclick = function (){
    socket.emit('tclt',{  })
};

function init(username){
    userid = Date.now();
    name = username;
    socket = io.connect('/');
    socket.emit('login',{ name:name, userid:userid});
    socket.on('login',(data) => {
        msg.innerHTML += `${data.data.name} 加入聊天室<br>`;
        num.innerHTML = `当前在线人数${data.data.num}<br>`;
        userList.innerHTML = '';
        for(let i in data.userList){
            userList.innerHTML += `当前在线列表${data.userList[i]}<br>`;
        }
    });
    socket.on('out',(data) => {
        msg.innerHTML += `${data.name} 退出聊天室<br>`;
        num.innerHTML = `当前在线人数${data.num}<br>`;
        userList.innerHTML = '';
        console.log(data);
        for(let i in data.userList){
            userList.innerHTML += `当前在线列表${data.userList[i]}<br>`;
        }
    });
    socket.on('liaotian',(data) => {
        msg.innerHTML += `${data.content}<br>`;
    })
}
function submit(){
    let txt = document.querySelector('.xiaoxi').value;
    socket.emit('msg',{ content:txt })
}
```





```js
// 给单独的客户端发送信息？
var io = io.listen(server);
io.clients[sessionID].send()

如需广播消息，只需要在调用 emit 和 send 方法之前添加 broadcast 标记即可。广播的意思是向除发起广播之外的所有客户端发送消息。
```





