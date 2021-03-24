## less

## 环境

下载vsCode 

安装 easy less  easysass view in browser

## less语法

#### less注释

```css
/*css形式 的注释 在less当中依然保存*/
```



####less语法

声明变量的方式

```less
@charset "utf-8";
/*申明变量的方式*/
@base:#f00;

/*申明变量的另外一种方式*/
@images:"../img";
@ww:width;
@hh:height;
.box{
    @{ww}:100px;
    @{hh}:100px;
    color:@base;
    background:@base;
    background-image:url("@images")/1.jpg;
}
```

混合方式

普通混合方式(这种方式会在css当中暴露出来)

```less
/*混合方式*/
.bordered{
    border-top:1px solid red;
    border-bottom:2px solid #f09;
}
.box2{
    font-size:18px;
    .bordered;
}
```

传参的方式

```less
.border-radius(@radiu){
    border-radius:@radiu;
}
.box2{
    .border-radius(10px);
}
```

有值直接调用的那种

```less
.border-radius2(@radiu:5px){
    border-radius:@radiu;
}
.box{
    .border-radius2;
}

//下面这个是css文件
.box {
  border-radius: 5px;
}
```

不暴露的方式

```less
//只要这里加了括号就会不暴露在css文件中
.wrap(){
    text-align:center;
    line-height:100px;
}
//这种会暴露
.border{
    box-shadow:0 0 10px red;
}
```

还有一种传参 arguments

```less
.box-shadow(@x,@y,@blur,@color){
    box-shadow:@arguments;
}

.box{
    .box-shadow(2px,5px,1px,#0f0);
}
```



#### 嵌套方式规则

如何去实现一种 .box .con这种形式呢？

嵌套规则

```less
#header{
    @{hh}:30px;
    .con{
        font-size:20px;
        color:red;
    }
    .logo{
        @{ww}:50px;  //width
        @{hh}:50px;		//height
        @{bg}:red;
        @{bg}-@{color}:red; 
        &:hover{		//这个就是hover 用到了&符号
			border:10px soli red;   
        }
    }
}

//css的样式效果
#header {
  height: 30px;
}
#header .con {
  font-size: 20px;
  color: red;
}
```



## less语法二

#### color函数（了解）

颜色的十六进制相加，因为我们都不清楚加完之后不知道是什么颜色，所以基本上用不到



#### 运算

**属性要加{}使用，使用值的时候不加{}**

```less
@numW:100px;
@numH:100px;
@a:height;

#box{
    width:@numW;
    height:@numH - 10px;
    border:@numH+1px solid red;
}
```



#### 命名空间

```css
#con2{
    .btn(){
        @{ww}:@numW;
        @{hh}:@numH;
        background:red;
    }
    .tab{
        display:block;
        font-size:20px;
    }
    .btn-bottom{
        width:100px;
        height: 100px;
        margin:90px auto;
        background: red;
    }
}

#content div{
    #con2 > .btn;  //这里可以这样调用上面的样式
}

#content .box{
    width: 100px;
}
#content2 h2{
    #con2 .btn-bottom;
}

```



#### 避免编译

写的公式，在css样式当中是直接显示运算结果的

```less
.bottom{
    @{ww}:~"clac(100 - 10px)";
    @{hh}:100px;
}
//css文件 这样就可以显示原始的是怎么来的
.bottom {
  width: clac(100 - 10px);
  //width:~"(100 - 10px)";
  height: 100px;
}

```



#### !important 

​	一般是在调试的时候使用的

```less
.box{
    width:100px !important;
}
```

