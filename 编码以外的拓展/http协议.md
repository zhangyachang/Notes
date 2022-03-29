再去重新看看计算机网路那本书

# HTTP

输入网址，页面显示到浏览器之间经历了什么？

+ 查找 域名对应的ip（web服务器电脑公网ip） DNS解析

  1.在浏览器中查找   谷歌浏览器下输入  chrome://net-internals 可以查看到

  2.在系统文件中查找  

  ```js
  1. 	文件地址 C:\Windows\System32\drivers\etc   hosts这个文件 
  	不行的话在修改一下文件权限
  2. 	直接在后面添加上  注意域名后面不要加空格
  	39.107.65.250   abcdefg.com
  3. 刷新缓存
  	命令行下  ipconfig /flushdns
  在页面中输入网址就会映射到那个服务器地址了
  ```

  3.在路由器里查找

  4.到运营商查找（电信等等）

  5.根（保存所有ip对应关系的服务器）

+ ip找到了之后 连接对应的web服务器 （tcp/ip协议）

+ 已经连接到服务器，服务器去处理请求

+ 返回给浏览器





实际中需要

​	定位bug

​	能清楚的知道是前端的问题，还是后端的问题

##一. url的组成

```js
http://user:pass @ baidu.com : 80    /article/2   ?query=string&name=aa   #hash
用户名:密码          域名       端口号   路径/文件        查询字符串              哈希值
	-
	-
这个是需要服务器来设置的

http	默认端口号 80
https	默认端口号443
```



## 二. http的版本和区别

#### 1. http1.1

```js
有四个版本呢
http0.9 (淘汰) 1990
http1.0 (淘汰) 1996

下面两个有一个很大的不同的地方，百分之99的都可看出来
http1.1 (99.9%可能是 http开头的)  
	1997 加了一个长连接
    还必须等一个网站链接5分钟 这个是后台服务器设置的 
    可以在网址的network里面的Timing里面去查看 等待一个网址打开5分钟以上后 打开两次的花费的时间
    只要连接过一次 下次再次链接的时候直接发送请求
    一个连接只能请求一个文件 同时请求的次数有限制的
```



#### 2.https  2.0

```js
http2.0 (https开头的 99%的可能是这个版本) 
	不是绝对的 需要看服务器配置
	一个连接里可以同时请求很多个文件 
    头信息共享
    	request headers里面
		只要前面是带 ： 的都是
    
    看那个network里面的横线   https的是一个横线的  不是绝对的
    可以看到那个证书

// 可以查看一个这个demo 查看那个限制连接数量的效果
https://http2.akamai.com/demo

这个东西可以在谷歌浏览器的network里面的protocol里面查看


```

http +  TLS（加密证书吗） = https

​	      SSL 

```js
http 

https就相当于在发送的过程中 理解为 加了一个保险箱/一个管道， 发送过去之后 然后解密
	比人想要获取我们发送的东西，就必须要破解这个保险箱 / 管道
https://www.baidu.com
https会去一个证书服务器去验证，是不是有效的 必须是品牌的才可以

可以去阿里云点点 有免费的
用nginx去进行配置
```



前端性能优化

​	1.减少http请求（文件合并 雪碧图）

​	2.gzip  应该是 nginx 阿帕奇 做的

​	3.缓存



## 三. 无状态的

​	http是无状态的，每一次请求都不知道上一次发送了什么东西

```js
手抓饼
我： 老板来个手抓饼
我： 加个鸡蛋
我： 加辣椒
最终得到 1个手抓饼 1个鸡蛋 1个辣椒
```

​	cookie    session     token

```js
使用 cookie发送http请求
我： 老板来个手抓饼
我： 加个鸡蛋，我是刚才来买手抓饼的
我： 加个辣椒，我是刚才买手抓饼加鸡蛋的
最终得到 一个加辣椒 加鸡蛋的手抓饼
```

### 保存状态的几种方式

#### 1. cookie

​	cookie是  **保存在浏览器里面的**

​	每次发送请求（ajax   直接在网址栏输入网址访问）都会把已经保存的cookie一起发送给后台

#### 2. session

​	session是 **保存在后台的**，发送一个cookie给浏览器（相当于身份证 用来证明你是谁）

​	每次发送请求 也会把 cookie 发送过去 然后后台会拿着 cookie 去找对应的session 对比

​	（session可以是在数据库  在文件  在内存中的 是自己去做的吧应该是）

#### 3. token

​	token是后台生成的一段字符串 ^#%234243jsdfjkjkjk

​	前端需要发送ajax请求 来请求这段字符串 保存到变量中

​	前端每次请求都需要把这段字符串带上



## 四.http 头信息

​	可以多去谷歌浏览器的network里面多去看看

​	主体内容

​	response

### 1.General



#### 1. Request URL 请求的地址

#### 2. Request Method 请求方式

```html
get 
post
put
delete
options 检查跨域 （axios插件）
```

#### 3. Status Code 状态码

```js
200 成功

301  
302 重定向 可以去network里面去查看一下  3
	302 然后去response里面可以看到 location后面的重定向地址
上面两个都是重定向  301是永久重定向（买房）
				 302是临时重定向（租房）
	区分出来两个是因为seo

304 缓存

403 代表的是没有权限 （服务器上面的资源 html js css没有访问权限）
404 资源不存在
413 数据太庞大
415 后台没有处理这种格式 前台发送的格式是否错误

500 服务器错误
```

#### 4. Remote Address ip地址

```js
ip 地址 0.0.0.0 - 255.255.255.255 组成的

公网ip  游乐场公共场所

除了下面这些还有一些特殊的 都是公网ip
内网ip 自己家的后花园 
	三个地址段
	10.0.0.0 - 10.255.255.255
	172.16.0.0 - 172.31.255.255 
	192.168.0.0 - 192.168.255.255  （公司 家里）

	127.0.0.1 本机地址

ipv4
ipv6 第四个版本 第六个版本
```



### 2. Response Headers

​	res代表的是响应头信息    服务器

​	响应信息绝大部分是由阿帕奇或nginx自动设置

​	set-Cookie是服务器后台设置

​	X开头的 自定义的



#### Catch-Control

```js
1. private 是给指定的用户进行缓存 后台服务器   max-age = "有一个过期时间 过了多长时间才会去重新获取单位是秒"
2. public 是给任意提供缓存
3. no-cache 缓存前必须确认有效性 浏览器关系

etag 代表一个标识，用来标识文件是否被修改
	修改了一个文件之后 etag ： 每次修改之后
	强etag  不管多么细微的改变值都会发生变化
	弱etag   前面有 W/       
        只有发生根本性的改变 这个东西都会去变动 
        自己强制刷新的话会刷新到的
```

#### Connection: 

```js
Keep-Alive
再去查查资料吧
长连接 先建立链接 
	每一次去请求的时候，只要没有超过他规定的关闭时间之前 这个链接都是可以重复去使用的 
就好像打电话 
	先拨号 建立连接
    中途离开了，电话没有挂，过了一会再回来继续说
服务器默认的是5分钟
```

#### Content-Encoding: 

```js
gzip 压缩
deflate 
br
编码格式 告诉浏览器我是按照什么样的格式去发送过来的
```

#### Content-Type

```js
发送过来的文件的格式
浏览器解析文件是根据这里来解析的
text/html
image/gif
image/png ....
```

#### Date 

```js
new Date("Thu, 20 Dec 2018 09:20:13 GMT").toLocaleString()
// 这个时间是服务器发送到浏览器的时间
```

#### Server 

```js
代表的是服务器用的是什么软件
BWS1.1
nginx  可以去注释掉那个版本 系统
```

#### Vary: 

```js
缓存服务器的一些信息
Accept-Encoding
```

#### X-Ua-Compatible: 

```js
html的 meta里面也有这个
IE=Edge,chrome=1

X-Ua-Compatible: IE=Edge,chrome=1 以edege chrome进行渲染？
```

X-ss-protection 开启浏览器自带的xss攻击

#### setCookie

```js
后台可以设置前端是否可以修改这个cookie   httpOnly

```



### 3.Request Headers

```js
Accept
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8
  表明自己可以接受哪些数据格式

Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9,en;q=0.8,und;q=0.7
Cache-Control: max-age=0
Connection: keep-alive
Host: www.baidu.com
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36
```

#### cookie

```js
Cookie: connect.sid=s%3A4wfxM0-tjxxkmn_a12oq8aZ-US0jQG7x.%2B1%2FV836xeZquzNlS7Jh4wF9gchfjDPYvQs2DjfOPp1Q
只要请求头信息里面有cookie 就可以拿到cookie  
```



## 五、TCP / IP

计算机想要与网络设备进行通讯一些规则 协议



各种协议的总称叫做 TCP IP



4层

应用层    当要通讯的时候使用什么样的协议 http ftp

传输层    tcp udp

```js
TCP三次握手  确保连接的可靠性

客户端 带有一个syn标识的请求

				服务端会 回复一个带有syn/ack标识的信息

ack标识数据

udp 尽最大努力传输  不可靠传输
```

网络层  系统决定 通过怎么样的路径到达对方计算机

链路层： 硬件部分



mac地址 （物理地址）

arp协议 广播

```js
比如说去游乐场逛商场分散了， 然后就可以用广播 
```



ip协议

```js
把数据发送给对方
```

ip地址