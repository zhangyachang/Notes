## 一、函数

1.函数的分类，有名/匿名。

通过能否加括号执行可以将函数分为**函数定义 和 函数表达式**

2.函数声明/函数定义  不能直接在后面加（）执行， 不仅不会执行，还会报错

function fn(){}  函数的声明定义

3.函数表达式   可以直接加括号执行。

var a = function(){}  函数表达式

4.函数声明变为函数表达式

```js
//把函数声明变为函数表达式
/*1*/
var a = function(){
  alert("变成了函数表达式");
}();

/*2*/
(function fn(){
       alert("变成了函数表达式");
})()

/*3*/
(function fn(){
       alert("变成了函数表达式");
}())

/*4*/
!function(){
    alert("匿名函数自执行");
}();
/*5*/
+function(){
      alert("匿名函数自执行")
}()；
/*6*/
-function(){
      alert("匿名函数自执行")
}()
/*7*/
~function(){
      alert("匿名函数自执行");
}();
```

5. 函数有两个名字  在外面使用必须用 a 在内部使用的时候可以用 fn 和a  一般这个时候就写一个名字了，因为a可以在外部和内部都可以使用，没有必要给函数取名字了`
   
   ```js
   //一般后面的函数就不给名字了下面这种，因为在外面和里面都可以用a，而在外面不可以用fn
   var a = function fn(){
         alert(1);
         a();
         fn();
   };
   a();
   ```

## 二、参数

函数执行时，括号里传递进函数体的那个参数是： 实参

函数体里，使用一个对应变量来接收，函数执行时传进去的参数，叫: 形参

​        形参也需要符合变量的命名规则。

注意：不定参数 如果形参的数量小于实参的个数的时候，只会取到前几个。

形参比实参多的时候， 能接受到的就正常使用，接收不到undefined  

```js
function fn(a,b){
      alert(a + b);
}
fn(1,5);
fn(100,200);
fn(1000,1000);
```

## 三、不定参

arguments : 不定参 /  类似数组的存在/类数组

类数组和数组的区别：

类数组不能使用数组的方法

```js
function fun(){
     var sum = 0;
     for(var i=0; i<arguments.length; i++){
        sum = sum + arguments[i];
        console.log(arguments[i]);
     }
     alert(sum);
}
fun(1,2,3,4,5,6,6);
//arguments.length
```

## 四、arguments.callee

这个东西代表了包裹他的这个函数。

```js
!function(){
      alert(1);
      console.log(arguments.callee);
}

(function(){
      alert(1);
      !function(){
        alert(2);
          //console.log(arguments.callee);
          arguments.callee();
      }();
})();
```

arguments.callee.caller

```js
function outer() {
    inner();
}

function inner() {
    console.log(inner.caller);                ------------------ outer函数
    console.log(arguments.callee.caller)      -------------outer函数
}
outer();
```

## 形参个数 .length

```js
function sayName(name) {
    console.log(name);
}

function sum(num1,num2) {
    return num1 + num2;
}

function sayHi() {
    console.log('Hi');
}

console.log(sayName.length)     // 1
console.log(sum.length)           // 2
console.log(sayHi.length)      // 0
```

## 五、return

两种理解方式

函数值执行完 默认的返回值是undefined  或者可以理解为函数被回收了 

return  1.改变函数的返回值

2.**当函数执行到return 就把return后面的东西返回，函数停止执行。**