```js
nginx -t 是否成功
nginx -s reload 修改conf文件重启使用
nginx -c c:/nginx/xxx/nginx.conf 重新配置
启动、停止nginx
./nginx 
./nginx -s stop
./nginx -s quit
./nginx -s reload
```



反向代理

**总结下：反向代理，主要用于服务器集群分布式部署的情况下，反向代理隐藏了服务器的信息** 



正向代理

**客户端非常明确要访问的服务器地址；服务器只清楚请求来自哪个代理服务器，而不清楚来自哪个具体的客户端；正向代理模式屏蔽或者隐藏了真实客户端信息**。 



负载均衡







## nginx配置服务器环境

安装

```js

```

问题

```js
【部署问题】解决Nginx: [error] open() ＂/usr/local/Nginx/logs/Nginx.pid" failed（2:No such file or directory）

解决方法：

/usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf
使用nginx -c的参数指定nginx.conf文件的位置
```
