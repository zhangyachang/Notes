## 动静态获取dom

动态和静态的区别，静态只会获取一次，而动态每次使用到这个变量，都会隐式的去获取一次。

静态获取的方法有：querySelector querySelectorAll getElementById。

除了这三个其它的都是动态的。



## json对象

#### 1. 定义

> JSON: JavaScript 对象表示法（JavaScript Object Notation）。
>
> JSON 是存储和交换文本信息的语法。类似XML。
>
> JSON比 XML 更小、更快、更易解析。



#### 2. 使用和操作

```js
var obj = {
    name: "xiaoxiao",
    age: 18,
    marry: false,
    sex: "man",
    hobby: "woman",
    0: "我是数字属性名"
};
```




```js
obj.data = "增加的属性和值"; // 添加属性和值
console.log(obj.name);  //读取里面的值
obj.name = "修改值"; //修改值
obj[0] = "修改";   // []代替点操作
delete obj.name; // 删除值
obj = {}; // 清空obj的内容
obj = null;
console.log(obj); // 拿到obj里面所有的属性和值
obj.length; // 没有这个东西，没有长度
```



**注意：**

1. 对象里面的数据的存放方式，键值对。
2. json格式，在其它的语言里，对象的属性必须加双引号。
3. 取值， 对象.属性名。
4. 【】 代替点操作时，括号里面的值需要是字符串，除了数字直接作为属性名时，可以不用变为字符串。
5. alert(obj) 弹窗的表现为 【object Object】
6. 没有长度 length



## for in循环

#### 1. 定义

> 1. for in 循环里定义的 i，在遍历对象时，代表了每次循环时遍历到的那个属性名，取值必须 `对象[i]` ，必须是【】
> 2. 在遍历数组时，代表数组的下标，取值： 数组[i]



#### 2. 遍历json和数组

1. 遍历json对象

```js
var obj = {
  	name : "xiaoxiao",
  	age : 18,
  	marry : false,
  	sex : "man",
  	hobby : "woman",
  	0 : "我是数字属性名"
};
for(var i in json){
  	console.log(i);   //这个东西是里面所有的 属性
  	//console.log(json[i]);  //这个里面取的所有的值
}
```



2. 小技巧，遍历json属性名到数组

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



3. 遍历属性值到数组

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



4. 遍历数组

```js
var a = [1,2,3,3,4,5,46,56,100];
for(var abc in a){
  	console.log(abc);			//下标
  	console.log(a[abc]);		//取值
}
```