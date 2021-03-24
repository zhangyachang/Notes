## 双向数据绑定

```js
//作用当我们赋值或取值的时候触发的函数
var obj = {
    a : 1
};
Object.defineProperty(obj,"age",{
    //获取的时候触发
    get : function(){
        return 18;
    },
    //设置的时候触发
    set : function(){
        //参数 新的值
        console.log(v);
        obj.age = 
    }
});
//会发现在他的上面多了一个age的东西
console.log(obj);
console.log(obj.age); //18
obj.age = 19; //19

```



```js
function defineProperty(obj,key,val){
    Object.defineProperty(obj,key,{
        get:function(){
            return val;
        },
        set:function(newVal){
            val = newVal;
        }
    })
}
//把相应的数据绑定到相应的span标签吗
function Watcher(vm,node,name){
    new 
}

function Wulv(obj){
    this.data = obj.data;
    for(var key in this.data){
        defineProperty(this,key,this.data[key])
    }
    vat that = this;
    var input = document.getElementsByTagName('input');
    var span = document.getElementsByTagName('span');
    /*
    input.forEach(function(value){
        console.log(value);
    })
    */
    for(var i=0,len=input.length;i<len;i++){
        input[i].addEventListener('input',function(e){
            that[e.target.id] = e.target.value;
            	
        })
    }
    //所有的数据都是保存在this里面的
    new Watcher(this);
}

new Wulv({
    data : {
        name : "1",
        age : 2
    }
})
```

get和set的叫做数据劫持



angular的是脏检查





















