## 一、定时器

setInterval()   //循环执行

   第一个参数：函数（也可以是字符串，有点类似eval函数的功能）

   第二个参数：时间间隔  单位是ms（毫秒） 

setTimeout()  一次性的。执行就没了。

​    第一个参数：函数（也可以是字符串，有点类似eval函数的功能）

第二个参数：时间间隔

**注意：**

1.alert()必须点了确定才算执行完，只有函数执行完才会重新计时

2.eval（）把字符串当做javascript脚本代码来执行

3.浏览器有最低刷新频率 13 - 20。

4.定时器里的事件，属于下一次的事件队列，所以哪怕定时时间间隔为0，也有可能是后面的先执行。

## 二、定时器的清除

clearInterval()

clearTimeout()

## 三、定时器的返回值

定时器的返回值： 是一些number类型的数字，代表定时器的序号。

## 四、Math对象

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
setInterval(function(){
      console.log(Math.floor(Math.random()*2 + 2));
},1000)
```