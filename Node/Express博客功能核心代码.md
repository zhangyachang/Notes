# 博客

## 写博客时的一些功能代码

### 1.注册

```js
//查询数据
'SELECT * FROM nodeuser where user = ?',[user],
//插入数据
'INSERT INTO nodeuser (id,user,pass) VALUES (0,?,?)',[user,pass],
    
 res.render('index.ejs');   render是用来响应模板ejs的
```

### 2. 登录

ajax

### 3.保存登录状态

```js
//设置cookie
//1.cookie的名称 2.数据   3.过期时间(毫秒)
res.cookie('login',{name:user},{maxAge:1000*60*60*24*365})
```

```js
获取cookie
req.cookies;
```

app.js

```js
const cookieParser = require('cookie-parser');

app.use(cookieParser('skefjksdjfkj'));  //密钥 不设置密钥我获取不到
//获取cookie
req.cookies['login'];

app.use(function(req,res,next){
    if(req,cookies['login']){
        res.locals.login = req.cookies['login']['name'];
    }
    next();  //注意  这里没有next这个函数没有出口 一直执行不下去
})
```

### 4.退出登录

清除cookie

网址重定向

```js
router.get('/logout',(req,res)=>{
    res.clearCookie('login');  //清除cookie
    //网址重定向
    res.redirect('/');
})
```

### 5.区分是普通用户还是管理员

```js
数据库里面定义一个新的东西，管理员设置一个值，普通用户设置一个值，在后端进行判断
看一下返回来的数据里面的一个
```

### 6.密码加密

crypto模块 node自带的  核心模块

```js
const crypto = require('crypto');

router.post('/',(req,res)=>{
    md5 = crypto.createHash('md5');
});
//加密过程
				加密   密码    编码格式
let newPass = md5.update(pass).digest('hex');
```

登录的时候判断

### 7.区分普通用户和管理员

admin  数据库插入的时候修改一下插入代码

管理员状态不能再cookie里保存，因为前台可以随意修改肯定是不可以的,有一个可以设置前台不可改

```js
具体的设置可以看Express中的session
req.session.admin = Number(data[0]['admin']);
```



### 8.删除



### 9.修改用户资料

网址问号后面的可以用  req.query来获取到

```js
<a href="/admin/user/updateuser?id=<%= data[i]['id'] %>">修改</a>
这个在后台可以这样接收
req.query这个来接收
```





### 10.提交文章

后台好多逻辑都是好多的判断，来判断用户的一些误操作

**1.send()这种会直接响应到页面，但是如果是ajax的话，就会返回到前端js里的ajax里面**

**2.数据库代码中的err一定要判断一下，因为如果是错误了就不会更新数据了**



### 11.发布文章

新建一个表来单独的保存文章内容

```sql
CREATE TABLE `node`.`article`(
 `id`     INT(11)  NOT NULL AUTO_INCREMENT,
 `title` varchar(64)	 NOT NULL ,
  `tag` varchar(64) NOT NULL ,
  `author` varchar(64) NOT NULL ,
  `content` longtext NOT NULL ,
  `time` varchar(64) NOT NULL ,
  PRIMARY KEY (`id`)
  )
ENGINE = InnoDB CHARSET=utf8;
```

发表的时间以服务器的时间为准，如果用户的时间错误了，那么提交的时间也就错误了

```js
router.post('/article',(req, res)=>{
    let title = req.body.title,
        tag = req.body.tag,
        author = req.body.author,
        content = req.body.content,
        //后台来发布时间，害怕前台的时间不正确
        time = new Date().toLocaleString().substring(0,10);
    sql('INSERT INTO article (id,title,tag,author,content,time) VALUES (0,?,?,?,?,?)',[title,tag,author,content,time],(err,data)=>{
        if(err){
            res.send('保存失败');
            return ;
        }else{
            res.json({
                result : '保存成功'
            })
        }
    })
});
```

###12.查询每一篇文章

```js
router.get('/article/:id.html',(req,res) => {
    // req.params 同时接收get , post , 其它 提交数据的形式
    //console.log(req.params);
    sql('select * from article where id = ?',[req.params.id],(err,data) => {
        if(data.length == 0){
            // status 返回页面的状态码
            res.status(404).render('404');
            return
        }
        res.render('article',{ data:data })
    })
});
```

查询的时候不会把每一篇文章查询出来，可以分页，然后倒叙

```sql
`SELECT * FROM article limit 1,3`;

#根据 id排序从新到旧
`SELECT * FROM article order by id desc limit 0,2`
```

查询数据还是在链接上面传递一个

```html
<a href="www.baidu.com/?id=1"></a>

后台接受
router.get('/article',(req,res)=>{
    console.log(req.query.id);
});
```

但是这种方式对seo优化不好，因为会在链接上面显示 ?数据

为什么会对seo优化不好呢，我记得百度搜索的时候也会有？的出现啊

```js
router.get(':/id',(req,res)=>{
    console.log(req.params)
})

{id:'7'};
如果把get里面的东西":/id"改为 "/:abc"  那么就是 
{abc:'7'}
```

**req.params**

```js
router.get(':/id/:abc',(req,res)=>{
    req.params 同时接受get post 其他提交数据的形式
    console.log(req.params)
})
{abc:'7',id:'666'};
```

**注意：我们需要的是xxx.html的格式**

```js
router.get(':/id.html',(req,res)=>{
    req.params 同时接受get post 其他提交数据的形式
    console.log(req.params)
})
{id:'7'}
```

### 13.处理不存在的网址

返回不存在的网址

```js
if(data.length === 0){
    //status 返回页面的状态码
    res.status(404).render('404.ejs');
}
//默认的是200  或者304  可以在network里面查看一下
```

### 14. 评论

实际过程中 评论不是保存到用户下的，是保存到一个新的表中的

```js
CREATE TABLE `node`.`articlepinglun`(
 `id`     INT(11)  NOT NULL AUTO_INCREMENT,
    //保存用户的id
 `uid` varchar(64)	 NOT NULL ,
    //文章id
  `wid` varchar(64) NOT NULL ,
  `content` varchar(64) NOT NULL ,
  PRIMARY KEY (`id`)
  )
ENGINE = InnoDB CHARSET=utf8;
```

**评论的时候保存一下那个文章id和用户id**

```sql
sql('INSERT INTO articlepinglun (id,uid,aid,content) VALUES (0,?,?,?)',[uid,aid,content]
```

### 15.文章分页

在文章详情页的上面创建路由

**文章列表路由格式**

```js
前端访问地址   'http://localhost:233/article/list-1.html'
//list- 与之前的都是固定的   这个应该跟正则表达式差不多的那种，只是为了取出那个页面的值
router.get('/article/list-:page.html',(req,res)=>{
    console.log(req.params);
    //从第0个开始，查询2条数据
    //sql('select * from article limit 0,2')
    //从新到旧  desc
    //limit 0,2 代表从第几个开始 查询几条
    sql('select * from article order by id desc limit ?,2',[(req.params.page-1)*2],(err,data)=>{
        if(data.length === 0){
            res.send(err);
            //res.render('articlelist',{data:data});      //文章列表
        }
        sql('SELECT * FROM article',(err,alldata)=>{
            res.render('articlelist',{articleListdata:data,alldata:alldata.length});
            console.log(alldata);
        })
    }) 
});
router('/article/:id.html',(req,res)=>{
    
})
```

前台

```html
<div>
	<% for(var i=0;i<alldata/2;i++){ %>
 		<a href="/article/list-<%= i+1 %>.html">第<%= i+1 %>页</a>
	<% } %>
</div>
```



### 16.访问量

更新数据都会了，每次访问一次就让他的访问量+1

就是数据库查询的时候，每一次访问就让他+1，但是不可能让他无限的增加，

​	可以记录ip

​	可以给一个用户发送一个期限为一天的cookie，然后就让它+1(评论点赞什么的也可以这样来做)

### 17.瀑布流

​	瀑布流的原理

​	这个原理就是下拉多少距离之后然后再请求分页的那种，然后再上传到前台

### 18.二级导航

​	这个涉及到数据库比较深了

```mysql
CREATE TABLE `node`.`nav`(
	`id` INT(11)
    `title`
    `navid` //保存着第几个导航
    `leve` //保存着导航的级别.
)

在第一个的navid一直都是1
然后下面有导航 级别为1
子导航 级别为2s
```

具体的实现

```mysql
CREATE TABLE `node`.`nav`(
 `id`     INT(11)  NOT NULL AUTO_INCREMENT,
 `title` varchar(64)	 NOT NULL ,
  `navid` varchar(64) NOT NULL ,
  `leve` varchar(64) NOT NULL ,
  PRIMARY KEY (`id`)
)
ENGINE = InnoDB CHARSET=utf8;
```



```js
// 查询数据多条件的还可以这样
sql('select * from nav where leve = 1',(err,data)=>{
    for(let i in data){
    	sql('select * from nav where leve = 2 and navid = ?',[data[i]['navid']],(err,data)=>{
    		//想要的格式
            [第一个导航，[第一个导航的子导航，子导航，子导航]]
		})
    }
})
```

**后面查询数据库代码用到了promise**

```js
这个地方比较特别都写了下来
```

```js
const sql = require('./mysql');

let fn = function (onedata,i) {
    return new Promise(function (resolve,reject) {
        sql('SELECT * FROM nav where leve = 2 and navid = ?',[onedata[i]['navid']],(err,twodata)=>{
            //console.log(twodata);
            onedata[i].child = twodata;
            resolve();
        })
    })
};

module.exports = function (cb) {
    sql('SELECT * FROM nav where leve = 1',(err,onedata)=>{
        let arr = [];
        for(let i in onedata){
            arr[i] = fn(onedata,i);
        }
        Promise.all(arr).then(function () {
            cb(onedata);
        })
    })
};
```

**所有的页面都需要导航，所以可以改造一下**

jsonp能做到的事情 ajax也全都可以做到，这么说对吗？



### 19.搜索功能

前台

```js
<form action="/search">
    <input type="text" name="search">
    <input type="submit" value="搜索">
</form>
```

后台

```js
router.get('/search',(req,res)=>{
    console.log(req.query.search);
    sql(`select * from article where title like ?`,['%'+req.query.search+'%'],(err,data)=>{
        res.send(data);
    })
});
```



### 20.富文本编辑器



### 21. buffer上传头像

buffer.js

​	把我们的数据进行数据类型的转换的

​	就是用来操作数据类型的

```js
// 读取文件的时候，如果不设置那个utf-8 他就是一个十六进制 或者说二进制的数
```

```js
fs.readFile('./app.js', (err, data) => {
    let a = Buffer.from(data, 'utf-8');
    console.log(a);
})
```

base 64

### 22. 在后台修改前台模板文件

逻辑搞清楚，不是太难，多想想

获取views下面所有的文件

```js
router.get('/views',(req, res) => {
    let dir = fs.readdirSync(join(`${process.cwd()}`, 'views'));
})
```

```js
dirtype = '1' 当前这个文件是模板
dirtype = '2' 当前这个文件是目录
```

```js
<% for(var i in dir){ %>
    <% if(dir[i].includes('.')){ %>
        <p data-dirtype="1" onclick="next()"><%= dir[i] %></P>
    <% }else{ %>
        <p data-dirtype="2" onclick="next()"><%= data[i] %> </p>
	<% } %>        
<% } %>
```

**后台**

```js
router.get('/views',(req,res)=>{
    let dir = fs.readdirSync(`${process.cwd()}/views`);
    //console.log(dir);
    res.render('views',{dir:dir});
});
router.post('/views',(req,res)=>{
   console.log(req.body);
   let dirtype = req.body.dirtype,
       dirname = req.body.dirname,
       content = req.body.content;
   if(dirtype === '1'){
       //console.log(dirname);
       fs.readFile(`${process.cwd()}/views/${dirname}`,'utf-8',(err,data)=>{
           console.log('返回数据');
           console.log('data');
           res.json({
               dirname : dirname,
               content : data
           })
       });
       return ;
   }
   if(dirtype === '2'){
       fs.readdir(`${process.cwd()}/views/${dirname}`,(err,data)=>{
           res.json({
               dirtype : 2,
               dirname : dirname,
               content : data
           })
       });
       return ;
   }

   if(dirtype === '3'){
       fs.writeFile(`${process.cwd()}/views/${dirname}`,content,(err,data)=>{
           res.json({
               result : '成功'
           })
       })
   }
   //再把所有的一起读取出来 返回给前台

   /* let dir = fs.readdirSync(`${process.cwd()}/views`);
   for(let i in dir){
       dir[i].inludes('.')
   }
*/
});
```

**前台**

```html
<body>
    <% for(var i in dir) {%>
        <% if(dir[i].includes('.')){ %>
            <p data-dirtype="1" onclick="next(this)"> <%= dir[i] %> </p>
        <% }else{ %>
            <p data-dirtype="2" onclick="next(this)"> <%= dir[i] %> </p>
        <% } %>
    <% } %>
<script>
    let dirname,
        dirtype;
    function next(_this) {
        if(_this.getAttribute('data-dirname') === null){
            dirname = _this.innerText;
        }else{
            dirname = `${_this.getAttribute('data-dirname')}/${_this.innerText}`;
        }
        dirtype = _this.getAttribute('data-dirtype');
        //console.log(dirname,dirtype);

        $.ajax({
            url:'/admin/views',
            type:'post',
            data:{
                dirname:dirname,
                dirtype:dirtype
            },
            success:function (data) {
                if(data.dirtype === 2){
                    //这里面是文件夹的形式
                    document.body.innerHTML = '';
                    for(var i in data['content']){
                        if(data['content'][i].includes('.')){
                            document.body.innerHTML += `
                            <p data-dirname="${data.dirname}" onclick="next(this)" data-dirtype="1">${data.content[i]}</p>
                        `
                        }else{
                            document.body.innerHTML += `
                            <p onclick="next(this)" data-dirtype="2">${data.content[i]}</p>
                        `
                        }
                    }

                }else{
                    //这个里面就是可以读取的内容
                    document.body.innerHTML = `
                        <span data-dirname='${data.dirname}' onclick="back(this)">返回</span>
                        <textarea>${data.content}</textarea>
                        <button onclick="sub(this)">修改</button>
                    `
                }
            }
        })
    }
    
    function back(_this) {
        console.log(_this.getAttribute('data-dirname').substring(0,5));
        $.ajax({
            url:'/admin/views',
            type:'post',
            data:{
                dirtype:'2',
                dirname:_this.getAttribute('data-dirname').includes('/')?_this.getAttribute('data-dirname').substring(0,5):''
            },
            success:function(data){
                //console.log(data);
                document.body.innerHTML = '';
                for(let i in data.content){
                    if(data.content[i].includes('.')){
                        document.body.innerHTML += `<p onclick="next(this)" data-dirtype="1">${data.content[i]}</p>`;
                    }else{
                        document.body.innerHTML +=  `<p onclick=next(this) data-dirtype='2'>${data.content[i]}</p>`;
                    }
                }
            }
        })
    }

    //修改数据
    function sub() {
        console.log($('textarea').val())
        $.ajax({
            url:'/admin/views',
            type:'post',
            data:{
                dirtype:'3',
                dirname:dirname,
                content:$('textarea').val()
            },
            success(data){
                console.log(data);
                alert('修改成功');
            }
        })
    }
</script>
</body>
```



### 23.爬虫

​	说的简单点就是服务器端的ajax

​	服务器端的请求，去请求别的数据

**小例子1**

```js
const http = require('http'),
    https = require('https');

//向外发起http get请求
http.get('http://nodejs.cn/',function (res) {
    //回调里面有几个东西
    let html = '';
    //监听 当请求有数据的时候触发
    res.on('data',function (data) {
        html += data;
    });
    //当请求完成的时候触发
    res.on('end',function () {
        console.log(html);
    })
});
```

**小例子2**

```js
const http = rquire('http')，
	https = requires('https'),
options = {
    hostname : 'node.cn',   //不带http
    psth : '/api/',			//主域名之后的
    post ： '80',   		//端口 默认的80
    headers:{   //我们自己弄的话，他的默认参数有的就不是那种了 设置一下编码格式
    	//设置编码格式  属性必须带引号了
    	"Content-Length":"utf-8",
	}
}

const fs = require('fs');

//向外发送http 的 get请求

//1.网址  2.回调
http.get('http://node.js.cn/', res=>{
    //请求图片的时候需要设置一下请求编码格式为二进制
    res.setEncoding('binary');
    //当请求有数据的时候出发
    let html = '';
    res.on('data',(data)=>{
        html += data;
    });
    //当我们请求完成的时候
    res.end('end',(data)=>{
        //请求的是html网页，所以返回的也是一个html内容
        console.log(html);
    })
});
```

**请求图片**

请求图片的时候需要设置一下请求编码格式为二进制

```js
res.setEncoding('binary');
```

```js
const http = require('http'),
    https = require('https');
   /* option = {
        hostname : 'nodejs.cn',
        path:'/api/',
        port:'80'  //端口

    };*/

const fs = require('fs');
//向外发起http get请求
https.get('https://gss1.bdstatic.com/-vo3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=8d59070cb73eb13544c7b0bd9e25cfee/58ee3d6d55fbb2fb4e4573f6444a20a44723dce3.jpg',function (res) {
    //回调里面有几个东西
    res.setEncoding('binary');
    let img = '';
    //监听 当请求有数据的时候触发
    res.on('data',function (data) {
        img += data;
    });
    //当请求完成的时候触发
    res.on('end',function () {
        fs.writeFile('./2.png',img,'binary');
    })
});
```

