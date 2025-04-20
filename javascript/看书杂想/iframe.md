操作子框架中的link标签

```js
document.sheet
```

操作子框架中的dom元素

操作子文档中的

是否可以操作不同源下的东西

## 不同源的情况下

```js
父页面： 使用postMessage发送需要修改的信息。
子iframe： 监听onmessage 事件，修改自身的样式。
```

```js
如果两个网站都在你的控制之下，还是有可行的方案的。
如果你不能控制iframe，那不行
```

```js
看iframe 是否在你的控制范围，如果是那就可以操作，可以通过postMessage的方式去调用iframe里面的代码
```

## 新窗口打开

主文档

```js
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <link href="http://moonbuy.cn/mall/static/images/favicon.ico" rel="shortcut icon" type="image/x-icon">
</head>
<body>
    <input type="button" id="btn1" value="打开一个窗口">
    <input type="button" id="btn2" value="操作新窗口">
    <script>
        let opener;
        btn1.onclick = function () {
            opener = open('4-iframe4.html');
            console.log(opener);  // 这里的这个opener是新打开窗口的window对象
        }
        btn2.onclick = function () {
            opener.document.body.style.background = 'yellow';
        }
    </script>
</body>
</html>
```

被打开的文档

```js
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <link href="http://moonbuy.cn/mall/static/images/favicon.ico" rel="shortcut icon" type="image/x-icon">
</head>
<body>
    新打开的窗口
    <script>
        document.onclick = function () {
               //-------------这个东西就是谁打开了它的window对象
            opener.document.body.style.background = 'skyblue';  
            close();
        }
    </script>
</body>
</html>
```
