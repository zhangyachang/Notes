---
canvas
---

display默认是什么？  inline

canvas绘制的时候边框会出现2px宽度的原理是什么？如何理解的？

```js
在绘制的过程中，canvas会在选定的那一个像素开始，向两边扩展，如果不足1px会填充上。
比如在10px开始，就会在10px两边分别扩展0.5，然后不足1px填充完，就会成为2px了
```

**也就是说的从中间开始绘制**

## canvas

宽度和高度问题？

​    默认的宽高是 300 * 150，如果在样式里面改变就会放大实际宽度/300 * 绘制宽度，改变的时候**宽高是一个属性**

#### 认识

**序言**

​     在渲染复杂的动效、把数据可视化图形显示、游戏场景等需求，都会用canvas技术，比dom操作性能更高

 **特点**

​    H5新增的图形标签，通过提供的JavaScript函数绘制各种图表或利用算法实际非常华丽的动效

​     在以前是用Flash技术实现，但不能和JS交互

​     适合动态图形绘制

 **缺点**

     是位图，缩放会模糊

API

环境 目前只有2d绘制

getContext('2d')     创建2D绘制环境 

#### 绘制矩形

rect(x,y,w,h)        绘制矩形

fillRect(x,y,w,h)    绘制填充实心矩形

strokeRect(x,y,w,h)  绘制空心矩形

clearRect(x,y,w,h)   清除矩形选区

#### 绘制方式

stroke( )        以边框线的方式绘制图形，默认填充黑色

fill( )               以填充的方式绘制图形，默认填充黑色

 **注意 后面的优先级高，后面覆盖前面**

#### 绘制样式属性

fillStyle                填充颜色

strokeStyle         触笔颜色

lineWidth            触笔粗细(线宽)

#### 绘制线条

moveTo(x,y)         从 x,y 开始绘制

lineTo(x,y)             绘制到 x,y

#### 图形路径

beginPath()             开始路径

closePath()             结束路径

```js
闭合路径和最后一条线画到开始路径不同
画布上有很多路径 很难找到起始点，这时有闭合路径
在应用过程中养成习惯， 在写任何路径的时候最好都带上开始路径，beginPath，防止路径与路径之间的影响
```

**路径与路径之间会有影响**

图形边界样式属性

lineJoin             边界连接点样式

​        miter(默认值)

​        round(圆角)

​        bevel(斜角)

lineCap             端点样式

​        butt(默认值)

​        round(圆角)

​        square(高度多出线宽一半)

```js
cxt.beginPath();
cxt.lineCap = 'round';
cxt.lineCap = 'square';
```

**注意点 lineCap 图形本身变高 两端高出自身宽度的一半**

小例子

```js
var c = document.querySelector('canvas');
var cxt = c.getContext('2d');

cxt.beginPath();
cxt.lineWidth = 6;
cxt.moveTo(100,100);
cxt.lineTo(150,150);
cxt.lineTo(300,100);
//cxt.lineTo(100,100);
cxt.closePath();
cxt.stroke();

cxt.beginPath();
cxt.arc( 250,250,50,0,270*Math.PI/180 );
cxt.stroke();
```
