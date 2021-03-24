1.  Src具有跨域请求的能力

Jsonp 是一种非正式协议，就是script标签的src属性去拿别人服务器上的数据。

拿到的是js代码。

搜索的例子

2. encodeURI（）

```js
coonsole.log(encodeURI('  '));
```



## JSONP

其实jsonp其实就是将这种数据发送到后台

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
  "name" => "名字",
  "age" => 20
);
echo $val."(".json_encode($arr).")";
?>
```

**这里也就是返回了一个那个回调函数自执行了吧 然后数据在括号里面传进来**

`Access-Control-Allow-Origin:*` 这个是接收所有的访问

跨域其实也就是后端可以解决吧