---
transform变换
---

### 一、transform

​    transform能够做出非常华丽的3D特效

​    性能好，在pc端或移动端云改变一个元素的位置，以前用left top做动画，会出现卡顿现象

​    移动端 轮播图 上下滑屏操作 都是此属性，能够开启硬件,没有人用left top做动画

​    很多东西，是用js的思想，但是具体的运用还是用H5的技术

​    2D变换： 平面的效果

​    3D变换： 人所生存的空间，体验更好，一个元素看起来有3D空间感的，是因为使用了特殊的布局方式，才能呈现3D效果。

##### translate(位移)

​    位移 translate(0)    默认X轴 0

​    **注意：18年7月多份面试问到**

```html
这个位移如果是百分比那么它会按照谁来算啊？
 按照父级吧！！！
他说我学的不扎实。。 这个百分比是按照自身来计算的
会以本身的长宽做参考，d q
比如，本身的长为100px，高为50px. 那填(50%,50%) 就是向右50px，向下移动25px，添加负号就是向着相反的方向移动d
```

**用法**

```css
transform: translateX(100px); /*距离x位移100px*/
transform: translateY(100px); /*距离y位移100px*/
transform: translateZ(200px); /*距离z  需要3d环境*/
//复合属性
transform: translate(100px,200px);  /*距离x100 距离y200*/
transform: translate(100px,200px) translateZ(200px); /*距离x100 y200  z200*/
translate3D(x,y,z);  /*距离x y z*/
```

```css
开启硬件加速
    利用设备的GPU去计算性能， 去渲染图形界面
    translateZ(0px) 开启硬件，提升用户体验
    基本上所有的网站都用transform位移
```

问题 这三个同时写会启用硬件加速，还是必须写上translateZ才会开启呢，复合属性会开启还是 只有分开写才会开启啊

**注意事项**

位移和定位的区别？

定位：不占文档流的位置

位移：占文档流的位置，不改变文档流的大小

```css
transform:translateX(200px) translateY(-250px);
/*这种写法  先X轴位移200px 后Y轴位移-250px*/
transform:translate(200px, -250px);
/*这种方法是同时进行的*/
```

##### rotate(旋转)

单位 1.单位 度数(deg) 2.圈(turn)

用法

```css
transform: rotate(180deg); /*默认值 绕Z轴旋转*/
transform: rotateX()      /*绕X轴旋转*/
transform: rotateY()      /*绕Y轴逆时针旋转*/
transform: rotateZ()      /*绕Z轴旋转*/
transform: rotate(90deg,90deg); /********语法错误*/
transform: rotate3d(0,0,1,90deg);  /*绕z轴旋转90度*/
transform: rotateX() rotateY() rotateZ();
```

**鼠标移动上去移动开都有过渡时间**

**放到hover上面 只有移动上去有过渡时间**

##### scale (缩放)

​    一个值，既代表X轴也代表Y轴

​    两个值，第一个值代表X轴，第二个值代表Y轴，逗号 隔开

```css
transform: scale(.2);  /*长度和宽度都缩放到原来的0.2*/
transform: scale(.1,.5);  /*长度0.1 宽度.5*/
transform: scale3d(1,1,1); 
```

```css
/*scale初步运用*/
div{
      width:100px; height:100px; background:red; 
      animation:move 3s;
}
@-webkit-keyframes move {
  25%{transform: scale(1.2);}
  50%{transform: scale(1.5);}
  75%{transform: scale(1.2);}
}
```

##### skew(倾斜)

用法

```css
transform: skew(30deg); /*代表X轴方向*/
transform: skewX(30deg); /*代表X轴方向*/
transform: skewY(30deg); /*代表Y轴方向*/
transform: skew(30deg,30deg); /*第一个值代表x轴方向，第二个值代表y轴方向，逗号隔开*/
/*注意复合属性和 那种分开写的是不同的*/
```

##### transform-origin(旋转基点)

说明： 变换的基点(参考点)

默认的基点： 绝对的中心

该属性提供两个参考值；

如果设置两个，第一个为X轴，第二个为Y轴(两值以空格隔开)

如果设置一个，该值为X轴，第二个值默认为Y轴的一半

```css
/*取值*/
/*可以用百分比 具体的像素值 还有关键词（center bottom top right left）*/
transform-origin:0 0；
transform-origin:top left;
```

**景深基点**

perspective-origin 景深基点 在什么方位去看；

### 设置立体

井深到底给到哪个地方，是看到底是从哪里去看这个3d空间

​    **perspective  井深**（给需要进行3D动画的父盒子）

​    指定观察者与[z=0]平面的距离，使具有三维位置变换的元素产生透视效果

​    值越大看起来距自己越近，元素越大。 值越小，越远，元素越小

​    取值值：一般使用看起来最适应的800px 或者 1200px

​    **transform-style 3D环境**（设置给需要进行3D的盒子

​    定义： 指定子元素定位在三维空间内，当该属性值为[preseve-3d]时，元素将会创建局部堆叠上下文

​    值：**transform-style:preserve-3d** 创建3d环境.

```css
/*给div设值*/
div{perspective: 800px;}
/*ul 告诉浏览器ul是3d空间 只要有了六个面，那么就有厚度， 就有3d空间感*/
ul{transform-style:preserve-3d;}
```

```html
<div>
      <ul>
          <li></li>
          <li></li>
          <li></li>
      </ul>
</div>
```

### 几种隐藏的不同点

```css
diaplsy:none; /*直接隐藏，不占文档流的位置和空间*/
opacity:0;     /*透明，真实的存在文档流的位置上，并且占空间大小*/    透明这个东西还是有事件的
visibility:hidden; /*是否可见*/ /*不可见，占文档流的位置和大小*/ 这个好像是连点击事件都点击不到了
backface-visibility:hidden; /* 隐藏背对面 */  
overflow: hidden; /* 超出范围隐藏 不占文档流的位置和大小 */
```
