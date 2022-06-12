## Keyof 类型操作符

对一个对象类型使用 `keyof` 操作符，会返回该对象属性名组成的一个字符串或者数字字面量的联合。



这个例子中的类型 P 就等同于 "x" | "y"

```ts
type Point = { x: number; y: number };
type P = keyof Point;

// type P = keyof Point
```



但如果这个类型只有一个 `string` 或者 `number`类型的索引签名，`keyof`则会直接返回这些类型：

```ts
type Arrayish = { [n: number]: unknown };
type A = keyof Arrayish;
// type A = number

type Mapish = { [k: string]: boolean };
type M = keyof Mapish;
// type M = string | number
```

注意在这个例子中，`M` 是 `string | number`，这是因为 JavaScript 对象的属性名会被强制转为一个字符串，所以 `obj[0]` 和 `obj["0"]` 是一样的。



## 数字字面量联合类型

在一开始我们也说了，`keyof` 也可能返回一个数字字面量的联合类型，那什么时候会返回数字字面量联合类型呢，我们可以尝试构建这样一个对象：



学习来自于冴羽的博客【https://github.com/mqyqingfeng/Blog/issues/223】

```ts
const NumericObject = {
  [1]: "冴羽一号",
  [2]: "冴羽二号",
  [3]: "冴羽三号"
};

type result = keyof typeof NumericObject

// typeof NumbericObject 的结果为：
// {
//   1: string;
//   2: string;
//   3: string;
// }
// 所以最终的结果为：
// type result = 1 | 2 | 3
```



### Symbol

```ts
const sym1 = Symbol();
const sym2 = Symbol();
const sym3 = Symbol();

const symbolToNumberMap = {
  [sym1]: 1,
  [sym2]: 2,
  [sym3]: 3,
};

type KS = keyof typeof symbolToNumberMap; // typeof sym1 | typeof sym2 | typeof sym3
```

KS的类型只能赋值为 那三个变量。



这也就是为什么当我们在泛型中像下面的例子中使用，会如此报错：

```ts
function useKey<T, K extends keyof T>(o: T, k: K) {
  var name: string = k; 
  // Type 'string | number | symbol' is not assignable to type 'string'.
}
```



如果你确定只使用字符串类型的属性名，你可以这样写：

```ts
function useKey<T, K extends Extract<keyof T, string>>(o: T, k: K) {
  var name: string = k; // OK
}
```



而如果你要处理所有的属性名，你可以这样写

```ts
function useKey<T, K extends keyof T>(o: T, k: K) {
  var name: string | number | symbol = k;
}
```



## 类和接口

```ts
class Person {
  name: "冴羽"
}

type result = keyof Person;
// type result = "name"
```



```ts
// 例子二
class Person {
  [1]: string = "冴羽";
}

type result = keyof Person;
// type result = 1
```



对接口使用 `keyof`：

```ts
interface Person {
  name: "string";
}

type result = keyof Person;
// type result = "name"
```





## 实战

在「[TypeScript 之 Generic](https://github.com/mqyqingfeng/Blog/issues/222)」这篇中就讲到了一个 `keyof` 的应用：

我们希望获取一个对象给定属性名的值，为此，我们需要确保我们不会获取 `obj` 上不存在的属性。所以我们在两个类型之间建立一个约束：



```ts
function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}
 
let x = { a: 1, b: 2, c: 3, d: 4 };
 
getProperty(x, "a");
getProperty(x, "m");

// Argument of type '"m"' is not assignable to parameter of type '"a" | "b" | "c" | "d"'.
```





