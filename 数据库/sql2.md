[TOC]

### 1.CREATE DATABASE

> CREATE DATABASE语句用于创建数据库

**语法**

```sql
CREATE DATABASE dbname;
```

**实例**

```sql
// 下面的 SQL 语句创建一个名为 'my_db' 的数据库
CREATE DATABASE my_db;
```

---

###2. CREATE TABLE

> CREATE TABLE 语句用于创建数据库中的表
> 
> 表由行和列组成，每个表都必须有个表名。

**语法**

```sql
CREATE TABLE table_name
(
    colunm_name1 data_type(size),
    colunm_name2 data_type(size),
    colunm_name3 data_type(size),
    ...
)
colunm_name参数规定表中列的名称。
data_type 参数规定列的数据类型（例如 varchar, integer, decimal, date 等等）。
size 参数规定表中列的最大长度。
```

**实例**

```sql
// 现在我们想要创建一个名为 'Persons' 的表，包含五列：PersonID, LastName, FirstName, Address 和 city

CREATE TABLE Persons
(
    PersonID int,
    LastName varchar(255),
    FirstName varchar(255),
    Address varchar(255),
    City varchar(255)
);
PersonID 列的数据类型是 int,包含整数。
LastName、FirstName、Address和City列的数据类型是varchar，包含字符，且这些字段的最大长度为255个字符
```

---

### 3. SQL 约束

> SQL约束用于规定表中的数据规则。
> 
> 如果存在违反约束的数据行为，行为会将被约束终止。
> 
> 约束可以在创建表时规定（通过CREATE TABLE语句），或者在表创建之后规定（通过ALERT TABLE语句）.

**CREATE TABLE + CONSTRAINT**

```SQL
CRATE TABLE table_name
(
    colunm_name data_type(size) constraint_name,
    colunm_name data_type(size) constraint_name,
    colunm_name data_type(size) constraint_name,
    ...
);
```

> 在SQL中，我们有如下约束

| 约束名         | 作用                                                                |
| ----------- | ----------------------------------------------------------------- |
| NOT NULL    | 指示某列不能存储 NULL 值                                                   |
| UNIQUE      | 保证某列的每行必须有唯一的值                                                    |
| PRIMARY KEY | NOT NULL和UNIQUE的结合。确保某列（或两个列多个列的结合）有唯一的标识，有助于更容易更快速的找到表中的一个特定的记录。 |
| FOREIGN KEY | 保证一个表中的数据匹配另一个表中的值的参照完整性。                                         |
| CHECK       | 保证列中的值符合指定的条件                                                     |
| DEFAULT     | 规定没有给出列赋值时的默认值                                                    |

在后面会详细讲解每一种约束。

**实例**

```sql
CREATE TABLE Persons
(
    Id_P int NOT NULL,
    LastName varchar(255) NOT NULl,
    FirstName varchar(255),
    Address varchar(255),
    City varchar(255),
    PRIMARY KEY (Id_P) 
)

CREATE TABLE
(
    Id_P int NOT NULL PRIMARY KEY,
    LastName varchar(255) NOT NULl,
    FirstName varchar(255),
    Address varchar(255),
    City varchar(255)
)
```

---

#### 1. NOT NULL约束

> 在默认情况下，表的列接受 NUll 值。
> 
> NOT NULL 约束强制列不接受 NULL 值。
> 
> NOT NULL 约束强制字段始终包含值。这意味着，如果不向字段添加值就无法插入新纪录或者更新记录。

```sql
// 下面的 SQL 强制 'P_id'列和 'LastName'列不接受 NULL 值。
CREATE TABLE Persons
(
    P_Id int NOT NUll,
    LastName varchar(255) NOT NULL,
    FirstName varchar(255),
    Address varchar(255),
    City varchar(255)
)
```

**拓展**

```sql
// 删除表的字段的 not null约束。
alert table x modify colunm_name null;
alert table x modify colunm_name not null;
```

---

#### 2. UNIQUE 约束

> UNIQUE 约束唯一标识数据库表中的每条记录。
> 
> UNIQUE 和 PRIMARY KEY 约束均为列或列集合提供了唯一性的保证。
> 
> PRIMARY KEY约束拥有自动定义的UNIQUE约束。
> 
> 请注意，每个表可以有多个 UNIQUE 约束，但是每个表只能有一个PRIMARY KEY约束。

**语法**

**CREATE TABLE 时的 SQL UNIQUE约束**

下面的 SQL 在 'Persons' 表创建时在 'P_Id' 列上创建 UNIQUE 约束。

```sql
MySQL

CREATE TABLE Persons
(
    P_Id int NOT NULL,
    LastName varchar(255) NOT NULL,
    FirstName varchar(255),
    Address varchar(255),
    City varchar(255),
    UNIQUE(P_Id)
)
```

```sql
SQL Server / Oracle / MS Access

CREATE TABLE Persons
(
    P_Id int NOT NULL UNIQUE,
    LastName varchar(255) NOT NULL,
    FirstName varchar(255),
    Address varchar(255),
    City varchar(255)
)
```

> 如需命名 UNIQUUE 约束，并定义多个列的 UNIQUE 约束，请使用下面的 SQL 语法。

```sql
MySQL / SQL Server / Oracle / MS Access
CREATE TABLE Persons
(
    P_Id int NOT NULL,
    LastName varchar(255) NOT NULL,
    FirstName varchar(255),
    Address varchar(255),
    City varchar(255),
    CONSTRAINT uc_PersonID UNIQUE (P_Id, LastName)
)
```

**ALERT TABLE时的SQL UNIQUE约束**

> 当表已被创建，如需在 'P_Id'列创建UNIQUE约束，请使用下面的SQL

```sql
MySQL / SQL Server / Oracle / MS Access
ALERT TABLE Persons
ADD UNIQUE (P_Id)
```

> 如需命名 UNIQUE 约束，并定义多个列的 UNIQUE 约束，请使用下面的 SQL 语法。

```sql
MySQL / SQL Server / Oracle / MS Access
ALERT TABLE Persons
ADD CONSTRAINT uc_PersonID UNIQUE (P_Id, LastName);
```

**撤销 UNIQUE 约束**

> 如需撤销UNIQUE约束，请使用下面的SQL

```sql
// MySQL
ALERT TABLE Persons
DROP INDEX uc_Persons; // 暂时还不理解这个 uc_Persons 是啥，明天测试一下
```

```sql
// SQL Server / Oracle / MS Access
ALERT TABLE Persons
DROP CONSTRAINT uc_PersonID
```

---

#### 3. PRIMARY KEY

> PRIMARY KEY 约束唯一标识数据库中的每条记录
> 
> 主键必须包含唯一值
> 
> 主键列不能包含 NULL 值
> 
> 每个表都应该有一个主键，并且每个表只能有一个主键。

**CREATE TABLE时的SQL PRIMARY KEY约束**

下面的 SQL 在 'Persons' 表创建时在 ’P_Id‘列上创建 PRIMARY KEY约束

```sql
// MySQL
CREATE TABLE Persons
(
    P_Id int NOT NULL,
    LastName varchar(255) NOT NULL,
    FirstName varchar(255),
    Address varchar(255),
    City varchar(255),
    PRIMARY KEY (P_Id)
);
```

```sql
// SQL Server / Oracle / MS Access

CREATE TABLE Persons
(
    P_Id int NOT NULL PRIMARY KEY,
    LastName varchar(255) NOT NULL,
    FirstName varchar(255),
    Address varchar(255),
    City varchar(255)
)
```

> 如需命名 PRIMARY KEY 约束，并定义多个列的 PRIMARY KEY 约束，请使用下面的 SQL 语法

```sql
CREATE TABLE Persons
(
    P_Id int NOT NULL,
    LastName varchar(255) NOT NULL,
    FirstName varchar(255),
    Address varchar(255),
    City varchar(255),
    CONSTRAINT pk_PersonID PRIMARY KEY (P_Id, LastName)
)

// 在上面的实例中，只有一个主键PRIMARY KEY (pk_PersonID)。然而，pk_PersonID的值是由两个列（P_Id和LastName）组成的。
```

**ALERT TABLE时的SQL PRIMARY KEY约束**

> 当表已经被创建时，如需在 P_Id列创建PRIMARY KEY约束，请使用下面的SQL

```sql
MySQL / SQL Server / Oracle / MS Access

ALERT TABLE Persons
ADD PRIMARY KEY (P_Id);
```

> 如需命名 PRIMARY KEY 约束，并定义多个列的 PRIMARY KEY 约束，请使用下面的 SQL 语法：

```sql
MySQL / SQL Server / Oracle / MS Access

ALERT TABLE Persons
ADD CONSTRAINT pk_PersonID PRIMARY KEY (P_Id, LastName);
```

> **注意**：如果您使用 ALERT TABLE 语句添加主键，必须把主键列声明为不包含 NULL 值（在表首次创建时）。

**撤销PRIMARY KEY约束**

> 如需撤销 PRIMARY KEY约束，请使用下面的SQL

```sql
// MySQL
ALERT TABLE Persons
DROP PRIMARY KEY
```

```sql
// SQL Server / Oracle / MS Access
ALERT TABLE Persons
DROP CONSTRAINT pk_PersonID
```

**拓展**

> 撤销 PRIMARY KEY 约束时，不论约束条件为一列还是多列，对于 MySQL 都是

```sql
ALTER TABLE Persons
DROP PRIMARY KEY
```

由于PRIMARY KEY唯一性 MySQL 处理办法简单

但对于SQL Server / Oracle / MS Access,一个列

```sql
ALERT TABLE Persons
DROP CONSTRAINT P_Id
```

若起约束名，也可如下多个列

```sql
ALERT TABLE Persons
DROP CONSTRAINT pk_PersonID
```

---

#### 4. FOREIGN KEY

> 一个表中的 FOREIGN KEY 指向另一个表中的 UNIQUE KEY（唯一约束的键）
> 
> FOREIGN KEY 约束用于预防破坏表之间连接的行为
> 
> FOREIGN KEY 约束也能防止非法数据插入外键列，因为它必须是它指向的那个表中的值之一。

**CEATE TABLE 时的 SQL FOREIGN KEY约束**

```sql
// MySQL

CREATE TABLE Orders
(
    O_Id int NOT NULL,
    OrderNo int NOT NULL,
    P_Id int,
    PRIMARY KEY (O_Id),
    FOREIGN KEY (P_Id) REFERENCES Persons(P_Id)
)
```

```sql
SQL Server / Oracle / MS Access

CREATE TABLE Orders
(
    O_Id int NOT NULL PRIMARY KEY,
    OrderNo int NOT NULL,
    P_Id int FOREIGN KEY REFERENCES Persons(P_Id)
)
```

> 如需命名 FOREIGN KEY 约束，并定义多个列的 FOREIGN KEY 约束，请使用下面的 SQL 语法：

```sql
MySQL / SQL Server / Oracle / MS Access

CREATE TABLE Orders
(
    O_Id int NOT NULL,
    OrderNo int NOT NULL,
    P_Id int,
    PRIMARY KEY (O_Id),
    CONSTRAINT fk_PerOrders FOREIGN KEY (P_Id)
    REFERENCES Persons(P_Id)
)
```

**ALERT TABLE 时的 SQL FOREIGN KEY 约束**

当 "Orders" 表已被创建时，如需在 "P_Id" 列创建 FOREIGN KEY 约束，请使用下面的 SQL：

```sql
MySQL / SQL Server / Oracle / MS Access
ALTER TABLE Orders
ADD FOREIGN KEY (P_Id)
REFERENCES Persons(P_Id)
```

如需命名 FOREIGN KEY 约束，并定义多个列的 FOREIGN KEY 约束，请使用下面的 SQL 语法：

```sql
MySQL / SQL Server / Oracle / MS Access
ALTER TABLE Orders
ADD CONSTRAINT fk_PerOrders
FOREIGN KEY (P_Id)
REFERENCES Persons(P_Id)
```

**撤销FOREIGN KEY 约束**

如需撤销 FOREIGN KEY 约束，请使用下面的 SQL：

```sql
// MySQL：
ALTER TABLE Orders
DROP FOREIGN KEY fk_PerOrders
```

```sql
SQL Server / Oracle / MS Access：
ALTER TABLE Orders
DROP CONSTRAINT fk_PerOrders
```

---

#### 5. CHECK

> CHECK约束用于限制列中的值的范围
> 
> 如果对单个列定义CHECK约束，那么该列只允许特定的值。
> 
> 如果对一个表定义CHECK约束，那么此约束会基于行中其他列的值进行限制。

**CREATE TABLE 时的 SQL CHECK 约束**

下面的 SQL 在 "Persons" 表创建时在 "P_Id" 列上创建 CHECK 约束。CHECK 约束规定 "P_Id" 列必须只包含大于 0 的整数。

```sql
// MySQL
CREATE TABLE Persons
(
    P_Id int NOT NULL,
    LastName varchar(255) NOT NULL,
    FirstName varchar(255),
    Address varchar(255),
    City varchar(255),
    CHECK (P_Id>0)
)
```

```sql
SQL Server / Oracle / MS Access

CREATE TABLE Persons
(
    P_Id int NOT NULL CHECK (P_Id>0),
    LastName varchar(255) NOT NULL,
    FirstName varchar(255),
    Address varchar(255),
    City varchar(255)
)
```

如需命名 CHECK 约束，并定义多个列的 CHECK 约束，请使用下面的 SQL 语法：

```sql
CREATE TABLE Persons
(
    P_Id int NOT NULL,
    LastName varchar(255) NOT NULL,
    FirstName varchar(255),
    Address varchar(255),
    City varchar(255),
    CONSTRAINT chk_Person CHECK (P_Id>0 AND City='Sandnes')
)
```

**ALERT TABLE 时的 SQL CHECK 约束**

当表已被创建时，如需在 "P_Id" 列创建 CHECK 约束，请使用下面的 SQL：

```sql
MySQL / SQL Server / Oracle / MS Access

ALTER TABLE Persons
ADD CHECK (P_Id>0)
```

如需命名 CHECK 约束，并定义多个列的 CHECK 约束，请使用下面的 SQL 语法：

```sql
MySQL / SQL Server / Oracle / MS Access

ALTER TABLE Persons
ADD CONSTRAINT chk_Person CHECK (P_Id>0 AND City='Sandnes')
```

**撤销 CHECK约束**

```sql
SQL Server / Oracle / MS Access：

ALTER TABLE Persons
DROP CONSTRAINT chk_Person
```

```sql
MySQL 

ALTER TABLE Persons
DROP CHECK chk_Person
```

---

#### 6. DEFAULT

> DEFAULT 约束用于向列中插入默认值
> 
> 如果没有规定其他的值，那么会将默认值添加到所有的新纪录

**CREATE TABLE 时的 SQL DEFAULT 约束**

```sql
My SQL / SQL Server / Oracle / MS Access：

CREATE TABLE Persons
(
    P_Id int NOT NULL,
    LastName varchar(255) NOT NULL,
    FirstName varchar(255),
    Address varchar(255),
    City varchar(255) DEFAULT 'Sandnes'
)
```

通过使用类似 GETDATE() 这样的函数，DEFAULT 约束也可以用于插入系统值：

```sql
CREATE TABLE Orders
(
    O_Id int NOT NULL,
    OrderNo int NOT NULL,
    P_Id int,
    OrderDate date DEFAULT GETDATE()
)
```

**ALERT TABLE时的 SQL DEFAULT约束**

当表已被创建时，如需在 City 列创建 DEFAULT 约束，请使用下面的 SQL

```sql
MySQL

ALTER TABLE Persons
ALTER City SET DEFAULT 'SANDNES'
```

```sql
SQL Server / MS Access

ALTER TABLE Persons
ADD CONSTRAINT ab_c DEFAULT 'SANDNES' for City
```

```sql
Oracle

ALTER TABLE Persons
MODIFY City DEFAULT 'SANDNES'
```

**撤销 DEFAULT 约束**

如需撤销 DEFAULT 约束，请使用下面的 SQL

```sql
MySQL

ALTER TABLE Persons
ALTER City DROP DEFAULT
```

```sql
SQL Server / Oracle / MS Access

ALTER TABLE Persons
ALTER COLUMN City DROP DEFAULT
```

---

### 4. CREATE INDEX

> CREATE INDEX语句用于在表中创建索引
> 
> 在不读取整个表的情况下索引使数据库应用程序可以更快地查找数据。
> 
> 用户无法看到索引，它们只能被用来加速搜索 / 查询
> 
> **注意**：更新一个包含索引的表需要比更新一个没有索引的表花费更多的时间，这是由于索引本身也需要更新。因此，理想的做法是仅仅在常常被搜索的列（以及表）上面创建索引。

**CREATE INDEX 语法**

```sql
// 在表上创建一个简单的索引。允许使用重复的值
CREATE INDEX index_name
ON table_name (colunm_name);
```

**CREATE UNIQUE INDEX 语法**

```sql
// 在表上创建一个唯一的索引。不允许使用重复的值；唯一的索引意味着两个行不能拥有相同的索引值。
Creates a unique index on a table. Duplicate values are not allowed:

CREATE UNIQUE INDEX index_name
ON table_name (colunm_name);
```

**注释：**用于创建索引的语法在不同的数据库中不一样，因此，检查您的数据库中创建索引的语法。

**实例**

```sql
CREATE INDEX PIndex
ON Persons (LastName)
```

如果您希望索引不止一个列，您可以在括号中列出这些列的名称，用逗号隔开：

```sql
CREATE INDEX PIndex
ON Persons (LastName, FirstName)
```

---

### 5. 撤销索引、表、数据库

> 通过 DROP 语句，可以轻松的删除索引、表和数据库。

**DROP INDEX**

> DROP INDEX 语句用于删除表中的索引。

```sql
用于 MS Access 的 DROP INDEX 语法：
DROP INDEX index_name ON table_name

用于 MS SQL Server 的 DROP INDEX 语法：
DROP INDEX table_name.index_name

用于 DB2/Oracle 的 DROP INDEX 语法：
DROP INDEX index_name

用于 MySQL 的 DROP INDEX 语法：
ALTER TABLE table_name DROP INDEX index_name
```

**DROP TABLE**

> DROP TABLE 语句用于删除表

```sql
DROP TABLE table_name
```

**DROP DATABASE**

> DROP DATABASE语句用于删除数据库

```sql
DROP DATABASE database_name
```

---

### 6. ALERT TABLE

> ALERT TABLE 语句用于在已有的表中添加删除或修改列。

**ALERT TABLE 语法**

```sql
// 如需在表中添加列，请使用下面的语法:
ALTER TABLE table_name
ADD column_name datatype
```

```sql
如需删除表中的列，请使用下面的语法（请注意，某些数据库系统不允许这种在数据库表中删除列的方式）：
ALTER TABLE table_name
DROP COLUMN column_name
```

```sql
要改变表中列的数据类型，请使用下面的语法：

SQLServer / MS Access：
ALTER TABLE table_name
ALTER COLUMN column_name datatype

MySQL / Oracle：
ALTER TABLE table_name
MODIFY COLUMN column_name datatype
```

**实例**

```sql
现在，我们想在 "Persons" 表中添加一个名为 "DateOfBirth" 的列。
我们使用下面的 SQL 语句：

ALTER TABLE Persons
ADD DateOfBirth date
```

---

### 7. AUTO INCREMENT

> AUTO_INCREMENT会在新记录插入表时生成一个唯一的数字。
> 
> 我们通常希望在每次插入新纪录时，自动地创建主键字段的值。
> 
> 我们可以在表中创建一个 auto_increment 主键字段

**语法**

```sql
// 下面的 SQL 语句把 Persons 表中的 ID 列定义为 auto_increment 主键字段

CREATE TABLE Persons
(
    ID int NOT NULL AUTO_INCREMENT,
    LastName varchar(255) NOT NULL,
    FirstName varchar(255),
    Address varchar(255),
    City varchar(255),
    PRIMARY KEY (ID)
)
```

> MySQL 使用 AUTO_INCREMENT关键字来执行 auto_increment 任务
> 
> 默认地，AUTO_INCREMENT的开始值是1，每条新纪录递增1
> 
> 要让 AUTO_INCREMENT 序列以其他的值起始，请使用下面的 SQL 语法

```sql
ALERT TABLE Persons AUTO_INCREMENT=100
```

> 要在 Persons 表中插入新纪录，我们不必为 ID 列规定值（会自动添加一个唯一的值）

```sql
INSERT INTO Persons (FirstName, LastName)
VALUES ('Last', 'Monsen');

上面的 SQL 语句会在 "Persons" 表中插入一条新记录。"ID" 列会被赋予一个唯一的值。"FirstName" 列会被设置为 "Lars"，"LastName" 列会被设置为 "Monsen"。
```

**用于 SQL Server语法**

> 下面的 SQL 语句把 ‘Persons’ 表中的 ’ID‘列定义为 auto_increment 主键字段

```sql
CREATE TABLE Persons
(
    ID int IDENTITY(1,1) PRIMARY KEY,
    LastName varchar(255) NOT NULL,
    FirstName varchar(255),
    Address varchar(255),
    City varchar(255)
)
```

> MS SQL Server 使用 IDENTITY 关键字来执行 auto-increment 任务。
> 
> 在上面的实例中，IDENTITY 的开始值是 1，每条新记录递增 1。
> 
> **提示：**要规定 "ID" 列以 10 起始且递增 5，请把 identity 改为 IDENTITY(10,5)。

**用于 Access 的语法**

```sql
下面的 SQL 语句把 "Persons" 表中的 "ID" 列定义为 auto-increment 主键字段：

CREATE TABLE Persons
(
    ID Integer PRIMARY KEY AUTOINCREMENT,
    LastName varchar(255) NOT NULL,
    FirstName varchar(255),
    Address varchar(255),
    City varchar(255)
)
```

> MS Access 使用 AUTOINCREMENT 关键字来执行 auto-increment 任务。
> 
> 默认地，AUTOINCREMENT 的开始值是 1，每条新记录递增 1。
> 
> **提示：**要规定 "ID" 列以 10 起始且递增 5，请把 autoincrement 改为 AUTOINCREMENT(10,5)。

---

**语法 for Oracle**

```sql
在 Oracle 中，代码稍微复杂一点。
您必须通过 sequence 对象（该对象生成数字序列）创建 auto-increment 字段。
请使用下面的 CREATE SEQUENCE 语法：

CREATE SEQUENCE seq_person
MINVALUE 1
START WITH 1
INCREMENT BY 1
CACHE 10

上面的代码创建一个名为 seq_person 的 sequence 对象，它以 1 起始且以 1 递增。该对象缓存 10 个值以提高性能。cache 选项规定了为了提高访问速度要存储多少个序列值。
```

---

## 二、 视图

### 1.视图

> 视图是可视化的表
> 
> 这里将如何创建、更新和删除视图。
> 
> 在 SQL 中，视图是基于 SQL 语句的结果集的可视化的表。
> 
> 视图包含行和列，就像一个真实的表。视图中的字段就是来自一个或多个数据库中的真实的表的字段。
> 
> 您可以向视图添加 SQL 函数、WHERE以及JOIN语句，也可以呈现数据，就像这些数据来自于某个单一的表一样。

**CREATE VIEW语法**

```sql
CREATE VIEW view_name AS
SELECT colunm_name(s)
FROM table_name
WHERE condition;
```

> 注释：视图总是显示最新的数据！每当用户查询视图时，数据库引擎通过使用视图的 SQL 语句重建数据

**实例**

```sql
样本数据库 Northwind 拥有一些被默认安装的视图
视图 "Current Product List" 会从 "Products" 表列出所有正在使用的产品（未停产的产品）。这个视图使用下面的 SQL 创建：

CREATE VIEW [Current Product List] AS
SELECT ProductID,ProductName
FROM Products
WHERE Discontinued=No
```

```sql
// 我们可以像这样查询上面这个视图

SELECT * FROM [Current Product List]
```

```sql
// Northwind 样本数据库的另一个视图会选取 "Products" 表中所有单位价格高于平均单位价格的产品：
CREATE VIEW [Products Above Average Price] AS
SELECT ProductName,UnitPrice
FROM Products
WHERE UnitPrice>(SELECT AVG(UnitPrice) FROM Products)

我们可以像这样查询上面这个视图：
SELECT * FROM [Products Above Average Price]

Northwind 样本数据库的另一个视图会计算在 1997 年每个种类的销售总数。请注意，这个视图会从另一个名为 "Product Sales for 1997" 的视图那里选取数据：
CREATE VIEW [Category Sales For 1997] AS
SELECT DISTINCT CategoryName,Sum(ProductSales) AS CategorySales
FROM [Product Sales for 1997]
GROUP BY CategoryName

我们可以像这样查询上面这个视图：
SELECT * FROM [Category Sales For 1997]

我们也可以向查询添加条件。现在，我们仅仅需要查看 "Beverages" 类的销售总数：
SELECT * FROM [Category Sales For 1997]
WHERE CategoryName='Beverages'
```

**SQL更新视图**

**CREATE OR REPLACE VIEW语法**

```sql
CREATE OR REPLACE VIEW view_name AS
SELECT colunm_name(s)
FROM table_name
WHERE condition;
```

```sql
现在，我们希望向 "Current Product List" 视图添加 "Category" 列。我们将通过下列 SQL 更新视图：
CREATE VIEW [Current Product List] AS
SELECT ProductID,ProductName,Category
FROM Products
WHERE Discontinued=No
```

这里有一个SQL Server的视图创建方法

```sql
ALTER VIEW [ schema_name . ] view_name [ ( column [ ,...n ] ) ] 
[ WITH <view_attribute> [ ,...n ] ] 
AS select_statement 
[ WITH CHECK OPTION ] [ ; ]

<view_attribute> ::= 
{ 
    [ ENCRYPTION ]
    [ SCHEMABINDING ]
    [ VIEW_METADATA ]     
} 

schema_name: 视图所属架构的名称。
view_name: 要更改的视图。
column: 将成为指定视图的一部分的一个或多个列的名称（以逗号分隔）。
```

**SQL 撤销视图**

您可以通过 DROP VIEW 命令来删除视图

**语法**

```sql
DROP VIEW view_name;
```

---

### 2.Date函数

> 当我们处理日期时，最难的任务恐怕是确保所插入的日期的格式，与数据库中日期列的格式相匹配。
> 
> 只要您的数据包含的只是日期部分，运行查询就不会出问题。但是，如果涉及时间部分，情况就有点复杂了。

**MySQL Date 函数**

下面的表格列出了 MySQL 中最重要的内建日期函数

| 函数            | 描述                 |
| ------------- | ------------------ |
| NOW()         | 返回当前的日期和时间         |
| CURDATE()     | 返回当前的日期            |
| CURTIME()     | 返回当前的时间            |
| DATE()        | 提取日期或日期/时间表达式的日期部分 |
| EXTRACT()     | 返回日期/时间的单独部分       |
| DATE_ADD()    | 向日期添加指定的时间间隔       |
| DATE_SUB()    | 从日期中减去指定的时间间隔      |
| DATEDIFF()    | 返回两个日期之间的天数        |
| DATE_FORMAT() | 用不同的格式显示日期时间       |

**SQL Server Date函数**

下面的表格列出了 SQL Server 中最重要的内建日期函数：

| 函数         | 描述               |
| ---------- | ---------------- |
| GETDATE()  | 返回当前的日期和时间       |
| DATEPART() | 返回日期/时间的单独部分     |
| DATEADD()  | 在日期中添加或减去指定的时间间隔 |
| DATEDIFF() | 返回两个日期之间的时间      |
| CONVERT()  | 用不同的格式显示日期/时间    |

**SQL Date数据类型**

**MySQL** 使用下列数据类型在数据库中存储日期或日期/时间值：

- DATE - 格式：YYYY-MM-DD
- DATETIME - 格式：YYYY-MM-DD HH:MM:SS
- TIMESTAMP - 格式：YYYY-MM-DD HH:MM:SS
- YEAR - 格式：YYYY 或 YY

**SQL Server** 使用下列数据类型在数据库中存储日期或日期/时间值：

- DATE - 格式：YYYY-MM-DD
- DATETIME - 格式：YYYY-MM-DD HH:MM:SS
- SMALLDATETIME - 格式：YYYY-MM-DD HH:MM:SS
- TIMESTAMP - 格式：唯一的数字

> 注释：当您在数据库中插入一个新表时，需要为列选择数据类型。

**SQL 日期处理**

如果不涉及时间部分，那么我们可以轻松地比较两个日期！

假设我们有如下的 "Orders" 表：

| OrderId | ProductName            | OrderDate  |
| ------- | ---------------------- | ---------- |
| 1       | Geitost                | 2008-11-11 |
| 2       | Camembert Pierrot      | 2008-11-09 |
| 3       | Mozzarella di Giovanni | 2008-11-11 |
| 4       | Mascarpone Fabioli     | 2008-10-29 |

现在，我们希望从上表中选取 OrderDate 为 "2008-11-11" 的记录。

我们使用下面的 SELECT 语句：

SELECT * FROM Orders WHERE OrderDate='2008-11-11'

结果集如下所示：

| OrderId | ProductName            | OrderDate  |
| ------- | ---------------------- | ---------- |
| 1       | Geitost                | 2008-11-11 |
| 3       | Mozzarella di Giovanni | 2008-11-11 |

现在，假设 "Orders" 表如下所示（请注意 "OrderDate" 列中的时间部分）：

| OrderId | ProductName            | OrderDate           |
| ------- | ---------------------- | ------------------- |
| 1       | Geitost                | 2008-11-11 13:23:44 |
| 2       | Camembert Pierrot      | 2008-11-09 15:45:21 |
| 3       | Mozzarella di Giovanni | 2008-11-11 11:12:01 |
| 4       | Mascarpone Fabioli     | 2008-10-29 14:56:59 |

如果我们使用和上面一样的 SELECT 语句：

```
SELECT * FROM Orders WHERE OrderDate='2008-11-11'

或

SELECT * FROM Orders WHERE OrderDate='2008-11-11 00：00：00'
```

那么我们将得不到结果！因为表中没有"2008-11-11 00:00:00"日期。如果没有时间部分，默认时间为 00:00:00。

**提示：**如果您希望使查询简单且更易维护，那么请不要在日期中使用时间部分！

---

### 3.NULL值

> NULL值代表遗漏的未知数据
> 
> 默认的，表的列可以存放NULL值
> 
> 这里讲解 IS NULL 和 IS NOT NULL 操作符。

> 如果表中的某个列是可选的，那么我们可以在不向该列添加值的情况下插入新纪录或更新已有的记录。这意味着该字段将以 NULL 值保存。
> 
> NULL 值的处理方式与其他值不同。
> 
> NULL 用作未知的或不适用的值的占位符。
> 
> 无法比较 NULL 和 0；它们是不等价的。

**SQL NULL值处理**

| P_Id | LastName  | FirstName | Address   | City      |
| ---- | --------- | --------- | --------- | --------- |
| 1    | Hansen    | Ola       |           | Sandnes   |
| 2    | Svendson  | Tove      | Borgvn 23 | Sandnes   |
| 3    | Pettersen | Kari      |           | Stavanger |

> **注意**无法使用比较运算符来测试 NULL 值，比如 =、< 或 <>。
> 
> 我们必须使用 IS NULL 和 IS NOT NULL 操作符。

**SQL IS NULL**

```sql
我们如何仅仅选取在 'Adress' 列中带有 NULL值的记录呢。
我们必须使用 IS NULL 操作符

SELECT LastName, FirstName, Address 
FROm Persons
WHERE Address IS NULL;
```

> **提示** 请始终使用 IS NULL 来查找 NULL 值。

**SQL IS NOT NULL**

```sql
我们如何仅仅选取在 Address 列中不带有 NULL 值的记录呢？
我们必须使用 IS NOT NULL操作符。

SELECT LastName, FirstName, Address
FROM Persons
WHERE Address IS NOT NULL;
```

### 4. NULL 函数

> SQL ISNULL()、 NVL()、IFNULL()和COALESCE()函数

请看下面的 "Products" 表：

| P_Id | ProductName | UnitPrice | UnitsInStock | UnitsOnOrder |
| ---- | ----------- | --------- | ------------ | ------------ |
| 1    | Jarlsberg   | 10.45     | 16           | 15           |
| 2    | Mascarpone  | 32.56     | 23           |              |
| 3    | Gorgonzola  | 15.67     | 9            | 20           |

```sql
假如 "UnitsOnOrder" 是可选的，而且可以包含 NULL 值。
我们使用下面的 SELECT 语句：

SELECT ProductName,UnitPrice*(UnitsInStock+UnitsOnOrder)
FROM Products

在上面的实例中，如果有 "UnitsOnOrder" 值是 NULL，那么结果是 NULL。
微软的 ISNULL() 函数用于规定如何处理 NULL 值。
NVL()、IFNULL() 和 COALESCE() 函数也可以达到相同的结果。
在这里，我们希望 NULL 值为 0。
```

```sql
下面，如果 "UnitsOnOrder" 是 NULL，则不会影响计算，因为如果值是 NULL 则 ISNULL() 返回 0：

SQL Server / MS Access
SELECT ProductName,UnitPrice*(UnitsInStock+ISNULL(UnitsOnOrder,0))
FROM Products
```

```sql
Oracle
Oracle 没有 ISNULL() 函数。不过，我们可以使用 NVL() 函数达到相同的结果：

SELECT ProductName,UnitPrice*(UnitsInStock+NVL(UnitsOnOrder,0))
FROM Products
```

```sql
MySQL 也拥有类似 ISNULL() 的函数。不过它的工作方式与微软的 ISNULL() 函数有点不同。
在 MySQL 中，我们可以使用 IFNULL() 函数，如下所示：

SELECT ProductName,UnitPrice*(UnitsInStock+IFNULL(UnitsOnOrder,0))
FROM Products
或者我们可以使用 COALESCE() 函数，如下所示：
SELECT ProductName,UnitPrice*(UnitsInStock+COALESCE(UnitsOnOrder,0))
FROM Products
```

---

### 5. 通用数据类型

> 数据类型定义列中存放的值的种类
> 
> 数据库表中的每个列都要求有名称和数据类型。Each column in a database table is required to have a name and a data type.
> 
> SQL 开发人员必须在创建 SQL 表时决定表中的每个列将要存储的数据的类型。数据类型是一个标签，是便于SQL了解每个期望存储什么类型的数据的指南，它也标识了 SQL 如何与存储的数据进行交互。

| 数据类型                             | 描述                                                               |
| -------------------------------- | ---------------------------------------------------------------- |
| CHARACTER(n)                     | 字符/字符串。固定长度 n。                                                   |
| VARCHAR(n) 或CHARACTER VARYING(n) | 字符/字符串。可变长度。最大长度 n。                                              |
| BINARY(n)                        | 二进制串。固定长度 n。                                                     |
| BOOLEAN                          | 存储 TRUE 或 FALSE 值                                                |
| VARBINARY(n) 或BINARY VARYING(n)  | 二进制串。可变长度。最大长度 n。                                                |
| INTEGER(p)                       | 整数值（没有小数点）。精度 p。                                                 |
| SMALLINT                         | 整数值（没有小数点）。精度 5。                                                 |
| INTEGER                          | 整数值（没有小数点）。精度 10。                                                |
| BIGINT                           | 整数值（没有小数点）。精度 19。                                                |
| DECIMAL(p,s)                     | 精确数值，精度 p，小数点后位数 s。例如：decimal(5,2) 是一个小数点前有 3 位数小数点后有 2 位数的数字。   |
| NUMERIC(p,s)                     | 精确数值，精度 p，小数点后位数 s。（与 DECIMAL 相同）                                |
| FLOAT(p)                         | 近似数值，尾数精度 p。一个采用以 10 为基数的指数计数法的浮点数。该类型的 size 参数由一个指定最小精度的单一数字组成。 |
| REAL                             | 近似数值，尾数精度 7。                                                     |
| FLOAT                            | 近似数值，尾数精度 16。                                                    |
| DOUBLE PRECISION                 | 近似数值，尾数精度 16。                                                    |
| DATE                             | 存储年、月、日的值。                                                       |
| TIME                             | 存储小时、分、秒的值。                                                      |
| TIMESTAMP                        | 存储年、月、日、小时、分、秒的值。                                                |
| INTERVAL                         | 由一些整数字段组成，代表一段时间，取决于区间的类型。                                       |
| ARRAY                            | 元素的固定长度的有序集合                                                     |
| MULTISET                         | 元素的可变长度的无序集合                                                     |
| XML                              | 存储 XML 数据                                                        |

> **注释：**在不同的数据库中，同一种数据类型可能有不同的名称，即使名称相同，尺寸和其他细节也可能不同！请总是检查文档。

---

### 6. 用于各种数据库的数据类型

####1. Microsoft Access 数据类型

| 数据类型          | 描述                                                                                                   | 存储     |
| ------------- | ---------------------------------------------------------------------------------------------------- | ------ |
| Text          | 用于文本或文本与数字的组合。最多 255 个字符。                                                                            |        |
| Memo          | Memo 用于更大数量的文本。最多存储 65,536 个字符。**注释：**无法对 memo 字段进行排序。不过它们是可搜索的。                                     |        |
| Byte          | 允许 0 到 255 的数字。                                                                                      | 1 字节   |
| Integer       | 允许介于 -32,768 与 32,767 之间的全部数字。                                                                       | 2 字节   |
| Long          | 允许介于 -2,147,483,648 与 2,147,483,647 之间的全部数字。                                                         | 4 字节   |
| Single        | 单精度浮点。处理大多数小数。                                                                                       | 4 字节   |
| Double        | 双精度浮点。处理大多数小数。                                                                                       | 8 字节   |
| Currency      | 用于货币。支持 15 位的元，外加 4 位小数。**提示：**您可以选择使用哪个国家的货币。                                                       | 8 字节   |
| AutoNumber    | AutoNumber 字段自动为每条记录分配数字，通常从 1 开始。                                                                   | 4 字节   |
| Date/Time     | 用于日期和时间                                                                                              | 8 字节   |
| Yes/No        | 逻辑字段，可以显示为 Yes/No、True/False 或 On/Off。在代码中，使用常量 True 和 False （等价于 1 和 0）。**注释：**Yes/No 字段中不允许 Null 值 | 1 比特   |
| Ole Object    | 可以存储图片、音频、视频或其他 BLOBs（Binary Large OBjects）。                                                         | 最多 1GB |
| Hyperlink     | 包含指向其他文件的链接，包括网页。                                                                                    |        |
| Lookup Wizard | 允许您创建一个可从下拉列表中进行选择的选项列表。                                                                             | 4 字节   |

####2. MySQL 数据类型

在 MySQL 中，有三种主要的类型：Text（文本）、Number（数字）和 Date/Time（日期/时间）类型。

**Text 类型：**

| 数据类型             | 描述                                                                                                               |
| ---------------- | ---------------------------------------------------------------------------------------------------------------- |
| CHAR(size)       | 保存固定长度的字符串（可包含字母、数字以及特殊字符）。在括号中指定字符串的长度。最多 255 个字符。                                                              |
| VARCHAR(size)    | 保存可变长度的字符串（可包含字母、数字以及特殊字符）。在括号中指定字符串的最大长度。最多 255 个字符。**注释：**如果值的长度大于 255，则被转换为 TEXT 类型。                          |
| TINYTEXT         | 存放最大长度为 255 个字符的字符串。                                                                                             |
| TEXT             | 存放最大长度为 65,535 个字符的字符串。                                                                                          |
| BLOB             | 用于 BLOBs（Binary Large OBjects）。存放最多 65,535 字节的数据。                                                                |
| MEDIUMTEXT       | 存放最大长度为 16,777,215 个字符的字符串。                                                                                      |
| MEDIUMBLOB       | 用于 BLOBs（Binary Large OBjects）。存放最多 16,777,215 字节的数据。                                                            |
| LONGTEXT         | 存放最大长度为 4,294,967,295 个字符的字符串。                                                                                   |
| LONGBLOB         | 用于 BLOBs (Binary Large OBjects)。存放最多 4,294,967,295 字节的数据。                                                        |
| ENUM(x,y,z,etc.) | 允许您输入可能值的列表。可以在 ENUM 列表中列出最大 65535 个值。如果列表中不存在插入的值，则插入空值。**注释：**这些值是按照您输入的顺序排序的。可以按照此格式输入可能的值： ENUM('X','Y','Z') |
| SET              | 与 ENUM 类似，不同的是，SET 最多只能包含 64 个列表项且 SET 可存储一个以上的选择。                                                               |

**Number 类型：**

| 数据类型            | 描述                                                                                        |
| --------------- | ----------------------------------------------------------------------------------------- |
| TINYINT(size)   | 带符号-128到127 ，无符号0到255。                                                                    |
| SMALLINT(size)  | 带符号范围-32768到32767，无符号0到65535, size 默认为 6。                                                 |
| MEDIUMINT(size) | 带符号范围-8388608到8388607，无符号的范围是0到16777215。 size 默认为9                                        |
| INT(size)       | 带符号范围-2147483648到2147483647，无符号的范围是0到4294967295。 size 默认为 11                              |
| BIGINT(size)    | 带符号的范围是-9223372036854775808到9223372036854775807，无符号的范围是0到18446744073709551615。size 默认为 20 |
| FLOAT(size,d)   | 带有浮动小数点的小数字。在 size 参数中规定显示最大位数。在 d 参数中规定小数点右侧的最大位数。                                       |
| DOUBLE(size,d)  | 带有浮动小数点的大数字。在 size 参数中规显示定最大位数。在 d 参数中规定小数点右侧的最大位数。                                       |
| DECIMAL(size,d) | 作为字符串存储的 DOUBLE 类型，允许固定的小数点。在 size 参数中规定显示最大位数。在 d 参数中规定小数点右侧的最大位数。                       |

> **注意：**以上的 size 代表的并不是存储在数据库中的具体的长度，如 int(4) 并不是只能存储4个长度的数字。
> 
> 实际上int(size)所占多少存储空间并无任何关系。int(3)、int(4)、int(8) 在磁盘上都是占用 4 btyes 的存储空间。就是在显示给用户的方式有点不同外，int(M) 跟 int 数据类型是相同的。
> 
> 例如：
> 
> 1、int的值为10 （指定zerofill）
> 
> ```
> int（9）显示结果为000000010
> int（3）显示结果为010
> ```
> 
> 就是显示的长度不一样而已 都是占用四个字节的空间

**Date 类型：**

| 数据类型        | 描述                                                                                                                                                        |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| DATE()      | 日期。格式：YYYY-MM-DD**注释：**支持的范围是从 '1000-01-01' 到 '9999-12-31'                                                                                                |
| DATETIME()  | *日期和时间的组合。格式：YYYY-MM-DD HH:MM:SS**注释：**支持的范围是从 '1000-01-01 00:00:00' 到 '9999-12-31 23:59:59'                                                              |
| TIMESTAMP() | *时间戳。TIMESTAMP 值使用 Unix 纪元('1970-01-01 00:00:00' UTC) 至今的秒数来存储。格式：YYYY-MM-DD HH:MM:SS**注释：**支持的范围是从 '1970-01-01 00:00:01' UTC 到 '2038-01-09 03:14:07' UTC |
| TIME()      | 时间。格式：HH:MM:SS**注释：**支持的范围是从 '-838:59:59' 到 '838:59:59'                                                                                                   |
| YEAR()      | 2 位或 4 位格式的年。**注释：**4 位格式所允许的值：1901 到 2155。2 位格式所允许的值：70 到 69，表示从 1970 到 2069。                                                                            |

*即便 DATETIME 和 TIMESTAMP 返回相同的格式，它们的工作方式很不同。在 INSERT 或 UPDATE 查询中，TIMESTAMP 自动把自身设置为当前的日期和时间。TIMESTAMP 也接受不同的格式，比如 YYYYMMDDHHMMSS、YYMMDDHHMMSS、YYYYMMDD 或 YYMMDD。

####3. SQL Server 数据类型

**String 类型：**

| 数据类型           | 描述                                    | 存储                        |
| -------------- | ------------------------------------- | ------------------------- |
| char(n)        | 固定长度的字符串。最多 8,000 个字符。                | Defined width             |
| varchar(n)     | 可变长度的字符串。最多 8,000 个字符。                | 2 bytes + number of chars |
| varchar(max)   | 可变长度的字符串。最多 1,073,741,824 个字符。        | 2 bytes + number of chars |
| text           | 可变长度的字符串。最多 2GB 文本数据。                 | 4 bytes + number of chars |
| nchar          | 固定长度的 Unicode 字符串。最多 4,000 个字符。       | Defined width x 2         |
| nvarchar       | 可变长度的 Unicode 字符串。最多 4,000 个字符。       |                           |
| nvarchar(max)  | 可变长度的 Unicode 字符串。最多 536,870,912 个字符。 |                           |
| ntext          | 可变长度的 Unicode 字符串。最多 2GB 文本数据。        |                           |
| bit            | 允许 0、1 或 NULL                         |                           |
| binary(n)      | 固定长度的二进制字符串。最多 8,000 字节。              |                           |
| varbinary      | 可变长度的二进制字符串。最多 8,000 字节。              |                           |
| varbinary(max) | 可变长度的二进制字符串。最多 2GB。                   |                           |
| image          | 可变长度的二进制字符串。最多 2GB。                   |                           |

**Number 类型：**

| 数据类型         | 描述                                                                                                                                      | 存储       |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| tinyint      | 允许从 0 到 255 的所有数字。                                                                                                                      | 1 字节     |
| smallint     | 允许介于 -32,768 与 32,767 的所有数字。                                                                                                            | 2 字节     |
| int          | 允许介于 -2,147,483,648 与 2,147,483,647 的所有数字。                                                                                              | 4 字节     |
| bigint       | 允许介于 -9,223,372,036,854,775,808 与 9,223,372,036,854,775,807 之间的所有数字。                                                                    | 8 字节     |
| decimal(p,s) | 固定精度和比例的数字。允许从 -10^38 +1 到 10^38 -1 之间的数字。p 参数指示可以存储的最大位数（小数点左侧和右侧）。p 必须是 1 到 38 之间的值。默认是 18。s 参数指示小数点右侧存储的最大位数。s 必须是 0 到 p 之间的值。默认是 0。 | 5-17 字节  |
| numeric(p,s) | 固定精度和比例的数字。允许从 -10^38 +1 到 10^38 -1 之间的数字。p 参数指示可以存储的最大位数（小数点左侧和右侧）。p 必须是 1 到 38 之间的值。默认是 18。s 参数指示小数点右侧存储的最大位数。s 必须是 0 到 p 之间的值。默认是 0。 | 5-17 字节  |
| smallmoney   | 介于 -214,748.3648 与 214,748.3647 之间的货币数据。                                                                                                | 4 字节     |
| money        | 介于 -922,337,203,685,477.5808 与 922,337,203,685,477.5807 之间的货币数据。                                                                        | 8 字节     |
| float(n)     | 从 -1.79E + 308 到 1.79E + 308 的浮动精度数字数据。n 参数指示该字段保存 4 字节还是 8 字节。float(24) 保存 4 字节，而 float(53) 保存 8 字节。n 的默认值是 53。                        | 4 或 8 字节 |
| real         | 从 -3.40E + 38 到 3.40E + 38 的浮动精度数字数据。                                                                                                   | 4 字节     |

**Date 类型：**

| 数据类型           | 描述                                                                         | 存储      |
| -------------- | -------------------------------------------------------------------------- | ------- |
| datetime       | 从 1753 年 1 月 1 日 到 9999 年 12 月 31 日，精度为 3.33 毫秒。                           | 8 字节    |
| datetime2      | 从 1753 年 1 月 1 日 到 9999 年 12 月 31 日，精度为 100 纳秒。                            | 6-8 字节  |
| smalldatetime  | 从 1900 年 1 月 1 日 到 2079 年 6 月 6 日，精度为 1 分钟。                                | 4 字节    |
| date           | 仅存储日期。从 0001 年 1 月 1 日 到 9999 年 12 月 31 日。                                 | 3 bytes |
| time           | 仅存储时间。精度为 100 纳秒。                                                          | 3-5 字节  |
| datetimeoffset | 与 datetime2 相同，外加时区偏移。                                                     | 8-10 字节 |
| timestamp      | 存储唯一的数字，每当创建或修改某行时，该数字会更新。timestamp 值基于内部时钟，不对应真实时间。每个表只能有一个 timestamp 变量。 |         |

**其他数据类型：**

| 数据类型             | 描述                                                 |
| ---------------- | -------------------------------------------------- |
| sql_variant      | 存储最多 8,000 字节不同数据类型的数据，除了 text、ntext 以及 timestamp。 |
| uniqueidentifier | 存储全局唯一标识符 (GUID)。                                  |
| xml              | 存储 XML 格式化数据。最多 2GB。                               |
| cursor           | 存储对用于数据库操作的指针的引用。                                  |
| table            | 存储结果集，供稍后处理。                                       |
