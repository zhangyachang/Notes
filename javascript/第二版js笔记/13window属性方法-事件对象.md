## window属性和方法



#### 1. window方法

**window.onscroll**

滚动事件

```js
window.onscroll = function(){
	console.log('滚动事件');
};
```



**window.onresize**

窗口大小发生改变



**window.history.back()**

浏览器返回前一条历史记录



**window.history.forward()**

返回后一条历史记录



**window.history.go(1)**

里面必须传参数，0代表当前，1代表下一条 -2代表两条



**window.open**

第一个参数，是打开的 url 地址

第二个参数，选择是否在新窗口打开，默认在新窗口 _blank  _self在当前窗口打开（如果总参数是三个或以上时，第二个参数就是新窗口的name，如果只有俩参数，那就是选择是否在新窗口打开）

第三个参数就是选择打开浏览器窗口的大小尺寸。

```js
document.onclick = function(){
    window.open('http://www.baidu.com','_self');
}
```



**window.close**

关闭当前窗口





#### 2. window属性

**window.location.href = url**

在当前页面进行重定向

```js
window.location
window.location.host 主机名+ 端口号
window.location.hostname 主机名 + 域名

window.location.port 端口号
window.location.search 返回查询部分的信息(地址里面？后面的一串)
```





















