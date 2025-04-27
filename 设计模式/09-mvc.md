## MVC

## MVP

## MVVM

差不多的功能

他的主要的一个用途 做数据处理

​    网页中的内容不是固定死的

​    之前的做法是用php java动态数据展示(弊端)

​    每一次访问页面，服务器就会用php java来渲染一次

​    10000人同时访问网页

​    mv* 把数据用前端(每个网页这个网页的人的电脑) 就不需要用服务器的资源了

**实现，做法**

```js
mvc
m:model 模型  通俗的说法 是数据
v:视图      通俗的说  html代码
c:控制器     通俗说法 特效 业务代码 
```

**具体做法**

```js
var mvc = {};
mvc.Model = (function () {
    var data = {
        nav : [
            {title:"导航1"},
            {title:"导航2"},
            {title:"导航3"}
        ]
    };
    return function (m) {
        return data[m];
    }
})();

mvc.View = (function () {
    var navData = mvc.Model('nav');
    console.log(navData);
    var  V = {
        createNav:function () {
            var tpl = {
                //容器
                container:"<div><ul>{{item}}</ul></div>",
                item:"<li>{{title}}</li>"

            };
            var html = "";
            var reg = /\{\{(.*)\}\}/;
            navData.forEach(function (value) {
                //这里是简单的写
                //正规写法 是首先匹配到双大括号里面的内容 然后根据匹配到的内容来获取数据
                html += tpl.item.replace(reg,value.title);
            });
            document.body.innerHTML = tpl.container.replace(reg,html);
        }
    };
    V.createNav();
})();

mvc.Ctrl = (function () {
    var v = mvc.View;
    //真正的写法 c => ajax获取数据 传递赋值 => m  v=>m里面的数据创建视图

})();
```
