## 一、for循环里的关键字

continue跳出本次循环

break 跳出所有循环

```js
var oBox = document.getElementById("box");
    for(var i=0; i<10; i++){
        //console.log(i);
        if(i === 5) continue;
        oBox.innerHTML += "<div>"+i+"</div>";
    }
//continue 0 1 2 3 4 6 7 8 9 10
//break 0 1 2 3 4 
```

## 二、label

给它指定一个名字，可以用continue 转向他。

//continue break 都可以指定转向

```js
fy:
    for(var i=0; i<5; i++){
        for(var j=0; j<5; j++){
            if(i === 1)
                continue fy;  
            document.write('j='+ j + "  ");
        }
        document.write( "i=" + i + "<br />");
    }
```

## 三、while 和 do while

**while**

```js
var i = 0;
while(i<6){
      document.write(i + "<br />");
      i++;
};
/*while 当条件成立时，执行语句*/ 
```

while当条件成立时，执行语句

**do while**

```js
var i = 7;
do{
      document.write(i + "<br />");
      i++;
}while(i<6);
/*先执行一次，再判断条件，至少执行一次*/ 
```

do while 先执行一次，在判断条件，最少执行一次。