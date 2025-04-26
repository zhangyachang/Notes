#### render

```js
<div id="app">
    <index></index>
</div>
var bb = Vue.component('index',{
    template:'<div>这里是index</div>'
});
```

```js
<div id="app">

</div>

var bb = Vue.component('index',{
   template:'<div>这里是index</div>'
});

new Vue({
    el:"#app",
    //render是一个函数 默认接收了一个参数 通过执行这个参数() 并且return
    render:function (h) {
        return h(bb); //需要传递一个参数
    }
})
```
