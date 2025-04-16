## 一、if语句    条件分支语句

**一、判断条件**比较符最终会返回一个布尔值

```js
>  <  >=  <=  ==  !=  ===  !==

== 等于、!= 不等于 会进行强制类型转换
```

===  全等于/恒等于 !==  不全等于 不仅仅会比较值，还会比较数据类型，如果类型不一样直接不相等，一般的时候用===,它的效率比==高，因为    ==中间还会有一个类型转换的步骤

```js
var a = 10;
var b = '10';

alert(a == b); //true
alert(a != b)  //false

alert(a === b); // false
alert(a !== b); //true
```

​      

## 二、if语句    把判断条件里面的东西转化为布尔值

在强制转换成布尔值时为假的数据： 一共六个

​        0   false   ''   null   undefined   NaN

if语句    if可以有很多的分支语句，看需求来写

```js
var a = 10;
var b = 11;
/*三目/三元运算*/
a>b?alert("真"):alert("假");

if(a>b){
      alert("真");
}else{
      alert("假")
}
```

三目/三元运算

如果if只有真和假的时候，并且并且真和假的分支都只有一条语句，那么可以写成三目,上面两种写法是等价的。

​    条件 ？ 真的执行语句 ： 假的执行语句；

if多分支判断

```js
var a = 100;
//下面这种else if的这种写法 如果有一个条件成立了
//下面的都不在执行了 结果是 a>50
if(a>50){
      alert("a>50");
}else if(a>60){
      alert("a>60");
}else if(a>70){
      alert("a>70");
}else {
      alert("都不对");
} 
//结果是  a>50
```

## 三、if和switch的区别

```js
var a = 10, b = '10', c = 12, d = 13;

if(a===b){
      alert("跟b是全等的");
}else if(a === c){
      alert("跟c是全等的");
}else if(a === d){
      alert("跟d是全等的");
}else{
      alert("以上都不成立");
}
//这里比较的是全等
switch(a){
      case b:
        alert("跟b是全等的");
        break;
    case c:
        alert("跟c是全等的");
        break;
    case d:
        alert("跟d是全等的");
        break;
      default:
        alert("都不成立")
}
```

**switch里面比较的是全等**

default 的位置不一定要在最下面，但是习惯上写到最后

## 四、前置++和后置++的区别

​    前置++  先自己递增1后，再去执行其他的运算

​    后置++  先把自己原来的值拿去进行其他运算后，再自己递增

​    当前置++或者后置++是一条独立语句，并且没有其他运算的时候，没有什么区别

```js
var x = 5;
var y = x++;
//y = x; x=x+1;  y=5 x = 6;
/******************************************************/
var x = 5;
var y = ++x;
//x = x + 1; y = x;     x = 6 y = 6;
```

## 五、for循环

​    for(语句1定义; 语句2条件; 语句4变化量){

​            语句3 执行语句;

​        }

     执行顺序： 1-->2-->3-->4-->2-->3-->4-->2(直到2条件不成立时停止)

```js
for(var i=0; i<10; i++){
    alert(i);
}
```

```js
var aLi = document.getElementsByClassName("box");
console.log(aLi);
for(var i=0; i<aLi.length; i++){
      aLi[i].goudan = i;
      aLi[i].onclick = function(){
        //alert(aLi[this.goudan].innerHTML);
          alert(this.innerHTML);
      }
}
```

## 六、用【】代替点操作

```js
var oBox = document.getElementById("box");
oBox.onclick = function(){
      alert(1);
}
oBox['onclick'] = function(){
      alert(1);
}
```

```js
oBox.className = 'aaa';

oBox["className"] = 'aaa';
```

```js
var obj = {
      a : 1,
      b : 2,
      0 : "123"
}
//alert(obj.b);
alert(obj.0); //报错了 这时就需要用到【】操作来代替了
alert(obj["0"]);    //对于数字来说，这两种都可以
alert(obj.[0]);
```