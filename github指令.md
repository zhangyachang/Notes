---
title: github指令
---

### 集中式，分布式？有什么区别

* 集中式，完整的代码库在中央服务器，每次上班都需要重新下载一下当前的版本,当成一个图书馆，每次借书，完成工作之后还书，最大的毛病应该就是必须联网才能工作。

* 分布式，没有"中央服务器"每一个人的代码都是一个完整的代码库，这样工作的时候就不需要联网了

  github,代码的托管平台，全世界的代码仓库。

### 设置用户名邮箱

```js
查看当前库的用户名和邮箱命令
git config user.name
git config user.email

设置当前库的用户名和密码
git config user.name "Sallenkey"
git config user.email "xxx@163.com"

设置全局的用户名和密码
git config --global user.name "Sallenkey"
git config --global user.email "xxx@163.com"
```

 ### 初始化仓库

使用`git init`

添加文件到Git仓库，分两步

 1.使用`git add <filePath>`，可反复多次使用，添加多个文件

 2.使用`git commit`,提交到版本库，完成

### 查看仓库状态

* 要随时掌握工作区的状态，使用`git status`命令
* 如果`git status`告诉你有文件被修改，用`git diff`可以查看修改的内容

### 版本回退

* `HEAD`指向的版本就是当前版本的，因此Git允许我们在版本的历史之间穿梭，使用命令

  `git reset --hard commit_id`

* 穿梭前，用`git log`可以查看提交历史（commit_id），可以确定要回退到哪个版本

* 要重返未来，用`git reflog`查看历史命令，以便确定要回到未来的哪个版本

* `git log --pretty=oneline` 将历史信息，一行显示

  ```js
  git reset --hard HEAD^ 指针，返回上一次
  ```

### 了解工作区和暂存区

**i  ecs   :wq  退出**

 工作区----->  暂存区-------> 分支  -----> 远程仓库   

我们开发的地方就叫做工作区  git status 查看暂存区的状态

工作区 ---> 暂存区 ----> 分支 ---> 远程库

　　工作区就是我们可以在工作目录中可以看到的，并且可以直接修改的

　　第一步是用git add把文件添加进去，实际上就是把文件修改添加到暂存区；

　　第二步是用git commit提交更改，实际上就是把暂存区的所有内容提交到当前分支

### 情景分析

**情景一**：当你改乱了工作区某个文件的内容，想直接丢弃工作区的修改时，使用命令`git checkout -- <file>`

**情景二**:当你不但改乱了工作区的内容，还add到了暂存区，想丢弃修改，分两步第一步用命令`git reset HEAD <file>`,就回到了情景一，第二步按情景一操作。

**情景三**： 已经提交了不合适的修改到版本库时，想要撤销本次提交，参考版本回退，不过前提是没有推送到远程仓库

```js
放弃修改，当你已经add了a文件之后，然后又去修改了a文件，这时你commit -m之后，去查看 git status 会发现是修改了的，然后这时如果你不想要了之后，可以使用 git checkout -- <a文件的名字>
这时再去查看 git status会发现是干净的，就会将文件中之后修改的东西去删除。
```

已经在工作区的内容要丢弃的时候使用git checkout -- a.txt

如果是已经提交到暂存区的再来丢弃的时候 那么要使用 git reset HEAD test.txt  再来使用checkout -- a 丢弃

### 删除文件

命令`git rm`用于删除一个文件，如果一个文件已经被提交到版本库，那么你永远不用担心误删，但是要小心，你只能恢复文件到最新版本，你会丢失**最近一次提交后你修改的内容**

`rm 2.txt`这个和手动删除是一样的，这时可以使用`git status`来查看一下最近的一次修改，他有两个提示

```js
(use "git add/rm <file>..." to update what will be committed)
(use "git checkout -- <file>..." to discard changes in working directory)
正常删除   1.删除文件  2. git rm <file>
删错了   1. git reset HEAD 2.txt  2. git checkout -- 2.txt
```

### 远程仓库

`$ ssh-keygen -t rsa -C "937741304@qq.com"`  先生成秘钥然后在复制到github上面 

这个公钥原来弄一次就可以了，github上面是识别本地的

github上面原来有那两条命令的是

关联远程仓库

`git remote add origin git@github.com:zzz111111/test.git`

推送到远程仓库

`git push -u origin master` (就第一次提交的时候需要带上 -u，以后都不需要带了)

`git push origin master`

**解绑远程仓库**

`git remote remove origin`

**查看链接的哪个远程仓库**

`git remote -v`

### 克隆远程仓库

`$git clone + 那个ssh的名字`

```js
项目特别庞大之后，如果克隆就会克隆所有历史，后面加上 --depth=1
git clone git地址 --depth=1
```

### 创建与合并分支

每次提交，Git都把他们串成一条时间线，这条时间线就是一个分支。

截止到目前，只有一条时间线，在Git里，这个分支叫主分支，即master分支

`HEAD`严格来说不是指向提交，而是指向`master`,`master`才是指向提交的，所以，`HEAD`指向的就是当前分支

**姿势来了**

Git鼓励大量使用分支, 分支  开发新功能的时候会在分支上开发

查看分支： `git branch`

创建分支： `git branch <name>`

切换分支： `git checkout <name>`

创建+切换分支： `git checkout -b <name>`

合并某分支到当前分支： `git merge <name>  `   把name整合到当前分支     

删除分支： `git branch -D <name>`   `git branch -d <name>这个 -d 合并后才可以删除`

```js
现在新增加的文件 切换到主分支就会消失  在切换回来就会出现
切换到主分支  整合   选择要整合到的分支选择到他 然后整合其他的分支
```

### 分支冲突

当在分支上面新增提交，又在`master`上面新增提交之后，合并就会发生冲突，只能手动解决。

当Git无法自动合并分支时，就必须首先解决冲突。解决完冲突后，再提交，合并完成。

用`git log --graph`命令可以看到分支合并图

### 分支的管理策略

合并分支时，加上`--no-ff参数`就可以用普通模式合并，合并后的历史有分支，能看出来曾经做过合并，而

`fast forward`合并就看不出来曾经做过合并。

```js
git merge --no-ff test1
```

注意：使用`--no-ff`合并时会自动创建一个新的commit。所以要加上-m并写上错误。

### BUG分支

修复bug时，我们会通过创建新的bug分支进行修复，然后合并，最后删除

当手头工作没有完成时，先把工作现场`git stash`一下，然后去修复bug，修复后，再`git stash pop`,回到工作现场

```git
git stash apply 恢复环境
git stash drop 删除
git stash pop 保存并恢复环境
```

### Feature分支

开发一个新功能，最好新建一个分支

如果要丢弃一个没有被合并过的分支，可以通过 `git branch -D <name> `强行删除

### 多人协作

* 查看远程库信息，使用`git remote -v`
* 本地新建的分支如果不推送到远程，对其他人就是不可见的
* 从本地推送分支，使用`git push origin branch-name`,如果推送失败，先用`git pull`抓取远程的新提交
* 在本地创建和远程分支对应的分支，使用`git checkout -b branch-name origin/branch-name`，本地和远程分支的名称最好一致
* 建立本地分支和远程分支的关联，使用`git branch --set-upstream branch-name origin/branch-name`  
* 从远程抓取分支，使用`git pull`,如果有冲突，要先处理冲突

### 标签管理

发布一个版本时，我们通常在版本库中打一个标签（tag），这样，就唯一确定了打标签时刻的版本，将来无论什么时候，或某个标签的版本，就是把那个打标签的时刻的历史版本取出来。所以，标签也是版本库的一个快照。

### 创建标签

* 命令`git tag <name>`,用于新建一个标签，默认为`HEAD`，也可以指定一个`commit_id`
* `git tag -a <tagname> -m "blablabla.."` 可以指定标签信息
* `git tag -a <tagname> -m "blabla.."`可以用PGP签名签名
* 命令`git tag`可以查看所有标签
* 用命令`git show <tagname>`可以看到说明文字

```js
$ git tag -a v-1.0.0 -m "第二次tag" cf1e9dee085dd2138b1ab83704e9bd521e3d08b1
```

### 操作标签

因为创建的标签都只存储在本地，不会自动推送到远程，所以，打错的标签可以在本地安全删除

* 删除标签`git tag -d <tagName>`

* 如果要推送某个标签到远程，使用命令`git push origin <tagname>`

  或者一次性推送所有尚未推送到远程的标签`git push origin --tags`

* 如果标签已经推送到远程，需要删除远程标签：先从本地删除

  ```js
  $git tag -d <tagName>
  ```

  然后删除远程库，使用命令push，但是格式如下

  ```js
  $git push origin :regs/tags/<tagName>
  ```

  需要查看远程标签是否删除，登录GitHub查看

### 配置Git命令别名

我们只需要敲一行命令，告诉Git，以后`st`就表示`status`

`git config --global alias.st status`



```js
/全局配置用户名和邮箱
git config --global user.name "yachang"
git config --global user.email "937741304@qq.com"
//查看用户名
git config user.name
//查看邮箱地址
git config user.email
//修改用户名，xxx 处填写你的用户名
git config user.name "xxx"
//修改邮箱地址，xxx 处填写你的邮箱地址
git config user.email "xxx"

$ls 查看当前目录
$ls -a 可以查看隐藏文件
```



```js
git init 初始化吧 自己的理解创建一个 那个框框
git add . 放到暂存区
git commit -m "提交状态信息"   放到分支     	branch分支
git log 查看记录
$ git remote add origin git@github.com:zzz111111/goudan.git   关联本地仓库和远程仓库
$ git pull origin master 拉下来  先看看和远程仓库的一样不一样 
$ git push origin master	把我本地的master分支 推送到远程代码仓库master     yes  第一次使用可能要确定
关联后，使用命令git push -u origin master第一次推送master分支的所有内容
$ ssh-keygen -t rsa -C "937741304@qq.com"		先生成秘钥然后在复制到github上面
先  pull再 add        先pull
	git pull 
$git pull origin master先更新在推送的感觉 就是如果其他人先推了  你就先下载下来 可能是下载下来 然后再推
```



```js
/报错信息一
fatal: refusing to merge unrelated histories

解决方法
git pull origin master --allow-unrelated-histories
```





小问题去试验

```js
https://blog.csdn.net/HeatDeath/article/details/79501748
```



### 忽略不上传的文件

```html
当在 .ignore 之前上传了某些文件之后，你把所有的文件推到远程仓库中时，后面加上ignore是没有用的，可以使用下面的命令取消所有的再重新上传。

增加 .gitignore 文件，里面添加需要忽略的文件(file_not_wanted)

执行命令 git rm -r --cached .
注意，最后的点。不要省略。

最后重新将所有文件添加到追踪项。
git add -A
然后再 commit 即可。
```



### 在不同的分支中更新同样的代码

```git
在其他分支中 commit之后，会得到一个 commitid

切换到想要修改的分支之下
git cherry-pick commitid 就会更新
```

