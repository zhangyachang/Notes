#### 编写代码

```typescript
实时编译：
在vscode中生成 tsconfig
tsc --init
```





### typescript

主要提供了 类型系统 和 对ES6的支持



编程语言分为动态类型和静态类型，TypeScript是静态类型。

TypeScript是弱类型

















#### ts的数据类型

布尔类型 boolean

数字类型 number

字符串类型 number

数组类型 array

元组类型 tuple

枚举类型 enum

任意类型 any

null 和 undefined

void 类型

never 类型





#### 联合类型



#### 接口



#### 数组的类型



#### 函数的类型



#### 类型断言

```js
as
```

类型断言和类型转换





#### 接口和类型的区别？

接口和类型 的区别 `interface`（接口）和` type`（类型别名）的对比：

- 相同点：都可以给对象指定类型
- 不同点:
  - 接口，只能为对象指定类型。**它可以继承。**
  - 类型别名，不仅可以为对象指定类型，实际上可以为**任意类型**指定别名

先有的 `interface`，后有的 `type`,推荐使用 `type`







