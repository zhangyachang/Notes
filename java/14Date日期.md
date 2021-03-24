## Date

```java
// 输入当前距离 1970年1月1日00:00:00 GMT以来的毫秒数
long time = System.currentTimeMillis();
```



#### 1-1常用的方法

用到的时候还是去API文档上面去查吧

```java
import java.util.Date;
```

无参构造函数

```java
Date date1 = new Date();
System.out.println(date1);
```



有参构造函数

```java
Date date1 = new Date(1215454545454545L);
System.out.println(date1);
```



获取当前时间

```java
Date date1 = new Date();
long time = date1.getTime();
System.out.println(time);
```



设置时间

```java
Date date1 = new Date();
date1.setTime(0);
System.out.println(date1);
```



#### 1-2 SimpleDateFormat 



日期格式

```java
日期格式
YYYY	年份
MM
dd
HH
mm
ss
```



**例子**

```java
SimpleDateFormat sdf = new SimpleDateFormat("yyyy年MM月dd日HH点mm分钟ss秒");
String date = sdf.format(new Date());
System.out.println(date);

//-------------运行结果------------------------
2020年01月18日10点36分钟52秒
```



**字符串转日期**

```java
SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
try {
    Date date = sdf.parse("2008-12-12");
    System.out.println(date);
}catch (ParseException e) {
    e.printStackTrace();
    // TODO: handle exception
}
```



#### 1-3 Calendar

```java
Calendar c = Calendar.getInstance();
System.out.println(c);

// 输出获取日历的信息
```





日历转Date

```java
Calendar c = Calendar.getInstance();
System.out.println(c);
Date d = c.getTime();
System.out.println(d); // 输出日期
```


