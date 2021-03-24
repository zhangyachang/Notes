百度的  echarts

highcharts





## SVG

#### 一、 SVG

1. svg的概念

a) Svg是使用XML来绘制二维图形的语言

 

#### 二、Svg是什么

​	a) 由W3C制定的

​	b) 是一个可伸缩的矢量图形

​	c) 是一个非常的严格标记语言

​	d) 标签非常具有主义化

​	e) 可以利用DOM去操作XML

​	f) 只有属性，即可以设置属性，又可以写成css样式

 

#### 三、svg的优势

​	a) 可以利用任何工具修改

​	b) 和jpg,png,gif图形比起来，尺寸更小，压缩性更强

​	c) 不会模糊

​	d) 不支持低版本



#### 四、与canvas的区别

​	a) Canvas有提供js API，svg只有标签上的属性

​	b) Canvas是位图（放大会模糊）,svg是矢量图（不会模糊）

​	c) Canvas没有动画API，svg是提供动画标签

 

#### 五、svg的使用

① svg文件组成

```html
<?xml version="1.1" encoding="utf-8"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"      		"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg xmlns="http://www.w3.org/2000/svg">
   	<circle cx='100' cy='100' r='50' fill='purple'></circle>
</svg> 
```

2.引入svg文件

​	a)图片

​	b)背景

​	c)框架

3.直接写在网页body里面

```html
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
	<circle cx='100' cy='100' r='50' fill='purple'></circle>
</svg>	
```



## 图形绘制

图形的绘制

#### circle 圆形

​	a) cx 圆心坐标x

​	b) cy 圆心坐标y

​	c) r  半径

​	d) fill 填充颜色

​	e) stroke 线颜色 

​	f) stroke-width 线宽 

​	g) style  支持行间样式

 ```html
<circle stroke-width="10" stroke="blue" fill="red" cx="250" cy="250" r="100"></circle>
 ```

#### ellipse 椭圆

​	a) cx椭圆中心x坐标

​	b) cy椭圆中心y坐标

​	c) rx椭圆x轴半径

​	d) ry椭圆y轴半径

```html
<ellipse fill="red" stroke-width="" cx="250" cy="250" rx="50" ry="200"></ellipse>
```

#### rect 矩形

​	a) width 宽

​	b) Height 高

​	c) x轴坐标

​	d) y轴坐标

​	e) rx x轴圆角半径

​	f) ry y轴圆角半径

```html
<rect width="100" height="300" x="0" y="0" rx="60" ry="60"></rect>
//这个圆角半径 我试验了只有一个情况下rx和ry都是他  然后分开写的情况下 就是分开的东西
```

#### line 线条

​	a) x1 x轴起始坐标

​	b) y1 y轴起始坐标

​	c) x2 x轴结束坐标

​	d) y2 y轴结束坐标

​	e) stroke-opacity 边框线透明度

​	f) fill-opacity 填充颜色透明度

​	g) stroke-linecap 定义线条的端点样式 

​	butt默认/round圆形线帽/square正方形线帽 

```html
<line stroke-opacity=".5" stroke-width="6" stroke="blue" x1="100" y1="50" x2="300" y2="150"></line>
```

h) stroke-dasharray 绘制虚线，路径虚线和间隙的格局 

```html
<line stroke-dasharray="5, 5" x1="10" y1="10" x2="190" y2="10" />

<line stroke-dasharray="5, 10" x1="10" y1="30" x2="190" y2="30" />

<line stroke-dasharray="10, 5" x1="10" y1="50" x2="190" y2="50" />

<line stroke-dasharray="5, 1" x1="10" y1="70" x2="190" y2="70" />

<line stroke-dasharray="1, 5" x1="10" y1="90" x2="190" y2="90" />

<line stroke-dasharray="0.9" x1="10" y1="110" x2="190" y2="110" />

<line stroke-dasharray="15, 10, 5" x1="10" y1="130" x2="190" y2="130" />

<line stroke-dasharray="15, 10, 5, 10" x1="10" y1="150" x2="190" y2="150" />

<line stroke-dasharray="15, 10, 5, 10, 15" x1="10" y1="170" x2="190" y2="170" />

<line stroke-dasharray="5, 5, 1, 5" x1="10" y1="190" x2="190" y2="190" />
/*******************************/
这个线条的虚线的方式是那个stroke-dasharry循环的
```



#### polyline 折线

a) points 点坐标 

```js
//<!--有默认填充背景黑色 没有边框线-->  fill="none"来检测一下
<polyline points='100 100 200 200 400 100 100 100' stroke='black' stroke-width='5' fill='none'></polyline>
<polyline points='100,100 200,200 400,100 100,100' stroke='black' stroke-width='5' fill='pink'></polyline>
<polyline points='100,100,200,200,400,100,100,100' stroke='black' stroke-width='5' fill='gray'></polyline>
```



```html
<polyline stroke-width="6" stroke="blue" points="60,210 60,90 100,90 140,140 260,140 290,90 320,90 320,210 60,210"></polyline>
```



#### polygon 多边形

a) points 点坐标 写法同上

```html
<polygon Points="240 48,352 396,58 180,422 180,128 396" Stroke="Red" fill="Blue" fill-rule="evenodd"/>
```

b) fill-rule:evenodd/nonzero  交叉折线闭合 

```html
<polygon fill-rule="evenodd" stroke-width="5" stroke="red" fill="pink"  points="110,280 300,280 180,350 210,200 260,350"></polygon>
```

```html
上面这个是填充规则，只有图像交叉的时候才可以，使用的时候可以看看教程
```



#### g 组合元素

**组合元素 设置公共属性**

```html
<circle cx='50' cy='50' r='90' stroke-width='5' stroke='blue'> </circle>

<circle cx='50' cy='50' r='80' stroke-width='5' stroke='blue'></circle>

<circle cx='50' cy='50' r='50' stroke-width='5' stroke='blue'></circle>
```

设置公共属性

```html
<g cx='50' cy='50' stroke-width='5' stroke='blue' fill='transparent'>
 	<circle r='90'></circle>
    <circle r='80'></circle>
    <circle r='90'></circle>
</g>

```

默认圆心在（0，0）点

c) transform='translate(x,y)' 设置圆心坐标

```html
<g	transform='translate(50,50)' stroke-width='5'	stroke='blue'>
    <circle r='90'></circle>
    <circle r='80'></circle>
    <circle r='90'></circle>
</g>

```



#### text 设置文本

​	a) x x轴坐标

​	b) y y轴坐标

​	c) font-size 文字大小

​	d) text-anchor start/middle/end 对齐方式

​	e) fill 填充

​	f) stroke 触笔颜色 

```html
 <text text-anchor="middle" x="250" y="250" font-size="55" stroke="blue" fill="none"> SVG </text>
```

#### image 图片引入

​	a) x x轴

​	b) y y轴

​	c) width 宽

​	d) height 高

​	e) xlink:href='图片路径'

```html
<image xlink:href="images/bg.jpg" x="0" y="0" width="500" height="500"></image>
```



#### fill:none与fill:transparent的区别

这两个就和 display:none  和opacity:0一样 

 ```html
<circle cursor="pointer" cx="250" cy="250" r="100" fill="none" stroke="red" stroke-width="10"></circle>
<circle cursor="pointer" cx="250" cy="250" r="100" fill="none" stroke="blue" stroke-width="10"></circle>
 ```


