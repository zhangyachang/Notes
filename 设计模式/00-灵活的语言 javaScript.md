## javaScript



```js
//这样写就会污染到全局变量 都会挂载到window下
function checkName() {
    //验证姓名
}
function checkEmail() {
    //验证邮箱
}
function checkPassword() {
    //验证密码
}
```

声明的方式

```js
var checkName = function () {
    //验证姓名
};
var checkEmail = function () {
    //验证邮箱
};
var checkPassword = function () {
    //验证密码
}
```

上面的方式都会声明好多变量，会影响其他人的使用，命名，所以我们可以把这些放到一个对象下面

```js
var checkObject = {
    checkName : function () {
        //验证姓名
    },
    checkEmail : function () {
        //验证邮箱
    },
    checkPassword : function () {
        //验证密码
    }
}

//还有另外一种添加方式
var checkObject = function(){}
checkObject.checkName = function(){}
checkObject.checkEmail = function(){}
checkObject.checkPassword = function(){}
```

虽然这样可以满足自己的需求，但是当别人想用你写的对象的方法时候就麻烦了，因为这个对象不能复制一份

方法一

```js
var checkObject = function() {
    return {
        checkName : function(){
            //验证姓名
        },
        checkEmail : function () {
            //验证邮箱
        },
        checkPassword : function () {
            //验证密码
        }
    }
};

var a = checkObject();
console.log(a);
a.checkEmail();
```



上面的方法虽然可以实现我们的功能，但是创建出来的对象a和对象checkObject没有任何关系

改造过后

```js
var CheckObject = function () {
    this.checkName = function () {
        //验证姓名
    };
    this.checkEmail = function () {
        //验证邮箱
    };
    this.checkPassword = function () {
        //验证密码
    }
};

var a = new CheckObject();
console.log(a);

//上面这种方式已经实现了复制,但是我们每一次通过new关键字创建新对象的时候，新创建的对象都会经过this再执行一次，所以这些
//新创建的对象都会有属于自己的一套方法，然后有时候这么做造成的性能消耗是非常奢侈的，我们需要处理一下，

```

​    将公有的方法放到构造函数的原型上

```js
var CheckObject = function () {
};

CheckObject.prototype.checkName = function () {
    //验证姓名
};
CheckObject.prototype.checkEmail = function () {
    //验证邮箱
};
CheckObject.prototype.checkPassword = function () {
    //验证密码
};
```

​	这样创建对象实例的时候，找方法的时候如果自己本身没有的话就会上原型上面一层一层的去找，就可以拥有方法了



上面的方法要把peototype写好多遍，还可以写成另外的一种形式

```js
CheckObject.prototype = {
    checkName : function(){
        //验证姓名
    },
    checkEmail : function () {
        //验证邮箱
    },
    checkPassword : function () {
        //验证密码
    }
};
//这两种方法不能混着用，要不然会覆盖
//使用方法

var a = new CheckObject();
console.log(a);
a.checkEmail();
```



​	经常使用jQ都知道链式操作，其实实现方法很简单就是将当前的对象作为函数的返回值return出去就行了，

```js
//链式操作

var CheckObject = function () {
    this.checkName = function () {
        //验证姓名
        return this;
    };
    this.checkEmail = function () {
        //验证邮箱
        return this;
    };
    this.checkPassword = function () {
        //验证密码
        return this;
    }
};
var obj = new CheckObject();
obj.checkEmail().checkName().checkPassword();
```



函数的祖先

```js
Function.prototype.checkEmail = function () {
    console.log('验证了邮箱');
};
//我们在他的原型上写了一个这样的方法之后，凡是用函数构造出来的对象都有了这个方法
var a = function () {

};
a.checkEmail();
```

如果习惯类的形式还可以这样写

```js
var f = new Function(){};
f.checkEmail();
```

但是这样做 在这里是不允许的 因为污染了全局变量Function



可以用这种方法就可以避免了

```js
Function.prototype.addMethod = function (name,fn) {
    this[name] = fn;
};

var methods = function () {

};
methods.addMethod('checkName',function () {
    //验证姓名
    console.log('姓名');
});
methods.addMethod('checkEmail',function () {
    //验证邮箱
    console.log('邮箱');
});

methods.checkName();
methods.checkEmail();
```

当然上面你嫌写了好多个methods对象，你可以用链式方法

```js
Function.prototype.addMethod = function (name,fn) {
    this[name] = fn;
    return this;  //在这里返回对象就可以了
};

var methods = function () {

};
methods.addMethod('checkName',function () {
    //验证姓名
    console.log('姓名');
}).addMethod('checkEmail',function () {
    //验证邮箱
    console.log('邮箱');
});

methods.checkName();
methods.checkEmail();
```

对于习惯类的人来说也可以这样写

```js
//当然习惯用类的人来说 也可以写成类的形式

Function.prototype.addMethod = function (name,fn) {
    this.prototype[name] = fn;
    return this;
};

var Methods = function(){};

Methods.addMethod('checkName',function () {
    //验证姓名
    console.log('姓名');
}).addMethod('checkEmail',function () {
    //验证邮箱
    console.log('邮箱');
});

var m = new Methods();

m.checkName();
m.checkEmail();
```

javaScript是一种灵活的语言，使用javascript可以编写出更多的优雅的代码艺术。

