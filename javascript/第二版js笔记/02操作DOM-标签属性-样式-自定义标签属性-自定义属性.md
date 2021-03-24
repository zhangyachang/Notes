## 操作DOM

#### 1. 通过id获取元素

```js
// 通过id获取元素
document.getElementById( 'box' );
```

在js里面，对象 = 标签 = 节点 = 元素

**独有标签不需要获取，直接拿来用**

```js
body title head 这是独有标签

document.body  document.head

document.title 注意：title获取的时候，不是标签，而是这个标签的innerHTML
```



#### 2. innerHTML和innerText

1. innerHTML 获取/设置 对象标签的内容

   注意：`innerHTML `会解析标签

2. innerText 获取/设置 对象标签内的内容

   注意：跟 `innerHTML`的区别是：`innerText`不会解析标签



#### 3. document.write()

document.write()

向页面当中写入文本，如果全部加载完再写这个，当前的页面都会被清除。

往body后面**追加**内容，如果全部加载完在写这个，当前页面都会被清除（会覆盖body里面所有的内容），这个里面 **可以添加标签**

 ```js
window.onload = function(){
  	document.write("<p>这是我通过js添加的内容</p>")
}
 ```



#### 4. 操作样式

js在修改元素样式的时候，一般修改行内样式

style 驼峰命名

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





## 标签相关

#### 1. 标签属性

对象.属性名 = 值; 

是一个标签里的属性

```js
oBox.title // 得到标签属性里面的值
oBox.title = 'goudan'; // 修改标签属性的
```



**js操作对象的class类名时要注意，需要改写成 className**

```js
/*防止覆盖行内属性*/
oBox.className = 'on'; // 修改class
```



**读取和操作标签属性**

```js
/*读取标签属性*/
/*读取标签属性*/
alert(oBox.title);
alert(oBox.id);
/*操作标签属性*/
oBox.id = '123';
oBox.title = 'aaa';
```



#### 2. 修改对象样式的两种方式

js 里操作的是行内样式

js 里写样式的时候，遇到了复合样式，要使用驼峰命名。

驼峰命名 `background-color` ---> `backgroundColor`

驼峰命名写法就是把第二个及以后单词首字母大写。



1. 对象style样式 = 值

```js
oBox.style.width = "100px";
```



2. 对象.style.cssText = 所有需要修改的属性，正常需要修改的属性，正常写在这里就好。（值是字符串）

```js
oBox.style.cssTxt = 'width: 100px; height:100px;';
```



#### 3. html的读和写

```js
alert(oBox.innerHTML); //读标签的内容  （读） 获取
oBox.innerHTML = '';  //写内容  （写） 赋值
```



#### 4. 获取元素的其他方式

1. 通过class

```js
document.getElementsByClassName('class名字')
```

2. name（这种方式主要是用来针对获取input）

```js
document.getElementsByName('name属性的值');
```

3. TagName (通过标签选择器)

```js
document.getElementsByTagName('标签选择器');
```

4. querySelectorAll (满足所有条件的对象的集合)

```js
document.querySelectorAll('任意css选择器');
```

**注意：以上都是集合，使用需要加下标[];(js里所有的下标都是从0开始的)**

5. querySelector(选择满足条件的第一个)

```js
document.querySelector('任意css选择器');
```

上面这种方式只获取满足条件的第一个对象，不是集合，可以直接使用。



#### 5. 设置css样式的替代方法

在修改css样式的时候，其实修改元素的class应该是最好的。

```js
oBox.className = 'on';
```

使用 `style.cssText` 修改

```js
oBox.style.cssText = "width:100px; height";
oBox.style.cssText = oBox.style.cssText + 'background:red';
oBox.style.cssText += "width:150px; height:240px; background:red;";
```





## 自定义标签属性

#### 自定义标签属性

合法的标签属性

```js
对象.属性名
```

自定义的标签属性不可以通过 对象.属性名 来操作



**获取自定义标签属性**

```js
/*语法规则*/
对象.getAttribute("自定义属性名");

oBox.getAttribute('abc')
```



**设置自定义标签属性**

```js
/*语法规则*/
对象.setAttribute("属性名", "对应的值");

oBox.setAttribute('abc', '设置的值');
```



**删除自定义标签属性**

```js
/*语法规则*/
对象.removeAttribute("自定义属性名");

oBox.removeAttribute('abc');
```



**判断是否存在属性** 还未经过测试，不知道这个方法存在不存在

```js
/*语法规则*/
对象.hasAttribute('自定义属性名');

```





## js自定义属性

对象点一个不合法的东西是自定义属性，只针对于js里面的对象而言

自定义标签属性是针对于标签内的属性



#### 自定义属性的注意

oBox.xxx

1. 合法的标签属性它都会有，不合法的标签属性它是没有的。
2. 不合法的标签属性不能 .    合法的标签属性才可以 .
3. 对象点一个不合法的东西是自定义属性，只针对于js里面的对象而言，自定义标签属性是针对于标签内的属性
4. input里面的checked是一个合法属性， .出来之后会被强制转换成布尔值，如果想要获取可以通过 `getAttribute` 来得到 `checked` 里面的值。
