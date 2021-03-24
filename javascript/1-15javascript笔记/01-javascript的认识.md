---
javascript的认识
---



##一、前端三层

结构层：html标签

表现层：css

行为层：js

##二、js代码放置的位置 script的位置

1. js代码写在script标签里面

2. Script的位置是任意的，一般写在body结束标签之前。

## 三、弹窗

var	a = alert( 1 ); 这样返回的的一个值undefined，说明执行完就被回收了。

confirm(); 点击确定返回true（真），点击取消返回false（假）.

prompt(  );  点击确定返回输入框的内容，点击取消返回null（空）。

**console.log**(a); 来返回值

注意：定义变量不赋值（系统会在内部默认赋值undefined）.

## 四、js的注释 单行和多行

单行注释   //

多行注释  /*  */

## 五、通过id获取标签

```js
document.getElementById( 'box' );
```

在js里面， 对象 = 标签 = 节点 = 元素

调试的一种常用方式： console.log(  );

**独有标签不需要获取，直接拿来用**

body  title  head这是独有标签

document.body     document.head 

document.title  注意：title获取的时候，不是标签，而是这个标签的innerHTML

 

## 六、+ 号的问题

当加号两边都是数字的时候，这时加号是数学意义上的加号运算符

当加号两边有其中一边是字符串的时候，就是拼接

注意：被加号引起来的东西，不管是啥，都叫字符串。

```js
1 + 1 + '1'+ '4'；	// 这样的结果是   214；
```

## 七、**innerHTML 和 innerText**

1. innerHTML  获取/设置 对象标签内的内容

注意： innerHTML会解析标签

2.	innerText  获取/设置 对象标签内的内容

注意：跟innerHTML 的区别是：innerText不会解析标签

3. document.write()

   往body后面**追加**内容，如果全部加载完在写这个 当前的页面都会被清除（会覆盖body里面所有的内容），这个里面**可以添加标签**

## 八、等号的问题

​	在js里，遇到等号，要先读等号的右边，右边读完了才进行赋值

​	把等号右边的值赋给左边

## 九、变量

​	变量其实就是起的一个听起来比较高端的东西，

​	使用变量的时候，实际是使用变量的值。

​	变量只用声明一次，再次使用不需要声明，直接使用。

**2.变量的命名规则**

1.注意大小写

2.可以使用： 字母 数字 $  _

3.不能以数字开头

4.通常要求见名知意

**字符串两边的引号，在弹窗/打印console.log的时候，都不会显示出来**

 

**javascript的认识**

​	1.js的作用

​		操作HTML元素

​		响应用户的操作

​		处理发送数据

​	3.不支持javascript的时候  

```js
<noscript>
	您的浏览器不支持javascript!
</noscript>
```



JS里面严格区分大小写

注册点击事件，添加一个反馈机制

​	事件：onclick

​	方法：function(){}

​	代码要有层次

```js
//javascript**在页面当中的不同位置**
window.onload = function(){
	document.getElementById('box').onclick = function(){
	alert("这是我的第一段javascript代码")
	};
}
```

​	一个页面当中只能出现一次

​	页面加载完成后执行，执行代码。包括所有的html，css一堆 图片，所有的文件加载完成	之后他就会触发这个事件

​	当你要找到元素没有加载完成时可以写这个



**改变元素的Html内容**

**innerHTML**		输入内容 可以添加标签

**innerText**		输入文本 

document.write()   向页面当中写入文本， 如果全部加载完在写这个 当前的页面都会被清除，这个里面可以添加标签

 ```js
window.onload = function(){
  	document.write("<p>这是我通过js添加的内容</p>")
}
 ```



**定义变量和简单的this**

定义变量代表的是什么东西被操作的那个东西吧

规则：数字 字母 _ $ 不能以数字开头

 ```js
var goudan = document.getElementById("box");

goudan.onmouseover = function () {
	this.innerHTML = "<p>大家好</p>"
};
goudan.onmouseout = function () {
	this.innerHTML = "";
}
 ```



##十、操作样式

Js在修改元素样式的时候，一般修改行内样式

style	驼峰

 ```js
var goudan = document.getElementById("box");

goudan.onmouseover = function(){
  	this.innerHTML = "<p>大家好</p>";
  	this.style.background = "#000";
};
goudan.onmouseout = function () {
	this.innerHTML = "";
  	this.style.background = "#999";
}
 ```

## 十一、window.onload = 函数；

当页面所有内容执行完成后，才执行。

注意：如果说是在head里引入js文件的时候，为了避免错误，最好放在window.onload里

window.onload与document.write()配合使用，会覆盖body里所有的内容。

一个页面当中只能出现一次

​	页面加载完成后执行，执行代码。包括所有的html，css一堆 图片，所有的文件加载完成	之后他就会触发这个事件

 

## 十二、**事件**

鼠标事件、键盘事件、表单事件、系统事件。

**鼠标事件**

```js
onclick //鼠标点击某个对象
onmouseover/onmouseout  //鼠标移动到某个元素/移开某个元素
onmouseenter/onmouseleave // 移动到某个元素/移开某个元素 区别是不支持冒泡

ondblclick   //鼠标双击某个对象
onmousedown  //某个鼠标按键被按下
onmosuemove  //鼠标被移动
onmouseup    //某个鼠标按键被松开
```

**表单事件 **

```js
onblur  //元素失去焦点
onfocus  //元素获得焦点
onchange  //用户改变域的内容
onresert   //重置按钮被点击
onsubmit   //提交按钮被点击
```

 **键盘事件 **

```js
onkeydown  	//某个键盘得兼被按下
onkeypress  //某个键盘的键被按下或按住
onkeyup  	//某个键盘的键松开
```

**系统事件 **

```js
onload  //某个页面或图像被完成加载
onresize  //窗口或框架被调整尺寸
onselect  //文本被选定
onerror		//当加载文档或图像时发生某个错误
```



**事件注册**

对象.事件 = 函数

## 十三、函数 / 方法

底层给用户提供的方法，就叫做API

**function ( ) { }**

作用，就是把一堆代码包起来。其实也就是我们常说的封装。

函数分为两种：	有名函数，就是说这个函数是有名字的。function fn(){};

 					匿名/无名函数，就说没有名字的函数。function(){};

注意：匿名函数不能一个人孤独的呆着。

​	      匿名函数必须要一个变量来接收，或者作为事件函数。

```js
var oBox = document.getElementById("box");
oBox.onclick = function(){
  	alert( 11 );
};
```

有名函数的执行：函数名(); 函数名加括号也叫做函数的自执行。

有名函数作为事件函数时，不需要加加括号。

```js
var oBox = document.getElementById("box");
function goudan(){
  	alert(1);
};
goudan();  //函数后面加括号代表自执行
oBox.onclick = goudan;
```

**在js里，只有函数可以加括号。**

**所有加括号的东西，都是函数。**

## 十四、**函数里面的this**

并不是只有事件函数才有this。而是所有的函数都有this关键字。

这个this关键字的指向是看函数的执行方式来判断的：

 

1. 当函数是自执行的函数，函数内部this，指向window。
2. **当函数作为事件函数时，事件函数内部的this指向---事件对象**



## 十五、关键字、保留字

 关键字：js里，已经存在的，有特殊意义的单词。   

```js
var var = 1;
alert(var)
```

保留字：现在没有特殊意义，但是留着以后可能会使用的单词。

class 在es5里面没有特殊意义，但是在es6使用了这个单词，所以在es5里 class 是保留字。