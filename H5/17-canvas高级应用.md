火狐上面有一个截图的功能 ，可以截取设计图，在设置里面有

平铺的时候怎么看着颜色有点不一样啊。

那个canvas绘制视频的可以在看一看

#### 绘制img/video

图片预加载，获取图片文件，顾名思义，WEB中的预加载就是在网页全部加载之前，对一些主要内容进行加载，以提供给用户更好的体验，减少等待的时间。否则，如果一个页面的内容过于庞大，没有使用预加载技术的页面就会长时间的展现为一片空白，直到所有内容加载完毕。 

var img = new  Image()

img.onload = fn

drawImage(img,x,y,w,h)

绘制图片(img,从img图片的x点开始绘制,从img图片的y点开始绘制,绘制的img宽度,绘制的img高度,绘制在画布的x点,绘制在画布的y点，绘制的图形宽度，绘制的图形高度)

```js
img
sx 可选。开始剪切的x坐标位置
sy 可选。开始剪切的y坐标位置
swidth 可选。被剪切图像的宽度。
sheight 可选。 被剪切图像的高度
x  在画布上放置图像的x坐标位置
y 在画布上放置图像的y坐标位置
width 可选。要使用的图像的宽度。(伸展或缩小图像)
height 要使用的图像的高度    (伸展或缩小图像)
//总结一下上面的参数 
//前面四个 是剪切图像的位置 宽高  后面四个 是放置的位置 宽高
```

设置填充背景

#### createPattern(img,平铺方式)

​    平铺方式:repeat,repeat-x,repeat-y,no-repeat

颜色渐变

线性渐变:createLinearGradient(x1,y1,x2,y2)

​    x1,y1起始坐标点

​    x2,y2结束坐标点

径向渐变:createRadialGradient(x1,y1,r1,x2,y2,r2)

​    x1,y1,r1内圆坐标及半径

​    x2,y2,r2外圆坐标及半径

addColorStop(位置,颜色)

​    位置:渐变点  0-1之间 可多个

```js
var color = cxt.createLinearGradient(0,0,100,100);
color.addColorStop(0,'red');//起止位置
color.addColorStop(0.5,'green');
color.addColorStop(1,'blue');
cxt.fillStyle = color;
```

绘制曲线

arcTo(x1,y1,x2,y2,r)

​    x1,y1坐标一  x2,y2坐标二   r圆弧半径     

```js
cxt.moveTo(150,200);
cxt.arcTo(150,110,200,110,50);
cxt.stroke();
```

quadraticCurveTo(dx,dy,x1,y1)

​    贝塞尔曲线:dx,dy控制点  x1,y1结束坐标

bezierCurveTo(dx1,dy1,dx2,dy2,x1,y1)

​    贝塞尔曲线:dx1,dy1 控制点一 dx2,dy2控制点二 x1,y1结束坐标

绘制文本属性

​    strokeText(文本,x,y)      绘制空心文本

​    fillText(文本,x,y)        绘制实心文本

​    font = "font-size  font-family"     注:尺寸 字体缺一不可

​    textAlign = ""            文本左右对齐方式 

​        start center end  left right

​    textBaseline            文本上下对齐方式 

​        alphabetic            默认。文本基线是普通的字母基线

​        top                    文本基线是 em 方框的顶端

​        hanging                文本基线是悬挂基线

​        middle                文本基线是 em 方框的正中

​        ideographic            文本基线是表意基线。

​        bottom                文本基线是 em 方框的底端。

​    measureText    (文本).width 文本实际宽度(只有宽度值)

阴影属性

​    shadowOffsetX,shadowOffsetY    x轴、y轴偏移

​    shadowBlur        阴影模糊度

​    shadowColor      阴影颜色

​    默认颜色:rgba(0,0,0,0)

像素操作

​    createImageData(sx,sy)

​        创建新的、空白的 ImageData 对象

​    getImageData(x1,y1,w,h)

​        返回 ImageData 对象，该对象为画布上指定的矩形复制像素数据    putImageData(img,x2,y2)

​        把图像数据（从指定的 ImageData 对象）放回画布上

合成

​    globalAlpha      设置或返回绘图的当前 alpha 或透明值

​    globalCompositeOperation 设置或返回新图像如何绘制到已有的图像上

```js
//目标是已经有的   源图像是新加的
source-over      默认。在目标图像上显示源图像。  
source-atop      在目标图像顶部显示源图像。源图像位于//目标图像之外的部分是不可见的。
source-in        在目标图像中显示源图像。只有目标图像内的源图像部分会显示，目标图像是透明的。
source-out       在目标图像之外显示源图像。/*只会显示目标图像之外源图像部分，*/目标图像是透明的。

destination-over    在源图像上方显示目标图像。

destination-atop    在源图像顶部显示目标图像。//源图像之外的目标图像部分不会被显示。

destination-in      在源图像中显示目标图像。/*只有源图像内的目标图像部分会被显示，*/源图像是透明的。

destination-out     在源图像外显示目标图像。/*只有源图像外的目标图像部分会被显示，*/源图像是透明的。

/*****************************/
lighter             显示源图像 + 目标图像。

copy                显示源图像。忽略目标图像。

xor                 使用异或操作对源图像与目标图像进行组合。
```

​    

将画布导出为图片

​    火狐、谷歌浏览器右键菜单可直接导出为图片

​    canvas.toDataURL()        默认导出data:png;base64编码的二进制URL

​    canvas.toDataURL('image/jpeg')        导出data:jpg;base64编码的二进制URL

```js
//console.log(c.toDataURL()); //toDataURL要在服务器环境下运行
//console.log(c.toDataURL('image/jpeg'));

var a = document.createElement('a');
a.href = c.toDataURL('image/jpeg');
a.download = '照片';
a.click();
```
