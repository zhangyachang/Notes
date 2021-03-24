全局API呢是在Vue.API , 实在Vue这个对象上面的

## Vue.extend

​	**参数：**

​	`{Object} options`

​	**用法**

​	使用基础 Vue 构造器，创建一个“子类”。参数是一个包含组件选项的对象。

​	`data` 选项是特例，需要注意 - 在 `Vue.extend()` 中它必须是函数

```html
<div id="mount-point"></div>
```

```js
// 创建构造器
var Profile = Vue.extend({
  template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
  data: function () {
    return {
      firstName: 'Walter',
      lastName: 'White',
      alias: 'Heisenberg'
    }
  }
})
// 创建 Profile 实例，并挂载到一个元素上。
new Profile().$mount('#mount-point')
```

结果如下：

```html
<p>Walter White aka Heisenberg</p>
```

小例子

```js
let extend = Vue.extend({
    template: `<h2><a :href="url">{{con}}</a></h2>`,
    data () {
        return {
            con: 'extend',
            url: 'http://baidu.com'
        }
    }
});
new extend().$mount('#app');  //挂载
```



## Vue.nextTick

​	**参数**

​	`{Function} [callback]`

​	`{Object}[content]`

​	**用法**： 

​	在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。 

```js
// 修改数据
vm.msg = 'Hello'
// DOM 还没有更新
Vue.nextTick(function(){
    // DOM更新了
})
// 作为一个 Promise 使用 (2.1.0 起新增，详见接下来的提示)
Vue.nextTick()
  .then(function () {
    // DOM 更新了
  })
```



## Vue.set (target,key,value)

​	**参数**： 

​	`{Object | Array} target`
	`{string | number} key`
	`{any} value`

​	**返回值** 设置的值

​	**用法** 设置的值

​	向响应式对象中添加一个属性，并确保这个新属性同样是响应式的，且触发视图更新。它必须用于向响应式对象上添加新属性，因为 Vue 无法探测普通的新增属性 (比如 `this.myObject.newProperty = 'hi'`) 

​	**注意**对象不能是 Vue 实例，或者 Vue 实例的根数据对象。 

```js
new Vue({
    el: '#app',
    data: {
        arr: [1123,1231,231]
    },
    methods: {
        fn () {
            //Vue.set(this.arr,1,1)
            this.$set(this.arr,1,1)
        }
    }
})
```



## Vue.delete(target,key)

​	**参数**

​	`{Object | Array} target`

​	`{string | number} key/index`

​	**用法**

​	删除对象的属性。如果对象是响应式的，确保删除能触发更新视图。这个方法主要用于避开Vue不能检测到属性被删除的限制，但是你应该很少会使用它。

​	**注意** 目标对象不能是一个 Vue 实例或 Vue 实例的根数据对象。 



## Vue.directive

​	**参数**

​	`{string} id`

​	`{Function | Object} [definition]`

​	**用法**

​	注册或获取全局指令

```js
// 注册
Vue.directive('my-directive', {
  // 只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
  bind: function () {},
  // 当被绑定的元素插入到DOM中时..
  inserted: function () {},   
  // 所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)。
  update: function () {},
  //指令所在组件的 VNode 及其子 VNode 全部更新后调用。
  componentUpdated: function () {},
  // 只调用一次，指令与元素解绑时调用。
  unbind: function () {}
})

// 注册 (指令函数)
Vue.directive('my-directive', function () {
  // 这里将会被 `bind` 和 `update` 调用
})

// getter，返回已注册的指令
var myDirective = Vue.directive('my-directive')
```

小例子

```js
Vue.directive('dream',function (el,bind) {
	console.log(el);  // 这个是绑定的元素
	console.log(bind)  // 这个是这个指令本身吧
});
```

```js
Vue.directive('chang',{
    bind () {
        console.log(`1.被绑定`)
    },
    inserted () {
        console.log(`被插入`)
    },
    update () {
        console.log(`3.组件更新`)
    },
    componentUpdated () {
        console.log(`4.组件更新完成`)
    },
    unbind () {
        console.log(`解绑`)
    }
});

// 解绑
app.$destroy()
```





## Vue.fillter

​	**参数：**

​	`{string} id`

​	`{Function} [definition]`

​	**用法**

​	注册或获取全局过滤器

```js
// 注册
Vue.filter('my-filter', function (value) {
  // 返回处理后的值
})

// getter，返回已注册的过滤器
var myFilter = Vue.filter('my-filter')
```



## Vue.component

​	**参数：**

​	`{string} id`

​	`{Function | Object} [definition]`

​	**用法**

​	安装 Vue.js 插件。如果插件是一个对象，必须提供 `install` 方法。如果插件是一个函数，它会被作为 install 方法。install 方法调用时，会将 Vue 作为参数传入。 

​	当 install 方法被同一个插件多次调用，插件将只会被安装一次。 



​	

```js
// 注册组件，传入一个扩展过的构造器
Vue.component('my-component', Vue.extend({ /* ... */ }))

// 注册组件，传入一个选项对象 (自动调用 Vue.extend)
Vue.component('my-component', { /* ... */ })

// 获取注册的组件 (始终返回构造器)
var MyComponent = Vue.component('my-component')
```



## Vue.use

​	**参数：**

​	`{Object | Function} plugin`

​	**用法：**

​	注册或获取全局组件。注册还会自动使用给定的     `id`设置组件的名称 



## Vue.mixin

​	**参数**

​	`{Object} mixin`

​	**用法：**

​	全局注册一个混入，影响注册之后所有创建的每个 Vue 实例。插件作者可以使用混入，向组件注入自定义的行为。**不推荐在应用代码中使用**。 



## Vue.compile

​	**参数：**

​	`{string} template`

​	**用法**

​	在 render 函数中编译模板字符串。**只在独立构建时有效** 

```js
var res = Vue.compile('<div><span>{{ msg }}</span></div>')

new Vue({
  data: {
    msg: 'hello'
  },
  render: res.render,
  staticRenderFns: res.staticRenderFns
})
```



## Vue.version

​	**细节**：提供字符串形式的 Vue 安装版本号。这对社区的插件和组件来说非常有用，你可以根据不同的版本号采取不同的策略。 

​	**用法**： 

```js
var version = Number(Vue.version.split('.')[0])

if (version === 2) {
  // Vue v2.x.x
} else if (version === 1) {
  // Vue v1.x.x
} else {
  // Unsupported versions of Vue
}
```

