## mysql笔记

1.启动命令行方式 

2.连接mysql数据库

```mysql
mysql -uroot -pmysqladmin
-u 标记的是输入用户名  
-p标记的是密码
```

3.建立一个新的数据库

```js
CREATE DATABASE mldn CHARACTER SET UTF8;
```

4.查看所有的数据库

```mysql
SHOW DATABASES
```

查看当前数据库的数据表

```js
show tables
```

5.使用mldn数据库

```js
USE mldn;
```

6.建立数据表

```js
CREATE TABLE news(
    nid int auto_increment,
    title varchar(30) NOT NULL,
    content text,
    constraint pk_nid primary key(nid)
) engine=innodb CHARSET=utf8;
```

在mysql里面不能使用number varchar  只能够使用 INT DOUBLE TEXT VARCHAR类型其中

AUTO_INCREMENT表示nid的列采用自动增长的方式进行，最后加上的engine=innodb表示此表具备事务处理能力

7.数据插入

```js
INSERT INTO NEWS(title,content) VALUES ('小小','内容举国清河十一');
insert into news (title,content) values ('小小','内容');
```

8.如果要在mysql之中取得增长后的主键使用如下方法

```js
select last_insert_id()
```

9.分页操作

```js
统一使用 LIMIT进行 即：在所有查询语句的最后一块写上LIMIT
```

查询LIMIT 开始行 长度

范例：查询1-5条

```js
select * from news where 1=1 LIMIT 0,5
```

​    MYSQL的下标是从0开始的   分页要比oracle简单很多

​    而如果程序想要使用mysql开发

重启mysql

```js
service mysql restart
```

显示数据表的名字

```js
show create table '表名'
```

导入sql文件

```js
source d:/db_akjsd.sql;
```

## 在node中的使用

```js
问题
    有一个小问题，为什么那个查询的地方的函数的参数对应不上它不会报错
小知识点 数据库 编码格式 自动增长 主键
```

​    当时连接数据库真的是麻烦~~,也就是配置麻烦，其实用起来非常简单，前期主要先去学习一下基本的数据库建表，增删改查就没问题了

- 安装 mysql 模块

```js
npm i -S mysql
```

- 基本的连接和使用

```js
const mysql = require('mysql');

let config = mysql.createConnection({
    // 数据库的地址
    host:"localhost",
    // 数据库的地址
    user:"root",
    password:"",
    // 数据库端口
    port:"3306",
    // 使用哪个数据库
    database:"data"
});
// 开始连接
config.connect();
// 进行数据库操作  1. 数据库代码  2.回调
config.query('SELECT * FROM article',(err,data) => {
    console.log(err,data);
});
// 结束连接
config.end();
```

### 增删改查

- 数据库语句简单的建表和增删改查

```sql
创建    表     node这个数据库里面创建一个user表
CREATE TABLE `node`.`nodeuser`(
//id字段 int(11)数据类型，最大的值为11位   id自动增长
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `username` varchar(64) NOT NULL,
    `pass` varchar(64) NOT NULL,
    PRIMARY KEY(`id`)//重要 主键
)
ENGINE = InnoDB CHARSET = utf8;
```

```sql
CREATE TABLE `node`.`nodeuser1`(
   `id` INT(11) NOT NULL AUTO_INCREMENT,
    `usernamne` varchar(64) NOT NULL,
    `pass` varchar(64) NOT NULL,
    PRIMARY KEY(`id`)
)
ENGINE = InnoDB CHARSET = utf8;
```

```sql
// 增 固定代码 哪个表
INSERT INTO 'user' (`id`, 'username', 'pass') values (1, 'goudan', '123');
```

```sql
// 删 删article表的数据 因为id是唯一的
DELETE FROM user where id = 0
```

```mysql
//改
update `xxx` set `username`=`1234` where `id`=6666;
```

```sql
//查询
SELECT *FORM `shuoshuo`;
SELECT *FORM `shuoshuo` WHERE `id`=?

'SELECT * FROM nodeuser where user = ?',[user]
```

### mysql.js

放到自己的文件夹下面

```js
// mysql.js

const mysql = require('mysql');
//连接数据库
module.exports = function(sql,values,callback){
    //连接数据库的一堆
    let config = mysql.createConnection({
    // 数据库的地址
        host:"localhost",
        // 数据库的地址
        user:"root",
        password:"",
        // 数据库端口
        port:"3306",
        // 使用哪个数据库
        database:"data"
    });
    // 开始连接
    config.connect();
    // 进行数据库操作  1. 数据库代码  2.回调
    config.query('SELECT * FROM article',(err,data) => {
        console.log(err,data);
    });
    // 结束连接
    config.end();
    //插入的格式  1.数据库代码  2.动态的值 3.回调
    config.query(sql,values,(err,data)=>{
        callback(err,data);
    }) 
}
```

**简单的使用**

```js
const sql = require('../module.mysql');

router.get('/',(req,res)=>{
    //对应传参  sql  callback
    sql(`SELECT` * FORM `nodeuser`,(err,data)={
        //console.log(data);
        res.render('index.ejs',{data:data});
    })
});
//接受前端提交的
router.('/reg',(req,res)=>{
    console.log(req.query);  //{name:'goudan',pass:'123'};
    //req.query
    //插入到数据库
    //?代表动态数据   id不管写什么都会自动增长，所以写了一个0 
    //  [] 动态的值 是以数组的形式出现的
    sql('INSERT INTO `nodeuser` {`id`, `username`,`pass`} ' ) VALUES (0,?,?）,[req.query.name,req.query.pass]，(err,data)=>{

    });
})
```

```ejs
index.ejs

//注册
//get 提交的时候看网址，通过网址传的参数
<form action="/reg" method="get">
    <input type="text" name="name" />
    <input type="text" name="pass" />
    <input type="submit">
</form>


//*****ajax提交到后台

$.ajax({
    url : '/reg',
    type : 'get',
    data : {
        name : $().val(),
        pass : $().val()
    },
    success : function(data){
        console.log(data);
    },
});

//**************************
index.js里面响应js里的ajax
sql(---------------------,(req,res)={
     res.json({
        chenggong : '成功';
    });
})
```
