## 一、Router

### 1. 准备工作

​	安装  cnpm i react-router-dom -S

​	去github中react-router中查看官方文档

```js
// 这一个简单的中文文档写的不错，有解析的那种，nice
https://www.jianshu.com/p/97e4af32811a
```

### 2.路由概念

```js
路由作用
react-router
	提供了一些router的核心api，静态的
    	Router，Route，Switch等，但是他没有提供dom操作进行跳转的api
react-router-dom
	提供了BrowserRouter，Router，Link等api，动态的
    	我们可以通过dom的事件控制路由
BrowserserRouter路由和HashRouter路由
	是路由的基本
    就像路由器一样去管理网络及给每个接入进来的用户分发ip
    是一个大容器 包裹着路由
    HashRouter它是通过hash值来对路由进行控制。如果你使用HashRouter，你的路由就会默认有 /#/
    BrowserRouter它的原理是使用HTML5 history API(pushState，replaceState，popState)来使你的内容随着		url动态改变的，如果放到二级目录下给BrowserRouter增加 basename 属性
Switch
	会用来包裹Route，它里面不能放其他html元素，用来只显示一个元素
Route
	控制路径对应显示的路由
    标签属性有exact、path、以及component
    	exact是严格匹配，控制匹配到/路径时不会在继续向下匹配（？？？这个是对的吗）
		path是标识路由的路径
        	/path/:id路由参数
            component则表示路径对应显示的组件
Link和NavLink
	两者都是可以控制路由跳转的
    Link标签有to属性
    	to可以接受一个string或者一个object，来控制url
    NavLink它可以为当前选中的路由设置类名、样式以及回调函数等
    <NavLink to="/news" exact activeClassName="aaa" ></NavLink>
Redirect
	重定向
    属性 from="" to="/"
	404
params与query
	this.props.match 来获取路由(/news/list123)参数
    可以通过node的
    模块来获取路由（/news/list?name=aa&age=12）参数
```

```js
1. 通过js跳转
	<redirect />

2. 子路由的嵌套
render={(props) => {
        <组件名 {...props传给子级} routes={子路由列表传给子集} >
       }}
       子组件就能获取routes:[
           {
               path: '/',
               exact: true,
               component={aa}
           },
           {
           		……
           }
       ];
通过map循环生成this.props.routes.map((item, index) => {
    return (
    	<Route
        	key={index}
        	path={item.path}
        	exact={item.exact}
        	component={item.component}
        />
    )
})
3.阿里图标的使用

4.父组件给子组件传值，在子组件里可以设置默认的props属性值
在子组件里 子组件名.defaultProps = {
    title: "默认的标题"
}
5.定义父组件传值类型
import Prototypes from "prop-types"
子组件名.propTypes = {
    title: Prototypes.number
}
6.404
7.NavLink
8.路由设计思想
可以做一个路由的小练习，打包并发布到服务器去检查看一下
```



###3.开始使用

#### 1. 入门

```jsx
// 最基本的使用
import {BrowserRouter as Router, Route, NavLink} from "react-router-dom";

import Home from './component/home'
import News from './component/news'
import Game from './component/game'

class App extends Component {
  render() {
    return (
      <Router> // 都要放到这个里面
        <div>
          <div className='nav'>
        	{/*就是a标签*/}
              <NavLink to='/'>首页</NavLink>
              <NavLink to='/news'>新闻</NavLink>
              <NavLink to='/game'>游戏</NavLink>
          </div>
        	{/*Route是用来匹配url路径并用来承载dom节点的*/}
          <Route exact path='/' component={Home} />
          <Route path='/news' component={News} />
          <Route path='/game' component={Game} />  
        </div>
      </Router>
    );
  }
}
```

#### 2. 404页面

Switch

```jsx
import {Switch} from 'react-router-dom'

// 如果没有Switch的情况是从上到下匹配，全部匹配完成，满足条件的都显示
#Swicth 的情况就是 从上到下匹配 直到遇到一个匹配成功了，显示它，后面的都不再去匹配了

<Switch>
    <Route exact path='/' component={Home} />
    <Route path='/news' component={News} />
    <Route path='/game' component={Game} />
    <Route component={Not404} />
</Switch>
```



#### 3. 路由传参

**动态路由传参**

```jsx
#News.jsx
<li><Link to={'/newsDetail/111'}>新闻列表111</Link></li>
<li><Link to={'/newsDetail/222'}>新闻列表222</Link></li>
<li><Link to={'/newsDetail/333'}>新闻列表333</Link></li>

#Route
<Route path="/newsDetail/:id" component="NewsDetail">

#NewsDetail.jsx
跳转到这里来之后可以在这里来获取的
this.props.match.params 后面的那个id的动态路由
```

**get方式传参**

```jsx
#News.jsx
<li><Link to={'/newsDetail?serch=111&name=aaa'}>新闻列表111</Link></li>
<li><Link to={'/newsDetail?search=222&name=bbb'}>新闻列表222</Link></li>
<li><Link to={'/newsDetail/?search=333'}>新闻列表333</Link></li>

#Route
<Route path='/newsDetail' component={NewsDetail} />

#NewsDetail.jsx
跳转到这个页面中也可以从this.props中查看
this.props.location 的内容中有那个路由参数 可以切割它获取到参数
这里用node中的url那个模块来做

import Url from 'url'
Url.parse(url, true); 
Url.parse(this.props.location.search, true).query; 就可获取到json格式的参数
```

##### 3.1 params传参

```jsx
// 在实际的开发中还遇到了一些其他的问题，比如就像vue中的那种不在路由中传参的方式
this.props.history.push({
    pathname: '/registType',
    query: {
        name: 'aaa',
        age: 12
    },
    state: {
        post: 'post传递'
    },
    zidingyi: {
        "aaa": '自定义的可以传递过去吗'
    }
});

// 这种可以自行的在其他的页面中查看
```

#### 4.二级路由

```js
其实也是和第一种差不多，只是在它该呈现的页面 使用Route匹配路径然后显示出来
```

App.js

```jsx
 <div className='nav'>
    <NavLink to='/'>首页</NavLink>
    <NavLink to='/news'>新闻</NavLink>
    <NavLink to='/game'>游戏</NavLink>
</div>

<Switch>
    <Route exact path='/' component={Home} />
    <Route path='/news' component={News} />
    <Route path='/game' component={Game} />
    <Route component={Not404} />
</Switch>
```

news.jsx

```jsx
class News extends Component {
  render() {
    console.log('新闻又重新渲染了吧');
    return (
      <div>
        <h1>News页面</h1>
        
        <ul>
            重中之重 重点
            ####这里的链接要使用一级路由的前面的部分，要不然根本进不来这里####
            
          <li><Link to={'/news/newsDetail?serch=111&name=aaa'}>新闻列表111</Link></li>
          <li><Link to={'/news/newsDetail?search=222&name=bbb'}>新闻列表222</Link></li>
          <li><Link to={'/news/newsDetail/?search=333'}>新闻列表333</Link></li>
        </ul>
        // 在它该呈现的地方显示出来
        <Route path='/news/newsDetail' component={NewsDetail} />
      </div>
    );
  }
}
```

#### 5. 路由模块化

​	在src目录下新建一个router的文件夹，把router.js放进去

```js
<Route > // 这个里面是不能传参给组件的
<News />  // 只有这种实际的组件才能传过去吧
```

router.js

```js
import 组件 from '组件'
const routers = [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/news',
    component: News,
    routes: [
      {
        path: '/',
        exact: true,
        component: Hello
      },
      {
        path: '/newsDetail',
        component: NewsDetail
      },
      {
        path: '*',
        component: Not404
      }
    ]
  },
  {
    path: '/game',
    component: Game
  },
  {
    path: '*',
    component: Not404
  }
];

export default routers;
```

App.js

```jsx
<Router>
  <div>
    <div className='nav'>
      <NavLink to='/'>首页</NavLink>
      <NavLink to='/news'>新闻</NavLink>
      <NavLink to='/game'>游戏</NavLink>
    </div>
    
    <Switch>
      {
        routers.map((item, index) => {
          if(item.exact){
            return (
              <Route
                key={index}
                exact
                path={item.path}
                component={item.component}
              />
            )
          }
          return (
            <Route
              key={index}
              path={item.path}
                // Route不能传参
                // 重点  这里 使用 Route的话传参是传不过去的 要使用 render
              render={(props) => {
                return (
                  <item.component
                    {...props}
                    {...item}
                  />
                )
              }}
            />
          )
        })
      }
    </Switch>
  </div>
</Router>
```

news

```jsx
<div>
  <h1>News页面</h1>
  
  <ul>
    <li><Link to={'/news/newsDetail?search=111&name=aaa'}>新闻列表111</Link></li>
    <li><Link to={'/news/newsDetail?search=222&name=bbb'}>新闻列表222</Link></li>
    <li><Link to={'/news/newsDetail/?search=333'}>新闻列表333</Link></li>
  </ul>
  
  <Switch>
    {
      this.props.routes.map((item, index) => {
        if(item.exact){
          return (
            <Route
              key={index}
              exact
              path={`${this.props.path}${item.path}`}
              component={item.component}
            />
          )
        }
        return (
          <Route
            key={index}
            path={`${this.props.path}${item.path}`}
            component={item.component}
          />
        )
      })
    }
  </Switch>
</div>
```



##二、Redux

### 1.准备工作

####1 .插件

​	安装redux  cnpm i -S redux

​	在react中使用redux  react-redux

####2.调试工具

​	谷歌里面有  redux 的

​	还有一个 react 组件也是的

#### 3.概念

```js
redux的概念
	专注于状态管理 vuex也是
    是个独立的库，跟react没关系，vue，angular也可以用redux
    整体的只有一个状态对象，单向数据流处理
    核心概念 store state action reducer
命令模式设计思想
redux的基本原理使用
redux和react结合使用
调试工具
	redux-devtools-extension
中间件处理异步操作
react-redux
配置装饰器
	babel-plugin-transform-decorators-legacy
```



###2. 开始使用redux

可以去查看官网上面去查看

####1. 入门小例子

```js
// redux/redux.js

import { createStore } from 'redux';
/**
 * 这是一个 reducer，形式为 (state, action) => state 的纯函数。
 * 描述了 action 如何把 state 转变成下一个 state。
 *
 * state 的形式取决于你，可以是基本类型、数组、对象、
 * 甚至是 Immutable.js 生成的数据结构。惟一的要点是
 * 当 state 变化时需要返回全新的对象，而不是修改传入的参数。
 *
 * 下面例子使用 `switch` 语句和字符串来做判断，但你可以写帮助类(helper)
 * 根据不同的约定（如方法映射）来判断，只要适用你的项目即可。
 */
function counter(state = 0, action) {
  switch (action.type) {
  case 'INCREMENT':
    return state + 1;
  case 'DECREMENT':
    return state - 1;
  default:
    return state;
  }
}

// 创建 Redux store 来存放应用的状态。
// API 是 { subscribe, dispatch, getState }。
let store = createStore(counter);

// 可以手动订阅更新，也可以事件绑定到视图层。
store.subscribe(() =>
  console.log(store.getState())
);

// 改变内部 state 惟一方法是 dispatch 一个 action。
// action 可以被序列化，用日记记录和储存下来，后期还可以以回放的方式执行
store.dispatch({ type: 'INCREMENT' });
// 1
store.dispatch({ type: 'INCREMENT' });
// 2
store.dispatch({ type: 'DECREMENT' });
// 1

弄完了上面的这些感觉也没有什么用，其实就是订阅发布设计模式
之前改变数据是使用 setState 现在是使用 store.dispatch() 发布事件 让组件去修改 store内部的数据
##  重点 使用 subscribe订阅render函数，每次发布完就去重新渲染
```

####2.redux和react相结合

```js
如果想要在其他组件里面使用，肯定是需要把上面的那个小案例的那种导出去
```

**reducer**

```js
export function reducer(state=0,action){
    switch (action.type) {
      case 'add':
        return state + 1;
      case 'reduce':
        return state - 1;
      default:
        return state;
      }
}
```

**action**

```js
// 根据我的理解这种就是那种  一般情况下使用   action函数
{type: 'add'} 这种东西 

// 还有一个就是 action函数 返回一个action
export function add(){
    return {type: 'add'}
}
export function reduce(){
    return {type: 'reduce'}
}
```

**index.js ------> store**

```js
import {createStore} from 'redux'
import reducer from 'reducer'
let store = createStore(resucer);

//******************
// 页面状态改变的核心原理

// 订阅
function render(){
    ReactDOM.render(
    <App
      store={store}
      add={add}
      reduce={reduce}
    />,
    document.getElementById('root'));
}


// 订阅 在组件内部dispatch 想要重新渲染新的状态 在此就需要render 重新渲染
store.subscribe(render)

//****************
render();
```



```js
// 其他组件需要修改状态 就dispatch之后的action就行了 
// 这边其实就是组件传值 改变之后需要订阅一个重新渲染页面的函数

class App1 extends Component {
  render() {
    let store = this.props.store;
    return (
      <div>
        <p>一共有{this.props.store.getState()}个</p>
        <input type="button" onClick={() => {store.dispatch(this.props.add())}} defaultValue='增加' />
        <input type="button" onClick={() => {store.dispatch(this.props.reduce())}} defaultValue='减少'/>
      </div>
    );
  }
}
export default App1;
```



###3.中间件

#### 1.redux-thunk

​	中间件封装了很多实用的方法

​	redux 处理异步 那么就需要用到 redux-thunk

```js
cnpm i -S redux-thunk  
// 使用这个就可以发布异步函数 看后面的例子代码 中间件使用 thunk
```

```js
官网有介绍怎么使用
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import { selectSubreddit, fetchPosts } from './actions'
import rootReducer from './reducers'

const loggerMiddleware = createLogger()

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware, // 允许我们 dispatch() 函数
    loggerMiddleware // 一个很便捷的 middleware，用来打印 action 日志
  )
)
```

异步action的写法

```js
// 异步增加
export function addAsync() {
  // 可以返回函数
  return dispatch => {
    setTimeout(() => {
      dispatch(add())  // 这里可以发布其他的东西
    },2000)
  }
}
```



#### 2. 谷歌调试工具	

调试工具  vue ---> devtools   vuex  devtools

​	react devtools redux devtools

#### 3.使用react-redux

```jsx
// 使用 react-redux  开发者工具中的redux-devTools这个东西就可以显示了

// 引入redux
// compose 是一个组合函数 把redux和reduxTools结合起来 window.devToolsExtension
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from "react-redux";

// 使用中间件
let store = createStore(reducer, compose(
  applyMiddleware(thunk),
  window.devToolsExtension?window.devToolsExtension():function () {}
));

// 上面的测试了一下 好像那个devTools不存在会报错 用下面的这种 以后的版本会废用 devToolsExtension，建议用下面这个 __REDUX_DEVTOOLS_EXTENSION__
const store = window.__REDUX_DEVTOOLS_EXTENSION__1?(
  createStore(
    reducer,
    compose(
      applyMiddleware(
        loggerMiddleware,
        thunkMiddleware,
      ),
      window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  )
  ):
  (
    createStore(reducer,
      applyMiddleware(
        loggerMiddleware,
        thunkMiddleware,
      )
    )
  );



ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
```



**react-redux** 优化代码

```jsx
// 可以查看官网 https://react-redux.js.org/introduction/quick-start

// 更优雅的去管理数据
cnpm i -S react-redux

// 一层嵌套一层 用组件传值 太乱了 这个组件负责更好的去写代码、
// 这是一个组件  用这个东西去包裹 APP组件 把要传递的数据放到Provider中
import {Provider} from 'react-redux'
//******************************************

// 引入redux
// compose 是一个组合函数 把redux和reduxTools结合起来 window.devToolsExtension
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from "react-redux";

import {reducer} from './redux2/redux'


// 使用中间件
let store = createStore(reducer, compose(
  applyMiddleware(thunk),
  window.devToolsExtension?window.devToolsExtension():function () {}
));

ReactDOM.render(
  <Provider store={store}>   // 这里要把那个 store 给传过来
    <App/>
  </Provider>,
  document.getElementById('root')
);

//********************************************




在其他组件中就可以直接去调用使用redux中的 数据 和 action函数了 了
// App.js
// 连接器
import {connect} from 'react-redux'
import {add, reduce, async} from './redux/redux'


// 把想要的属性挂载到 props
const mapStateToProps = (state /*, ownProps*/) => {
  return {
    abc: state.counter
  };
};
// 把要使用的方法挂载到 props
const mapDispatchToProps = { add, reduce, async };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App); // 挂到这个组件上面



//************************************
// 代码中就可以随意去写东西了
<div>
    <h1>主页面</h1>
    {
        this.props.state
    }

<p>一共有{this.props.state}个坦克</p>
<input type="button" onClick={this.props.add} defaultValue='增加坦克' />
    <input type="button" onClick={this.props.reduce} defaultValue='减少坦克'/>
        <input
            type="button"
            defaultValue={'异步增加坦克炮'}
            onClick={this.props.addCannonAsync}
		/>
</div>
```

#### 4. 进一步优化代码

**还可以再引入一个东西让代码结构更清晰，在开发环境下面引入**

```js
babel-plugin-transform-decorators-legacy
查看npm官网上面对这个插件的描述，发现要重新设置一下
webpack>7
npm run eject // 生成配置文件
安装并配置

{
  "plugins": [
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
  ]
}

然后上面的那个 react-redux的拓展的东西就可以这样写了 直接这样就可以代替上面所有的操作了
import {add, reduce, addCannonAsync} from './redux2/redux'

@connect(
  (state)=>({state: state}),  
  {add, reduce, addCannonAsync}
)
```