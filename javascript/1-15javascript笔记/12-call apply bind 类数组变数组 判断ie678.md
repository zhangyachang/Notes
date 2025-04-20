## 函数的方法，函数名加上下列的东西

## 一、函数.call()

  call接收的参数个数不限制，看需求，但是第一个必须是this需要指向的对象，函数执行需要的参数写在后面就好。

## 二、函数.apply()

接收的参数只有俩个，第一个：需要改变this指向的对象；**第二个必须是一个数组**，数组里函数需要的参数。

注意：

共同点：都可以用来改变函数执行时的this指向, **会主动执行函数.**

传null时，会把指向指向window 

call apply  bind   传null是  this 指向window

需要指向window时，可以传null/window，  如果不传实参，那么可以不写，也是默认指向window

改变this指向时，只对本次执行生效。

## 三、bind

bind的返回值是一个函数，所以还是需要加上括号执行。

```js
call 、bind 、 apply 这三个函数的第一个参数都是 this 的指向对象，第二个参数差别就来了：
call的参数是直接放进去的，第二第三第n个参数全都用逗号分隔，直接放到后面  obj.myFun.call(db,'成都', ... ,'string' )；
apply的所有参数都必须放在一个数组里面传进去  obj.myFun.apply(db,['成都', ..., 'string' ]);
bind除了返回是函数以外，它的参数和call 一样。
当然，三者的参数不限定是string类型，允许是各种类型，包括函数 、 object 等等
```

## 四、小技巧

1.类数组转化为数组    [ ].slice.apply(arguments)

2.判断浏览器是否是ie678   

```js
if(!-[1,]){
      alert("这是ie678");
}
!-[1,]  NaN  false true
```

3. 遍历json属性名到数组
   
   ```js
   var json = {
         a : 1,
         b : 2,
         name : "我的",
         aa : 123
   };
   var arr = [];
   for( arr[arr.length] in json);
   console.log(arr); 
   ```

4.遍历属性值到数组

```js
var json = {
      a : 1,
      b : 2,
      name : "我的",
      aa : 123
};
var arr = [];

for(var i in json){
      arr[arr.length] = json[i];
}
console.log(arr);
```