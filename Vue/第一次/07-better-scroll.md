## better-scroll

```js
// 安装  npm install better-scroll --save
```

引入使用

```js
import Scroll from 'better-scroll'
const wrapper = document.querySelector('.wrappper');
const scroll = new Scroll('wrappper')

/如果是es5的语法
var Scroll = require('better-scroll');
```

## 详解网站

```js
如果要执行正在触发的事件，需要设置probeType

类型：Number
默认值：0
可选值：1、2、3
作用：有时候我们需要知道滚动的位置。当 probeType 为 1 的时候，会非实时（屏幕滑动超过一定时间后）派发scroll 事件；当 probeType 为 2 的时候，会在屏幕滑动的过程中实时的派发 scroll 事件；当 probeType 为 3 的时候，不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件。如果没有设置该值，其默认值为 0，即不派发 scroll 事件。
```



```js
https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/options.html#probetype
```

