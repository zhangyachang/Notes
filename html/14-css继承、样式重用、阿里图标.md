## css高级应用 阿里图标

## 一、css的继承

​	1.默认继承的有

​		1.color

​		2.font:small-caps italic bold 50px/100px "微软雅黑";

​		3.text-align	

​		4.text-indent

​		5.letter-spacing

​		6.word-spacing

​		7.list-style

​		对于a标签，或者说行级标签而言，他们默认内容撑开宽度，所以text-indent看起来没有效果，但是实际上是继承了的

​		2.a 标签不继承color值，默认是不继承的，可以加上 inherit继承父级 	color：inherit；

```css
color:inherit;
```



## 二、css重用 

​	**一个代码被多次利用，可以通过添加特定的类名来实现**

​	Css重用：在我们开发网站时，有很多代码时一样的，多次使用的，这样会造成代码冗余，因此，我们可以把相同的代码通过添加特定的class来实现，我们只需要在需要这些相同属性的标签上加上相应的class类名即可。

```css
例如：
.fl  {float:left;}
.fr {float:right}
```

## 三、组件化开发 不同的页面，相同的布局

​	网页中不同的模块引入不同的css文件

​		例如：网站顶部导航，网站底部，侧边栏

​		引入外部链接： `<link rel="stylesheet" href="style.css">`(rel 描述了当前页面与href所指定文档的关系)

​		新建css外部样式：文件格式为.css，字符编码： @charset"UTF-8";

​			

## 网站logo.icon

```css
格式<link rel='shortcut icon' type='image/x-icon' href='路径.ico'  />
```



## 阿里图标

```css
<link rel="stylesheet" type="text/css" href="iconfont/iconfont.css">

或者引入链接
<link rel="stylesheet" type="text/css" href="http://at.alicdn.con/t......">
```

使用

```html
<p>
  	<i class="iconfont icon-tianmaopaidui"></i>我的购物车
</p>
```