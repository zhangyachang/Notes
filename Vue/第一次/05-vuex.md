#### 安装

```js
在package.json文件中
开发环境中
cnpm i -S vuex
```

#### 使用

#### state 保存数据的属性

```js
新建一个文件夹 vuex
里面新建一个index.js文件

import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
  age: 20,
  name: 'abc'
}
// 语法检测的时候 new必须进行赋值 下面这一段代码是new的时候不赋值也是可以的
/* eslint-disable no-new */
export default new Vuex.Store({
  // 用来保存数据的
  state
})
```

**main.js 其他页面**

```js
// 引入进来的变量名是定死的 store
import store from '../vuex'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: function (h) {
    return h(App)
  }
})
```

**App.vue**

```js
<template>
  <div id="app">
    这里是.vue文件
    <button @click="a()">按钮</button>
    <v-header :aaa="aaaa"></v-header>
    {{$store.state}}
    {{name}}
    <router-view :aa="aaaa"></router-view>
  </div>
</template>

//这个里面保存了他的值  保存了  vuex中state中的值
import {mapState} from 'vuex'
export default {
  name: 'App',
  data () {
    return {
      aaaa: 'aaaaaa'
    }
  },
  computed: {
    ...mapState([
      'name',
      'age'
    ])
  },
  methods: {
    a () {
      alert(this.name)
      alert(this.age)
    }
  },
  components: {
    'v-header': header
  }
}
```

#### mutations  actions getters

vuex /index.js

```js
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
  age: [1, 2, 3, 4, 5, 6],
  name: 'abc'
}
// 主要是用来操控 state里面的数据的
const mutations = {
  addage () {
    state.age++
  },
  jian () {
    state.age--
  }
}
// 来调用mutations 里的方法
// 可以进行异步操作
const actions = {
  addagepro (a) {
    // 默认接收了一个参数
    // 可以先做一些其他的东西 再去进行我们上面的操作
    console.log(a)
    console.log(a.commit('jian'))
  }
}
// 相当于 vue里面的computed的作用 作用于state 过滤操作...
const getters = {
  guolv (state) {
    /* return state.age.filter( function (i) {
      return i > 5
    } ) */
    state.name = '123'
  }
}
// 语法检测的时候 new必须进行赋值 下面这一段代码是new的时候不赋值也是可以的
/* eslint-disable no-new */
export default new Vuex.Store({
  // 用来保存数据的
  state,
  mutations,
  actions,
  getters
})

```

**App.vue**

```js
<template>
  <div id="app">
    这里是.vue文件
    <button @click="addage()">按钮</button>
    <button @click="jian()">按钮</button>
    <button @click="addagepro()">这个pro升级版</button>
    <button @click="guolv()">过滤</button>
    <v-header :aaa="aaaa"></v-header>
    {{$store.state}}
    {{name}}
    <router-view :aa="aaaa"></router-view>
  </div>
</template>
<script>
import header from './components/header'
import {mapState, mapMutations, mapActions, mapGetters} from 'vuex'
export default {
  name: 'App',
  data () {
    return {
      aaaa: 'aaaaaa'
    }
  },
  computed: {
    ...mapState([
      'name',
      'age'
    ]),
    ...mapGetters([
      'guolv'
    ])
  },
  methods: {
    ...mapMutations([
      'addage',
      'jian'
    ]),
    ...mapActions([
      'addagepro'
    ]),
    a () {
      alert(this.name)
      alert(this.age)
    }
  },
  components: {
    'v-header': header
  }
}
</script>
```

