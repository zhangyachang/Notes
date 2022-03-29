## 改变this指向

这几个都是函数的方法，使用方式

```js
函数名.方法
```



#### 1. 函数.call( )

> call 接收的参数个数不限制，看需求，但是第一个必须是 this 需要指向的对象，函数执行需要的参数写在后面就好。





#### 2. 函数.apply( )

接收的参数只有两个，第一个：需要改变this指向的对象；**第二个必须是一个数组**，数组里函数需要的参数。



**注意：**

1. 都可以用来改变函数执行时的this指向, **会主动执行函数. **
2. 传null时，会把指向指向window
3. call apply  bind   传null是  this 指向window
4. 需要指向window时，可以传null/window，  如果不传实参，那么可以不写，也是默认指向window
5. 改变this指向时，只对本次执行生效。





#### 3. 函数.bind( )

bind的返回值是一个函数，所以还是需要加上括号执行。





#### 4. bind的兼容

```js
if(!-[1,]){
    Function.prototype.bind = function(This){
        var bindThis = this;
        var arg = [].slice.call(arguments,1)
        return function(){
            bindThis.apply(This,arg);
        }
    }
}

var arr = [];
box.onclick = fn.bind(arr);
function fn(){
    console.log(this);
    //alert(a+b);
}
```





#### 分析

1. call 、bind 、 apply 这三个函数的第一个参数都是 this 的指向对象
2. 第二个参数差别就来了：

3. call的参数是直接放进去的，第二第三第n个参数全都用逗号分隔，直接放到后面  obj.myFun.call(db,'成都', ... ,'string' )；
4. apply的所有参数都必须放在一个数组里面传进去  obj.myFun.apply(db,['成都', ..., 'string' ]);
5. bind除了返回是函数以外，它 的参数和call 一样。
6. 当然，三者的参数不限定是string类型，允许是各种类型，包括函数 、 object 等等





#### 实用价值

1. 类数组转化为数组

```js
[].slice.apply(arguments);
```



2. 判断浏览器是否是ie 678

```js
if(!-[1,]){
    alert('这是ie678')
}

!-[1,] NaN(false) true // 在ie 678 环境下

!-[1,] -1 false 在其他环境下
```





#### 实现apply

```js
Function.prototype.myApply = function (context, args) {
  context = context || window;
  args = args || [];

  let key = Symbol();
  context[key] = this;
  let result = context[key](...args);
  Reflect.deleteProperty(context, key);
  return result;
};
```





#### 实现call

```js
Function.prototype.myCall = function (context, ...args) {
  context = context || window;
  args = args || [];

  let key = Symbol();
  context[key] = this;
  let result = context[key](...args);
  Reflect.deleteProperty(context, key);
  return result;
};
```



#### 实现bind

```js
Function.prototype.myBind = function (context, ...args) {
  const fn = this;
  args = args ? args : [];
  return function newFn(...newFnArgs) {
    if (this instanceof newFn) {
      return new fn(...args, ...newFnArgs);
    }
    return fn.apply(context, [...args, ...newFnArgs]);
  };
};
```







## 定时器

window方法

#### 1. setInterval

> setInterval 方法可按照指定的周期（以毫秒计）来调用函数或计算表达式。
>
> setInterval( ) 方法会不停的调用函数，直到 `clearval()` 被调用或窗口关闭。由 setInterval 返回的ID值可用作 clearInterval() 方法的参数。
>
> 提示 1000毫秒 = 1秒



**语法**

```js
setInterval(code, millisec, lang);
```

| 参数     | 描述                                                   |
| -------- | ------------------------------------------------------ |
| code     | 必需。要调用的函数或要执行的代码串。                   |
| millisec | 必须。周期性执行或调用 code 之间的时间间隔，以毫秒计。 |
| lang     | 可选。JScript \| VBScript \| Javascript                |





#### 2. setTimeout

> setTimeout( ) 方语法法用于在指定的毫秒数后调用函数或计算表达式。

**语法**

```js
setTimeout(code, millisec);
```

| 参数     | 描述                                             |
| -------- | ------------------------------------------------ |
| code     | 必需。要调用的函数后要执行的 JavaScript 代码串。 |
| millisec | 必需。在执行代码前需等待的毫秒数。               |

**注意：** setTimeout( )只执行 code 一次。如果要多次调用，请使用 setInterval 或者让 code 自身再次调用 setTimeout。



#### 3. 定时器的返回值

定时器的返回值：是一些 number 类型的数字，代表定时器的序号。



#### 4. 定时器的清除

clearInterval() 

​	参数必须是由 setInterval() 返回的 ID 值。

clearTimeout()

​	由 setTimeout() 返回的 ID 值。





#### 注意：

1. alert( ) 必须点了确定才算是执行完成，只有函数执行完成才会重新计时。
2. eval( ) 把字符串当做 JavaScript 脚本代码来执行。
3. 浏览器有刷新频率 13 - 20。
4. 定时器里的事件，属于下一次事件队列，所以哪怕定时时间间隔为0，也有可能是后面的先执行。







## Math对象

> Math对象用于执行数学任务。
>
> Math对象并不像 Date 和 String 那样是对象的类，因此没有构造函数 Math()，像Math.sin( ) 这样的函数只是函数，不是某个对象的方法。您无需创建它，通过把 Math 作为对象使用就可以调用其所有属性和方法。





#### 1. Math 对象属性

| 属性    | 描述                                              |
| :------ | :------------------------------------------------ |
| E       | 返回算术常量 e，即自然对数的底数（约等于2.718）。 |
| LN2     | 返回 2 的自然对数（约等于0.693）。                |
| LN10    | 返回 10 的自然对数（约等于2.302）。               |
| LOG2E   | 返回以 2 为底的 e 的对数（约等于 1.414）。        |
| LOG10E  | 返回以 10 为底的 e 的对数（约等于0.434）。        |
| PI      | 返回圆周率（约等于3.14159）。                     |
| SQRT1_2 | 返回返回 2 的平方根的倒数（约等于 0.707）。       |
| SQRT2   | 返回 2 的平方根（约等于 1.414）。                 |





#### 2. Math 对象方法

| 方法       | 描述                                                         |
| :--------- | :----------------------------------------------------------- |
| abs(x)     | 返回数的绝对值。                                             |
| acos(x)    | 返回数的反余弦值。                                           |
| asin(x)    | 返回数的反正弦值。                                           |
| atan(x)    | 以介于 -PI/2 与 PI/2 弧度之间的数值来返回 x 的反正切值。     |
| atan2(y,x) | 返回从 x 轴到点 (x,y) 的角度（介于 -PI/2 与 PI/2 弧度之间）。 |
| ceil(x)    | 对数进行上舍入。                                             |
| cos(x)     | 返回数的余弦。                                               |
| exp(x)     | 返回 e 的指数。                                              |
| floor(x)   | 对数进行下舍入。                                             |
| log(x)     | 返回数的自然对数（底为e）。                                  |
| max(x,y)   | 返回 x 和 y 中的最高值。                                     |
| min(x,y)   | 返回 x 和 y 中的最低值。                                     |
| pow(x,y)   | 返回 x 的 y 次幂。                                           |
| random()   | 返回 0 ~ 1 之间的随机数。                                    |
| round(x)   | 把数四舍五入为最接近的整数。                                 |
| sin(x)     | 返回数的正弦。                                               |
| sqrt(x)    | 返回数的平方根。                                             |
| tan(x)     | 返回角的正切。                                               |
| toSource() | 返回该对象的源代码。                                         |
| valueOf()  | 返回 Math 对象的原始值。                                     |





**常用的方法**

```js
Math.ceil(); //向上取整
Math.floor(); //向下取整
Math.round(); //四舍五入取整
Math.random(); //随机数 [0,1)
Math.max(); //取最大值
Math.min();  //取最小值

Math.abs();  //绝对值
Math.sqrt(x); //x的平方根
Math(x,y);   //x的y次幂
```

```js
// 随机返回2或3
setInterval(function(){
  	console.log(Math.floor(Math.random()*2 + 2));
},1000)
```







## 日期对象

> 日期对象用于处理日期和时间



#### 1. 日期Date对象

new Date( ) 获取的时间是本地计算机的时间，不是北京时间。

要创建一个日期对象，使用 new 操作符 Date 构造函数即可。

```js
new Date();
```



#### 2. 实例化传递参数

new Date() 没有参数是获取本地时间，有参数是设置参数对象时间。

一个参数时，如果是字符串那就是设置年份，从1月1日开始

如果一个参数时，参数的类型是number，那就是毫秒值，是距离1970,1,1,000（可能会加上时区的时差）



**注意：** 传参数的时候月份要在日的前面





| 参数  | 描述                                      |
| ----- | ----------------------------------------- |
| month | 用应为表示月份名称，从January到December   |
| mth   | 用整数表示月份，从 0（1月） 到 11（12月） |
| dd    | 表示一个月中的第几天 从 1到31             |
| yyyy  | 表示一个月中的第几天，从1到31             |
| hh    | 小时数，从0（午夜）到23（晚11点）         |
| mm    | 分钟数，从0到59的整数                     |
| ss    | 秒数，从0到59 的整数                      |
| ms    | 毫秒数，为大于等于0的整数                 |



```js
var date = new Date();
```



```js
var date = new Date("month dd,yyyy,hh:mm:ss");
```



```js
var date = new Date("month dd,yyyy");
```



```js
var date = new Date("yyyy month dd hh:mm:ss");

var date = new Date(yyyy month dd hh:mm:ss);
```



```js
var date = new Date(yyyy,mth,dd);
```



```js
var data = new Date(ms);
```





#### 3. 实例化对象的方法

获取日期对象的时间



```js
var date = new Date();
```

| 方法                | 返回值                                 |
| ------------------- | -------------------------------------- |
| date.getTime()      | 返回距离1970,1,1 00:00:00 过了多少毫秒 |
| date.getFullYear( ) | 返回年                                 |
| date.getMonth() + 1 | 返回月 月份从0开始 【0-11】            |
| date.getDate()      | 返回日                                 |
| date.getHours()     | 小时 【0-23】                          |
| date.getMinutes();  | 返回分                                 |
| date.getSeconds();  | 返回秒                                 |
| date.getDay();      | 返回星期   一周的开始是周天，周天返回0 |





#### 4. Date.parse()  Date.UTC()

> Date.parse( ) 方法接收一个表示日期的字符串参数，然后尝试根据这个字符串返回相应日期的毫秒数。



```js
Date.parse(); // 参数必须是字符串	
```



```js
Date.UTC(); // 参数不能是字符串
```

这两个参数都接收一个参数，参数都是日期对象，返回该日期到1970,1,1, 00:00:00的毫秒值。



```js
new Date(Date.parse("10,24,2016"));

new Date(Date.UTC(2016,7,24));
```



下面的这两个UTC比parse快8个小时，这里参数选择的是-8

```js
new Date(Date.parse("10,24,2016,00:00:00"));

new Date(Date.UTC(2016,9,24,-8,0,0));
```





#### 5. 日期的格式化方法

> 以特定于实现的格式显示  调用方法 `date.toDateString`



| 方法                 | 返回值                                           |
| -------------------- | ------------------------------------------------ |
| toDateString()       | Tue Sep 25 2018                                  |
| toTimeString()       | 14:40:56 GMT+0800 (中国标准时间)                 |
| toLocaleDateString() | 2018/9/25                                        |
| toLocaleTimeString() | 下午2:44:00     //本地时间 时 分 秒              |
| toUTCString          | Tue, 25 Sep 2018 06:44:56 GMT    //显示的UTC格式 |
| toLocaleString       | 2018/9/25 下午2:46:49 //按照本地时间输出         |





#### 6. getTimezoneOffset()

> 返回本地时间于UTC时间相差的分钟数。单位是分
>
> 世界标准时间 - 本地时间 - 480



本地时间与GMT时间的时间差

```js
var offset = date.getTimezoneOffset() * 60 * 1000;
```



num 时区，得到不同时区的时间

```js
var date = new Date(utcTime + 60*60*1000*num);
```











