几种经常用到的UI组件库

## ElementUI

```js
这个主要是PC端的组件

官网  http://element-cn.eleme.io/#/zh-CN
安装  cnpm i element-ui -S
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)
```

```js
use的使用
Vue.use(ElementUI)
组件库，在内部注册了各种全局的组件   Vue.use(Element) 
插件 挂载属性    Vue.prototype.$axios = axios    this.$axios.get('/')
```

## Mint UI

```js
移动端的

官网 https://mint-ui.github.io/#!/zh-cn
安装  npm install mint-ui -S

// 引入全部组件
import Vue from 'vue';
import Mint from 'mint-ui';
Vue.use(Mint);
```

## Mui

```js
官网  http://dev.dcloud.net.cn/mui/
不是基于 vue的 是基于css js的
```

## Vux

```js
这个插件还挺好的
```
