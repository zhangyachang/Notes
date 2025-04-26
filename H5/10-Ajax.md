---
Ajax
---

#### Ajax

> Asynchronous Javascript And XML（异步 JavaScript 和 XML）是指一种创建交互式网页应用的网页开发技术

**为什么用来学习Ajax？**

因为学习ajax能让客户端跟服务端的交互更优雅。

**学习Ajax有什么好处？**

在没有ajax之前，客户端向服务端发起请求，比如需要提交表单数据，可以使用form表单，但是form表单在提交时，会刷新整个页面，用户的体验极其差！

so：

1. ajax可以局部刷新页面，无需重载整个页面，节约资源。
2. ajax异步加载，无需经历同步等待的无奈。
3. 第三.....  没有第三，上面两点已经足够形容ajax的牛逼之处了。

###### 需要注意的是：

ajax不能跨域，跨域需要服务端进行相应的设置，总之，不是你前端操心的事！

如果需要跨域，前端可以使用jsonp技术

###### 何为异步？

总所周知，javascript是同步的，就是同一时间只能做一件事，而异步则是多个需求可以同时进行，看起来很牛逼。但是异步不一定是好事，是好是坏看需求来，滥用异步，不能处理好事件顺序，会陷入恐怖的无限回调之中。

> ok，扯了这么多，ajax到底难不难？

###### 使用ajax技术：

```js
//ajax的使用极其简单，只有4步：
1.创建ajax对象     xhr = new XMLHttpRequest();
2.建立请求        xhr.open(type,url,boolean)    //type请求方式（Get or post） url(后台接口) bool(是否异步 true是异步，false则同步)
3.发送请求        xhr.send();
4.监听状态码            xhr.onreadystatechange=function(){}
//结束
```

###### 状态码

```js
xhr.readyState
    *        状态码  0 1 2 3 4
    *
    *        0: 请求还没有建立
    *        1：请求建立了，还没有进行发送
    *        2：请求正式发送(xhr.send()执行了)
    *        3：请求接收，同时又一部分数据可以使用了(数据并没有全部处理好)
    *        4：请求已经完全受理
```

###### GET

```js
//GET方式不需要设置请求头，数据是跟在URL?后面，例如：
'url?name=123&age=18&length=18'
```

###### POST

```js
//post需要设置请求头（数据格式）
//发送的数据需要放到send里
xhr.open("post", "url");
//设置请求头
xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
xhr.send(data);
```

###### post请求头的几种常用数据格式

1.`application/x-www-form-urlencoded`

```js
#浏览器的原生 form 表单，如果不设置 enctype属性，那么最终就会默认以 application/x-www-form-urlencoded 方式提交数据。

在POST提交数据中Content-Type 被指定为 application/x-www-form-urlencoded；提交的数据按照 key1=val1&key2=val2 的方式进行编码，key 和 val 都进行了 URL 转码。大部分服务端语言都对这种方式有很好的支持。很多时候，我们用 Ajax 提交数据时，也是使用这种方式。
```

2.`multipart/form-data`

```js
#这也是一个常见的 POST 数据提交的方式。我们使用表单上传文件时，必须让 form 的 enctype 等于这个值。
这种方式一般用来上传文件，各大服务端语言对它也有着良好的支持。上面提到的这两种 POST 数据的方式，都是浏览器原生支持的。
```

3.`application/json`

```js
#用来告诉服务端消息主体是序列化后的 JSON 字符串。
由于 JSON 规范的流行，除了低版本 IE 之外的各大浏览器都原生支持 JSON.stringify，服务端语言也都有处理 JSON 的函数，使用 JSON 不会遇上什么麻烦。
```

4.`text/xml`

```js
#它是一种使用 HTTP 作为传输协议，XML 作为编码方式的远程调用规范
它的使用也很广泛，能很好的支持已有的 XML-RPC 服务。不过，XML 结构还是过于臃肿，一般场景用 JSON 会更灵活方便。
```

##### GET和POST有哪些区别？

1.数据量

```
(1).URL不存在参数上限的问题，HTTP协议规范没有对URL长度进行限制。这个限制是特定的浏览器及服务器对它的限制。IE对URL长度的限制是2083字节(2K+35)。对于其他浏览器，如Netscape、FireFox等，理论上没有长度限制，其限制取决于操作系统的支持。
(2).POST是没有大小限制的，HTTP协议规范也没有进行大小限制，起限制作用的是服务器的处理程序的处理能力。
```

2.获取数据和发送数据

```
GET和POST都可以进行数据的获取和发送。
```

3.安全性

```
其实都不安全
GET的数据可以在url里明文显示出来，
POST的虽然在url里看不到，但是使用一些工具一样能看到，所以都不安全
```

**那么到底使用哪一种方式比较好呢？**

这个以跟后端人员商量的结果为准！

通常，查询或者获取使用`GET`方式，因为GET获取时，通常是有个幂等性(`幂等通常可以理解为多次操作会得到等效结果的情况。或者不同时间的操作对结果不会有影响。)`

而POST无法保证幂等，所以需要修改服务器状态可以使用POST