# Npm

官网 百度 npm  https://www.npmjs.com/

node的包管理器，包也就是模块



## 命令

```js
npm -v // 显示版本
npm -l // 显示支持的命令

npm init // 初始化 package.json文件
npm init -y // 如果需要一路回车 可以加一个 -y

npm intall  // 安装包
npm install webpack -g // -g 代表全局安装 代表整个电脑任何文件夹下面都可以使用这个包
npm install koa --save // 安装一个模块 并且放到package.json文件夹里面
// 需要上线以后还要用的模块 也就是生产环境 那就用--save

npm install koa-router --save-dev // 这个是开发环境下

npm install koa-cors koa-body koa-parser --save // 可以一次安装多个中间用空格隔开
npm i koa-cors -S // 简写
npm i koa -D // 简写 --save-dev
// 指定具体的版本
npm i koa@1.0.0  //可以安装具体的版本
```

上线 / 发布 一个包

```js
npm init // 初始化一个package.json文件，注意入口文件和你的文件地址要对应
// 注册 可以在npm官网进行注册，也可以在命令行中注册
npm adduser
// xiaojiaoya   kiss1508..
npm login //可以登录

npm publish test
删除只能删除半个小时以内的
npm unplblish test -f
```

淘宝镜像

```js
可以搜索npm淘宝镜像
npm install -g cnpm --registry=https://registry.npm.taobao.org
```



搭建一个简单的Koa服务器

```js
const Koa = require('koa');
const app = new Koa(); // 执行这个构造函数 生成实例
app.use(async (ctx)=>{
    ctx.body = '这是后台返回的数据';
});
app.listen(3000);  // 监听端口
```



## node_modules

```js
c/c++文件放在Node项目的src目录下
javascript文件放在lib目录下
前端文件 dist
```
