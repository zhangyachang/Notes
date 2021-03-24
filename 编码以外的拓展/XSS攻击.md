# 研究的一些安全问题





## 一、XSS攻击

**定义**XSS（Cross sitescripting），中文名为跨站脚本，是发生在**目标用户的浏览器**层面上的，当渲染DOM树的过程发生了**不在预期内**执行的JS代码时，就发生了XSS攻击。

跨站脚本的重点不在“跨站”上，而在于“脚本”上。大多数的XSS攻击的主要方式是嵌入一段远程或者第三方域上的JS代码。实际上是在目标网站的作用域下执行了这段js代码。



#### 1.XSS攻击方式

#####1.反射性XSS

反射性XSS，也叫非持久型XSS，是指发生请求时，XSS代码出现在请求URL中，作为参数提交到服务器，服务器解析并响应。相应结果中包含XSS代码，最后浏览器解析并执行。

从概念上可以看出，反射性XSS代码是**首先**出现在URL中的，**然后**需要服务端解析，**最后**需要浏览器解析之后XSS代码才能够攻击。



**使用代码模拟一下XSS攻击**

```html
<textarea name="" id="textarea" cols="30" rows="10"></textarea>
<button id="btn">按钮发起请求</button>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>

<script>

  var oTextarea = document.getElementById('textarea');

  document.getElementById('btn').addEventListener('click', function(){
    console.log('发起请求了');
    console.log(111);
    console.log(oTextarea.value);

    axios({
      url: 'http://127.0.0.1:8001/bs/api/xss',
      method: 'GET',
      params: {
        text: oTextarea.value
      }
    })
      .then(res => {
        console.log('成功');
        console.log(res);
        console.log(res.data.test);
        var node = res.data.test;

        document.body.insertAdjacentHTML('beforeend', node);
        
      })
      .catch(err => {
        console.log('失败');
        console.log(err);
      });
  });

</script>
```

现在我们通过给textarea添加一段有攻击目的的img标签，

```html
<img src="null" onerror='alert(document.cookie)' />
```



**后台服务器的处理**

```js
router.get('/xss', async ctx => {
    ctx.body = {
      test: ctx.query.text
    } 
});
```

**结果**当点击按钮的时候就会将此网站中的cookie弹出来。

实际上，我们只是模拟攻击，通过alert获取到了个人的cookie信息。但是如果是黑客的话，他们会注入一段第三方的js代码，然后将获取到的cookie信息存储到他们的服务器上。这样的话黑客们就有机会拿到我们的身份认证做一些违法的事情了。

以上存在的一些问题，主要在于没有对用户输入的信息进行过滤，同时没有剔除掉DOM节点中存在一些有危害的事情和一些有危害的DOM节点中存在的一些有危害的事件和一些有危害的DOM节点。



##### 2.存储型 XSS

存储型XSS，也叫持久型XSS，主要是将XSS代码发送到服务器(不管是数据库、内存还是文件系统等。)，然后在下次请求页面的时候就不用带上XSS代码了。

最典型的就是留言板XSS，用户提交了一条包含XSS代码的留言到数据库。当目标用户查询留言时，那些留言的内容会从服务器解析之后加载出来。浏览器发现有XSS代码，就当正常的HTML和JS解析执行，XSS攻击就发生了。



##### 3.DOM XSS

DOM XSS攻击不同于反射型XSS和存储型XSS，DOM XSS代码不需要服务器端的解析响应的直接参与，而是通过浏览器端的DOM解析。这完全是客户端的事情。

DOM XSS代码的攻击发生的可能在于我们编写的JS代码造成的。我们知道eval语句有一个作用是将一段字符串转换为真正的JS语句，因此在JS中使用eval是很危险的事情，容易造成XSS攻击。避免使用eval语句。

```js
test.addEventListener('click', function () {
  var node = window.eval(txt.value)
  window.alert(node)
}, false)

txt中的代码如下
<img src='null' onerror='alert(123)' />
```

















