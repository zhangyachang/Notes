## cors

解决跨域问题

```js
app.use(cors())
```

### get方法

```js
var request = require('request');
request('您的请求url', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) // 请求成功的处理逻辑
  }
});
```



### post方法

```js
var request = require('request');
var url="请求url";
var requestData="上送的数据";
request({
    url: url,
    method: "POST",
    json: true,
    headers: {
        "content-type": "application/json",
    },
    body: JSON.stringify(requestData)  //注意*** 这里直接传obj对象就好
}, function(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body) // 请求成功的处理逻辑
    }
}); 
```

### post form

```js
request.post({url:'', form:{key:'value'}}, function(error, response, body) {
    if (!error && response.statusCode == 200) {
       console.log(body) // 请求成功的处理逻辑  
    }
});
```
