---
sidebar: auto
footer: MIT Licensed | Made with Yinmu
---

# JavaScript 部分

## 运算求值类

### 1. `['1', '2', '3'].map(parseInt)` 的执行结果？

【错误答案】

```js
[1, 2, 3]
```

【正确答案】

```js
[1, NaN, NaN]
```

【解析】

其实这道题并不难，但是很有迷惑性，关键一点在于 `parseInt()` 函数的参数个数！

```js
parseInt(string[, radix])
```

> 详见 [parseInt | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/parseInt)

- `string` 参数为需要转换的字符串（如果不是字符串类型，则先转换为字符串类型，字符串首尾的空格会被忽略）。

- `radix` 参数为要转换的进制的基数，默认为 10，也就是把字符串转换成十进制数。其取值范围为 `2~36` 。

我们再来看看 `arr.map()` 函数：

```js
arr.map(
  function callback(currentValue[, index[, array]]) {
    // Return element for new_array 
  }[, thisArg]
)
```

> 详见 [Array.prototype.map() | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

我们可以看到 callback 函数可以传三个参数：

- `currentValue` 数组当前要操作的项

- `index` 数组当前要操作的项的索引

- `array` map 函数索要操作的数组

所以，实际上执行的代码为：

```js
['1', '2', '3'].map((item, index) => {
  return parseInt(item, index)
})

// 第一次循环
return pasreInt('1', 0)  // 1  只要不是十六进制数，基数为 0 则按照 10 处理

// 第二次循环
return parseInt('2', 1)  // NaN  基数无效，直接返回 NaN

// 第三次循环
return parseInt('3', 2)   // NaN  数值超出了基数所能表达的范围
```

明白了这个道理，我们就可以举一反三了，比如

```js
['1', '1', '1'].map(parseInt)   // [1, NaN, 1]

['10', '10', '1010'].map(parseInt)   // [10, NaN, 10]
```

### 2. `{} && {a: 1}` 的执行结果？

【错误答案】

```js
true
```

【正确答案】

```js
{a: 1}
```

【解析】

其实这道题非常简单，只是运用大家的惯性思维来产生误导，并不是有逻辑运算符的地方得到的就一定是布尔值。

`&&` 是逻辑与，如果第一个操作数求值为 `true` 或者执行 `Boolean()` 转化后为 `true` ，则执行第二个操作数，所以得到的结果也就是第二个操作数。

我们也可以举一反三：

```js
let a = NaN || undefined   // a: undefined
let b = {} && false   // b: false
```