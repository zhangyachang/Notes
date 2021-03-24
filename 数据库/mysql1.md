[TOC]

## sql是什么？

>sql是用于访问和处理数据库的标准计算机语言
>
>sql指结构化查询语言，全称是 Structured Query Language
>
>sql对大小写不敏感

## 启动简单操作

```js
win10下

net start mysql
net stop mysql

mysql -uroot -p 回车
密码

show databases; // 查看数据库
use <数据库名>  // 切换到数据库
show tables		// 查看表
select * from <表名>
```

## 一些重要的SQL指令

```js
SELECT 从数据库中提取数据
UPDATE 更新数据库中的数据
DELETE 从数据库中删除数据
INSERT INTO 向数据库中插入数据
CREATE DATABASE 创建新数据库
ALERT DATABASE 修改数据库
CREATE TABLE 创建新表
ALERT TABLE 变更（改变）数据库表
DROP TABLE 删除表
CREATE INDEX 创建索引（搜索键）
DROP INDEX 删除索引
```

### 1. SELECT

> select语句用于从数据库中提取数据。
>
> 结果被存储在一个结果表中，称为结果集。

**语法**

```sql
SELECT column_name, colunm_name
FROM table_name
```

```sql
SELECT * 
FROM table_name
```



---



### 2. SELECT DISTINCT

> select dictinct 语句用于返回唯一不同的值
>
> 在表中，一个列可能会包含多个重复值，有时您也许希望列出不同（distinct）的值。

**语法**

```sql
SELECT DISTINCT coulumn_name, colunm_name
FROM table_name;
```



---



### 3. WHERE

> where 子句用于过滤记录
>
> where 子句用于提取那些满足指定标准的值

**语法**

```sql
SELECT column_name, column_name
FROM table_name
WHERE column_name operator value;
// 某一列 运算符 什么值
```

```js
// 运算符有一些
= 等于
<> 不等于， **注意** 在SQL的一些版本中，该操作符可被写成 !=
>  大于
<  小于
>=  大于等于
<=  小于等于
BETWEEN 在某个范围内
LIKE 搜索某种模式
IN 指定针对某个列的多个可能值。
```

**例子**

```sql
Select * 
from emp 
where sal > 2000 and sal < 3000;

-------
查询EMP表中 sal 小于等于 1500 的值。
select * from emp where not sal > 1500;

----
逻辑运算的优先级：
()    not        and         or
```

**特殊条件**

```sql
1.空值判断
Select * from emp where comm is null;
查询 emp 表中 comm 列中的空值。

2.between and (在 之间的值)
Select * from emp where sal between 1500 and 3000;
查询 emp 表中 SAL 列中大于 1500 的小于 3000 的值。
注意：大于等于 1500 且小于等于 3000， 1500 为下限，3000 为上限，下限在前，上限在后，查询的范围包涵有上下限的值。

3.In
Select * from emp where sal in (5000,3000,1500);
查询 EMP 表 SAL 列中等于 5000，3000，1500 的值。

4.like
like模糊查询
Select * from emp where ename like 'M%';
查询 EMP 表中 Ename 列中有 M 的值，M 为要查询内容中的模糊信息。
% 表示多个字值，_ 下划线表示一个字符；
M% : 为能配符，正则表达式，表示的意思为模糊查询信息为 M 开头的。
%M% : 表示查询包含M的所有内容。
%M_ : 表示查询以M在倒数第二位的所有内容。
```

**不带比较运算符的where字句**

> where 子句并不一定要带比较运算符，当不带运算符时，会执行一个隐式转换。当0时转换为false，1转换为true

```sql
SELECT studentNO FROM student WHERE 0
则会返回一个空集，因为每一行记录 WHERE 都返回 false。

SELECT  studentNO  FROM student WHERE 1
返回 student 表所有行中 studentNO 列的值。因为每一行记录 WHERE 都返回 true。
```



---



### 4.AND& OR运算符

> AND & OR运算符用于基于一个以上的条件对记录进行过滤
>
> 如果第一个条件和第二个条件都成立，则AND运算符显示第一条记录。
>
> 如果第一个条件和第二个中只要有一个成立，则OR运算符显示一条记录

**AND运算符例子**

```sql
SELECT * 
FROM website
WHERE country = 'CN'
AND alexa > 50;
```

**OR运算符例子**

```js
SELECT *
FROM country = 'USA'
OR country = 'CN'
```

结合 AND & OR

> 您也可以把AND和OR结合起来（使用圆括号来组成复杂的表达式）

**例子**

```js
SELECT *
FROM website
WHERE alexa > 15
AND (country = 'CN' OR country = 'USA');
```



---



### 5. ORDER BY关键字

> ORDER BY 关键字用于对结果集进行排序
>
> ORDER BY关键字用于对结果集按照一个列或多个列进行排序
>
> ORDER BY 关键字默认按照升序对记录进行排序，如果需要按照降序对记录进行排序，您可以使用DESC关键字

**语法**

```sql
SELECT coulunm_name, colunm_name
FROM table_name,
ORDER BY column_name, colunm_name ASC|DESC
```

**例子**

```sql
SELECT *
FROM Website
ORDER BY alexa;
// 默认由小到大
---- 

SELECT *
FROM Website
ORDER BY alexa DESC;
// 由大到小
```

**ORDER BY 多列**

下面的SQL语句从 website 表中选取所有网站，并按照 country 和 alexa列排序

```js
SELECT *
FROM website
ORDER BY country, alexa;
```

**重要**

>ORDER BY 多列的时候，先按照第一个colunm_name 排序，在按照第二个colunm_name排序，如上面的例子
>
>1. 先将 country 值这一列排序，
>2. 再将country排序后的列中，再根据 alexa的大小排序
>3. ORDER BY 排序时，不写明 ASC DESC的时候，默认是ASC

```sql
ORDER BY多列的时候
order by A, B 这个时候默认是升序排序
order by A desc, B 这个时候A降序，B升序排列
order by A, B desc 这个时候A升序，B降序排列

// 即 desc 或者 asc只对它紧跟着的第一个列名有效，其他不受影响，仍然是默认的升序。
```



****



### 6. INSERT INTO

> INSERT INTO语句用于向表中插入新记录

**语法**

> INSERT INTO语句可以有两种编写形式
>
> 第一种形式无需指定要插入数据的列名，只需要提供被插入的值即可。

```sql
INSERT INTO table_name
VALUES (value1， value2, value3,...);
```

> 第二种形式需要指定列名及被插入的值

```sql
INSERT INTO table_name (colunm1, colunm2, column3,...)
VALUES (value1, value2, value3);
```

**例子**

```sql
INSERT INTO websites (name, url, alexa, country)
VALUES ('百度', 'https://www.baidu.com', '4', 'CN');
```

**注意点**

```sql
1. 没有指定要插入数据的列名的形式需要列出插入行的每一行数据
INSERT INTO table_name
VALUES (value1, value2, value3);

2. insert into select 和 insert into from 的区别

insert into scorebak
select * 
from score
where neza = 'neza'
// 插入一行 要求表 scorebak 必须存在

select * into scorebak
from score
where neza = 'neza'
// 也是插入一行，要求表 scorebak 不存在
```



### 7. UPDATE语句

> UPDATE语句用于更新表中的记录

**语法**

```sql
UPDATE table_name
SET colunm1=value1, colunm2=value2,...
WHERE some_column=some_value;
```

> 万分注意点！！！
>
> SQL 中 UPDATE 语句中的 WHERE 字句！
>
> WHERE 字句规定哪条记录或者哪些记录需要更新。如果您省略了 WHERE 字句，所有的记录都将被更新！

**例子**

```sql
UPDATE website
SET alexa = '5000', counry='USA'
WHERRE name = '菜鸟教程';
```



---



### 8. DELETE

> DELETE 语句用于删除表中的记录

**语法**

```sql
DELETE 
FROM table_name
WHERE some_colunm=some_values;
```

>注意！！！
>
>SQL DELETE 中的 WHERE 子句
>
>WHERE 子句规定哪些记录需要删除。如果你省略了 WHERE 子句，所有的记录都将被删除！

**例子**

```sql
DELETE 
FROM website
WHERE name='百度' AND country='CN'
```

**删除所有的数据**

> 您可以在不删除表的情况下，删除表中所有的行。这意味着表结构、属性、索引将保持不变。

```sql
DELETE 
FROM table_name;

--------
DELETE *
FROM table_name;
```

> **注意：**在删除记录时要格外小心！因为你不能重来。



---



##SQL高级教程

###1. SELECT TOP, LIMIT ROWNUM

> SELECT TOP 子句用于规定要返回的记录的数目
>
> SELECT TOP子句对于拥有数千条记录的大型表来说，是非常有用的。
>
> **注意！** 并非所有的数据库都支持 SELECT TOP语句。MYSQL 支持 LIMIT 语句来选取指定的条数数据，ORACLE可以使用ROWNUM来选取。
>
> 

**SQL SERVER / MS Access语法**

```sql
SELECT TOP number|percent colunm_name(s)
FROM table_name;
```



**MySQL语法**

```sql
SELECT colunm_name(s)
FROM table_name
LIMIT number;
```

**示例**

```sql
SELECT * 
FROM Persons
LIMIT 5;
```



**Oracle语法**

```sql
SELECT colunm_name(s)
FROM table_name
WHERE ROWNUM <= number;
```

**示例**

```sql
SELECT *
FROM Persons
WHERE ROWNUM <=5;
```



```js
// 一些小例子
MySQL
下面的 SQL 语句从 "Websites" 表中选取头两条记录：
SELECT * FROM website LIMIT 2;

----
Microsoft SQL Server 中还可以使用百分比作为参数
下面的 SQL 语句从 websites 表中选取前面百分之 50 的记录：
SELECT TOP 50 PERCENT * FROM Websites;
```



---



### 2. LIKE

> LIKE操作符用于在WHERE子句中搜索列中的指定模式



**SQL LIKE 语法**

```sql
SELECT colunm_name(s)
FROM table_name
WHERE colunm_name LIKE pattern;
```

**实例**

```sql
下面的SQL语句选取name以字母'G'开始的所有客户
SELECT *
FROM website
WHERE name like 'G%';
```

> 提示： ’%‘ 符号用户在模式的前后定义通配符（缺省字母）。

```sql
// 下面的 SQL 语句用于选取name以字母 K 结尾的所有客户
SELECT *
FROM website
WHERE name like '%K'
```

```sql
// 下面的 SQL 语句选取 name 包含模式 'oo' 的所有客户
SELECT * 
FROM website
WHERE name like '%oo%';
```



> 技巧：通过使用 NOT 关键字，您可以选择不匹配模式的记录

```sql
// 下面的 SQL 语句选取 name 不包含模式 'oo' 的所有客户
SELECT *
FROM website
WHERE name NOT LIKE '%oo%';
```



---



###3. 通配符

> 通配符可以用于替代字符串中的任何其他的字符
>
> 在 SQL 中，通配符与 SQL LIKE 操作符一起使用
>
> SQL 通配符用于搜索表中的数据
>
> 在 SQL 中，可以使用以下通配符



| 通配符                      | 描述                       |
| --------------------------- | -------------------------- |
| %                           | 替代0个或多个字符          |
| _                           | 替代一个字符               |
| [charlist]                  | 字符中的任何单一字符       |
| [^charlist]或者 [!charlist] | 不在字符列中的任何单一字符 |

**使用 SQL % 通配符**

```sql
// 下面的 SQL 语句选取 url 以字母 'https' 开始的所有网站
SELECT * 
FROM website
WHERE url LIKE 'https%';
```

**使用 SQL _ 通配符**

```sql
// 下面的 SQL 语句选取 name 以一个任意字符开始，然后是 'oogle'的所有客户
SELECT *
FROM website
WHERE name LIKE '_oole';
```

```sql
// 下面的SQL语句选取 name 以 'G' 开始，然后中间是一个任意字符，然后是 'o',然后是一个任意字符，然后是'le'的所有网站。
SELECT *
FROM website
WHERE neme LIKE 'G_o_le';
```

**使用 SQL[charlist]通配符**

> MySQL 中使用 REGEXP 或 NOT REGEXP 运算符（或 RLIKE 和 NOT RLIKE）来操作正则表达式。

```sql
// 下面的SQL语句选取 name 以 'G'、'F'或's'开始的所有网站。
SELECT *
FROM website
WHERE name REGEXP '^[GFs]';
```

```sql
// 下面的 SQL 语句选取 name 不以 A 到 H 字母开头的网站。
SELECT *
FROM website
WHERE name REGEXP '^[^A-H]';
```

> SQL 中，通配符与 SQL LIKE 操作符一起使用。
>
> 不过，MySQL 、SQLite 只支持 % 和 _ 通配符，不支持 [^charlist] 或 [!charlist] 通配符（ MS Access 支持，微软 office 对通配符一直支持良好，但微软有时候的通配符不支持 %，而是 *，具体看对应软件说明）。通配符和正则不是一回事。



---



### 4. IN 操作符

> IN操作符允许您在 WHERE 子句中规定多个值

```sql
SELECT colunm_name(s)
FROM table_name
WHERE colunm_name IN (value1, value2, ..);
```

**实例**

```sql
SELECT *
FROM website
WHERE name IN ('Google', '菜鸟教程');
```

> In 与 = 的异同
>
> 相同点：均在 WHERE 中使用作为筛选条件之一、均是等于的含义
>
> 不同点：IN 可以规定多个值，等于规定一个值 

**IN 与 = 等转换**

```sql
SELECT * 
FROM website
WHERE name IN ('Google', '菜鸟教程');

------
SELECT *
FROM website
WHERE name='Google' or name='菜鸟教程'
```



---



###5. BETWEEN

> BETWEEN 操作符用于选取介于两个值之间的数据范围内的值
>
> BETWEEN 操作符选取介于两个值之间的数据范围内的值。这些值都是数值、文本或者日期。

**语法**

```sql
SELECT colunm_name(s)
FROM table_name
WHERE colunm_name BETWEEN value1 AND value2;
```



**实例**

```sql
SELECT * FROM websites
WHERE alexa BETWEEN 1 AND 20;
```



**NOT BETWEEN操作符实例**

> 如需显示不在实例范围内的网站，请使用 NOT BETWEEN

```sql
SELECT *
FROM website
WHERE alexa NOT BETWEEN 1 AND 20;
```

**带有 IN 的 BETWEEN 操作符实例**

> 下面的 SQL 语句选取 alexa 介于1 和 20 之间但 country 不为 USA 和 IND的所有网站

```sql
SELECT *
FROM website
WHERE (alexa BETWEEN 1 AND 20)
AND country not IN ('USA', 'IND');
```

**带有文本值的 BETWEEN 操作符实例**

```sql
// 下面的 SQL 语句选取 name 以介于 'A'和'H'之间字母开始的所有网站。
SELECT *
FROM website
WHERE name BETWEEN 'A' AND 'H';
```

**带有文本值的 NOT BETWEEN操作符实例**

```sql
// 下面的 SQL 语句选取 name 不介于 'A'和'H'之间字母开始的所有网站
SELECT * 
FROM websites
WHERE name NOT BETWEEN 'A' AND 'H';
```

**带有日期值的BETWEEN操作符实例**

```sql
// 下面的 SQL 语句选取 date 介于 2016-05-10 和 2016-05-14 之间的所有访问记录

SELECT *
FROM access_log
WHERE date BETWEEN '2016-05-10' AND '2016-05-14';
```

> 请注意：在不同的数据库中，BETWEEN操作符将会产生不同的结果！
>
> 在某些数据库中，BETWEEN选取介于两个值之间但不包括两个测试值的字段。
>
> 在某些数据库中，BETWEEN选取介于两个值之间且包括两个测试值的字段。
>
> 在某些数据库中，BETWEEN 选取介于两个值之间且包括第一个测试值但不包括最后一个测试值的字段
>
> **因此，请检查您的数据库是如何处理 BETWEEN 操作符！**



---



### 6. 别名

> 通过使用 SQL，可以为表名称或列名称指定别名
>
> 基本上创建别名是为了让列名称可读性更强

**列的 SQL 别名语法**

```sql
SELECT colunm_name AS alias_name
FROM table_name;
```

**表的 SQL 别名语法**

```sql
SELECT colunm_name(s)
FRoM table_name AS alias_name;
```

**列的别名实例**

```sql
SELECT name AS n, country AS c
FROM websites;
```

> 牛逼啊！！！下面的这个

```sql
// 在下面的SQL语句中，我们把三个列（url，alexa和country）结合在一起，并创建一个名为 'site_info'

SELECT name, CONCAT(url, ', ', alexa, ', ', country) AS site_info
FROM websites;
```



**表的别名实例**

```sql
// 下面的 SQL 语句选取'菜鸟教程'的访问记录，我们使用 'websites'和'access_log'表，并分别为它们指定表别名 'w'和 'a'(通过使用别名让SQL语句更简短);
```

```sql
SELECT Websites.name, Websites.url, access_log.count, access_log.date 
FROM Websites, access_log 
WHERE Websites.id=access_log.site_id and Websites.name="菜鸟教程";

-------------

SELECT w.name, w.url, a.count, a.date
FROM websites AS w, access_log AS a
WHERE a.site_id=w.id and w.name='菜鸟教程';
```

> 在下面的情况下，使用别名很有用：
>
> 在查询超中涉及超过一个表
>
> 在查询中使用了函数
>
> 列名很长或者可读性差
>
> 需要把两个列或者多个列合在一起



---



###7. SQL连接（join）

>SQL join 用于把来自两个或多个表结合起来
>
>SQL join 子句用于用来把两个或多个表的行结合起来，基于这些表的共同字段。
>
>常见的join类型： SQL INNER JOIN（简单的join）。SQL INNER JOIN从多个表中返回满足JOIN条件的所有行

**实例**

```sql
SELECT websites.id, website.name, access_log.count, access_log.date
FROM websites
INNER JOIN access_log
ON website.id = access_log.site_id;
```

> 在继续讲解实例之前，我们先列出你可以使用的不同的 SQL JOIN 类型；
>
> INNER JOIN 如果表中有至少一个匹配，则返回行
>
> LEFT JOIN 即使右表中没有匹配，也从左表返回所有行
>
> RIGHT JOIN 即使左表中没有匹配，也从右表中返回所有的行
>
> FULL JOIN 只要其中一个表存在匹配，则返回行



---

#### 1. INNER JOIN

> INNER JOIN 关键字在表中存在至少一个匹配时返回行。

```sql
SELECT colunm_name(s)
FROM table1
INNER JOIN table2
ON table1.colunm_name = table2.colunm_name;
```

或者

```sql
SELECT colunm_name(s)
FROM table1
JOIN table2
ON table1.colunm_name = table2.colunm_name;
```

**实例**

```sql
SELECT Websites.name, access_log.count, access_log.date
FROM Websites
INNER JOIN access_log
ON Websites.id=access_log.site_id
ORDER BY access_log.count;
```

> **注释**：INNER JOIN 关键字在表中至少存在一个匹配时返回行。如果 websites 表中的行在 access_logs 中没有匹配，则不会列出这些行。

> **注意** 在使用join时，on和where条件的区别如下；
>
> 1. on条件是在生成临时表时使用的条件，它不管on中的条件是否为真，都会返回左边表中的记录。
> 2. where条件是在临时表生成好后，再对临时表进行过滤的条件。这时已经没有left join的含义（必须返回左边表的记录）了，条件不为真就全部过滤掉。



---



####2. LEFT JOIN 关键字

> LEFT JOIN 关键字从左表（table1）返回所有的行，即使右表（table2）中没有匹配。如果右表中没有匹配，则结果为NULL。

**语法**

```sql
SELECT colunm_names(s)
FROM table1
LEFT JOIN table2
ON table1.colunm_name = table2.colunm_name;
```

或

```sql
SELECT colunm_name(s)
FROM table1
LEFT OUTER JOIN table2
ON table1.colunm_name = table2.colunm_name;
```

> **注释：**在某些数据库中，LEFT JOIN 称为LEFT OUTER JOIN.

**实例**

```sql
SELECT Websites.name, access_log.count, access_log.date
FROM Websites
LEFT JOIN access_log
ON Websites.id=access_log.site_id
ORDER BY access_log.count DESC;
```

> 注意点：LEFT JOIN 关键字从左表（websites）返回所有的行，即使右表（access_log）中没有匹配。



---



#### 3. RIGHT JOIN

> RIGHT JOIN关键字从右表（table2）返回所有的行，即使左表（table1）中没有匹配。如·果左表中没有匹配，则结果为NULL。

**语法**

```sql
SELECT column_name(s)
FROM table1
RIGHT JOIN table2
ON table1.column_name=table2.column_name;
```

或者

```sql
SELECT column_name(s)
FROM table1
RIGHT OUTER JOIN table2
ON table1.column_name=table2.column_name;
```

> 注释：在某些数据库中，RIRHT JOIN称为RIGHT OUTER JOIN。

**实例**

```sql
SELECT Websites.name, access_log.count, access_log.date
FROM access_log
RIGHT JOIN Websites
ON access_log.site_id=Websites.id
ORDER BY access_log.count DESC;
```

> 注释：RIGHT JOIN 关键字从右表（websites）返回所有的行，即使左表（access_log）中没有匹配。



#### 4. FULL OUTER JOIN 关键字

> FULL OUTER JOIN关键字只要左表（table1）和右表（table2）其中一个表中存在匹配，则返回行。
>
> FULL OUTER JOIN 关键字结合了 LEFT JOIN 和 RIGHT JOIN的结果。

**语法**

```sql
SELECT colunm_name(s)
FROM table1
FULL OUTER JOIN table2
ON table1.colunm_name = table2.colunm_name;
```

**实例**

```sql
SELECT Websites.name, access_log.count, access_log.date
FROM Websites
FULL OUTER JOIN access_log
ON Websites.id=access_log.site_id
ORDER BY access_log.count DESC;
```

> 注释：FULL OUTER JOIN关键字返回左表（Websites）和右表（access_log）中所有的行。如果 websites 表中的行在 access_log中没有匹配或者 access_log 表中的行在 websites 表中没有匹配，也会列出这些行。



---



### 8. UNION

> SQL UNION操作符合并两个或多个SELECT语句的结果。
>
> 请注意：UNION内部的每个SELECT语句必须拥有相同数量的列。列也必须拥有相似的数据类型。同时，每个SELECT语句中的列的顺序必须相同。

**语法**

```sql
SELECT colunm_name(s) FROM table1
UNION
SELECT colunm_name(s) FROM table2;
```

> 注释：默认的，UNION操作符选取不同的值，如果允许重复的值，请使用UNION ALL.

**SQL UNION ALL语法**

```sql
SELECT colunm_nams(s) FROM table1
UNION ALL
SELECT colunm_name(s) FROM table2;
```

> 注释：UNION结果集中的列名总是等于UNION中第一个SELECT语句中的列名。

**实例**

```sql
下面的SQL语句从 'websites' 和 'apps'表中选取所有 不同的 country （只有不同的值）

SELECT country FROM websites
UNION
SELECT country FROM apps
ORDER BY country;
```



---



### 9. SELECT INTO

> 通过SQL，您可以从一个表复制信息到另一个表。
>
> SELECT INTO 语句从一个表复制数据，然后把数据插入到另一个新表中。



> 注意：Mysql 数据库不支持 SELECT ... INTO 语句，但支持 INSERT ... SELECT.
>
> 当然你也可以使用以下语句来拷贝表结构及数据。

```sql
CREATE TEBLE 新表
AS
SELECT * FROM 旧表
```

**语法**

```sql
我们可以复制所有的列插入到新表中
SELECT *
INTO newtable [IN externaldb]
FROM table;
```

或者只复制期望的列插入到新表中

```sql
SELECT colunm_name(s)
INTO newtable [IN externaldb]
FROM table;
```

> 提示：新表将会使用 SELECT 语句中定义的列名称和类型进行创建。您可以使用 AS 子句来应用新名称。



**实例**

```sql
// 创建 Websites 的备份复件
SELECT *
INTO newtable
FROM websites;
```

```sql
// 只复制一些列插入到新表中
SELECT name, url
INTO newtable
FROM Websites;
```

```sql
// 只复制中国的网站插入到新表中
SELECT *
INTO newtable
FROM websites
WHERE country='CN';
```

```sql
// 复制多个表中的数据插入到新表中
SELECT websites.name, access_log.count, access_log.data
INTO newtable
FROM websites
LEFT JOIN access_log
ON websites.id = access_log.id;
```

> 提示 SELECT INTO 语句可用于通过另一种模式创建一个新的空表。只需要添加促使查询没有数据返回的WhERE 子句即可。

```sql
SELECT *
INTO newtable
FROM table
WHERE 1=0;
```



---



### 10. INSERT INTO SELECT

> 通过 SQL，您可以从一个表复制信息到另一个表。
>
> INSERT INTO SELECT 语句从一个表复制数据，然后把数据插入到一个已存在的表中。目标表中任何已存在的行都不会受影响。

**语法**

```sql
// 我们可以从一个表中复制所有的列插入到另一个已存在的表中
INSERT INTO table2
SELECT * FROM table;
```

或者我们可以只复制希望的列插入到另一个已存在的表中；

```sql
INSERT INTO table2
（colunm_name(s)）
SELECT colunm_name(s)
FROM table1;
```



**实例**

```sql
// 复制 'apps' 中的数据插入到 'websites'中
INSERT INTO websites (name, country)
SELECT apps_name, country FROM apps;
```

```sql
// 只复制 QQ 的 APP 到 'Websites'中;
INSERT INTO Websites (name, country)
SELECT app_name, country FROM apps
WHERE id = 1;
```



> 注意：SELECT INTO FROM 和 INSERT INTO SELECT 都是用来复制表的
>
> 两者的主要区别为：select into from要求目标表不存在，因为在插入时会自动创建；
>
> INSERT INTO SELECT FROM 要求目标表存在。

**拓展，也要知道的一些操作吧**

1. 复制表结构及其数据：

```sql
create table table_name_new as select * from table_name_old
```

2. 只复制表结构：

```sql
create table table_name_new as select * from table_name_old where 1=2;
```

或者：

```sql
create table table_name_new like table_name_old
```

3. 只复制表数据：

如果两个表结构一样：

```sql
insert into table_name_new select * from table_name_old
```

如果两个表结构不一样：

```sql
insert into table_name_new(column1,column2...) select column1,column2... from table_name_old
```























