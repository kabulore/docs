---
sidebar: auto
footer: MIT Licensed | Made with Yinmu
---

# 《JavaScript 入门经典（第3版）》

> 作者：尼古拉斯·泽卡斯 Nicholas C.Zakas [美]

## 第 1 章：JavaScript 简介

1. JavaScript 诞生于1995年。

2. 1997年欧洲计算机制造商协会（ECMA）定义了一种名为 ECMAScript ("ek-ma-script") 的新脚本语言的标准，从此有了 ECMAScript，也就是后面的 ES。

3. 一个完整的 JavaScript 实现包含三个部分：ECMAScript (核心)、DOM（文档对象模型 - Document Object Model）和 BOM（浏览器对象模型 - Browser Object Model）。

## 第 2 章：在 HTML 中使用 JavaScript

### `<script>` 元素

1. `<script>` 元素属性：

- async: 只对外部脚本文件有效。立即下载但不妨碍其他操作，也即是异步。
- charset: 大多数浏览器会忽略，没卵用。
- defer: 只对外部脚本文件有效。脚本延迟到文档完全被解析和显示之后再执行。只是延迟执行，并非延迟加载！
- language: 已废弃。
- src: 外部文件地址。必需。
- type: 默认 `text/javascript`。无需写。

2. JavaScript 代码会被从上到下依次逐条执行，如果发生错误，会阻塞执行。

3. 当代码里面有 `<script>` 标签的时候，可以使用 `\` 进行转义，如 `alert("<\/script>")`。

4. JS 文件应该放在页面的 `</body>` 标签之前。

5. JS 文件尽可能使用外部文件，而非内嵌在页面中。好处：可维护性、可缓存、适应未来。

### `<noscript>` 元素

当浏览器不支持 JavaScript 脚本或者脚本被禁用的时候才会显示。可包含任何 DOM，通常放一句话来提示用户启用 Javascript。

## 第 3 章：基本概念

### 语法

1. 区分大小写。

2. 标志符：

    定义：指变量、函数、属性的名字，或者函数的参数。

    命名规则：
      - 第一个字符必须是字母、下划线（_）或 美元符号（$）。
      - 其他字符可以是字母、下划线、美元符号或数字。
    
    书写格式：采用小驼峰。

3. 注释：
    ```js
    // 这是单行注释

    /**
     * 这是多行注释
     */
    ```

4. 严格模式：

    ```js
    'use strict'
    ```
    它是一个编译指示（pragma），告诉浏览器引擎切换到严格模式。可以写在头部也可以写在函数体内。

### 变量

1. 如果不使用 `var` 、`let` 、`const` 来声明变量，那么将会生成一个挂载在 `window` 对象下面的全局变量。

2. 使用 `var` 和 `function` 来声明都会存在变量提升。

### 数据类型

ECMAScript 规定了 6 种简单数据类型（也称为基本数据类型）：`Undefined` 、`Null`、`Boolean`、`Number`、`String`、`Symbol`， 1 种复杂数据类型 `Object` 。

1. **typeof 操作符**

    可以使用 `typeof` 操作符来查看变量的数据类型。

    - "undefined" —— 值未定义，即值为 undefined
    - "boolean" —— 值为布尔类型
    - "string" —— 值为字符串
    - "number" —— 值为数字
    - "object" —— 值为对象、数组或 null 
    - "symbol" —— 值为 Symbol 类型
    - "function" —— 值为函数类型

    >  注：`typeof null === 'object'` 是因为 `null` 被定义为对一个空对象的引用。

    对于未声明的变量，只能执行 typeof 检测值类型操作，其他操作会报错，例如：

    ```js
    typeof aaa // "undefined"

    alert(aaa) // 报错：aaa is not defined
    ```

2. **Boolean 类型**

    任何类型转换为 Boolean 类型对照表：

    |数据类型|值为 true|值为 false|
    |:-:|:-:|:-:|
    |Boolean|true|false|
    |String|非空字符串|空字符串|
    |Number|非 0 数字|0 或者 NaN|
    |Object|任何对象|null|
    |Undefined|-|undefined|
    |Symbol|任何 Symbol 值|-|

3. **Number 类型**

    1）八进制

      第一位为 0 ，后面为 0~7 的数字，如果后面数字有大于 7 的，则前导 0 被忽略，后面数值当做十进制来解析。

      > 严格模式下，八进制字面量无效，且会导致抛出错误。

    2）十六进制

      前两位为 0x ,后面为 0~9 以及 A~F ，其中 A~F 大小写皆可。

      > 在进行运算时，八进制和十六进制都将转换成十进制来运算。
    
    3）浮点数

      永远不要去比较两个浮点数是否相等，因为浮点数的计算并不精确，比如 `0.1 + 0.2 = 0.30000000000000004` ，而 `0.15 + 0.25 = 0.3` 。

      ```js
      var floatNum1 = .3 // 表示 0.3 ，可以这么写，但不推荐

      var floatNum2 = 1. // 可以这么写，会被解析为 1

      var floatNum3 = 10.0 // 会被转换为整数 10

      // 默认情况下，ECMAScript 会将小数点后面带有6个0以上的浮点数转换为科学技术法。
      var floatNum4 = 3.125e7 // 表示 31250000 ，e 的意思就是 3.125 乘以 10 的 7 次方

      var floatNum5 = 3.125e-7 // 表示 0.0000003125
      ```
    
    4）数值范围

      大多数浏览器中，最小值：`Number.MIN_VALUE = 5e-324` 、最大值：`Number.MAX_VALUE = 1.7976931348623157e+308` 。这两个值表现很奇怪，当进行加减运算的时候，会被视为 0 来处理。当进行乘除运算的时候，则会进行正常运算，一旦超出大小，会得到正负无穷。
      
      当超过数值最大限制的时候，正数会变为正无穷 `Infinity` ，负数会变为负无穷 `-Infinity` 。
      
      可以通过 `Number.NEGATIVE_INFINITY` 和 `Number.POSITIVE_INFINITY` 得到负无穷和正无穷两个值。这两个值不管与谁运算，结果都是自身。

      可以通过 `isFinite()` 内置函数来判断一个值是否有穷，该函数返回值为 true 或 false。

      ```js
      isFinite(10000) // true

      isFinite(Number.POSITIVE_INFINITY) // false
      ```

    5）NaN

      NaN 表示非数值（Not a Number）。但它是一个特殊的数值，表示本来期待返回数值的操作数未返回数值。这么做的目的是防止代码抛出异常而阻塞代码执行。

      NaN 与任何值都不相等，包括自身。

      NaN 参与任何运算得到的值，都是 NaN 。

      ECMAScript 提供了内置函数 `isNaN()` 来判断一个值是否是 NaN ，如果是，则返回 true ，否则返回 false 。

    6）数值转换

      ECMAScript 内置了三个将非数值转换为数值的方法：`Number()` ，`parseInt()` 以及 `parseFloat()` 。
      
      其中 `Number()` 可以转换任何数据类型，而 `parseInt()` 和 `parseFloat()` 则主要用于字符串与数值的转换，对于其他类型，都直接返回 `NaN` 。

      - `Number()` :

        ```js
        // 如果是 Boolean 值，true 和 false 分别被转换为 1 和 0
        Number(true)   // 1
        Number(false)   // 0

        // 如果是数字，则简单的返回
        Number(+90.000)  // 90
        Number(-9.0)   // -9

        // 如果是 null ，返回 0
        Number(null)   // 0

        // 如果是 undefined ，返回 NaN
        Number(undefined)   // NaN

        // 如果是 Symbol ，报错
        Number(Symbol())   // Error: Cannot convert a Symbol value to a number

        // 如果是字符串，则按照下列规则来转换
          // 如果只包含数字（包括正负符号），则转换为十进制数，八进制的前导 0 会被忽略
          Number('-090')   // -90

          // 如果为浮点数，转换为对应的浮点值。但是如果有两个小数点，则报错
          Number('-090.3')   // -90.3
          Number(90.2.2)   // Error: missing ) after argument list

          // 如果字符串中包含有效的十六进制格式(以 0x 开头)，则将其转换为等大小的十进制整数
          Number('0xf8')   // 248

          // 空字符串，转换为 0
          Number('')   // 0

          // 其他情况，统一转换为 NaN
          Number('990xf8')   // NaN
          Number('90.2.2')   // NaN
          Number('1234blue')   // NaN

        // 如果是对象，则先调用对象的 valueOf() 方法，如果转换完值为 NaN ，则调用对象的 toString() 方法，然后按照上面的规则转换
        Number(new Object({a: 55}))  // 先执行 Number(new Object({a: 55}).valueOf())，发现值为 NaN ，再执行 Number(new Object({a: 55}).toString()) 返回最终值为 NaN
        Number([55])   // 先执行 Number([55].valueOf()) ，发现返回值为 55 ，于是最终返回 55
        Number([55, 66])   // NaN
         ```

        > 操作符 `+` 的运算等同于 `Number()` 的运算。
      
      - `parseInt()` :

        更侧重于检查是否符合数值模式：忽略字符串前面空格、如果第一个字符不是数字或者正负号，直接返回 NaN 、如果遇到非数字字符，直接停止。

        该方法有两个参数：`parseInt(string, radix);` 。其中 radix 表示要转化的进制基数，默认为 10 ，表示十进制，取值 2~36 之间，超过 36 则直接返回 NaN 。

        ```js
        // 忽略字符串前面空格
        parseInt('    -123')   // -123

        // 如果开头就遇到非数字字符，直接返回 NaN ，否则返回非数字字符之前的数值
        parseInt('')   // NaN
        parseInt('1234blue')   // 1234
        parseInt('22.865')  // 22
        parseInt('2 2')  // 2

        // 解析十六进制
        parseInt('0xf8')   // 248

        // 无法解析八进制，需要手动指定第二个参数，如果指定十六进制，可以忽略前导 0x
        parseInt('070')   // 70
        parseInt('070', 8)  // 56
        parseInt('AF', 16)   // 175
        parseInt('AF')   // NaN
        ```

        此处有一个特别经典的面试题：

        > [['1', '2', '3'].map(parseInt) 的执行结果？](https://yinmu.me/interview/#_1-2-3-map-parseint-的执行结果？)

      - `parseFloat()`

        该方法只有一个参数，因此无法指定转换进制的基数。其他操作跟 `parseInt()` 几乎一样。

        ```js
        // 解析十六进制数，永远返回 0 
        parseFloat('0xAF')   // 0

        // 解析八进制数，永远忽略前导 0 
        parseFloat('075.23')   // 75.23

        // 如果多个小数点，则只解析第一个小数点，后面的忽略
        parseFloat('-12.22.33')   // -12.22
        ```
4. **String 类型**
    
    字符串由单引号（''）或双引号（""）表示，两种并无区别，但不可混用，开始引号和结束引号必须相同。

    1）字符字面量

      |字面量|含义|
      |:-:|:-:|
      |\n|换行|
      |\t|制表|
      |\b|退格|
      |\r|回车|
      |\\\ |斜杠|
      |\\'|单引号，转义单引号时使用|
      |\\"|双引号，转义双引号时使用|
      |\\xnn|以十六进制码 nn 表示一个字符（n 为 0~F），如 \x41 表示 A|
      |\unnnn|以十六进制码 nnnn 表示一个 Unicode 字符（n 为 0~F），如 \u03a3 表示希腊字母 Σ |

      这些字符可以出现在字符串中任意位置，且会被当做一个字符来解析，长度为  1 。如果字符串中含有双字节字符，length 属性可能就没那么精确了。

    2）字符串特点
      ECMAScript 规定字符串是不可变的，假设 `let a = 's'; a = 'sss';` 这个过程其实是先创建长度为 3 的新字符串，然后赋值存储 sss ，最后销毁 s 字符串。

    3）转换字符串方法

      - `.toString()`

        除了 null 和 undefined 之外，其他值都可以调用 .toString() 方法转换成字符串。

        可以接受有效进制基数为参数，将数值转换为相应进制（如果不是数值，则无效），但不会补全前面前导。

        ```js
        // null 和 undefined 如果调用 toString() 方法会导致报错
        null.toString()   // Cannot read property 'toString' of null
        undefined.toString()   // Cannot read property 'toString' of undefined

        // 将数值转化为相应进制，默认值为 10
        10.toString(2)   // "1010"
        10.toString(8)   // "12"
        10.toString(16)   // "a"
        012.toString()   // "10"
        0xa.toString()   // "10"
        ```

      - `String()`

        如果要转换的值有 `toString()` 方法，就调用该方法。如果是 `null` ，返回 `"null"` ，如果是 `undefined` 返回 `"undefined"` 。好处是可以在任何情况下都保证不报错，缺点是只能转化为十进制。

        > 此方法与 `+ ''` 效果等同。

4. **Object 类型**

    任何对象都继承自 Object 。因此，Object 的每个实例都具有以下属性和方法，而下列属性和方法都存在于对象的 `__proto__` 属性中。

    - `constructor`

      保存用于创建当前对象的函数。

      ```js
      // 我们创建一个对象
      const a = new Object()   // 括号可省略，但不推荐
      a.contructor   // Object()   等同于 a.__proto__.contructor
      ```

    - `hasOwnProperty(propertyName)`

      检查给定的属性在当前对象实例中是否存在。通俗点讲就是检查一个属性是否是这个实例自己拥有的，而非继承来的属性。

      ```js
      // 我们创建一个对象
      const a = new Object()
      a.name = "yinmu"
      a.hasOwnProperty("name")   // true  
      ```

    - `isPrototypeOf(object)`

      检查传入的对象是否是当前对象的原型。

      ```js
      // 我们创建一个对象
      const a = new Object()
      Object.prototype.isPrototypeOf(a)   // true
      ```

    - `propertyIsEnumerable(propertyName)`

      检查给定的属性是否能够使用 `for-in` 语句来枚举。通俗讲就是能否用 `for-in` 语句把他循环出来。像上面例子中的 name 这种自有属性就可以枚举出来。

    - `toLocaleString()`

      转换为与当地执行环境所在地区对应的字符串。主要用于一些日期类型的转换。

    - `toString()`

      将对象转换为字符串。主要用于数组等类型，对于 Object 实际意义不大。

    - `valueOf()`

      返回对象的字符串、数值或布尔值表示。通常返回的是自身。

### 操作符

1. **一元操作符**

  只能操作一个数值的操作符叫做一元操作符。

  1）自增和自减操作符

  ```js
  // 前置自增和自减操作符，都是先求值，后运算
  let a = 5
  let b = --a + 2
  a   // 4
  b   // 6  先执行 --a 此时 a 值变为 4 再加 2 得 6

  // 后置自增和自减操作符，都是先运算，后求值
  let m = 5
  let n = m-- + 2
  m   // 4
  n   // 7  先执行 m + 2 得 7 ，再执行 m-- ，此时 m 值变为 4

  // 非数值情况运算
    // 对于含有有效数字的字符串，先转换为数字，在执行行自增自减操作
    let a1 = '12'
    a1++   // a1 值变为 13

    // 对于不包含有效数字的字符串，转化为 NaN
    let a2 = '98uu'
    a2--   // a2 值变为 NaN

    // 对于 Boolean 值，先转换为 0 或 1 后再执行
    let a3 = false
    let a4 = true
    a3++   // a3 为 1
    a4++   // a4 为 2

    // 对于对象，先执行对象的 valueOf() 方法，如果是可计算的值，执行以上操作，如果值为 NaN ，则先执行 toString() 方法，再应用以上规则
    let a5 = {
      valueOf: () => { return -1 }
    }
    a5++   // a5 值为 0
  ```

  2）正负操作符
  
  正负操作符对对非数值的操作，等同于 Number() 。对于数值操作，就是将数值转换成对应的正负数。
    
2. **位操作符（一般用不到）**

  位操作符是按照内存中表示数值的位来操作数值。

  ECMAScript 中所有数值都是以 IEEE-754 64 位格式存储，位操作符是先将 64 位值转换成 32 位值，然后进行操作，最后再将操作结果转换为 64 位值。对于我们来说，就相当于只对 32 位值进行操作。

  位数都是从又向左数的，第一位也叫做位 0 。

  对于有符号的整数，32 位中的前 31 位用来表示数值的值，第 32 位用来表示数值的符号，0 表示正数，1 表示负数，位 31 也叫做符号位。

  正数以纯二进制格式存储，31 位中的每一位都表示 2 的幂。例如 18 的二进制表示为 00000000000000000000000000010010，或者 10010 ，这 5 个表示有效位。

  负数是以**二进制补码**的格式存储的。以 -18 为例：

  ```js
  // 第一步：先求这个数值绝对值的二进制码，也就是 18 的二进制码
  0000 0000 0000 0000 0000 0000 0001 0010
  // 第二步：求其反码，即 0 变成 1 ，1 变成 0
  1111 1111 1111 1111 1111 1111 1110 1101
  // 第三步：反码加 1
  1111 1111 1111 1111 1111 1111 1110 1110
  ```

  在默认情况下，ECMAScript 中所有整数都是有符号整数，即位 31 无法访问。其实也存在无符号整数，位 31 不再表示符号，所以能存储更大的值。

  位操作符对于 NaN 和 Infinity 的操作时，这两个值会被当做 0 来处理。

  对于非数值应用操作数，会先执行 Number() 函数，然后再进行操作。

  - 按位非（ NOT ）

    用 `~` 表示，执行操作就是将值的二进制进行求反码。跟本质点来讲就是：操作数的负值减 1 。

    ```js
    let num1 = 25
    ~num1   // -26

    let num2 = -25
    ~num2   // 24
    // 等同于
    -num2 - 1   // 24
    // 但是位操作符是最底层的操作，因此速度更快。
    ```

  - 按位与（ AND ）

    用 `&` 表示，执行操作就是将两个数值的二进制码对齐，只有对应两个位都为 1，新数值该位才为 1。

    ```js
    0000 0000 0000 0000 0000 0000 0001 1001   // 25
    0000 0000 0000 0000 0000 0000 0000 0011   // 3
    // 对应每位进行对比，同为 1 则为 1
    0000 0000 0000 0000 0000 0000 0000 0001   // 最终得到数值为 1

    25 & 3   // 1
    ```

  - 按位或（ OR ）

    用 `|` 表示，执行操作就是将两个数值的二进制码对齐，只要两个对应位有一个为 1，新数值该位就为 1。

    ```js
    0000 0000 0000 0000 0000 0000 0001 1001   // 25
    0000 0000 0000 0000 0000 0000 0000 0011   // 3
    // 对应每位进行对比，只要有一个为 1 则为 1
    0000 0000 0000 0000 0000 0000 0001 1011   // 最终得到数值为 27

    25 | 3   // 27
    ```

  - 按位异或（ XOR ）

    用 `^` 表示，执行操作就是将两个数值的二进制码对齐，只要两个对应位不相同，新数值该位就为 1。

    ```js
    0000 0000 0000 0000 0000 0000 0001 1001   // 25
    0000 0000 0000 0000 0000 0000 0000 0011   // 3
    // 对应每位进行对比，只要有一个为 1 则为 1
    0000 0000 0000 0000 0000 0000 0001 1010   // 最终得到数值为 26

    25 ^ 3   // 26
    ```

  - 左移

    用 `<<` 表示，执行操作会将数值的所有位向左移动指定的位数。右侧空出来的位以 0 填充。而且左移不会影响位 31 的符号位。

    ```js
    // 将数值 -2 向左移 5 位
    -2 << 5   // 最终得到数值为 -64 即 1000000
    ```

  - 有符号右移

    用 `>>` 表示，执行操作会将数值的所有位向右移动指定的位数。左侧空出来的位以符号位的值来填充，这样就保证了负值的移动。而且右移不会影响位 31 的符号位。

    ```js
    // 将数值 -64 向右移 5 位
    -64 >> 5   // -2
    ```

  - 无符号右移

    用 `>>>` 表示，执行操作会将所有位向右移动指定的位数。左侧空出来的位以 0 来填充，这样对于正数来说没有影响，对于负数来说影响就很大了。

    ```js
    // 将数值 64 无符号向右移 5 位
    64 >>> 5   // -2

    // 将数值 -64 无符号向右移 5 位
    -64 >>> 5   // 134217726 
    ```

    这是因为，-64 用二进制表示是 1111 1111 1111 1111 1111 1111 1100 0000 ，向右移 5 位，用 0 填充，就变成了 0000 0111 1111 1111 1111 1111 1111 1110 ，也就是 134217726 。
  
3. **布尔操作符**

布尔操作符一共有三种：非、与、或。

  1）逻辑非
    
  使用 `!` 来表示，可应用于任何值，该操作会返回一个布尔值。

  ```js
  // 如果操作的是个对象、非空字符串、任意非零数值（包括 Infinity），返回 false
  !{}   // false
  !'fdaf'   // false
  !Infinity   // false
  
  // 如果操作的是空字符串、0、null、NaN、undefined，返回 true
  !''   // true
  !0   // true
  !null   // true
  !NaN   // true
  !undefined   // true
  ```

  我们可以使用双非 `!!` 来将任意数值转换成其对应的布尔值，等同于 `Boolean()` 函数。

  2）逻辑与

  使用 `&&` 来表示，可应用于任何值，如果有一个操作数不是布尔值，那它就不一定返回布尔值。

  ```js
  // 如果第一个操作数是对象，则返回第二个操作数
  {} && 121   // 121

  // 如果第二个操作数是对象，则只有第一个操作数求值为 true 的时候才返回该对象
  '' && {}   // ""
  Infinity && {}   // {}

  // 如果两个操作数都是对象，则返回第二个对象
  {a: 1} && {b: 2}   // {b: 2}

  // 如果第一个操作数是 null，则返回 null
  null && true   // null

  // 如果第一个数是 NaN ，则返回 NaN
  NaN && true   // NaN

  // 如果第一个数是 undefined ，则返回 undefined
  undefined && true   // undefined
  ```

  简单点来记：逻辑与属于**短路操作**，如果第一个值能决定结果（该值求值为false），则直接返回第一个值，不再对第二个操作数求值。否则执行第二个操作数并返回。

  不要想当然的把这个操作符与“比较”联系起来！此处可以有一个比较坑人的面试题：
    
  > [{} && {a: 1} 的执行结果？](https://yinmu.me/interview/#_2-a-1-的执行结果？)

  2）逻辑或

  使用 `||` 来表示，可应用于任何值，如果有一个操作数不是布尔值，那它就不一定返回布尔值。

  ```js
  // 如果第一个操作数是对象，则返回第一个操作数
  {} || 121   // {}

  // 如果第一个操作数求值结果是 false，或者第一个数为 null、NaN、undefined，则返回第二个操作数
  '' || {}   // {}
  1 === 2 || false   // false
  null || null   // null
  NaN || NaN   // NaN
  undefined || undefined   // undefined
  NaN || undefined   // undefined

  // 如果两个操作数都是对象，则返回第一个对象
  {a: 1} || {b: 2}   // {a: 1}
  ```

  简单点来记：逻辑或也属于**短路操作**，如果第一个值能决定结果（该值求值为true），则直接返回第一个值，不再对第二个操作数求值。否则执行第二个操作数并返回。

4. **乘性操作符**

乘性操作符有三种：乘、除、取余。如果参与乘性运算的操作数不是数值，则先调用 `Number()` 方法转换为数值，然后再运算。

  1）乘

  用于计算两个数值的乘积，用 `*` 表示。

  ```js
  // 对于正常数值，执行常规数学运算，超过范围则返回 -Infinity 或 Infinity
  -2 * 3   // -6

  // 如果有一个数是 NaN ，则值为 NaN
  0 * NaN   // NaN

  // (-)Infinity 与 0 相乘，得 NaN
  Infinity * 0   // NaN

  // (-)Infinity 与非 0 数值（包括 (-)Infinity ）相乘，得 (-)Infinity
  -Infinity * 2   // -Infinity  很好理解，无穷大乘以非零数值，则更加是无穷大了
  -Infinity * Infinity   // -Infinity

  // 对于非数值的操作数，先调用 Number() 转换为数值

  4 * ''   // 0  因为 Number('') 等于 0
  ```

  2）除

  用于计算两个数值的商，用 `/` 表示。

  ```js
  // 对于正常数值，执行常规数学运算，超过范围则返回 -Infinity 或 Infinity
  18 / -3   // -6

  // 如果有一个数是 NaN ，则值为 NaN
  0 / NaN   // NaN

  // (-)Infinity 与 (-)Infinity 相除，得 NaN
  Infinity / -Infinity   // NaN

  // 如果是 0 除 0 ，则值为 NaN
  0 / 0   // NaN

  // 任何非 0 数值（包括 (-)Infinity ）除以 0，得 (-)Infinity
  -Infinity / 0   // -Infinity
  1 / 0   // Infinity

  // 任何非 0 数值，除以 (-)Infinity ，都得 (-)Infinity
  3 / -Infinity   // -Infinity

  // 0 除以任何非 0 数值，都得 0 
  0 / Infinity   // 0

  // 对于非数值的操作数，先调用 Number() 转换为数值
  4 / false   // Infinity  因为 Number(false) 等于 0
  ```

  3）取余

  用于计算两个数值相除所得的余数，用 `%` 表示。

  ```js
  // 对于正常数值，执行常规数学运算，返回余数
  18 % -5   // 3

  // 如果被除数是无穷大，无论除数是何值，结果都为 NaN
  Infinity % 4   // NaN
  Infinity % 0   // NaN
  Infinity % -Infinity   // NaN

  // 任何数除以 0，余数都为 NaN
  Infinity % 0   // NaN
  1 % 0   // NaN
  0 % 0   // NaN

  // 0 除以任何非零数，余数都为 0
  0 % 11   // 0

  // 如果被除数是有限数值，而除数是无穷大，则余数为被除数
  0 % -Infinity   // 0
  10 % -Infinity   // 10

  // 对于非数值的操作数，先调用 Number() 转换为数值
  0 % true   // 0
  ```

5. **加性操作符**

  1）加

  用 `+` 表示。

  如果两个操作数都是数值，则执行以下规则：

  ```js
  // 如果有一个值是 NaN，则结果为 NaN
  NaN + NaN   // NaN

  // 0 和 无穷大
  Infinity + Infinity   // Infinity
  -Infinity + -Infinity   // -Infinity
  Infinity + -Infinity   // NaN
  +0 + +0   // +0
  +0 + -0   // +0
  -0 + -0   // -0
  ```

  如果至少有一个操作数为字符串，则执行以下规则：

  ```js
  // 如果两个操作数都是字符串，则直接拼接
  '122' + 'null'   // 122null

  // 如果只有一个操作数是字符串，则把另一个调用其 toString() 方法，转换成字符串然后拼接
  122 + 'null'   // 122null   先将 122 转换成 ‘122' ，再执行 '122' + 'null'
  ```

  如果操作符有其他类型，则先调用他们的 `toString()` 方法，对于 `undefined` 和 `null` 则调用 `String()` 方法将他们转换成 `'undefined'` 和 `'null'`。

  2）减

  用 `-` 表示。

  如果两个操作数都是数值，则执行以下规则：

  ```js
  // 如果有一个值是 NaN，则结果为 NaN
  NaN - NaN   // NaN

  // 0 和 无穷大
  Infinity - Infinity   // NaN
  -Infinity - -Infinity   // NaN
  Infinity - -Infinity   // Infinity
  -Infinity - Infinity   // -Infinity
  +0 - +0   // +0
  -0 - +0   // -0
  -0 - -0   // +0
  ```

  如果有一个操作数是字符串、布尔值、null 或 undefined ，则先调用 `Number()` 转换成数值在线计算。如果转换结果为 NaN ，则减法结果就为 NaN。

  如果操作符是对象，则先调用他们的 `valueOf()` 方法，如果得到值为 NaN ，那么结果就为 NaN。如果没有 `valueOf() 方法，则调用 `toString()` 转换成字符串再转换成数值计算。

6. **关系操作符**

包含四种：`>` 、`>=` 、`<` 、`<=` ，返回值都为布尔值。

执行规则：

```js
// 如果两个操作数都是数值，则执行数值大小比较
3 > 0   // true

// 如果两个操作数都是字符串，则比较两个字符串对应的字符编码的值，这是一个比较相同格式的日期的好办法，如 '2012-12-24' < '2013-01-02'
'Brick' < 'brick'   // true  因为 B 的编码为 66 ，而 b 的字符编码为 98

// 如果一个操作数是数值，则将另一个操作数转换为数值，然后进行比较
'23' < 3   // false  23 < 3

// 看个好玩的
'a' < 3   // false
'a' > 3   // false  这是因为 'a' 被转换成了 NaN，而 NaN 与任何值比较都是 false
null < 3   // true  Number(null) -> 0 < 3
undefined < 3  // false  Number(undefined) -> NaN < 3

// 如果是对象，则先调用其 valueOf() 方法，如果没有，调用 toString() 方法，再将得到的值按照上面规则运算
// 如果操作数为布尔值，则先转换成数值，再进行比较
true > false   // true   分别调用 Number() 方法，得到 1 > 0
```

7. **相等操作符**

  1）相等和不相等

  符号表示：相等（`==`）、不相等（`!==`）

  使用这两种操作符的时候，操作数会被强制转型，最终比较后返回一个布尔值。

  执行规则：

  ```js
  // 如果操作数为布尔值，则先将其转换成数值，true 为 1 ，false 为 0
  true == 1   // true

  // 如果一个是字符串，一个是数值，则将字符串转换成数值后再比较
  '11' == 11   // true

  // 如果一个是对象，另一个不是，则调用对象的 valueOf() 方法，用得到的基本类型值再进行比较
  const obj1 = { valueOf: () => { return 1 } }
  obj1 == 1   // true

  // 对于下列情况，要特殊对待
    // null 和 undefined 是相等的
    null == undefined   // true

    // 在比较相等或不相等的时候，null 和 undefined 不会被强制转换
    null == 0   // false
    undefined == 0   // false

    // 只要有一个操作数是 NaN ，就一定不相等
    NaN == null   // false
    NaN == NaN   // false

    // 如果两个操作数都是对象，此时不会去调用每个对象的 valueOf() 方法，而是要看着两个对象是否都指向同一个对象，如果是，则为 true
    const a1 = {
      valueOf: () => {
        return 1
      }
    }
    const a2 = {
      valueOf: () => {
        return 1
      }
    }
    const a3 = a1
    a1 == a2   // false
    a1 == a3   // true
  ```

  2）全等和不全等

  符号表示：相等（`===`）、不相等（`!===`）

  全等操作符，只有在值相等，类型也相同的时候，才会返回 true ，否则都返回 false。

  执行规则与相等操作符相同，只不过在未经转换的条件下，且要求类型相同，所以 `null === undefined` 得到的值为 `false`。

8. **条件操作符**

又叫做三元运算符，使用形式如下：

```js
variable = boolean_expression ? true_value : false_value
```

如果 boolean_expression 求值为 true，则 variable 的值为 true_value 否则为 false_value 。

> 比较常用的另一种方式是不接受返回值，而根据 boolean_expression 的值来决定要运行两个函数：`boolean_expression ? fn1 : fn2`

9. **赋值操作符**

简单赋值操作符：用 `=` 表示，作用就是把等号右侧的值赋值给左侧的变量。

复杂赋值操作符有很多种：`+=`、`-=`、`*=`、`/=`、`%=`、`<<=`、`>>=`、`>>>=`，这些操作符所执行的操作，都是先将左侧的变量的值与右侧的值进行主运算符的操作，然后重新赋值给左侧的变量。

其目的就是为了简化赋值操作，并不会带来任何性能的提升。

10. **逗号操作符**

符号表示：`,` 。

逗号操作符通常用来声明多个变量：`let num1 = 1, num2 = 2, num3 = 3`。

但也可以用来赋值，用作赋值时，会返回表达式中的最后一项：`let num = (0, 1, 2, 3)` ，结果 num 的值为 3 。

### 语句

1. **if 语句**

语法：

```js
if (condition) statement1 else statement2

// 示例
if (weight < 70) {
  console.log('I\'m happy!')
} else {
  console.log('I\'m sad!')
}
```

contdition 不一定是布尔值，ECMAScript 会自动调用 Boolean() 函数将其转化为布尔值。如果为 true ，则执行 statement1 ，否则执行 statement2 。

推荐始终使用大括号，以避免阅读代码时的误解。

2. **do-while 语句**

语法：

```js
do {
  statement
} while (expression)

// 示例
do {
  console.log('You\'re very young!')
  age++
} while (age < 25)
```

do-while 语句属于后测试循环语句，statement 至少要被执行一次，只要 expression 为 true ，statement 就会一直执行下去。

3. **while 语句**

语法：

```js
while (expression) statement

// 示例
while (age < 25) {
  console.log('You\'re very young!')
  age++
}
```

while 语句属于前测试循环语句，只有 expression 为 true ，statement 才会被执行。

4. **for 语句**

语法：

```js
for (initialization; expression; post-loop-expression) statement

// 示例
const count = 10
for (let i = 0; i < count; i++) {
  console.log(i)
  // ...
}

// 等同于以下代码
const count = 10
let i = 0
while (i < count) {
  console.log(i)
  // ...
  i++
}
```

for 循环里面的 initialization 、expression 、post-loop-expression 都可以省略，会创建一个无线循环，也可以省略其中任何一个，当然，如果这有意义的话。

也可以用 , 分开，初始化多个变量，来控制循环：

```js
for (let i = 0, j = 0; i + j < 10; i++, j++) {
  console.log(i + ' '+ j)
}

// 0 0
// 1 1
// 2 2
// 3 3
// 4 4
```

5. **for-in 语句**

语法：

```js
for (property in expression) statement

// 示例
for (let prop in window) {   // 遍历 window 对象所有属性
  console.log(prop)
}
```

for-in 语句通常用来枚举对象的属性。由于对象的属性是无序的，所以 for-in 输出的结果也无法保证顺序。

> 如果要迭代的对象值为 null 或 undefined ，ES5 之后不会报错，只是不再执行循环体。

6. **label 语句**

语法：

```js
label: statement

// 示例
happy: for (let i = 0; i < 10; i++) {
  console.log(i)
}
```

label 语句通常与 break 和 continue 来使用，在多层嵌套中用来指定跳到某个循环体。

7. **break 和 continue 语句**

break 和 continue 都是用来控制循环中的代码执行。break 会立即退出循环，强制执行循环后面的语句；continue 会跳出本次循环，不再执行 continue 后面的语句，直接进行下一次循环。

配套 label 语句的使用：

```js
let num = 0

outermost:
for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    if (i === 5 && j === 5) {
      continue outermost
      // break outermost
    }
    num++
  }
}
console.log(num)   // 95
// console.log(num)   // 55
```

尽量不要把循环搞得这么复杂，容易出错，而且可读性较差，调试也费劲。

8. **with 语句**

语法：

```js
with (expression) statement

// 示例

// 现有如下代码
let a = obj.a
let b = obj.b
let c = obj.c

// 可以用 with 做如下更改
with (obj) {
  let a = a
  let b = b
  let c = c
}
```

在 with 语句的代码块内部，每个变量会被认为是局部变量，如果在局部环境中找不到该变量的定义，则会查询 expression 是否有同名属性。

严格模式下不允许使用 with 语句。

> with 语句会带来性能下降的问题，所以现在不推荐使用。

9. **switch 语句**

语法：

```js
switch (expression) {
  case value1: statement1
    break
  case value2: statement2
    break
  default: statement3
}

// 示例
switch (i) {
  case 1:
    console.log(1)
    break
  case 2:
    console.log(2)
    break
  case 3:
  case 4:
    console.log(3 + 'or' + 4)
    break
  default
    console.log(0)
}
```

switch 是为了让开发人员避免写很多的 if-else 语句。其中 case 后面的 value 可以是某个值，也可以是变量或者函数。case 也可以合并在一起来写。

不建议省略 default 。

> expression 和 value 值进行比较时，是用的全等操作符，不会进行类型转换，因此 '1' 和 1 是不一样的情况。

### 函数

ECMAScript 中使用 `function` 关键字来声明函数，其后跟一组参数及函数体。

语法：

```js
function functionName (arg0, arg1, ..., argN) {
  statement
}

// 示例
function sayHi (name, message) {
  console.log('Hi,' + name + ',' + message)
}
sayHi('尹慕', '该起床赚钱了！')
```

严格模式下，对于函数有一些限制：

- 不能把函数命名为 eval 或 arguments
- 不能把参数命名为 eval 或 arguments
- 不能有两个参数同名

ECMAScirpt 函数中的参数，在内部是用一个数组表示的，因此可以随意传入若干个参数。可以在函数体内通过 `arguments` 这个类数组对象来访问。

上面的例子可以这样重写：

```js
function sayHi () {
  console.log('Hi,' + arguments[0] + ',' + arguments[1])
}
sayHi('尹慕', '该起床赚钱了！')
```

由此我们可以看到 ECMAScript 函数的一个重要特点：命名的参数只是提供便利，并非必需。

可以通过 `arguments.length` 来获取一共传入了多少个参数，因此可以用这一特性来实现类似重载的功能：

```js
function add () {
  if (arguments.length === 1) {
    console.log(arguments[0] + 1)
  } else if (arguments.length === 2) {
    console.log(arguments[0] + arguments[1])
  }
}
add(1)   // 2
add(1, 2)   // 3
```

很遗憾，ECMAScript 中函数没有重载，只能通过对 `arguments` 的判断来模拟。

## 第 4 章：变量、作用域和内存问题

### 基本类型和引用类型的值

基本数据类型：Undefined、Null、Boolean、Number、String 和 Symbol，这些类型是按值访问的，可以直接操作存储在变量中的值。

引用数据类型：Object，当我们对其复制时，操作的是其引用，为其添加属性时，操作的是该对象本身。

1. **动态的属性**

引用类型的值，可以动态的为其添加属性，而基本类型的值，不能为其添加属性：

```js
const Obj = {}
obj.a = 'a'
console.log(obj.a)   // "a"

const str = 'str'
str.a = 'a'
console.log(str.a)   // undefined，该操作尽管不报错，但其实是无效的
```

2. **复制变量值**

对于简单类型的数据来说，复制一个变量，其实是另外开辟了等量的内存，将复制的值存储到新开辟的内存中。而对于引用类型的数据来说，复制该变量，只是将该引用类型的指针存储到了新开辟的内存中。

```js
// 简单类型数据
let a = 'a'
let b = a
// 将 a 变量值进行改变
a = 'aaa'
// 打印 b，值仍为 "a" 。这说明这两个值存储的位置是相互独立的。
console.log(b)   // "a"

// 引用类型数据
let o = { p: 'p'}
let n = o
// 将 o 的 p 属性值进行改变
o.p = 'ppp'
// 打印 n，值发生了改变
console.log(n.p)   // "ppp"
```

3. **传递参数**

ECMAScript 中所有函数的参数都是按值传递的。

对于简单类型的参数，很好理解，相当于复制后赋值给了 arguments 的一个元素。

```js
function add (num) {   // num 其实是函数内部的一个局部变量
  num += 10
  return num
}

const count = 20
const res = add(count)
console.log(count)   // 20
console.log(res)   // 30
```

对于引用类型的参数，按值传递不太好理解。

```js
function setName (obj) {
  obj.name = 'YinMu'
}

const person = {}
setName(person)
console.log(person.name)   // "YinMu"
```

我们看到，将 person 对象传入进去之后，person 的 name 属性值发生了改变。这看起来很像是通过引用来传递的参数。

再看个例子：

```js
function setName (obj) {
  obj.name = 'YinMu'
  obj = {}
  obj.name = 'God'
}

const person = {}
setName(person)
console.log(person.name)   // "YinMu"
```

如果是按照引用传递的，那么 person.name 应该为 "God"。其实在函数内部重新给 obj 赋值的时候，这个变量引用的就是一个局部对象了，而在函数执行完毕后会立即销毁。

所以对于引用类型的参数，也只是传递了一份值得拷贝，值不错最初所存储的是对象的指针，而这个值可以随时被改变。

4. **检测类型**

对于简单类型的数据，`typeof` 可以很方便的检测出它的类型。当我们需要检测一个引用类型数据具体是什么类型的对象时，可以使用 `instanceof`，如果该对象属于该类型，则会返回 `true` ，否则返回 `false`。

```js
const a = {}
const b = []
const c = /yinmu/i

a instanceof Object   // true
b instanceof Array   // true
c instanceof RegExp   // true
```

### 执行环境及作用域

执行环境定义了变量或者函数有权访问的其他数据。每个执行环境都有一个与之关联的变量对象，环境中定义的所有变量和函数都保存在这个对象中。

全局执行环境是最外围的一个执行环境，在 Web 浏览器中，全局执行环境为 windows。

每个函数都有自己的执行环境。当执行流进入到一个函数时，函数的环境就会被推入到一个环境栈中。当函数执行完毕后，栈将其环境弹出，把控制权返回给之前的执行环境。

当代码在一个环境中执行时，会创建变量对象的一个作用域链，来保证对执行环境有权访问的所有变量和函数的有序访问。作用域链的前端，始终都是当前执行的代码所在环境的变量对象。作用域链的下一个变量对象是包含环境，再下一个则是下一个包含环境，一直延续到全局执行环境。

解析标志符（指变量、函数、属性的名字，或者函数的参数）就是沿着作用域链一级一级地搜索的过程。

示例说明：

```js
var color = 'blue'

function changeColor () {
  var anotherColor = 'red'

  function swapColors () {
    var tempColor = anotherColor
    anotherColor = color
    color = tempColor
    // 这里可以访问 tempColor、anotherColor 和 color
  }

  swapColors()
  // 这里可以访问 anotherColor 和 color
}

changeColor()
// 这里只能访问 color
```

内部环境可以通过作用域链访问外部环境，外部环境不能访问内部环境中的任何变量和函数。每个环境都可以向上搜索作用域链来查询变量和函数名，但是不能向下搜索。

1. **延长作用域链**

可以通过下面两种语句来延长作用域链，因为在执行到这些语句时，会在作用域的前端临时添加一个变量对象，执行后则移除：

- try-catch 语句的 catch 块（创建一个新的变量对象，其中包含的是被抛出的错误对象的声明）
- with 语句（将指定的对象添加到作用域链中）

示例：

```js
function buildUrl () {
  var qs = '?list'
  
  with (location) {
    var url = href + qs   // href 被看成 location.href
  }

  return url
}
```

2. **没有块级作用域**

> ES6 里面是有块级作用域的！

在其他语言中，花括号（`{}`）代表块级作用域，但在 ES5 及之前中并非这样。不过 ES6 中用 `let` 和 `const` 声明的变量实现了这点。

示例：

```js
if (true) {
  var n = 0
  const m = 1
}
console.log(n)   // 0
console.log(m)   // 报错 m is not defined
```

如果声明变量的时候，不用 `var`、`let` 或 `const` 等关键字，则该变量会变成全局变量。

JavaScript 引擎在查询标志符的时候，会通过作用域链逐级查找，如果在局部环境中找到了，会立即停止查找，即便外部环境有同名的变量，也不会访问。

3. **垃圾收集**

JavaScript 具有自动垃圾收集机制（GC：garbage collection），执行环境会负责管理代码执行过程中使用的内存。垃圾收集器会按照一定的时间间隔周期性地执行这一操作。

垃圾收集器必须知道哪些变量是有用的，哪些是无用的，因此产生了两种策略：

1）标记清除

当变量进入环境时，就标记为“进入环境”，离开环境时会被标记为“离开环境”。垃圾收集器会释放那些被标记为“离开环境”的变量的内存。

几乎现在所有的主流浏览器的主流版本，都是这种策略。

2）引用计数

跟踪记录每个值被引用的次数，引用一次就加 1，不再引用则减 1，然后回收那些为 0 的变量。无法解决循环引用的问题。几乎没有浏览器再用这种策略了。

在我们实际编写代码的过程中，最好通过将不再使用的值设为 null 方法来解除引用。该方法适用于大多数全局变量和全局对象的属性。**局部变量无需这么做，它们离开执行环境时会被自动解除引用。**

## 第 5 章：引用类型

对象（引用类型的值）是引用类型的一个实例。新对象是使用 new 操作符后跟一个构造函数来创建的。构造函数本身就是一个函数，只不过该函数目的是用来创建新对象。

### Object 类型

创建方式：

- 使用 new 操作符

```js
const person = new Object()
person.name = 'YinMu'
person.age = 29
```

- 对象字面量

```js
const person = {
  name: 'YinMu',
  "age": 29,   // 属性名可以使用字符串
  5: true   // 数值属性会自动转换成字符串
}
```

> 通过对象字面量定义对象时，实际上不会调用 Object 的构造函数。

获取对象的属性，也可以使用方括号语法，尤其是当属性名中包含会导致语法错误的字符（如空格、中划线等）或者使用的是关键字或保留字。如：

```js
person[name] = 'YinMu'
person["my-name"] = 'YinMu'
person["my name"] = 'YinMu'
person[`${username}`] = 'YinMu'
```

通常，除非必须使用字面量来访问属性，否则我们建议使用点表示法。

### Array 类型

ECMAScript 数组的每一项可以用来保存**任意类型的数据**：数值、字符串、对象、函数都可以。且数组的大小是可以动态调整的，即可以随着数据的添加自动增长以容纳新增数据。

创建方式：

- 使用 new 操作符

```js
// 声明一个空数组
const colors = new Array()

// 如果传入的是数值，则声明数值长度的数组
const names = new Array(20)   // 将声明长度为 20 ，每项值为 undefined 的数组

// 如果传入的是字符串等数据
const actions = new Array('click', 'doubleClick')   // 将声明长度为 2 的数组 ["click", "doubleClick"]

// 也可以省略 new 操作符，效果一样
const lover = Array('parent', 'wife')   // ["parent", "wife"]
```

- 数字字面量

```js
const colors = ['blue', 'grey', 'yellow']

// 尽量不要使用这种方式（最后带一个逗号）
const values = [1, 2, ]   // IE8 及以下会创建成 [1, 2, undefined] ，其他浏览器则 [1, 2]
const options = [, , , ]
```

> 通过数组字面量定义对象时，实际上不会调用 Array 的构造函数。

可以通过使用方括号并提供相应的基于 0 开始的索引值来获取某一项的数值。

```js
const colors = ['blue', 'grey', 'yellow']
colors[0]   // "blue"
colors[1] = 'black'   // colors 数组第二项会被设置为 "black"

// 如果设置的某个值的索引超出了现有项数，数组会自动增加到该索引值加 1 的长度，缺省值填充 undefined
colors[4] = 'green'   // 此时该数组长度为 5
console.log(colors)   // ["blue", "black", "yellow", undefined, "green"]
```

数组的 length 属性不是只读的，通过设置这个属性，可以从数组的末尾移除项或者向数组中添加新项。

```js
const colors = ['blue', 'grey', 'yellow']
colors.length = 2   // 数组第三项将被移除
console.log(colors)   // ["blue", "grey"]
colors.length = 4   // 数组将新增两项，且已 undefined 来填充
console.log(colors)   // ["blue", "grey", undefined, undefined]
// 向数组末尾添加新项
colors[colors.length] = 'green'
console.log(colors)   // ["blue", "grey", undefined, undefined, "green"]
console.log(colors.length)   // 5 ，数组长度值为项数值，也就是最后一项索引加 1
```

> 数组最多可以包含 4294967295 个项，超过这个数则会抛出异常！如果接近这个数值，则可能会导致运行时间超长的错误。

1. **检测数组**

- 用 `instanceof` 操作符来检测

```js
if (arr instanceof Array) {
  // 如果是数组，则执行以下操作
}
```

用该操作符检测的前提是假定只有一个全局执行环境，比如网页或者全局作用域。当一个网页里面有两个以上不通的全局执行环境，比如 iframes ，那么可能就有两种以上的 Array 的构造函数，此时可能就没那么准确了。

- 用 `Array.isArray()` 来检测

```js
if (Array.isArray(arr)) {
  // 如果是数组，则执行以下操作
}
```

该方法是 ES5 中新增的方法，这个方法的目的是最终确定某个值到底是不是数组，而不会在乎该值是在哪个全局执行环境中创建的。

该方法支持的浏览器：IE9+、Firefox 4+、Safari 5+、Opera 10.5+、Chrome。

要想在尚未实现这个方法的浏览器中准确检测数组，可以使用如下方法：

```js
function isArray(value) {
  return Object.prototype.toString.call(value) = '[Object Array]'
}
```

2. **转换方法**

所有对象都有 toLocalString()、toString() 和 valueOf() 方法。

```js
const arr = ['blue', 'green']

// 调用数组的 toString() 方法会返回由数组中每个值的字符串形式拼接而成的一个以逗号分隔的字符串。
arr.toString()   // "blue,green"

// 调用数组的 toLocalString() 方法会返回由数组中每个值的字符串形式拼接而成的一个以逗号分隔的字符串。
arr.toLocalString()   // "blue,green" ，与 toString() 的区别在于，对于数组的每一项，执行的是 toLoaclString() 方法。

// 调用数组的 valueOf() 方法，返回的还是数组。
arr.valueOf()   // ["blue", "green"]

// 调用 alert(arr)，由于 alert() 方法接收的是字符串，所以会隐式的调用数组的 toString() 方法。
alert(arr)   // "blue,green"
```

以上方法都是用逗号来分隔每一项，我们也可以使用 `join()` 方法来指定分隔符：

```js
const arr = ['blue', 'green']

arr.join('|')   // "blue|green"
arr.join('')   // "bluegreen"

// 如果不传或者传入 undefined，则还是使用默认的逗号
arr.join()   // "blue,green"
arr.join(undefined)   // "blue,green"   IE7 以及更早的版本会很沙雕的使用 undefined 来分隔
```

> 如果数组的某一项是 null 或者 undefined ，则在执行以上方法的时候，在返回结果中会以空字符串表示。

3. **操作数组的方法**

- `push()`

定义：可以接受任意数量的参数，将它们逐个添加到数组末尾。

返回值：修改后数组的长度。

```js
const arr = []
const res = arr.push(1, 2, 3)
console.log(arr)   // [1, 2, 3]
console.log(res)   // 3
```

- `pop()`

定义：从数组末尾移除最后一项，减少数组的 length 值。

返回值：返回移除的项。

```js
const arr = [1, 2, 3]
const res = arr.pop()
console.log(arr)   // [1, 2]
console.log(res)   // 3
```

- `shift()`

定义：从数组头部移除第一项，减少数组的 length 值。

返回值：返回移除的项。

```js
const arr = [1, 2, 3]
const res = arr.shift()
console.log(arr)   // [2, 3]
console.log(res)   // 1
```

- `unshift()`

定义：从数组头部增加若干项，增加数组的 length 值。

返回值：返回新数组长度。

```js
const arr = [1, 2, 3]
const res = arr.unshift(-1, 0)
console.log(arr)   // [-1, 0, 1, 2, 3]
console.log(res)   // 5
```

> IE7 及更早版本在调用 unshift() 方法总是会返回 undefined。

- `reverse()`

定义：翻转数组。

返回值：返回翻转后的数组，并未产生新数组！

```js
const arr = [21, 2, 11, 3]
const res = arr.reverse()
console.log(arr)   // [3, 11, 2, 21]
console.log(res)   // [3, 11, 2, 21]
arr === res   // true
```

- `sort()`

定义：对数组进行排序。

返回值：排序后的数组，并未产生新数组！

```js
const arr = [21, 2, 11, 3]

// 默认情况下，sort() 方法按升序排列数组选项，即最小值位于最前面，最大值排在最后。sort() 方法会调用每个数组项的 toString() 方法，然后比较得到的字符串，所以会出现 "11" 要小于 "2" 的的结果。
const res = arr.sort()
console.log(arr)   // [11, 2, 21, 3]
console.log(res)   // [11, 2, 21, 3]
arr === res   // true

// 为了解决这种无法准确对数值进行排序的情况，sort() 函数允许接收一个比较函数作为参数。
function compareUp(a, b) {   // 升序排列
  if (a < b) {
    return -1
  } else if (a > b) {
    return 1
  } else {
    return 0
  }
}

function compareDown(a, b) {   // 降序排列
  if (a < b) {
    return 1
  } else if (a > b) {
    return -1
  } else {
    return 0
  }
}

// 更简单的写法
function simpleCompareUp(a, b) {
  return b - a
}
function simpleCompareDown(a, b) {
  return a - b
}

const res = arr.sort(compareUp)
console.log(arr)   // [2, 3, 11, 21]
console.log(res)   // [2, 3, 11, 21]
arr === res   // true
```

- `concat()`

定义：合并数组。

返回值：合并之后的新数组，对原数组无影响。

```js
const arr = [1, 2, 3]
const res = arr.concat([4, 5], 6, 7)
console.log(arr)   // [1, 2, 3]
console.log(res)   // [1, 2, 3, 4, 5, 6, 7]
```

concat() 方法会先创建当前数组的副本，然后将接收到的参数添加到这个副本数组的末尾，最后返回新建的数组。

如果参数为空，则只是返回当前数组的副本。

如果参数为一个或多个数组，则会将这些数组中的每一项依次添加到新建数组的末尾。

如果参数不是数组，这些值会被简单地添加到数组的末尾。

- `slice()`

定义：截取数组。

返回值：截取之后的新数组，对原数组无影响。

```js
const arr = [1, 2, 3, 4, 5, 6, 7]
const res = arr.slice(1, 3)
console.log(res)   // [2, 3]

// 参数为空，返回当前数组的副本
console.log(arr.slice())   // [1, 2, 3, 4, 5, 6, 7]

// 参数只有一个
console.log(arr.slice(3))   // [4, 5, 6, 7]

// 参数有负数
console.log(arr.slice(-4, -2))   // [4, 5]

// 参数结束位置小于起始位置，返回空数组
console.log(arr.slice(-2, -4))   // []

// 原数组不受影响
console.log(arr)   // [1, 2, 3, 4, 5, 6, 7]
```

slice() 可以接收一个或两个参数，即要截取的起始位置和结束位置（指的是数组基数位置，不是个数位置）。

当参数个数为一个的时候，返回从该参数指定位置开始到当前数组末尾所有项。

当参数个数为两个的时候，返回其实和结束位置之间的项，但是不包括结束位置的项。

如果参数里有负数，则用数组长度加上该数来确定相应的位置。

- `splice()`

定义：数组最强大的方法，可以实现删除、插入、替换等操作。

返回值：操作原数组，返回新数组，该数组包含删除的项，如果没有，则为空数组。

```js
const arr = [1, 2, 3, 4, 5, 6, 7]

// 删除：可以删除任意数量的项。接收俩参数，要删除的第一项的位置和要删除的项数。如果不传第二个参数，则默认删除到数组最后一项。
console.log(arr.splice(1, 2))   // [2, 3]
console.log(arr)   // [1, 4, 5, 6, 7]
console.log(arr.splice(3))   // [6, 7]
console.log(arr)   // [1, 4, 5]

// 插入：可以向指定位置插入任意数量的项。接收三个参数，起始位置，0（要删除的项数），要插入的项。如果要插入多个，可以接着传入第四、五、六等项。
console.log(arr.splice(1, 0, 2, 3))   // []
console.log(arr)   // [1, 2, 3, 4, 5]

// 替换：可以向指定位置插入任意数量的项，且删除任意数量的项。接收三个参数，起始位置，要删除的项数，要插入的任意数量的项。
console.log(arr.splice(1, 1, 11, 111))   // [2]
console.log(arr)   // [1, 11, 111, 3, 4, 5]
```

- `indexOf()`

定义：从数组的第一项开始向后查找。

返回值：要查找的项在数组中的位置，没找到则返回 -1。

```js
const arr = [1, 2, 3, 4, 5, 6, 7]

// 接收两个参数：要查找的项（采用全等操作符进行比较）、表示查找起点位置的索引（可选）
console.log(arr.indexOf(4))   // 3
console.log(arr.indexOf(4, 5))   // -1
```

> 此方法为 ES5 新增方法，该方法支持的浏览器：IE9+、Firefox 2+、Safari 3+、Opera 9.5+、Chrome。

- `lastIndexOf()`

定义：从数组的最后一项开始向前查找。

返回值：要查找的项在数组中的位置，没找到则返回 -1。

```js
const arr = [1, 2, 3, 4, 5, 6, 7]

// 接收两个参数：要查找的项（采用全等操作符进行比较）、表示查找起点位置的索引（可选）
console.log(arr.lastIndexOf(5))   // 4
console.log(arr.lastIndexOf(5, 5))   // 4，从数组的基数 5 项也就是数值 6 的位置开始向左查找，找到 5 ，返回 5 所在的基数 4
console.log(arr.lastIndexOf(5, 3))   // -1，从数组的基数 3 项也就是数值 4 的位置开始向左查找，没有找到 5 ，返回 -1
```

> 此方法为 ES5 新增方法，该方法支持的浏览器：IE9+、Firefox 2+、Safari 3+、Opera 9.5+、Chrome。

- `every()`

定义：对数组中每一项运行给定函数，如果函数对每一项都返回 `true` ，则返回 `true`，否则返回 `false`。

参数：`every(function (item, index, array) {}, this)`。

返回值：`true` 或 `false`。

```js
const arr = [1, 2, 3, 4, 5, 6, 7]

const res = arr.every((item, index, array) => item > 0)
console.log(res)   // true
console.log(arr)   // [1, 2, 3, 4, 5, 6, 7]
```

> 此方法为 ES5 新增方法，该方法支持的浏览器：IE9+、Firefox 2+、Safari 3+、Opera 9.5+、Chrome。

- `some()`

定义：对数组中每一项运行给定函数，如果函数对其中任何一项返回了 `true` ，则返回 `true`，否则返回 `false`。

参数：`some(function (item, index, array) {}, this)`。

返回值：`true` 或 `false`。

```js
const arr = [1, 2, 3, 4, 5, 6, 7]

const res = arr.some((item, index, array) => item > 6)
console.log(res)   // true
console.log(arr)   // [1, 2, 3, 4, 5, 6, 7]
```

> 此方法为 ES5 新增方法，该方法支持的浏览器：IE9+、Firefox 2+、Safari 3+、Opera 9.5+、Chrome。

- `filter()`

定义：对数组中每一项运行给定函数，返回该函数会返回 `true` 的项。

参数：`filter(function (item, index, array) {}, this)`。

返回值：新数组。

```js
const arr = [1, 2, 3, 4, 5, 6, 7]

const res = arr.filter((item, index, array) => item > 2)
console.log(res)   // [3, 4, 5, 6, 7]
console.log(arr)   // [1, 2, 3, 4, 5, 6, 7]
```

> 此方法为 ES5 新增方法，该方法支持的浏览器：IE9+、Firefox 2+、Safari 3+、Opera 9.5+、Chrome。

- `forEach()`

定义：对数组中每一项运行给定函数。

参数：`forEach(function (item, index, array) {}, this)`。

返回值：该方法没有返回值，且不会改变原数组。

```js
const arr = [1, 2, 3, 4, 5, 6, 7]

// 我们可以看到，是没有改变原数组的
const res = arr.forEach((item, index, array) => item + 2)
console.log(res)   // undefined
console.log(arr)   // [1, 2, 3, 4, 5, 6, 7]

// 如果我们就想改变原数组，可以使用如下方法
const res = arr.forEach((item, index, array) => {
  array[index] = item + 2
})
console.log(res)   // undefined
console.log(arr)   // [3, 4, 5, 6, 7, 8, 9]
```

> 此方法为 ES5 新增方法，该方法支持的浏览器：IE9+、Firefox 2+、Safari 3+、Opera 9.5+、Chrome。

- `map()`

定义：对数组中每一项运行给定函数。

参数：`map(function (item, index, array) {}, this)`。

返回值：该方法会返回每次函数调用的结果所组成的新数组，且不会改变原数组。

```js
const arr = [1, 2, 3, 4, 5, 6, 7]

// 我们可以看到，是没有改变原数组的。除非函数体只有一条执行语句，否则需要使用 return 返回要返回的数据，如果不适用 return 新数组每一项将为 undefined ！
const res = arr.map((item, index, array) => item + 2)
console.log(res)   // [3, 4, 5, 6, 7, 8, 9]
console.log(arr)   // [1, 2, 3, 4, 5, 6, 7]

// 如果我们就想改变原数组，可以使用如下方法
const res = arr.forEach((item, index, array) => {
  array[index] = item + 2
  return array[index]
})
// 如果不写 return ，res 的值将为 [undefined, undefined, undefined, undefined, undefined, undefined, undefined]
console.log(res)   // [3, 4, 5, 6, 7, 8, 9]
console.log(arr)   // [3, 4, 5, 6, 7, 8, 9]
```

> 此方法为 ES5 新增方法，该方法支持的浏览器：IE9+、Firefox 2+、Safari 3+、Opera 9.5+、Chrome。

- `reduce()`

定义：从数组中的第一项开始，逐个运行给定函数，将前一个项所运行函数的返回值传给下一项，最终返回最后一项运行函数所返回的值。

参数：`reduce(function (accumulator, currentValue, index, array) {}, initialValue)`。

返回值：单个值，不会改变原数组。

```js
const arr = [1, 2, 3, 4, 5, 6, 7]
const res = arr.reduce((prev, cur, index, array) => {
  return prev + cur
})
console.log(res)   // 28
console.log(arr)   // [1, 2, 3, 4, 5, 6, 7]

// 给定一个初始值
const res = arr.reduce((prev, cur, index, array) => {
  return prev + cur
}, 20)
console.log(res)   // 48
```

> 此方法为 ES5 新增方法，该方法支持的浏览器：IE9+、Firefox 2+、Safari 3+、Opera 9.5+、Chrome。

- `reduceRight()`

此方法与 `reduce()` 完全相同，只不过遍历顺序是从右到左，即从数组的最后一项遍历到第一项。

**【下面，我们补充一些 ES6 中新增的数组方法】**

- `from()`

定义：将类数组对象和可遍历（iterable）对象（必须有 length 属性）转化为数组。

参数：`from(arrayLike, function (item, index) {}, this)`。

返回值：新的数组，不会改变原类数组对象。

```js
const nodeList = document.querySelectorAll('div')

// 三种实现方法

// 1. ES5 实现方法
const es5res = [].slice.call(nodeList)
// 2. ES6 实现方法
const es6res = Array.from(nodeList)
// 3. 解构实现，会调用遍历器接口 Symbol.iterator ，如果没部署该接口，则无法转换
const deconres = [...nodeList]

// 其他妙用

// 1. 采用第一个参数指定运算次数，第二个参数（函数）来获得值
Array.from({ length: 2 })
// [undefined, undefined]
Array.from({ length: 2 }, () => 'Jack')
// ["Jack", "Jack"]
// 2. 还可以将字符串转化为数组，获取字符串长度，它能正确处理各种 Unicode 字符，避免将大于 \uFFFF 的字符算作 2 个字符长度的 Bug
Array.from(string).length
```

- `of()`

定义：将一组值转化为数组（该方法是为了弥补构造函数 Array() 参数个数不同，行为有差异的不足）。

参数：`of(element0[, element1[, ...[, elementN]]])`。

返回值：新的数组。

```js
const newArray = Array.of(1, 2, 3)
console.log(newArray)   // [1, 2, 3]
```

- `copyWithin()`

定义：在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员）。

参数：`copyWithin(target, start = 0, end = this.length)`。

返回值：当前数组，该方法会修改当前数组。

```js
const newArray = Array.of(1, 2, 3)
console.log(newArray)   // [1, 2, 3]
```