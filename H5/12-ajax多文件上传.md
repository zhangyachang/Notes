---
ajax多文件上传
---

## 文件上传

```js
过input的type=’file’上传
    ① 通过表单控件file获取的是input的value值，这是字符串，不是上传的文件
    ② 通过控件中的文件列表对象
        e) input.files获取是集合
        f) 我们的需求是通过AJax把input.files[0]数据发送到后端，但需要后端配合
        g) 通过控制台查看相关的属性和属性的值，可以通过for in循环
        h) 然后通过Ajax进行发送上传的文件
            var xhr = new XMLHttpRequest();
            xhr.onload = function(){
                var data = JSON.parse( this.responseText );
                console.log( data.mag + ':::'+data.url );
                console.log( ‘上传完成’ )
            }
            console.log( xhr.upload )
            var oUpload = xhr.upload;
            console.log(  oUpload  )
            oUpload.onprogress = function(e){ // 监听上传的进度
                console.log( '当前进度' + e.loaded + '::: 总进度' +e.total )
                var scale = e.loaded / e.total; // 通过比例实现真正的上传的进度 
                Box.style.width = scale * ( box.offsetWidth ) + ‘px’;
                box.innerHTML = scale *100 + ‘%’;
            }
            xhr.open('post'，'地址','异步');
            xhr.setRequestHeader('X-Request-With','XMLHttpRequest');
            //通过FormData构建提交数据
            var oFormData = new FormData(); 
            oFormData.append('file', input.files[0]);
            Xhr.send( oFormData );
```

例子一

```js
<body>
    <input type="file" multiple id="input">
    <input type="button" id="btn" value="上传">

    <script>
        btn.onclick = function () {
            var file = input.files;
            for ( var i=0;i<file.length;i++ ){
                (function (i) {
                    // 此处只是做测试，前端只需要负责网页就可，后端会完善功能后，提供前端接口
                    var xhr = new XMLHttpRequest();
                    xhr.open('post', './upload.php', true);
                    var oFormdata = new FormData(); // 构建数据提交对象
                    oFormdata.append('file', file[i]);
                    xhr.send(oFormdata);
                })(i);
            }

        }
    </script>
</body>
```

例子二

```js
btn.onclick = function () {
    //console.log( arrFile );
    for ( var i=0;i<arrFile.length;i++ ){
        (function (i) {
            var xhr = new XMLHttpRequest();
            xhr.open('post','./upload.php',true);
            var oFormdata = new FormData(); // 构建数据提交对象
            xhr.onload = function () {
                arrFile.splice(i,1);
            }
            var oUpload = xhr.upload;
            console.log( oUpload )
            // 每50ms执行一次
            // 大的文件 可以上传不到后台，因为没后台处理
            oUpload.onprogress = function (e) {
                var scale = e.loaded/e.total;
                progress.style.width = scale*1000 + 'px';
                //console.log(  );
            }
            oFormdata.append('file',arrFile[i]);
            xhr.send(oFormdata);
        })(i);
    }
    arrFile = [];
}
```
