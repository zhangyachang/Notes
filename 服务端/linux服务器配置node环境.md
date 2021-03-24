正常基本2分钟就能搭建完成 

- 命令
- cd /      进入根目录
- ls         查看目录 
- ls -ls
- clear    清除
- cd /usr/local/src
- wget  nodejs链接   下载
  - 百度nodejs中文网
  - 下载
  - 用阿里云镜像
  - wget https://nodejs.org/dist/v10.3.0/node-v10.3.0-linux-x64.tar.gz
  - ctrl + c 终止
  - rm -rf 

```shell
tab键可以补全文件或路径名
进入指定目录
cd /usr/local/src/
下载资源（淘宝镜像 .gz后缀文件）
wget https://nodejs.org/dist/v10.3.0/node-v10.3.0-linux-x64.tar.gz
下载完成后,执行解压命令
tar xvf node-v8.11.1-linux-x64.tar.gz
删掉文件
rm -rf 文件名
cd node-v8.11.1-linux-x64/bin
查看文件，会看到 node npm 
ls 
设置全局,在任何目录都可能运行 node 和 npm 命令
ln -s /usr/local/src/node-v10.3.0-linux-x64/bin/node /usr/local/bin/node 
ln -s /usr/local/src/node-v10.3.0-linux-x64/bin/npm /usr/local/bin/npm 
ln -s /usr/local/src/node-v10.3.0-linux-x64/bin/cnpm /usr/local/bin/cnpm 
ln -s /usr/local/src/node-v10.3.0-linux-x64/bin/pm2 /usr/local/bin/pm2 

因为服务器地区问题原因，全局变量配置不成功，就配置到 /bin/下面
ln -s /usr/local/src/node-v10.3.0-linux-x64/bin/node /bin/node 
ln -s /usr/local/src/node-v10.3.0-linux-x64/bin/npm /bin/npm
ln -s /usr/local/src/node-v10.3.0-linux-x64/bin/cnpm /bin/cnpm 
ln -s /usr/local/src/node-v10.3.0-linux-x64/bin/pm2 /bin/pm2 
```



- 利用filezilla上传项目

- 主机

  - 公网ip

- 端口

  - 22

- 协议

  - ssh

- 登录类型

  - 正常

- 用户名

  - root

- 密码 

- 如果通行命令行的形式下载 node压缩包不成功（由于网络慢或其他原因）

  - 可以在nodejs中文网直接点击 node-v10.3.0-linux-x64.tar.gz 下载到电脑 包  通过filezilla上传到 `/usr/local/src` 里

  - 上传完成之后用命令行解压

    

  

- cd /usr/local/src

- ls

- tar xvf node包名称

- cd node...文件夹

- ls

- cd bin

- ./node 

  - 10.3.0

- 因为我们要在任何目录都能执行node和npm命令，所以要配置全局变量

  - ln -s /usr/local/src/node...../bin/node /usr/local/bin/node
  - ln -s /usr/local/src/node...../bin/npm /usr/local/bin/npm
  - 此时在任何目录下，就行运行node和npm命令了
  - cd /
  - node -v
  - npm -v
  - 把安装过的包删掉
    - cd /usr/local/src
    - ls
    - rm -rf 包名
    - 

- 写一个js

- 找一个node项目用node运行起来

- 然后通过公网ip的形式访问，会发现访问不了，原因是没有开放端口

#### 11. 安全组开放访问端口

- 进入实例
- 安全组
- 配置规则
- 添加安全规则
- 协议类型 TCP
  - 80/80
  - 6000/9999
  - 443/443
- 协议类型 HTTP/HTTPS
  - 80/80
- 授权类型：地址段访问
- 授权对象
  - 0.0.0.0/0

#### 12. 域名绑定服务器

- 单向绑定就可

- 绑定方式同上，可以开个二级域名测试

  #### 13. 下载谷歌插件

  https://www.gugeapps.com

  jsonview

