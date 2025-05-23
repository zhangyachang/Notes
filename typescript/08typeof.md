# Typeof 类型操作符

## typeof 类型操作符

JavaScript 本身就有 `typeof` 操作符，你可以在表达式上下文中使用：

```ts
// Prints "string"
console.log(typeof "Hello world");
```

而 TypeScript 添加的 `typeof` 方法可以在类型上下文（type context）中使用，用于获取一个变量或者属性的类型。

```ts
let s = "hello";
let n: typeof s;
// let n: string
```

如果仅仅用来判断基本的类型，自然是没什么太大用，和其他的类型操作符搭配使用才能发挥它的作用。

举个例子：比如搭配 TypeScript 内置的 `ReturnType<T>`。你传入一个函数类型，`ReturnType<T>` 会返回该函数的返回值的类型：

```ts
type Predicate = (x: unknown) => boolean;
type K = ReturnType<Predicate>;
/// type K = boolean
```

如果我们直接对一个函数名使用 `ReturnType` ，我们会看到这样一个报错：

```ts
function f() {
  return { x: 10, y: 3 };
}
type P = ReturnType<f>;

// 'f' refers to a value, but is being used as a type here. Did you mean 'typeof f'?
```

这是因为值（values）和类型（types）并不是一种东西。为了获取值 `f` 也就是函数 `f` 的类型，我们就需要使用 `typeof`：

```ts
function f() {
  return { x: 10, y: 3 };
}
type P = ReturnType<typeof f>;

// type P = {
//    x: number;
//    y: number;
// }
```

## 限制

TypeScript 有意的限制了可以使用 `typeof` 的表达式的种类。

在 TypeScript 中，只有对标识符（比如变量名）或者他们的属性使用 `typeof` 才是合法的。这可能会导致一些令人迷惑的问题：

```ts
function msgBox(msg: string) {
  return msg;
}
```

```ts
// Meant to use = ReturnType<typeof msgbox>
let shouldContinue: typeof msgbox("Are you sure you want to continue?");
// ',' expected.
```

我们本意是想获取 `msgbox("Are you sure you want to continue?")` 的返回值的类型，所以直接使用了 `typeof msgbox("Are you sure you want to continue?")`，看似能正常执行，但实际并不会，这是因为 `typeof` 只能对标识符和属性使用。而正确的写法应该是：

```ts
ReturnType<typeof msgbox>
```

## 对对象使用 typeof

我们可以对一个对象使用 `typeof`

```ts
const person = { name: "kevin", age: "18" }
type Kevin = typeof person;

// type Kevin = {
//         name: string;
//         age: string;
// }
```

## 对函数使用 typeof

我们也可以对一个函数使用 `typeof`：

```ts
function identity<Type>(arg: Type): Type {
  return arg;
}

type result = typeof identity;
// type result = <Type>(arg: Type) => Type
```

## 对 enum 使用 typeof

在 TypeScript中，enum是一种新的数据类型，但在具体运行的时候，它会被编译成对象。

```ts
enum UserResponse {
  No = 0,
  Yes = 1,
}
```

对应编译的 JavaScript 代码为：

```ts
var UserResponse;
(function (UserResponse) {
    UserResponse[UserResponse["No"] = 0] = "No";
    UserResponse[UserResponse["Yes"] = 1] = "Yes";
})(UserResponse || (UserResponse = {}));
```

如果我们打印一下 `UserResponse`：

```ts
console.log(UserResponse);

// [LOG]: {
//   "0": "No",
//   "1": "Yes",
//   "No": 0,
//   "Yes": 1
// } 
```

而如果我们对 `UserResponse` 使用 `typeof`：

```ts
type result = typeof UserResponse;

// ok
const a: result = {
      "No": 2,
      "Yes": 3
}

result 类型类似于：

// {
//    "No": number,
//  "YES": number
// }
```

不过对一个 enum 类型只使用 `typeof` 一般没什么用，通常还会搭配 `keyof` 操作符用于获取属性名的联合字符串：

```ts
type result = keyof typeof UserResponse;
// type result = "No" | "Yes"
```