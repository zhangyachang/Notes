## 一、javascript的三大核心

1.ECMAScript  js的语法标准

2.DOM 	Document object Model 文档对象模型，提供的方法可以让js操作html标签

3.BOM 	Browser Object Model 浏览器对象模型，提供的方法让js可以操作浏览器

**注意：**1.  js里最大的boss是window，document只是window下的一个对象

2. document.documentElement  这个东西可以拿到html

```js
     		    document(在文档里，document是老大)
		           	   |
		           	  html
		           	  /  \
		           	 /    \
		           	/      \
		           body    head
		           /       / | \
		          /       /	 |  \
		         /       /	 |   \
		       / | \   meta title  style...
		      /  |  \
		     /   |   \
		    div  p   ul...
		    /
		  /
		  a
```



## 二、DOM的属性

js ---> DOM --> html

1. childNodes 返回当前对象下的所有**子**节点对象，会返回文本节点 

注意： 在ie8下只会返回元素节点

2. nodeType 返回节点类型，元素节点返回1 文本节点返回3 注释节点返回8
3. **children**   返回对象下所有子元素节点，并且没有兼容问题

4. firstChild  返回第一个子节点，在IE8跟childNodes一样的表现


5. lastChild  返回最后一个子节点 同上


6. firstElementChild  返回最后一个元素节点，不兼容IE8


7. nextSibling  下一个兄弟节点 在主流的浏览器，可能会拿到除了元素节点以外的节点，在IE8里，只会返回元素节点，如果没有就返回null

8. previousSibling 上一个兄弟节点 同上

9. nextElementSibling  下一个兄弟元素节点 如果没有返回null 不兼容IE678


10. previousElementSibling 上一个 同上
11. **parentNode**  返回父节点 没有兼容性
12. **offsetParent**   返回定位父级，如果都没有找到，最后返回body上，没有兼容问题

13.nodeName   返回标签的构造器 标签名**大写字母**

## 三、DOM的一些方法

#### createElement(‘p’) 

​	这个里面是标签

​	新建元素节点，需要接受一个参数，参数就是需要新建的标签。

####createTextNode（）

​	新建文本节点

####createComment（）

​	新建注释节点

#### 节点操作

**添加元素节点**

1. 父级.appendChild(子节点)

把子节点添加到父节点里去 往父级的所有子元素节点后 **追加一个节点**

2. 父级.insertBefore(子节点, 指定的子节点)

添加到指定的节点前面,       要插入的节点，参照的节点

3. 父级.removeChild(需要删除的节点)

4. 父级.replaceChild(newNode,someNode.firstChild);

   要插入的节点，和要替换的节点



1.克隆节点  cloneNode

克隆节点， 克隆母体.cloneNode()

函数接收一个参数，这个参数是一个布尔值，默认false，浅复制， true深度复制

浅复制：只复制标签

深度复制：把跟这个标签对象相关的一些标签的行内的信息一起复制，不会复制js里的自定义属性。

## 四、bind的兼容

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
