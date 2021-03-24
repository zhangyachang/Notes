## 一、window属性和方法

window.onscroll 滚动事件

window.onresize  窗口大小发生改变

window.history.back()  返回前一条历史记录

window.history.forward()  返回后一条历史记录

window.history.go( 1 ) //里面必须传参数，0 代表当前，1代表下一条，-2代表前两条

window.open()

第一个参数，是打开的url地址

第二个参数， 选择是否在新窗口打开，默认在新窗口 _blank  _self在当前窗口打开（如果总参数是三个或以上时，第二个参数就是新窗口的name，如果只有俩参数，那就是选择是否在新窗口打开）

第三个参数就是选择心打开的窗口的大小尺寸

```js
document.onclick = function(){
    window.open('http://www.baidu.com','_self');
}
```



\5. window.close()关闭当前窗口

\6. window.location.href = url;  在当前页面进行重定向

window.location

window.location.host   主机名+端口号

window.location.host name 主机名/域名

window.location.port  端口号

window.location.search  返回查询部分的信息（地址里面?后面的一串）

## 二、事件对象

常规下：事件函数的第一个参数就是事件对象

事件对象： 他记录了本次出发本事件的相关的信息

在ie8里不能使用第一个形参来接收这个事件对象

window.event

兼容写法： 在事件函数的顶行  e = e || window.event;

clientX   clientY

鼠标坐标（相对于可视区域）

pageX   pageY

 鼠标坐标（相对于文档顶部）

   不兼容低版本ie ，在ie的兼容是 用 滚动高+clientY

2. 键值

```js
document.onclick = function(e){
    e = e || window.event;
    console.log(e.keyCode);
}
inp.onkeydown = function(e){
    e = e || window.event;
    console.log(e.code);
}
```