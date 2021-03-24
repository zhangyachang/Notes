操作系统：
我的是CentOS 7.2.64



## 1.Node环境搭建



命令

- cd /      进入根目录

- ls         查看目录 

- ls -ls

- clear    清除

- cd /usr/local/src

- wget  nodejs链接   下载

  - 百度nodejs中文网
  - 下载
  - 用阿里云镜像
  - wget 下载资源
  - ctrl + c 终止
  - rm -f  文件名

- 安全组开放访问端口



```css
tab键可以补全文件或路径名
进入指定目录
cd /usr/local/src/
下载资源（淘宝镜像 .gz后缀文件）
wget https://nodejs.org/dist/v10.12.0/node-v10.12.0-linux-x64.tar.gz
下载完成后,执行解压命令
tar xvf node-v10.12.0-linux-x64.tar.gz
删掉文件
rm -f 文件名
cd node-v10.12.0-linux-x64/bin
查看文件，会看到 node npm 
ls 
设置全局,在任何目录都可能运行 node 和 npm 命令
ln -s /usr/local/src/node-v10.12.0-linux-x64/bin/node /usr/local/bin/node 
ln -s /usr/local/src/node-v10.12.0-linux-x64/bin/npm /usr/local/bin/npm 


因为有些服务器地区问题原因，全局变量配置不成功，就配置到 /bin/下面
ln -s /usr/local/src/node-v10.12.0-linux-x64/bin/node /bin/node 
ln -s /usr/local/src/node-v10.12.0-linux-x64/bin/npm /bin/npm
```

```css
11. 安全组开放访问端口

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

```







## 2.  FTP

图形化文件上传工具

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

- 密码 不告诉你

- 如果通行命令行的形式下载 node压缩包不成功（由于网络慢或其他原因）

  - 可以在nodejs中文网直接点击 node-v10.3.0-linux-x64.tar.gz 下载到电脑 包  通过filezilla上传到 `/usr/local/src` 里
  - 上传完成之后用命令行解压


## 3.  配置pm2

*pm2* 是一个带有负载均衡功能的Node应用的进程管理器.当你要把你的独立代码利用全部的服务器上的所有CPU,并保证进程永远都活着



```css
进入node/bin目录安装pm2
npm i -g pm2

$ pm2 start app.js -i 4 
	#后台运行pm2，启动4个app.js # 也可以把'max' 参数传递给 start # 正确的进程数目依赖于Cpu的核心数目 

$ pm2 start app.js --name my-api 
	# 命名进程 

$ pm2 list 
	# 显示所有进程状态 

$ pm2 monit 
	# 监视所有进程 

$ pm2 logs 
	# 显示所有进程日志 

$ pm2 stop all
	# 停止所有进程 

$ pm2 restart all 
		# 重启所有进程 

$ pm2 reload all 
	# 0秒停机重载进程 (用于 NETWORKED 进程) 

$ pm2 stop 0 
	# 停止指定的进程 

$ pm2 restart 0 
	# 重启指定的进程 

$ pm2 startup 
	# 产生 init 脚本 保持进程活着 

$ pm2 web 
	# 运行健壮的 computer API endpoint (http://localhost:9615) 

$ pm2 delete 0 
	# 杀死指定的进程 

$ pm2 delete all 
	# 杀死全部进程 运行进程的不同方式： 

$ pm2 start app.js -i max 
	# 根据有效CPU数目启动最大进程数目 

$ pm2 start app.js -i 3 
	# 启动3个进程 

$ pm2 start app.js -x 
	#用fork模式启动 app.js 而不是使用 cluster 

$ pm2 start app.js -x -- -a 23 
	# 用fork模式启动 app.js 并且传递参数 (-a 23)

$ pm2 start app.js --name serverone 
	# 启动一个进程并把它命名为 serverone

$ pm2 stop serverone 
	# 停止 serverone 进程

$ pm2 start app.json 
	# 启动进程, 在 app.json里设置选项 

$ pm2 start app.js -i max -- -a 23 
	#在--之后给 app.js 传递参数

$ pm2 start app.js -i max -e err.log -o out.log 
	# 启动 并 生成一个配置文件 你也可以执行用其他语言编写的app ( fork 模式): 

$ pm2 start my-bash-script.sh -x --interpreter bash 

$ pm2 start my-python-script.py -x --interpreter python 

```



## 4.解压

> yum install -y unzip zip

```css
Linux中zip压缩和unzip解压缩命令详解

1、把/home目录下面的mydata目录压缩为mydata.zip
zip -r mydata.zip mydata #压缩mydata目录
2、把/home目录下面的mydata.zip解压到mydatabak目录里面
unzip mydata.zip -d mydatabak
3、把/home目录下面的abc文件夹和123.txt压缩成为abc123.zip
zip -r abc123.zip abc 123.txt
4、把/home目录下面的wwwroot.zip直接解压到/home目录里面
unzip wwwroot.zip
5、把/home目录下面的abc12.zip、abc23.zip、abc34.zip同时解压到/home目录里面
unzip abc\*.zip
6、查看把/home目录下面的wwwroot.zip里面的内容
unzip -v wwwroot.zip
7、验证/home目录下面的wwwroot.zip是否完整
unzip -t wwwroot.zip
8、把/home目录下面wwwroot.zip里面的所有文件解压到第一级目录
unzip -j wwwroot.zip

主要参数

-c：将解压缩的结果
-l：显示压缩文件内所包含的文件
-p：与-c参数类似，会将解压缩的结果显示到屏幕上，但不会执行任何的转换
-t：检查压缩文件是否正确
-u：与-f参数类似，但是除了更新现有的文件外，也会将压缩文件中的其它文件解压缩到目录中
-v：执行是时显示详细的信息
-z：仅显示压缩文件的备注文字
-a：对文本文件进行必要的字符转换
-b：不要对文本文件进行字符转换
-C：压缩文件中的文件名称区分大小写
-j：不处理压缩文件中原有的目录路径
-L：将压缩文件中的全部文件名改为小写
-M：将输出结果送到more程序处理
-n：解压缩时不要覆盖原有的文件
-o：不必先询问用户，unzip执行后覆盖原有文件
-P：使用zip的密码选项
-q：执行时不显示任何信息
-s：将文件名中的空白字符转换为底线字符
-V：保留VMS的文件版本信息
-X：解压缩时同时回存文件原来的UID/GID
```







## 5. rz sz 上传下载文件



 + 方法一 解压版

   用法：

   ​	rz 电脑里的文件名

   ​	sz 当前目录下文件名

   ​	<u>上传文件和下载文件 最好都是压缩包</u>

```css
 
下载安装包lrzsz-0.12.20.tar.gz : http://www.ohse.de/uwe/software/lrzsz.html
 
       
       # wget http://www.ohse.de/uwe/releases/lrzsz-0.12.20.tar.gz
       # tar zxvf lrzsz-0.12.20.tar.gz && cd lrzsz-0.12.20
       # ./configure && make && make install
       上面安装过程默认把lsz和lrz安装到了/usr/local/bin/目录下, 下面创建软链接, 并命名为rz/sz:
       # cd /usr/bin
       # ln -s /usr/local/bin/lrz rz
       # ln -s /usr/local/bin/lsz sz
```

 + 安装版	

   ```css
   yum install -y lrzsz
   ```




## 6. 服务器重启



```
shutdown -h 10          #计算机将于10分钟后关闭，且会显示在登录用户的当前屏幕中

         shutdown -h now       #计算机会立刻关机

         shutdown -h 22:22     #计算机会在这个时刻关机

         shutdown -r now        #计算机会立刻重启

         shutdown -r +10         #计算机会将于10分钟后重启

         reboot                           #重启

         halt                                #关机
```
