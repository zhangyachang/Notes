#### slot  备用内容

```js
<div id="app">
    <aa>
        <!--<div>123</div>-->
        <div slot="header">454</div>
    </aa>
</div>


/* slot 当子组件中没有内容的时候显示(备用内容)*/
/*当命名的时候 显示的内容是html标签的内容 不是 Vue.component的内容了*/
/*当命名的时候 如果有多条内容的时候必须写slot标签内容一一对应出来*/
Vue.component('aa',{
    template:'<div> <slot>这个是第一条呢</slot></slot><slot name="header"><p>这里是子组件slot</p></slot></div>'

});
```

#### 过渡动画

```css
/*名字为show的 动画标签开始的时候的样式*/
p{
    color:red;
}
/*开始的时候*/
.show-enter{
    color:blue;
}
/*开始到正常显示的过程*/
.show-enter-active{
    transition:color 3s;
}
/*正常显示到结束的过程*/
.show-leave-active{
    color:darkorange;
    transition:color 3s;
}
/*结束的时候*/
.show-leave{
    
}
```

```js
<div id="app" >
    <transition name="show">
        <p v-if="show">这里是p标签</p>
    </transition>
    <button @click="show = !show">按钮</button>
</div>
```

#### 直接写动画

```js
#app{
    text-align:center;
}
.abc-enter-active{
    animation:d 1s;
}
.abc-leave-active{
    animation:d 1s;
}
@keyframes d {
    0%{transform:scale(1)}
    50%{transform:scale(2)}
    100%{transform:scale(1)}
}


<div id="app">
    <button @click="show = !show">按钮</button>
    <transition name="abc">
        <div v-if="show">
            这里面的文字
        </div>
    </transition>
</div>
```

#### 自定义指令

```js
<!--自定义指令-->
<div id="app">
    <input type="text" v-wulv="a" v-model="a">
    <!--<div class="box" v-wulv>div</div>-->
</div>


var app = new Vue({
    el:"#app",
    data:{
        a:''
    },
    directives:{
        wulv:{
            bind:function(){
                //当我们绑定的时候触发，只触发一次
                console.log('绑定');
            },
            inserted:function (el) {
                //主方法
                //第一个参数：绑定的元素
                console.log(arguments);
                el.style.color = 'red';
            },
            update:function(){
                //当我们更新的时候   是指绑定的数据发生改变的时候触发
                console.log('更新')
            },
            componentUpdated:function () {
                //组件完成一次更新的时候触发
                console.log('完成更新')
            },
            unbind:function () {
                //和元素解除绑定的时候触发
            }
        }
    }
})
```

#### 全局的写法

```js
Vue.directive('aaa',{
    bind:function () {
        //第一个参数 绑定的元素 2.传过来的参数
        console.log(this);
        console.log(arguments);
    }
});

//简写
Vue.directive('aaa',function (el,bind) {
    console.log(el);
    console.log(bind.value);
    console.log(arguments);
});
```
