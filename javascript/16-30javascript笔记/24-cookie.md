## cookie

## 一、什么是cookie

1.访问网站的时候，浏览器可以通过cookie把数据存储在电脑上；

2. cookie是一种存储数据的方式，存储在电脑上，只要设定合适存储时间，即使关掉浏览器下次访问也能拿取；

3. 不同浏览器cookie存储位置不一样，不用域名cookie存储文件夹不一样

4. 大部分浏览器需要在服务器环境下才能运用cookie，火狐可以本地访问

## 二、存储/获取cookie

1. 存储cookie

```js
document.cookie = '数据名=值';
document.cookie = 'goudan=666';
```

一次只能存储一个，并且默认是临时存储，当关闭浏览器之后就被清除了。

2. 改变存储时间

```js
document.cookie = '数据名=值; expires=过期时间';
var date = new Date(new Date().getTime()+365*24*60*60*1000).toUTCString();
document.cookie = 'fengyu=666,expires='+date;
```

过期时间必须是一个日期对象转换成的字符串（时间戳.toGMTString()）

3. 获取cookie

当当前网页有cookie时，可以直接通过document.cookie 来找出所有cookie

```js
consol.log( document.cookie );
//打印结果
//lastTime=2018-1-6 18:27:50; xiaoxiaobai=999; jintian=111; fengyu=666
```

要找到对应的数据值，可以使用多种方式，比如正则：**案例**

## cookie的经典用法

```js
<body>
    <p id="lastTime"></p>
    <p id="nowTime"></p>
<script type="text/javascript">
    var oLastTime = document.getElementById("lastTime"),
        oNowTime = document.getElementById("nowTime");

    var last = document.cookie.match(/\blastTime=([^;]+)(;|$)/);

    if(last){//说明不是第一次访问
        oLastTime.innerHTML = '您上次的访问时间是'+last[1];
    }else{
        oLastTime.innerHTML = '您好，您是第一次访问本站';
    }
    console.log(last);

    var date = new Date(),
        YY = date.getFullYear(),
        mm = date.getMonth(),
        dd = date.getDate(),
        h = format(date.getHours()),
        m = format(date.getMinutes()),
        s = format(date.getSeconds());

    var time = YY+'-'+mm+'-'+dd+' '+h +':'+m+':'+s;

    console.log(time);

    document.cookie = 'lastTime='+time+';expires='+new-Date(Date.now()+10*365*24*60*60*1000).toUTCString();

    oNowTime.innerHTML = '本次登录时间'+time;

    function format(n) {
        return n<10?"0"+n:n;
    }
</script>    
</body>    
```

**注意：**

```js
[^1]  取反  不是1
```

## cookie的封装

```js
封装cookie
   setCookie({属性名:值, attr: value},过期时间); //过期时间以年为单位
   getCookie(属性名)
   removeCookie(属性名)

setCookie({
  fengyu : 666
},5)

function setCookie(json,time) {
    var timer = new Date(Date.now()+time*365*24*60*60*1000).toUTCString();
    for(var key in json){
        document.cookie = key+'='+json[key]+';expires='+timer;
    }
}
function getCookie(attr) {
    var arr = document.cookie.match( new RegExp('\\b'+attr+'=([^;]+)(;|$)') );
    return arr?arr[1]:"";
}
function removeCookie(attr) {
    var json = {};
    json[attr] = '';
    setCookie(json,-1);
}
```
