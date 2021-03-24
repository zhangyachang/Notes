---
ajax jsonp用法
---



## ajax大概

 **ajax:**

 请求、发送数据

可以在不影响web应用程序人同，能做到更新部分网页内容数据
跨域简单的理解就是从一个域名访问另一个域名，出于安全考虑，浏览器不允许这么做

**ajax跨域:**
   【前端解决不了,后端解决】

​	1    通过ajax发送一个url或数据，服务端接收到url或数据并去访问。把获取到的数据再返回到前端页面
​	2  利用jsonp解决

**GET和POST区别：**

GET:

​	更常用，更方便，性能好，明文发送数据，没有POST安全
​	传输数据大小有限制

**POST:**

​	使用率相对较少，性能没有GET高，安全比GET稍微好一点

​	没有传输数据大小限制

**GET和POST**

​	根据是实际情况而定 ，接口允许用哪个就用哪个
​	如果都允许，首先GET
​	当遇到一个敏感数据或私密信息，那肯定是POST

**ajax不能在中文路径下运行**

​	要服务器环境运行
​	如果没有本地服务器的，建议用xampp服务器
​	不会运行失败，省心
​	是英文，不需要过多的操作
​	一台电脑上集成服务器只需要安装一个就可，千万不要安装多个，否则会出现端口冲突


## a标签的下载

直接写在行内的文本和图片好像是直接打开的

```html
<a href="http://baidu.com">百度</a>
<a href="other/1.js">下载本地js</a>
<a href="other/fh.png">下载本地图片</a>
```

一些文件可以下载,href里面是路径

```html
<a href="images/9.rar">下载压缩文件</a>
```

**js ** 中的下载

```js
点击下载
oBox.onclick = function(){
  	var a = document.createElement("a");
  	a.href = "images/4.jpg";
  	a.download = "自己取下载文件的名字";
  	a.click();
}
```

## ajax用法

##### 一、get

```js
1.创建ajax对象    var xhr = new XMLHttpRequest();
//xhr.open("get","files/1.php",true);
//xhr.open("get","files/1.txt",true);
//xhr.open("get","js/1.js",true);
//xhr.open("get","files/books.xml",true);
2.建立请求		xhr.open(type,url,boolean)	//type请求方式（Get or post） url(后台接口) bool(是否异步 true是异步，false则同步)
3.发送请求    xhr.send();
xhr.onload = function(){}  //这种也行
4.监听状态码   xhr.onreadystatechange = function () {
	if(xhr.readyState === 4 && xhr.status === 200){
		console.log("请求成功");
		console.log(this.responseText);
        /!*var data = JSON.parse(this.responseText);
		console.log(data.name);
		console.log(data.age,data.sex);
	}
}
```

回来的数据 有好多种比如说 `xhr.response`  `xhr.responseText`  `xhr.responseXML`

**一个发送用户名密码名字的例子**

```js
<body>
    用户名：<input type="text" placeholder="user"><br>
    年龄：<input type="text" placeholder="age"><br>
    性别：<input type="text" placeholder="sex"><br>
    <button>发送</button>

    <script>
        var input = document.getElementsByTagName("input"),
            btn = document.getElementsByTagName("button")[0];

        btn.onclick=function () {
            var user = input[0].value,
                age = input[1].value,
                sex = input[2].value;

            var data = "?user="+user + "&age="+age+"&sex="+sex
            var xhr = new XMLHttpRequest();
                xhr.open("get","2.php"+data)
                xhr.send();
                xhr.onreadystatechange=function () {
                    if(this.readyState===4){
                        if(this.status>=200&&this.status<=301){
                            console.log(this.responseText)
                        }else{
                            alert(this.status)
                        }
                    }
                }
        }
    </script>
</body>
```

**php后台处理 **

```php
<?php
	header("content-type:text/html;charset='utf-8'");

	$user = $_POST["name"];
	$age = $_POST["age"];
	$sex = $_POST["sex"];
	//echo "您输入的用户名：".$user."; 您输入的年龄：".$age."; 您输入的性别是：".$sex;

	echo "456789";
?>
```

##### 二、post

**几乎和get一样 只是需要设置一下请求头**

```js
btn.onclick=function () {   
	var user = input[0].value,
        age = input[1].value,
        sex = input[2].value;
    var data = "user="+user+"&age="+age+"&sex="+sex;

    var xhr = new XMLHttpRequest();
        xhr.open("post","1.php")
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        xhr.send(data)
        xhr.onreadystatechange=function () {
            if(this.readyState===4){
                if(this.status>=200&&this.status<=301){
                    console.log(this.responseText)
                }else{
                    alert("错误代码："+this.status)
                }
            }
        }
}
```
##### 三、发送json数据

```js
var json = {
    "name":"稀饭菌",
    "age":16,
    "sex":"woman"
}
var data = "";
for (var i in json){
    data += i+"="+json[i] +"&"
}
```



## JSONP

我认为jsonp其实就是将这种数据发送到后台

```js
var oScript = document.createElement('script');
oScript.src = 'http://tanzhouweb.com/php.php?jsonp=getData';
document.body.appendChild(oScript);

function getData(data){
  	//在这里处理数据
}
```

问号后面的jsonp就是后台接受的东西，然后getData是js中的函数名，也就是回调函数了吧

**体会 **

```js
这里面的src其他的都是数据
"http://www.baidu.com?数据=数据&数据=数据&数据=数据&回调函数=js函数名";
```

**在后台这样处理**

```php
<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/02/02
 * Time: 22:06:08
 */
header('Content-Type:text/html;charset=utf-8');
header('Access-Control-Allow-Origin:*');  

$val = $_GET['jsonp'];
$arr = array(
  "name" => "森森",
  "age" => 18
);
echo $val."(".json_encode($arr).")";
?>
```

**这里也就是返回了一个那个回调函数自执行了吧 然后数据在括号里面传进来**

`Access-Control-Allow-Origin:*` 这个是接收所有的访问

跨域其实也就是后端可以解决吧

## xhr的MP3

在网页中播放音乐

1.在html中,audio标签

```html
<audio src="steam/jnStylePsy.mp3" controls></audio>
```

2.但是很多时候不是通过标签形式播放音乐，而是通过js

```js
//  file blob base64 document domString
var xhr = new XMLHttpRequest();
// web Audio api 固定类型 arrayBuffer
xhr.responseType = 'arraybuffer';
xhr.onload = function () {
    if( xhr.readyState == 4 && xhr.status == 200 ){
        // 其实也是利用标签播放音频
        ~function () {
            //console.log( xhr.response ) 元始数据
            var buffer = xhr.response;
            var blob = new Blob([buffer],{type:'audio/mpeg'});
           	指向内存地址
            var url = window.URL.createObjectURL(blob); 
            var audio = document.createElement('audio');
            audio.src = url;
            audio.controls = 'controls';
            audio.volume = 0.05;
            //document.body.appendChild(audio);
            audio.play();
        };
    }
}
xhr.open('POST','./steam/jnStylePsy.mp3',true);
xhr.send();
```

3.处理数据还有一种方法

```js
 // 利用音频节点播放音乐 采样 比特率 。。。
var aCxt = new AudioContext(); // 创建音频对象，此对象有很多方法
aCxt.decodeAudioData(xhr.response,function (buffer) {
  console.log( buffer );
  var sourceNode = aCxt.createBufferSource();
  sourceNode.buffer = buffer;
  sourceNode.connect(aCxt.destination); // 扬声器 -> 耳机
  //sourceNode.start(0);

},function () {

});
```



## 封装ajax

```js
<script>
    /*
    *   参数：
    *       type ： string类型   请求的方式     默认get
    *       url ： string类型    接口           必填
    *       aysn： boolean类型   是否异步       默认异步
    *       data： json          发送的数据     可选
    *       success:  function   成功回调函数     可选
    *       error：   function   失败回调函数    可选
    * */

    ajax({
        type:"post",
        url:"1.php",
        aysn:true,
        data:{
            user : "dCup",
            age:20
        },
        success:function (msg) {
            console.log(msg)
        },
        error:function (msg) {
            console.log("错误代码："+msg)
        }
    })

    function ajax(obj) {
        var type = obj.type||"GET",
            url = obj.url,
            aysn = obj.aysn!==false,
            data = obj.data,
            success = obj.success,
            error = obj.error;
        //确实是否有数据，有就处理，没有则过
        if(data){
            data = (function () {
                var str = "";
                for (var key in data){
                    str += key + "=" + data[key] + "&"
                }
                return str;
            })()
        }
        //解决缓存问题   // "get"
        if(/get/i.test(type)){
            url+= "?"+ (data||"") + "t_="+ Date.now(); // ?t_=12315646597
        }

        var xhr = new XMLHttpRequest();
            xhr.open(type,url,aysn)
            xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            xhr.send(data||null)
            xhr.onreadystatechange=function () {
                if(xhr.readyState===4){
                    if(xhr.status>=200&&xhr.status<300||xhr.status===304){
                        success && success(xhr.responseText)
                    }else{
                        error && error(xhr.status)
                    }
                }
            }
    }

</script>
```



**注意点 **

当使用正则判断的时候

```js
//使用test方式，慎用g标识符。
var str = "get"; 
var reg = /GET/ig;
console.log(reg.test(str))  //true
console.log(reg.test(str))	//false
```

当没有g的时候

```js
var str = "get"; 
var reg = /GET/ig;
console.log(reg.test(str))  //true
console.log(reg.test(str))	//true
```

