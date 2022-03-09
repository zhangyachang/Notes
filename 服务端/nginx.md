#### 服务重启

```js
nginx -s reload
```



nginx 配置 配置文件相对目录

```js
解决：s

/usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf
```



#### 退出服务

```js
nginx -s quit
```







#### 安装教程



# 下载Nginx

[下载链接](https://links.jianshu.com/go?to=http%3A%2F%2Fnginx.org%2Fen%2Fdownload.html)



## 安装需要的依赖包

如果是新环境，那就必须先安装gcc gcc-c++



```shell
yum install -y gcc gcc-c++
yum install pcre-devel zlib zlib-devel openssl openssl-devel
```

安装SSL nginx 中ssl 功能需要openssl库



```shell
cd /usr/local/
wget http://www.openssl.org/source/openssl-1.0.1j.tar.gz
tar -zxvf openssl-1.0.1j.tar.gz
cd openssl-1.0.1j
./config
make && make install
```

安装zlib nginx 中gzip模块需要 zlib 库



```shell
cd /usr/local/
wget http://zlib.net/zlib-1.2.11.tar.gz
tar -zxvf zlib-1.2.11.tar.gz
cd zlib-1.2.11
./configure
make && make install
```

## 安装Nginx   A和B按需选择



```shell
cd /usr/local
## 放入下载的nginx
## 解压
tar -zxvf nginx-1.19.4.tar.gz 
##进入nginx目录
cd nginx-1.19.4
##A 配置
./configure 
##B 安装https证书模块
./configure --with-http_ssl_module
# make
make && make install
```

切换到/usr/local/目录下会发现多一个文件夹nginx。
 **`切记不要在/usr/local/文件夹下面创建nginx文件夹`**
 nginx启动/停止/重启



```shell
cd /usr/local/nginx/sbin
# 启动
./nginx
# 停止
./nginx -s stop
# 重启
./nginx -s reload
```

nginx开机自启动



```shell
vi /etc/rc.local
# 增加一行 /usr/local/nginx/sbin/nginx
# 设置执行权限
cd /etc
chmod 755 rc.local
```
