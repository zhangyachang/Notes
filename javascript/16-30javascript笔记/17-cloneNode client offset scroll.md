---
client offset scroll的区别
---

在获取元素属性中，可以获取行内样式，css样式，还有一种可以获取元素的宽高等的方法。

## 一、client  属性

1.clientWidth/clientHeight

读取元素的style的宽高 + padding的宽度， 只是只读属性， 跟内容是否超出隐藏，没有一毛钱关系

2.clientTop/clientLeft

获取对象上/左border的宽度

## 二、offset

1.offsetWidth/offsetHeight

获取对象的width/height大小+ 左右padding大小+ 左右border大小，跟内容是否超出隐藏，没有一毛钱关系

2.offsetTop/offsetLeft

获取到定位父级的距离。

## 三、**scroll**

scrollWidth/scrollHeight

获取元素的 content的width/height + padding的大小，当内容没有超出，跟clientWidth/clientHeight表现一样。

当内容超出，没有设置超出隐藏时，scrollWidth 是 左padding+内容宽

当内容超出，没有设置超出隐藏时，scrollHeight 是 上padding+内容高

当内容超出，有设置超出隐藏时，scrollWidth 是 padding+内容宽

当内容超出，有设置超出隐藏时，scrollHeight 是 padding+内容高

```js
总结 没有超出 || 设置超出隐藏的时候  和clientWidth一样
     超出 && 没有设置超出隐藏的时候  是少加一部分超出的那一边的padding
```

## 滚动高度   scrollTop  //  scrollLeft

有兼容性问题，但是现在看起来好像没有问题了

```js
在chrome 62.0.3版本之前 使用的是  document.body.scrollTop
 大快人心的是  62.0.3以后，谷歌废除了  上一个方法，  跟火狐和IE统一使用document.documentElement.scrollTop/document.documentElement.scrollLeft


 document.documentElement.scrollTop/document.documentElement.scrollLeft
     兼容火狐和IE

document.documentElement.scrollTop  以后统一使用这个方法。。
```

```js
兼容写法
document.body.scrollTop || document.documentElement.scrollTop;
```

```js
window.onscroll = function(){
    console.log(document.body.scrollTop || document.documentElement.scrollTop);
}
```

## 四、文档相关

1.document.body.clientWidth     document.body.clientHeight

文档的宽高 ，不受滚动条的影响，读取的是实际的宽高。 body的宽高

2.document.documentElement.clientWidth//document.documentElement.clientHeight    可视区的宽高，不包括滚动条的宽度

3.window.innerWidth // window.innerHeight

  获取可视区宽高+滚动条的宽度    不兼容IE8（没多大用）