## 打包并部署到服务器

**一些需要注意的事项**

```js
一、如果是直接 npm run build
    1. 生成的文件，如果放到服务器的根目录下面的话，是可以直接去生成的
    2. 如果放到服务器的二级目录，需要进行一些配置 
        例如： localhost:3000/react
        需要进行两处配置
            1. package.json中   "homepage": "." 
                改为相对路径
            2. 页面中的路由 BrowserRouter 设置 <BrowserRouter basename='/react' >
                需要在BrowserRouter上面设置一个 basename="二级目录的值"
       3. 此时你会发现网址上面每次点击页面中的元素时，浏览器的路由就会发生改变，但是当你输入这个地址的时候就会发现它是not find 找不到资源的，因为这个是浏览器路由，可以把浏览器路由 BrowserRouter换成HashRouter
    import {HashRouter as Router, Route, Switch} from 'react-router-dom'
    其他的部分不改变，此刻路由就会变成这种，多了哈希
    http://localhost:3000/react#/react/line
```

## 打包app

有很多的软件，把web项目打包成app

​    KM盒子

​    Hbuilder

```js
这个是要注册登录的

文件 新建 移动app
打开Hbuilder文件所在目录 
把自己打包后的项目的那个manifest的文件名字更改 然后href引入也更改 
把自己打包后的项目放入Hbuilder文件里面
把Hbuilder自己生成的配置文件打开  mainfest 

应用信息
    获取appid
    版本号自己设置
    页面入口
    横屏竖屏重力感应
图标配置
    选择一个图标
    然后自动生成
启动的图片
    不设置也可以
SDK
    会用到那个地图
设置完成之后保存

点击发行 打包原生安装包
    选择手机类型
    如果要上传到安卓市场里面 是需要申请的
```

安卓模拟器

​    MUMU模拟器

​    夜神模拟器

​    逍遥模拟器
