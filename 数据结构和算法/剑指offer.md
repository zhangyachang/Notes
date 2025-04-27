---
剑指offer
---

# 剑指offer

通过学习了数据结构和算法之后，我想要得到一些练习题去应用学到的知识，去实践出来。

下面是整理了一些练习题的一些实现方法，可能不是最好的实现。但是我这里第一遍笔记会实现自己的，过后会从网络中找到优秀的解法去整理出来。

## 一、栈

#### 1、判断出栈顺序是否可行

**题目描述**

输入两个整数序列，第一个序列表示栈的压入顺序，请判断第二个序列是否可能为该栈的弹出顺序。假设压入栈的所有数字均不相等。例如序列1，2，3，4，5是某栈的压入顺序，序列4，5，3，2，1是该压入栈序列对应的一个弹出序列，但4，3，5，1，2就不可能是该压栈序列的弹出序列。（注意：这两个序列的长度是相等的）。

```js
// 栈
let Stack = (function () {
  let sym = Symbol();
  return class Stack {
    constructor() {
      this[sym] = [];
    }

    push(key) {
      this[sym].push(key);
    }

    pop() {
      return this[sym].pop();
    }

    peek() {
      return this[sym][this.size() - 1];
    }

    clear() {
      this[sym] = [];
    }

    size() {
      return this[sym].length;
    }
  }
})();

/*
  由于上面定义了栈的数据结构，所以天才的我们就有了思路：
  压入顺序，每次压入一个，都去判断它是不是目前出栈元素的第一个，如果不是，继续压入。
  如果入栈元素是目前出栈元素的最前面的那一个，那么就让双方消消乐抵消，直到没有元素为止，根据入栈元素里面的是否为空来判断是否可行。
*/
function IsPopOrder(pushV, popV) {
  // write code here
  var stack = new Stack();

  let numFlag = 0; // 用一个flag标识当前对比到出栈元素的第几个了。
  for (var i = 0; i < pushV.length; i++) {
    let item = pushV[i];
    stack.push(item);
    while (stack.size() > 0 && stack.peek() === popV[numFlag]) {
      stack.pop();
      numFlag++;
    }
  }
  return numFlag === popV.length;
}
```

不知道是我写的有点太费性能了吧。运行时间 16ms 占用内存 5400kb

## 二、二叉树

#### 1.层次遍历二叉树

**题目描述**

从上往下打印出二叉树的每个节点，同层节点从左向右打印

```js
/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function PrintFromTopToBottom(root)
{
    // write code here
}
```
