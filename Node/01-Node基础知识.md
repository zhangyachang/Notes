## 一些基础的小知识

### 1.运行环境

​    node是构建在chrome v8引擎上的一个javascript运行环境

### 2.node跟chrome有什么区别

​    架构一样，都是基于事件驱动的异步架构

​        浏览器通过事件驱动来服务页面

​        node主要是根据事件驱动来服务I/O

​        node没有html、webkit、和显卡等等UI技术支持

### 3.浏览器中的js和node有什么区别

​    1.全局变量

​    命令行中     `输入node`      `输入this`

​        node全局变量global

​        global全局对象 就像浏览器中的window一样

​    2.作用域

​        一个文件就是一个作用域

```js
global.a = 1
```

​    3.调试 

`console.log()`  只有这一种方法，没有alert， 有一个debugger前端也有，不怎么习惯使用

**global下的方法**

```js
// 全局的方法，经常会使用到的方法
//__当前文件所在的路径
console.log(__filename);
//当前文件的目录
console.log(__dirname);
//node进程的工作目录  什么根目录
console.log(process.cwd());
```

### 4.并行和并发

​    并行： 同时执行

​    并发： 同一个时间段执行

### 5.优势劣势

**I/O密集型** 比如请求一下数据库就返回数据

​    node.js在这方面有天生的优势  实时应用

**CPU密集型** 后端进行10000次运算

​    但是H5又出来一个新的API 多线程
