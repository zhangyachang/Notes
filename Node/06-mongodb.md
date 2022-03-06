# Mongodb

## 概念解析

对比sql中的一些概念

```sql
sql数据库			Mongodb数据库        说明
database            database            数据库
table               collection          数据表/ 集合
row                 document            数据记录行/ 文档
index               index               索引
table joins	                            mongodb不支持表的连接
primary key          primary key 	    主键
```

## 配置和启动

数据库服务端 和客户端

```js
//改变环境变量
mongo                  安装包下面的bin 设置全局变量
```

```js
mongod 是服务端
mongo 是客户端
//开机命令 	后面的是路径会自动生成一堆好多东西
mongod --dbpath D:\blog\mongoDB_dataBase
// 再启动一个命令行 输入 
mongo  // 就可以连接到数据库了
```

## 常用命令

**数据库**

```js
//查看数据库
show dbs
//查看当前数据库
db
//创建数据库 如果数据库不存在，则创建数据库，否则切换到指定数据库
use users

//删除数据库 
use user  //先切换到数据库当中去
db.dropDatabase()
```

**集合操作**  ---- 表

```js
show collections  // 查看集合
// 在 MongoDB 中，你不需要创建集合。当你插入一些文档时，MongoDB 会自动创建集合
db.createCollection('name',options);  // 创建一个名字为name的集合  第二个参数可选 

db.collection.drop();  // collection 为集合的名字 删除
```

**文档操作** ----- 一行内容

增加

```js
// MongoDB 使用 insert() 或 save() 方法向集合中插入文档，语法如下：
db.collection.insert({"name":"goudan"})    //插入文档
```

更新 修改

```js
// 修改查找到的第一条
db.col.update({'title':'MongoDB 教程'},{$set:{'title':'MongoDB'}}) 
db.col.update({'title':'MongoDB 教程'},{$set:{'title':'MongoDB'}},true,false); 

 // 满足条件的都修改
db.col.update({'title':'MongoDB 教程'},{$set:{'title':'MongoDB'}},true,true); 
db.col.update({'title':'MongoDB 教程'},{$set:{'title':'MongoDB'}},{multi:true}) 
```

查找

```js
db.collction.find();  // 查找全部
db.collection.find({"name":"zhang"});  // 按照条件查找
```

删除文档

```js
// 如删除集合下全部文档：
db.inventory.deleteMany({})
// 删除 status 等于 A 的全部文档：
db.inventory.deleteMany({ status : "A" })
// 删除 status 等于 D 的一个文档：
db.inventory.deleteOne( { status: "D" })
```



## mongoose

在blog文件夹下面打开命令行  安装mongoose

```js
npm install mongoose
```

```js
const mongoose = require('mongoose');
// 连接mongoose服务器
const db = mongoose.createConnection("mongodb://localhost:27017/user",{ useNewUrlParser: true } );
// 用原生es6的promise取代mongoose自实现的promise
mongoose.Promise = global.Promise;
// 在操作数据库之前，得使用Scheme设置每个字段的数据类型
db.on('error',()=>{
    console.log('user数据库连接错误')
});

db.on('open',()=>{
    console.log('user 数据库连接成功');
});

// 连接成功 --- > 操作数据  ----> 设置Scheme
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: String,
    age: Number,
    sex: String,
    love: {
        type: String,
        detault: "编程"
    },

},{
    versionKey: false  // 不在信息列表中加入 那个 _v
});

const UserModel = db.model('user',UserSchema);
// 默认的  集合的名字为 users复数  可以在第三个参数传递 集合的名字
const data = {
    name: '狗蛋',
    age: 27
};
const data2 = {
    name: '小花',
    age: 18,
    sex: '女'
};

let d1 = new UserModel(data);
d1.save()
    .then(res=>{
        console.log('插入成功');
        console.log(res)
    })
    .catch(err=>{
        console.log('插入失败');
        console.log(err);
    });

```



## 钩子

```js
// findByIdAndRemove   这种是直接进入数据库删除的，不会触发钩子 绕过了mongoose
and 这种格式的东西

// deleteOne 也不会触发钩子函数

钩子只能监听到原型上面触发的
UserModel.prototype  这个上面触发的函数
也就是 文档实例调用的方法
```





## mongodb-compass

可视化工具