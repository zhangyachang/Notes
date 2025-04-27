# 选项DOM

## 1. el

​    **类型：** `string | HTMLElement`

​    **限制：** 只在由`new` 创建的实例中遵守

​    **详细：**

​        提供一个在页面上已存在的DOM元素作为Vue实例的挂载目标。可以是CSS选择器，也可以是一个HTMLElement实例。

​        在实例挂载之后，元素可以 vm.$el访问

​        如果在实例化时存在这个选项，实例将立即进入编译过程，否则，需要显式调用`vm.$mount()`手动编译

​    **注意：** 

​    提供的元素只能作为挂载点。不同于Vue 1.x,所有的挂载元素会被Vue生成的DOM替换。因此不推荐挂载root实例到<html> 或者 <body> 上。

​    如果**render**函数和**template**属性都不存在，挂载DOM元素的HTML会被提取出来用作模板，此时，必须使用 Runtime + Compiler 构建的 Vue 库。 

## 2. template

​    **类型：** `string`

​    **详细：** 

​        一个字符串模板作为Vue实例的标识使用。模板将会**替换**挂载的元素，挂载元素的内容都将会被忽略，除非模板的内容有分发插槽。

​        如果值以#开始，则它将被用作选择符，并使用匹配元素的innerHTML作为模板。常用的技巧是用 <script type="x-template"></script>包含模板。

​    **注意：** 出于安全考虑，你应该只使用你信任的Vue模板。避免使用他人生成的内容作为你的模板。

​    如果Vue选项中包含渲染函数，该模板将被忽略。

## 3. render

​    **类型：** `(createElement: () => VNode) => VNode `

​    **详细：**

​        字符串模板的代替方案，允许你发挥JavaScript最大的编程能力。该渲染函数接收一个` createElement`方法作为第一个参数用来创建 `VNode`

​        如果组件是一个函数组件，渲染函数还会接收一个额外的**context**参数，为没有实例的函数组件提供上下文信息。

​    **注意：**

​        Vue选项中的   `render` 函数若存在，则Vue构造函数不会从  **template** 选项或通过 **el** 选项指定的挂载元素中提取出的HTML模板编译渲染函数

## 4. renderError

​    2.2.0新增

​    **类型** `(createElement: () => VNode, error: Error) => VNode `

​    **详细： **   **只在开发者环境下工作**

​        当 **render** 函数遭遇错误时，提供另外一种渲染输出。其错误将会作为第二个参数传递到 **renderError** 。这个功能配合 **hot-reload** 非常实用。

# 选项资源

## 1. directives

​    **类型：** `Object`

​    **详细 ** 

​        包含 Vue 实例可用指令的哈希表。 

## 2. filters

​    **类型：** `Object`

​    **详细： ** 

​        包含 Vue 实例可用过滤器的哈希表。 

## 3. components

​    **类型：** `Object`

​    **详细： ** 

​        包含 Vue 实例可用组件的哈希表。