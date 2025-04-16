## img特性

​        支持宽高

​        支持margin

​        横排显示

​        能设置text-align：

​        能设置vertical-align:

​    缺点    

​        标签中间被解析空格

​        不支持margin:auto;

## vertical

​    vertical-align: vertical-align；**可以解决img下方间隙的问题**

​    定义 行内元素 的 基线 相对于该元素所在行的基线的垂直对齐

​        **只针对inline inline-block 图片标签  块级元素不适用**

​    取值  这些值和line-height有关

​        top          元素的顶端与一行中最高元素的顶端对齐

​        middle    此元素放置在父元素的中部

​        bottom    元素的顶端与一行中最低的元素的底端对齐

​            

​    这些值和font-size有关

​        text-top    元素的顶端与父元素的字体顶端对齐

​        text-bottom 元素的底部与父元素字体的底端对齐

​        baseline    默认 父元素放在元素的基线上

## 鼠标样式  cursor

​    规定要鼠标进入元素内容区域要显示的光标的类型

​            cursor:pointer;

​            default       默认

​            default       默认光标（通常是一个箭头）

​            auto           默认。浏览器设置的光标。 

​            pointer      光标呈现为指示链接的指针（一只手） 

​            move         此光标指示某对象可被移动。 

​            text            光标指示文本。

​            wait           光标指示正忙（通常是一只表或沙漏）。

​            help           光标指示帮助（通常是一个问号或一个气球）

​    **cursor:url("hand.cur"), pointer;**

```css
cursor:url("hand.cur"), pointer;
```

​            第一个值:url()定义指针文件路径，此文件必须是cur后缀

​            第二个值：当地一个值出错时的备用类型，第二个值必须写。

​        

## 透明度  opacity

​            解决ie8兼容性问题

​        **filter:alpha(opacity=0~100);**

```css
filter:alpha(opacity=10);
```

​            0完全透明

​            100完全不透明；

## 总结

​        重新认识img图片标签

​            支持text-align margin  不支持margin auto

​            vertical-align

​                **行内元素或者行内块元素垂直对齐的方式**

​            鼠标样式

​            透明度