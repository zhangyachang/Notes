##一、准备工作

```js
// 准备工作
react
react-dom
babel-standalone

npm i -S react react-dom babel-standalone
```

##二、基本语法

###0. babel的手动和自动编译

```js
es6的代码转换es5
<script src="bebel-standalone/babel.js"></script>

Babel.transform(es6代码，{presets:['es2015']}).code;
```

```js
<script type="text/babel"> </script>
// 设置type = babel就会自动解析编译
```



```js
// 引入那三个js  babel react  reactDOM
<script src="../node_modules/babel-standalone/babel.js"></script>
<script src="../node_modules/react/umd/react.development.js"></script>
<script src="../node_modules/react-dom/umd/react-dom.development.js"></script>
```

###1. jsx

```jsx
html或xml 直接写在js中，不要加引号，这是jsx语法
    jsx允许 在模板里面 插入js变量
    用插值符号 {}
    {} -> 数字 布尔 字符串 表达式 即时函数 数组

    有些关键字是不能使用
    class -> className={'string'}
    style -> style={object}
    value -> defaultValue
    单标签要闭合
    for -> htmlFor
    focus -> autoFocus
    注释
    // 前端三大框架 angularJS vueJS ReactJS 都基于VM DOM
    虚拟DOM(内存) 生成真实的DOM
    根据数据 生成DOM节点
```



### 2.注释

里面用到了JSX的语法，用js写XML就是jsX

```jsx
const element = (
	<div>
        {
            只要进入了标签结构，除了在{}之中，就不能写js代码了
            以下三种注释都不成立   
        }
        // 
        /**/
        <!---->  // 这种还会报错
    </div>
)
```

正确的注释

```jsx
const element = (
    // 注释呢  这里没有进入标签结构 算是js代码的注释
    <div>
    {
        // 这样写注释
        /*
         *   这样写都是可以的
         *
         * */
    }
    { /*第二句注释*/ }
    <h1>这里的h1标签</h1>
    </div>
);
ReactDOM.render(
    // 这里是注释吗
    element,
    document.querySelector('#app')
);

element 的内容还可以是一个函数的返回值
```



### 3.插值

​	可以用三元表达式 函数返回值 插值 立即执行函数返回

```jsx
const person = {
    name: '狗蛋',
    age: 12,
    sex: 0,
    like: 'basketball'
};
function getSex() {
    if(person.sex){
        return '女';
    }else{
        return '男';
    }
}
const element = (
	<div> 
        { /*只要进入了标签结构中的{}之内就是写js代码的地方 */  }
        
        // 直接插入
        <p>{person.name}</p>
        
        // jsx里面不能用if else判断 用三元表达式
        <h1>性别 {person.sex?'女':'男'}</h1>  
        
        <h1>
            性别：{getSex()}  // 可以是一个函数的返回值
        </h1>
        
        // 可以是一个函数的自执行
        <h1>
            {
                (function () {
                    if(person.sex){
                        return <i>女</i>
                    }else{
                        return <i>男</i>
                    }
                })()
            }
        </h1>
        
    </div>
)
```



### 4.节点属性绑定

```jsx
const element = (
	<div>
        // class -> className
        // 单标签一定要闭合
        // value -> defaultValue
        // checked -> defaultChecked
        // 从数据结构里面取值
        <div className="box" title={'这里的呢'}>box</div>
        <input type="text" defaultValue="这个" title="title标签" />
        <input type="radio" defaultChecked />
        // 样式
        <div>
        	<h1 style={{color: 'red'}}>头部组件</h1>
      	</div>
    </div>
)
```



### 5.列表渲染

```jsx
// 数据可以是数字 字符串 标签（不要加引号 加了引号就是字符串）
// 要绑定key key是唯一标识 可以提升代码性能 diff算法

const arr = [
    1,2,3
];
const arr1 = [
    'a', 'b', 'c'
];
const arr2 = [
    <li key={'这里的1'}>这里的li</li>,
    <li key="2">这里的li2</li>,
    <li key="3">这里的li3</li>
];
const arr4 = [
    {name: '狗蛋1', age: 12},
    {name: '狗蛋2', age: 13},
    {name: '狗蛋3',age: 14},
];
const element = (
    <div>{arr4}</div>
);

const element2 = (function () {
    let elementStr = [];
    arr4.forEach((item,index) => {
        elementStr.push(<li key={index}>{item.name} {item.age} </li>);
    });
    return elementStr;
})();

const element3 = (
    <div>
        <h2>
            { /*如果数据是json对象，要JSON.string编译成字符串 当做文本插入到页面中*/ }
            {
                JSON.stringify(arr4)
            }
        </h2>
    </div>
);

// 用map方法 每一个遍历 map会自动返回出去一个数组会去循环遍历输出
```



### 6.事件处理

```jsx
function fn(){
    console.log('fn事件')
}
const element = (
    <div>
    {
        // onClick 事件驼峰命名
        // 事件绑定 都会给事件一个处理函数
    }
    <input type="button" value={'事件函数调用'} onClick={fn} />
    <input type="button" value={'行内事件'} onClick={function () {
    alert(1);
    console.log('我这里写了一个函数');
    }} />
    <input type="button" value={'es6语法'} onClick={() => alert('es6的语法')} />
    <input type="button" value="行间样式" onClick={alert('11')} />
</div>
);
```

```js
在 React 中的一点不同是你不能使用返回 false 的方式阻止默认行为。你必须明确的使用 preventDefault;
function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
}
在这里e 是一个合成事件。React 根据 W3C spec 来定义这些合成事件，所以你不需要担心跨浏览器的兼容性问题。查看 SyntheticEvent 参考指南来了解更多
```



### 7.无状态的组件

​	只是普通的变量 是没有状态的 组件才有状态或无状态

​	react 是单向数据流

​	状态其实就是让数据驱动视图的响应式数据

```js
let a = '这里的是div';
const element = (
    <div>
    	{a}
    </div>
);
ReactDOM.render(
    // 这里是注释吗
    element,
    document.querySelector('#app')
);
setTimeout(function () {
    a = '改变了值了吗';
},1000);
```



### 8.函数式声明

```jsx
// 这只是一个目标变量
const header = (
    <h2>头部</h2>
);
const main = (
    <h2>主体</h2>
);
const footer = (
    <h2>底部</h2>
);
// 这只是一个目标变量 没有状态
const element = (
    <div>
    {header}
    {main}
    {footer}
    </div>
);
```



**函数式声明**

```jsx
// 函数式声明组件
// 组件的名字首字母必须是大写
// 不要用H5新标签

function Hd () {
    return (
        <h2 className="hd">头部</h2>
    );
}
// 组件传值 这个也是无状态的组件 没有数据变化 视图也跟着变化
// 状态 其实就是让数据驱动视图的响应式数据
function Con (props) {
    return (
        <h2 className="main">主体内容 {props.zidingyi} </h2>
    )
}
function Ft () {
    return (
        <h2 className="main">主体内容</h2>
    )
}
// 有状态的组件 -> 让数据驱动视图的响应式数据
class MainCon extends React.Component {
    constructor() {
        super();
        // state 就是组件的状态
        // 从后端请求的数据 都是挂载到state上面
        // 相当是 vue data
        this.state = {
            name: '狗蛋'
        };
        setTimeout(() => {
            
  /*********只有这种方式改变的数据才回去响应视图******/
            
            this.setState({
                name: '狗蛋2'
            })
        },2000)
    }
    render () {
        return (
            <div>
            <h3> 内容 {this.state.name}</h3>
            </div>
        )
    }
}

const element1 = (
    <div>
        <Hd />
        <Con zidingyi={'这里是我的自定义的名字啊'} />
        <Ft />
        <MainCon />
    </div>
);
```



###9.从外部引入class模块

​	class关键字构建类

​	class继承父类

```jsx
window.MyComponent = class MyComponent extends React.Component {
    constructor () {
        super();
    }
    render() {
        return (
            <div>
                <h1>这里是h1标签</h1>
            </div>
        );
    }
};
```

```jsx
<script type="text/babel" src="./component.jsx"></script>
<script type="text/babel">
    ReactDOM.render(
    	<MyComponent />,
    	document.querySelector('#app')
    );
</script>
```



### 10.this以及事件对象

​	事件调用

​	this指向问题

```jsx
class MyComponent extends React.Component {
    constructor () {
        super();
        this.state = {
            msg: [
                <h2 key="1" >123</h2>,
                <h2 key="2" >456</h2>,
            ]
        };
        //**********方法1
        this.fn1 = this.fn1.bind(this);  // react官方推荐这种写法 
    }
    fn1(a, b, e) {
        console.log(a, b, e);
        // console.log(this);
        // console.log(this.state.msg);

        let msg = (this.state.msg).map((item, index) => {
            return item;
        });

        console.log(`下面是mesg`);
        console.log(msg);

        this.setState( {
            msg: msg.concat(<h2 key={3}>789</h2>)
        })
    }

    // 方法3 这种方式不需要改变了额就
    btn = () => {
        
    }
    
    render () {
        return (
            <div>
                {this.state.msg}
                <input type="button" defaultValue="事件一" onClick={this.fn1} />
                {/* 方法2 */}
                <input type="button" defaultValue="事件二" onClick={this.fn1.bind(this,1, 2)} />
                
                <input type="button" defaultValue="事件三" onClick={(e)=>{this.fn1(e,1,2)}} />
            </div>
        )
    }
}

ReactDOM.render(
    <MyComponent />,
    document.getElementById('app')
)
```

#### 10.1传递参数

```js
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>

这里值得注意的一点是，这里是js的语法
在函数的最后一个没有匹配的参数是  e
```



### 11. 操作dom元素

```jsx
/*
    多种方式操作DOM节点
*/
class List extends React.Component {
  render() {
    return (
      <div>
          <p>item</p>
      </div>
    )
  }
}


class Element extends React.Component {
  constructor(props) {
    super(props);

    this.fn = this.fn.bind(this);
  }

  fn(e) {
    // 1. 通过事件对象 获取DOM
    const {target} = e;
    console.log(target);

    // 2. 通过js获取 DOM
    let ele = document.querySelector('.wrapper');


    // 下面2中是通过react操作DOM
    // 对比上面哪个好  当然是react好

    // 3. 通过 ref 属性 操作 dom
    console.log(this.refs.abc);

    // 4. findDOMNode
    let a = ReactDOM.findDOMNode(ele);

    console.log('这里是findNOde');
  };

  handClick() {
    console.log('不执行吗');
    console.log('handle');
  }


  /*
    虚拟DOM
    只有当它插入文档以后，才会变成真实的DOM
    有时 我们需要从 组件中获取真实的DOM 可以用ref属性
    // 新版本React 不推荐使用 ref string , 转而 推荐我们使用ref callback
    // 通过此种方式 挂载 实例对象上面 ref callback -> this.属性名
    // 大多数据情况下 应该使用的DOM的固定引用 而非使用 findDOMNode方法
    // 因为当render返回null里 findDOMNOde也会返回null
    // 在使用ReactDOM。findDOMNode时 当参数是DOM 返回值 是此DOM
    // 当参数是Component获取 就是Component的 render中的dom
    // 多积累 形成我自己的知识体系

   */

  render(){

    return (
      <div className='wrapper' >

        <h1 ref="abc" onClick={this.fn}>这个东西啊</h1>
        <div className="123" ref={'abc'}> 

        </div>
        <List ref={list => this._list = list} /> //**********方法5
        <input
            type="button"
            defaultValue="操作dom"
            onClick={() => {
              this.handClick.bind(this);
              console.log(this);
              console.log(this.aaa);
              // 传入一个组件

              console.log(ReactDOM.findDOMNode(this._list));
              console.log( ReactDOM.findDOMNode(this._list) === this._list ); // false因为一个是组件 一个是dom元素
              // 传入一个元素
              console.log( ReactDOM.findDOMNode(this._aaa) === this._aaa ); // true
            }}
        />
      </div>
    )
  }
}


ReactDOM.render(
  <Element name="aaa" />,
  document.getElementById('app')
);
```



###12. 父子组件之间传值

```jsx
思想
// 父组件给子组件传值 直接在组件上面添加属性就可以了 子组件通过props访问，得到 其实是构造函数实例化的时候传过去了

// 子组件给父组件传值  其实是父组件给子组件传一个函数，子组件调用的时候把 要传递的数据 放到 父组件传递过来的函数 的参数里面，然后父组件再去做他自己的操作

class Item extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      sub: this.props.data
    }
  }
    
  componentWillReceiveProps(nextProps) {
    console.log('执行了吗');
    console.log(nextProps);
  }
    
  render() {
    console.log('子组件打印this');
    console.log(this);
    console.log(this.props);

    return (
      <div>
          <p>Item组件</p>
          <h1>{this.state.sub.res}</h1>
          <input type="button" defaultValue="这里" onClick={this.props.supFn.bind(this,'子组件参数')} />
          <input type="button"
                 defaultValue="22"
                 onClick={() => {
                   this.props.supFn('参数2')
                 }}

          />
      </div>
    );
  }
}
```

```jsx
class Main extends React.Component {
  constructor() {
    super();
    this.superFn = this.superFn.bind(this);

  }
  state = {
    data: {
      res: '里面的数据'
    }
  };

  superFn(a) {
    console.log('父组件的函数');
    console.log(`${a}`);
    let data = {
        res: '修改过后'
    };
    console.log(data);

    this.setState({
      data: data
    })
  }
  render() {
    return (
      <div>
        <p>主页面</p>
          <p>{this.state.data.res}</p>
        <Item supFn={this.superFn} data={this.state.data} aaa="传值啊"></Item>
      </div>
    );
  }
}

ReactDOM.render(
  <Main />,
  document.getElementById('app')
)
```





### 13.浏览器支持import

```js
<script type="module">
    // 要服务器环境下打开  http服务
    // chrome//flags 开启那个权限
    import a from './2.js';
    console.log(a)
</script>
```

```js
// 2.js
const a = 1;
const b = 2;

export default {a, b};
```



## 三、生命周期

**还是去官网去看那一张图片清晰明了**

什么是生命周期

​	一个组件从创建到销毁的过程

​	当组件实例被创建插入到DOM中，需要调用的函数，就是生命周期函数。

​	也就是说 组件加载完成前后、组件更新状态、组件销毁、所触发的一系列的方法

### 1.Mounting初始化(挂载)阶段

​	组件创建到首次渲染到页面

```jsx
constructor(){} 构造函数，在创建组件的时候调用一次
componentWillMount(){} 在组件即将被挂载的时候调用一次
    组件还没有渲染出来，但js逻辑已经开始执行了
    这里一般可以请求数据，但是最好不要在这里请求可能会造成页面空白，长时间加载不出来的情况
    // console.log(this.refs) 这时不能做dom操作
    // 请求后端接口 真实测试的会出现白屏（页面一直没有图片 文字 html结构 ）
    // this.setState() this.state this.props 都是异步的！
render() 渲染
componentDidMount() 在组件被挂载完成的时候调用一次 可以在这里使用refs
	组件已经被渲染出来了
```

**#####注意点####**#

 componentDidMount

```js
// 用户在网页上能够看到数据（图片 文字。。。）
// 这是第一阶段 相当于 用户打开了网页
// 真实的场景 会在此请求后端数据接口
// 请求回来的数据 会挂载到state里面
// 放在state里面的好处
// 1. 当前组件是根据state的数据进行渲染
// 2. state的数据是响应式数据 ，一但数据变化了，就会自动触发render函数
// 例子 点击 当前组件的元素 执行当前的事件函数 更新当前的组件数据b ，数据变化
// 就是自动触发render数据
// 当前组件 维护当前组件的 数据（状态）
```

### 2. 更新阶段

​	状态更新引起的变化

```jsx
componentWillReceiveProps(nextProps)  父组件的更新会触发子组件的这个函数
	nextProps 父组件更新的时候带来的数据
shouldComponentUpdate(nextProps, nextState)  // 下面的这些会在this.setState()之后顺序触发
	是否需要重新渲染
    return false/true
componentWillUpdate(nextProps, nextState) 即将更新
render() 渲染
componentDidUpdate() 完成更新
```

**注意**

shouldComponentUpdate

```js
this.setState({
	adasdafd: nextProps.title
})
在这里更改数据的话 会重复的再去触发一次渲染的那些东西，因为这个东西是一个异步的
小问题2
//就是那个哪里 父组件传给子组件的值之后，子组件是用this.props调用的，但是父组件改变之后，那个render里面的this.props会不会是改变之后的值  是
```

### 3. 销毁阶段

​	组件在销毁之前

```  js
componentWillUnmount() 即将销毁  注意 这里的销毁是销毁自己，并不是销毁子组件
```

Mounting和UnMounting阶段在组件的整个生命周期中只会出现一次

Updating阶段会在组件每次更新中都会执行
