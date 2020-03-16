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

const newArray = Array.of(3)
console.log(newArray)   // [3] 而 new Array(3) 则会生成长度为 3 的空数组
```

- `copyWithin()`

定义：在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员）。

参数：`copyWithin(target, start = 0, end = this.length)`。

  > `target`(必需)：从该位置开始替换数据。
  >
  > `start`(可选，默认为0)：从该位置开始读取数据，如果为负值，则倒数。
  >
  > `end`(可选，默认为数组长度)：如果为负值，则倒数。
  >
  > 注：三个参数应该都为数值，如果不是，则自动转换为数值格式。

返回值：当前数组，该方法会修改当前数组。

```js
[1, 2, 3, 4, 5].copyWithin(0, 3)   // [4, 5, 3, 4, 5]

[1, 2, 3, 4, 5].copyWithin(0, 3, 4)   // [4, 2, 3, 4, 5] 复制3号位到0号位

[].copyWithin.call({ length: 5, 3: 1}, 0, 3)   // {0: 1, 3: 1, length: 5}

// 对于不支持 copyWithin 方法的平台，可用下面写法替代
[].copyWithin.call([1, 2, 3, 4, 5], 0, 3, 4)   // [4, 2, 3, 4, 5]
```

- `find()`

定义：用于找出第一个符合条件的数组成员。

参数：回调函数 fn，数组成员会依次执行该函数，直到找出第一个返回值为 true 的成员。

返回值：有复合条件的，则返回该成员，否则返回 undefined。

```js
[1, 4, -2, 5].find(n => n < 0)   // -2

[2, 3, 10].find((item, index, array) => {
  return item > 9
})   // 10
```

- `findIndex()`

定义：用于找出第一个符合条件的数组成员的位置。

参数：回调函数 fn，数组成员会依次执行该函数，直到找出第一个返回值为 true 的成员。

返回值：有复合条件的，则返回该成员的位置，否则返回 -1。

```js
[1, 4, -2, 5].findIndex(n => n < 0)   // 2

[2, 3, 10].findIndex((item, index, array) => {
  return item > 100
})   // -1
```

**注：** `find()` 和 `findIndex()` 方法都可以发现 NaN，弥补了数组 indexOf 的不足，但需要借助 `Object.is()` 方法。

```js
[NaN].find(n => Object.is(NaN, n))   // NaN

[NaN].findIndex(n => Object.is(NaN, n))   // 0
```

- `fill()`

定义：用一个固定值填充一个数组中从起始索引到终止索引内的全部元素，不包括终止索引。

参数：`fill(value, start = 0, end = this.length)`。

返回值：修改后的数组，该方法会改变原数组。

```js
['a', 'b', 'c'].fill(2)   // [2, 2, 2]

['a', 'b', 'c'].fill(2, 1, 2)   // ['a', 2, 'c']
```

- `entries() | keys() | values()`

定义：与对象的方法类似，`entries()` 是对键值对的遍历，`keys()` 是对键的遍历，`values()` 是对值得遍历。

返回值：一个遍历器对象，可与 for...of 循环配套使用。

```js
for (let item of ['a', 'b', 'c'].values()) {
  console.log(item)
}
// "a"
// "b"
// "c"

for (let [index, item] of ['a', 'b', 'c'].entries()) {
  console.log(index, item)
}
// 0 "a"
// 1 "b"
// 2 "c"
```

- `includes()`

定义：判断一个数组是否包含一个指定的值。

参数：`includes(value, fromIndex)`。

返回值：如果包含则返回 true，否则返回false。

```js
['a', 'b', 'c'].includes('b')   // true

// 可以用来检测 NaN
[1, NaN].includes(NaN)   // true
```

### Date 类型

Date 类型使用自 UTC（Coordinated Universal Time, 国际协调时间）1970 年 1 月 1 日零时开始经过的毫秒数来保存日期。

Date 类型保存的日期可以精确到 1970 年 1 月 1 日前后的 100000000 年。

创建日期对象：

```js
const now = new Date()   // 不传参数的情况下，会返回当前日期的时间

// 如果想创建特定的日期和时间，必须传入表示该日期的毫秒数
new Date(1582523146995)

// 但也可以传入指定格式日期字符串，返回指定日期的时间。之所以可以如此，是因为在后台调用了 Date.parse()
new Date('02/02/2020')
// 等效于
new Date(Date.parse('02/02/2020'))
```

Date 提供了 parse() 方法来支持传入字符串返回相应日期的毫秒数

```js
Date.parse('02/02/2020')   // 1580572800000

// 如果传入的字符串不能表示日期，则会返回 NaN
Date.parse('abc')   // NaN
```

Date 还提供了 UTC() 方法来返回表示日期的毫秒数，该方法接收一次为：年，从0开始的月，日，小时（0~23），分，秒，毫秒。其中年和月为必传，其他可不传。

```js
Date.UTC(2000, 0)   // 946684800000

Date.UTC(2005, 4, 5, 17, 55, 555)   // 1115316255000
```

在 ECMAScript5 中添加了 Date.now() 方法，返回调用该方法时的日期和时间的毫秒数。这通常被用来测试代码执行时间。

```js
const start = Date.now()   // 1582527636541
// do sth.
const end = date.now()   // 1582527673701
```

**在不支持 Date.now() 的浏览器中（所有浏览器中），可以使用 `+new Date()` 来获取当前时间戳，等价于 `Date.now()`**

```js
+new Date()   // 1582527806300
```

1. **日期对象继承的方法**

与其他引用类型一样，Date 类型也重写了 `toLocalString()`、`toString()`、`valueOf()` 方法，但 `toLocalString()` 和 `toString()` 方法在各个浏览器实现的都不一样，因此并无实际使用价值。

`valueOf()` 方法并不返回字符串表示，而是返回该日期的毫秒表示，因此**可以使用比较操作符直接来比较日期**。

```js
new Date(2020, 2, 19) > new Date(2019, 12, 22)   // true
```

2. **日期格式化方法**

将日期格式转换为字符串的方法：

```js
// 显示日期的星期、月、日、年
new Date().toDateString()   // "Mon Feb 24 2020"

// 显示时、分、秒、时区
new Date().toTimeString()   // "17:08:33 GMT+0800 (中国标准时间)"

// 显示特定地区格式的日期时间
new Date().toLocaleDateString()   // "2020/2/24"

// 显示特定地区格式的具体时间
new Date().toLocaleTimeString()   // "下午5:11:20"

// 显示完整的 UTC 日期
new Date().toUTCString()   // "Mon, 24 Feb 2020 09:12:27 GMT"
```

**注：以上方法也因浏览器而异，所以也不实用！**

3. **真正实用的获取日期信息方法**

|字面量|含义|
|:-:|:-:|
|getTime()|返回日期的毫秒数，与 valueOf() 返回值相同|
|setTime(毫秒数)|以毫秒数设置日期|
|getFullYear()|获取 4 位数的年份|
|getUTCFullYear()|获取 UTC 日期的 4 位数的年份|
|setFullYear()|设置日期的年份。传入的必须是四位数字，如 2020|
|setUTCFullYear()|设置 UTC 日期的年份。传入的必须是四位数字，如 2020|
|getMonth()|获取日期中的月份，从 0 开始，即 0 为 1 月，11 为 12 月|
|getUTCMonth()|获取 UTC 日其中的月份，从 0 开始，即 0 为 1 月，11 为 12 月|
|setMonth()|设置日期中的月份，必须大于 0，超过 11 则增加年份|
|setUTCMonth()|设置 UTC 日期中的月份，必须大于 0，超过 11 则增加年份|
|getDate()|获取日期是当月的第几天（1 ~ 31），如 2 月 5 日即为 5|
|getUTCDate()|获取 UTC 日期是当月的第几天（1 ~ 31），如 2 月 5 日即为 5|
|setDate()|设置日期为当月的第几天，如超过该月最大天数，则增加月份|
|setUTCDate()|设置 UTC 日期为当月的第几天，如超过该月最大天数，则增加月份|
|getDay()|获取日期为星期几，从 0 开始，即 0 为周一，6 为周日|
|getUTCDay()|获取 UTC 日期为星期几，从 0 开始，即 0 为周一，6 为周日|
|getHours()|获取日期的小时数，从 0 开始，23 结束|
|getUTCHours()|获取 UTC 日期的小时数，从 0 开始，23 结束|
|setHours()|设置日期的小时数，超过 23 则增加天数|
|setUTCHours()|设置 UTC 日期的小时数，超过 23 则增加天数|
|getMinutes()|获取日期的分钟数，从 0 开始，59 结束|
|getUTCMinutes()|获取 UTC 日期的分钟数，从 0 开始，59 结束|
|setMinutes()|设置日期的分钟数，超过 59 则增加小时数|
|setUTCMinutes()|设置 UTC 日期的分钟数，超过 59 则增加小时数|
|getSeconds()|获取日期的秒数，从 0 开始，59 结束|
|getUTCSeconds()|获取 UTC 日期的秒数，从 0 开始，59 结束|
|setSeconds()|设置日期的秒数，超过 59 则增加分钟数|
|setUTCSeconds()|设置 UTC 日期的秒数，超过 59 则增加分钟数|
|getMilliseconds()|获取日期的豪秒数，从 0 开始，999 结束|
|getUTCMilliseconds()|获取 UTC 日期的豪秒数，从 0 开始，999 结束|
|setMilliseconds()|设置日期的豪秒数，超过 999 则增加秒数|
|setUTCMilliseconds()|设置 UTC 日期的豪秒数，超过 999 则增加秒数|
|getTimezoneOffset()|获取本地时间与 UTC 时间相差的分钟数|

### RegExp 类型

ECMAScript 使用 RegExp 类型来支持正则表达式。

1. **使用字面量方式声明（极度推荐）**

```js
const expression = / pattern / flags
``` 

其中 `pattern` 可以是任意的正则表达式，`flags` 支持以下三种模式（非必填）：

- `g` (global)：表示全局匹配，会匹配字符串中所有符合正则表达式的部分。

- `i` (case-insensitive)：不区分大小写，即匹配的时候会忽略大小写的区别。

- `m` (multiline)：多行模式，即到达一行文本末尾时还会继续向下行查找。

在正则表达式模式中，所有元字符都必须转义。正则表达式的元字符有：`( [ { \ ^ $ | ? * + . } ] )`。

```js
/at/g   // 匹配所有'at'

/[bc]at/i   // 匹配第一个'bat'或'cat'，不区分大小写

/.at/gi   // 匹配所有以'at'结尾的3个字符的组合，不区分大小写

/\[bc\]at/i   // 匹配第一个'[bc]at'，不区分大小写

/\.at/gi   // 匹配所有的'.at'，不区分大小写
```

2. **使用构造函数声明**

```js
// 构造函数接受两个参数（皆为字符串类型），第一个参数为正则表达式，第二个参数为标志字符串（非必填）
const reg = new RegExp('[bc]at', 'i')   // 等价于 const reg = /[bc]at/i
```
需要注意的是，传入进去的正则表达式，因为类型为字符串，所以对元字符，要进行双重转义：

```js
// 双重转义
const reg = new RegExp('\\[bc\\]at', 'i')   // 等价于 const reg = /\[bc\]at/i
```

> 在 ECMAScript3 中，以字面量方式创建的 RegExp 会始终共享同一个实例。但在 ES5 中已经明确规定，使用字面量必须像使用构造函数一样，每次都创建一个新的实例。

3. **RegExp 实例属性（没什么用）**

RegExp 的每个实例都具有下列属性：

- global：布尔值，表示是否设置了 g 属性。

- ignoreCase：布尔值，表示是否设置了 i 属性。

- lastIndex：整数，表示开始搜索下一个匹配项的字符位置，从 0 开始。

- multiline：布尔值，表示是否设置了 m 属性。

- source：正则表达式的字符串表示，按照字面量形式而非构造函数中的字符串模式返回。

```js
const pattern = /\[bc\]at/i

pattern.global   // false
pattern.ignorceCase   // true
pattern.lastIndex   // 0
pattern.multiline   // false
pattern.source   // '\[bc\]at'
```

4. **RegExp 实例方法**

- `exec()`

  该方法接收一个参数，即要被正则的字符串。

  返回包含第一个匹配项信息的数组，如果没有匹配项，则返回 null。

  返回的数组中包含两个额外的属性：index 和 input。index 表示匹配项在字符串中的位置，input 表示应用正则表达式的字符串。

  ```js
  const text = 'I love mom and dad and baby'
  const pattern = /mom( and dad( and baby)?)?/gi
  const matches = pattern.exec(text)
  matches.index   // 7
  matches.input   // 'I love mom and dad and baby'
  matches[0]   // 'mom and dad and baby'
  matches[1]   // 'and dad and baby'
  matches[2]   // 'and baby'
  ```

- `test()`

  该方法接收一个参数，即要被正则的字符串。

  如果能匹配到，则返回 true；如果匹配不到，则返回 false。

  ```js
  // 判断手机号是否合法
  const pattern = /^1[3456789]\d{9}$/
  const phone = '16600006666'
  if (pattern.test(phone)) {
    console.log('输入手机号合法')
  }
  ```

- `toLocaleString()`和`toString()`

  无论用何种方法创建的正则表达式实例，这两个方法都会返回正则表达式的字面量表示。

  ```js
  const pattern = /mom( and dad( and baby)?)?/gi
  pattern.toLocalestring()   // "/mom( and dad( and baby)?)?/gi"
  pattern.toString()   // "/mom( and dad( and baby)?)?/gi" 
  ```

- `valueOf()`

  该方法会返回正则表达式本身。

  ```js
  const pattern = /mom( and dad( and baby)?)?/gi
  pattern.valueOf()   // /mom( and dad( and baby)?)?/gi  注意，并不是字符串类型
  ```

### Function 类型

ECMAScript 中，函数实际上是对象，每个函数都是 Function 类型的实例，与其他引用类型一样具有属性和方法。

**函数名实际上只是一个指向函数对象的指针**，并不会与某个函数作为绑定。

函数声明的几种方式：

```js
// 函数声明
function sum (num1, num2) {
  return num1 + num2
}

// 函数表达式
const sum = function (num1, num2) {
  return num1 + num2
}

// 函数声明和函数表达式同时进行（只有沙雕才这么干，我相信你不是沙雕）
// 此时 shadiao 是完全没有任何意义的，也访问不到，会报错未定义
const sum = function shadiao (num1, num2) {
  return num1 + num2
}
sum(1, 2)   // 3
shadiao(1, 2)   // shadiao is not defined

// 使用 Function 构造函数声明（只有另一只沙雕才这么干，我相信你不是另一只沙雕）
// 该构造函数可以接受任意数量的参数，但会把最后一个当做函数体，其余当做函数的参数。
// 会导致解析两次代码，效率低下
// 但是有利于理解“函数是对象，函数名是指针”
const sum = new Function('num1', 'num2', 'return num1 + num2')
```

由于函数名只是指针，所以一个函数可以拥有任意个名字：

```js
const sum = function (num1, num2) {
  return num1 + num2
}
const add = sum
const plus = add
sum = null
add(1, 2)   // 3
plus(1, 2)   // 3
console.log(sum)   // null
```

1. **没有重载**

因为函数名只是个指针，当我们重复定义某个函数名的时候，最后定义的将会覆盖之前的，也就不可能实现其他语言的函数重载了。

```js
function add (a) {
  return a + 100
}
function add (a) {
  return a + 200
}

// 以上代码等价于

var add = function (a) {
  return a + 100
}
add = function (a) {
  return a + 200
}

// 所以最后会执行 + 200 返回
```

2. **函数声明与函数表达式**

函数声明与 var 声明变量一样，都会存在提升（函数提升和变量提升），而函数表达式，则会等到解析器执行到它所在的代码行才会执行。

```js
// 虽然函数声明在调用之后，但一样可以执行
sum(1, 2)   // 3
function sum (a, b) {
  return a + b
}

// 如果我们采用函数表达式的形式，则完全不一样了
console.log(sum)   // 注意，此处不会报错，因为我们是用 var 来声明的
console.log(sum(1, 2))   // 此处会报错，此时 sum 还并未执行赋值
var sum = function (a, b) {
  return a + b
}
```

除了函数提升所带来的的不同，其余方面，两种方式没有任何不同。

3. **把函数作为值**

函数不仅可以当做参数通过一个函数传入到另一个函数，也可以当做结果来返回。

```js
// 将函数做为参数传递
function callFunction (fn, arg) {
  retun fn(arg)
}
function add (a) {
  return a + 10
}
callFunction(add, 22)   // 32

// 将函数作为返回值来使用（经常作为面试题）
// 我们来实现一个 fn(1)(2)(3) 得到 1 + 2 + 3 = 6 的结果
function fn (a) {
  return function (b) {
    return function (c) {
      return a + b + c
    }
  }
}
fn(1)(2)(3)   // 6
```

4. **函数内部属性**

在函数内部，有两个特殊的对象：`arguments` 和 `this`，另外还有一个属性叫 `caller`。

- `arguments`

  `arguments` 是一个类数组对象，包含传入函数的所有参数。同时它还有一个 `callee` 的属性，该属性是一个指针，指向拥有这个 `arguments` 对象的函数。

  > 严格模式下调用 arguments.callee 会报错。严格模式下调用 arguments.caller 会报错，非严格模式下会始终返回 undefined。

  ```js
  // 实现阶乘函数解耦
  function factorial (num) {
    if (num <= 1) return 1
    return num * factorial(num - 1)   // 递归
  }
  
  // 此时如果函数名更改了，那内部代码就需要相应更改，可以使用 arguments.callee 来实现解耦
  function factorial (num) {
    if (num <= 1) return 1
    return num * arguments.callee(num - 1)   // arguments.callee 指向该函数本身
  }
  ```

- `this`

  **`this` 永远指向函数执行的环境对象。当在全局作用域调用函数的时候，this 指向 window。**

  ```js
  function fn () {
    console.log(this)   // window
  }

  const obj = {
    cb: function () {
      console.log(this)   // obj
    }
  }
  ```

- `caller`

  ES5 新增，保存调用当前函数的函数的引用。如果是在全局作用域中调用或者并没有函数调用该函数，则值为 null。

  > 严格模式下，不能为函数的 caller 属性赋值，否则报错。

  ```js
  function fn () {
    console.log(this)   // window
  }

  fn.caller   // null

  const obj = {
    cb: function () {
      console.log(this)   // obj
      console.log(obj.cb.caller)   // null
    }
  }
  obj.cb.caller   // null

  // 此时我们在下面的函数中调用 obj.cb
  function cbObj () {
    obj.cb()
  }
  // 执行结果
  obj   // 对应 console.log(this)
  cbObj   // 对应 console.log(obj.cb.caller)
  ```

5. **函数属性和方法**

因为函数就是对象，所以函数也有属性和方法。

每个函数都包含两个属性：`length` 和 `prototype`。

- `length`

  函数的 length 属性表示的是该函数参数的个数。

  ```js
  function sum (num1, num2) {
    console.log(this.length)   // 0 注意，并不是说函数内部 this 的 length
    return num1 + num2
  }

  sum.length   // 2 是函数名.length
  ```

- `prototype`（具体到后面原型的时候再探究）

  prototype 用来保存引用类型实例方法的真正所在。在创建自定义引用类型和实现继承的时候，会很有用。

  > prototype 是不可枚举的，所以 for-in 无法发现。

此处我们重点讲一下函数改变 this 指向的方法：`call()`，`apply()` 和 `bind()`。

- `call()` 和 `apply()`

  这两个方法只有在传参的形式上有所不同，其余作用都一样。

  `apply()` 方法接收两个参数：第一个为运行函数的作用域，第二个为运行函数的参数数组，也可以是 arguments 对象。

  `call()` 方法则接收任意个参数：第一个为运行函数的作用域，后面的为运行函数的参数依次传入。

  ```js
  function sum (num1, num2) {
    return num1 + num2
  }

  // apply
  function applySum1 (num1, num2) {
    return sum.apply(this, arguments)
  }
  function applySum2 (num1, num2) {
    return sum.apply(this, [num1, num2])
  }

  // 等价于 call
  function callSum (num1, num2) {
    return sum.call(this, num1, num2)
  }
  ```

- `bind()`

  `bind()` 与 `call()` 和 `apply()` 最大的区别在于：前者绑定 this 指向之后，并不会立即执行该函数，而是需要再执行；而后两者绑定 this 指向的时候，函数就自动执行了。而传参方式与 call() 相同

  ```js
  window.color = 'red'

  const o = {
    color: 'blue',
    name: 'ym'
  }

  function showColor (name) {
    console.log(this.color)
    console.log(name)
  }

  showColor()   // 'red'  undefined

  showColor.call(o, 'yinmu')   // 'blue'  'yinmu'

  showColor.apply(o, ['yinmu'])   // 'blue'  'yinmu'

  showColor.bind(o, 'yinmu')   // 注意，此时不会有任何输出，showColor 函数不会执行！

  showColor.bind(o, 'yinmu')()   // 'blue'  'yinmu'  必须手动执行下才行。
  ```

**注意：在严格模式下，如果没指定环境对象而调用函数，则 this 值不是 window 而是 undefined。除非明确用 apply() 或 call() 或 bind() 方法来修改 this 指向。**

```js
function fn (){
  console.log(this)
}
fn()   // 非严格模式，此时打印 window

'use strict'
function fn (){
  console.log(this)
}
fn()   // 严格模式，此时打印 undefined
```

### 基本包装类型

为了便于操作基本类型值，ECMAScript 还提供了 3 种特殊的引用类型：Boolean、Number 和 String。

实际上解析器每当读取一个基本类型值的时候，会处于一种读取模式，访问到基本数据类型时，后台就会创建一个对应的基本包装类型的对象，从而让我们能够使用一些方法来操作这些数据。

```js
// 读取到 s1 的值为字符串
let s1 = 'yinmu'
// 解析器自动执行为
let s1 = new String('yinmu')   // 1）创建 String 类型的一个实例
let s2 = s1.substring(2)   // 2）在实例上调用指定的方法
s1 = null   // 3）销毁这个实例
```

**引用类型与基本包装类型的主要区别就是对象的生存期。**自动创建的基本包装类型对象，只存在于代码执行瞬间，然后立即被销毁。所以我们无法为基本类型值添加属性和方法。

```js
let s1 = 'yinmu'
s1.color = 'red'
console.log(s1.color)   // undefined
```

尽量永远不要手动显式创建基本包装类型对象，很容易造成误解。对基本包装类型的实例调用 typeof 会返回 'object'，而所有的基本包装类型在转换为布尔值时都为 true，因为它是一个对象。

```js
let value = 25
let number = Number(25)   // 这是转型函数！！！！
console.log(typeof number)   // 'number' 

let obj = new Number(25)
console.log(typeof obj)   // 'object'
```

1. **Boolean 类型**

```js
let booleanObject = new Boolean(true)
```

永远不要使用 Boolean 对象！

2. **Number 类型**

```js
let numberObject = new Number(10)
```

**方法：**

- `toString()`

  ```js
  let num = 10
  // 数字的 toString() 方法可传入一个表示基数的参数，来返回指定进制的字符串形式
  num.toString()   // '10'
  num.toString(2)   // '1010'
  num.toString(8)   // '12'
  num.toString(10)   // '10'
  num.toString(16)   // 'a'
  ```

- `toFixed()`

  返回指定小数位的数值的字符串表示（四舍五入）。

  ```js
  let num = 10
  num.toFixed(2)   // '10.00'
  ```

  > 以标准来讲，toFixed() 可以表示带有 0 到 20 小数位的数值，当然，不同浏览器可能有不同的执行。

- `toExponential()`

  返回指定数值的指数表示法（e 表示法），以字符串的形式。

  ```js
  let num = 10
  num.toExponential(1)   // '1.0e+1'
  ```

- `toPrecision()`

  该方法可能会返回固定大小的格式，也可能返回指数格式。该方法接受一个参数，用来表示数值的所有数字的位数（不包括指数部分）
  
  ```js
  let num = 99
  num.toPrecision(1)   // '1e+2'  因为 1 位数无法准确表示99，所以向上舍入，变为 100
  num.toPrecision(2)   // '99'
  num.toPrecision(3)   // '99.0'
  ```

  > 以标准来讲，toPrecision() 可以表示带有 1 到 21 小数位的数值，当然，不同浏览器可能有不同的执行。

同样不建议使用 Number 对象！

3. **String 类型**

```js
let stringObject = new String('hello world')
```

**属性：**

String 类型的每个实例都有一个 length 属性，表示字符串中包含多少个字符（空格也算，双字节字符，像汉字，也会算作 1 个长度）。

```js
'hello   world'.length   // 13 因为含有3个空格
'name 尹慕'.length   // 7
```

**方法：**

- `charAt()、charCodeAt()、fromCharCode() 以及 方括号访问法`

  `charAt()`：接受一个字符位置参数，基于 0 开始，以单字符字符串的形式返回给定位置的字符。

  ```js
  'hello world'.charAt(1)   // 'e'
  ```

  `charCodeAt()`：接受一个字符位置参数，基于 0 开始，返回给定位置的字符的字符编码。

  ```js
  'hello world'.charCodeAt(1)   // 101 （number 类型）
  ```

  `fromCharCode()`：接受若干个字符编码，返回给定编码的字符组成的字符串。

  ```js
  String.fromCharCode(104, 101, 108, 108, 111)   // 'hello'
  ```

  方括号访问法：ES5 新增，给定下标基数，以单字符字符串的形式返回给定位置的字符。

  > IE7 及更早版本会返回 undefined，其他都能完美支持。

  ```js
  'hello world'[1]   // 'e'
  ```

- `concat()`

  该方法用来将若干个字符串拼接起来，返回拼接后的新字符串，并不会改变原字符串。

  ```js
  'hello '.concat('world', '!')   // 'hello world!'
  ```

  **注：更为常用的是 `+` 操作符，简单方便！**

- `slice()、substr() 以及 substring()`

  这三个方法都是接收一个或两个位置基数参数，返回截取的新字符串，不会改变原字符串。

  1）对于只传递一个参数，且值为正的情况下，三个方法返回值一样，表示截取从该基数位置到字符串结束。

  ```js
  'hello world'.slice(3)   // 'lo world'
  'hello world'.substr(3)   // 'lo world'
  'hello world'.substring(3)   // 'lo world'
  ```

  2）对于传递两个参数，且值都为正的情况下：`slice()` 和 `substring()` 中第一个参数表示起始位置，第二个参数表示结束位置（不包含此结束位置）；`substr()` 第一个参数表示起始位置，第二个参数表示要截取的长度。

  ```js
  'hello world'.slice(3, 7)   // 'lo w' 截取的位置基数从 3 到 6 的部分
  'hello world'.substr(3, 7)   // 'lo worl'  从基数位置 3 开始，截取向后数长度为 7 的部分
  'hello world'.substring(3, 7)   // 'lo w' 截取的位置基数从 3 到 6 的部分
  ```

  3）对于传递的参数有负数的情况：`slice()` 会将传入的负值与字符串长度相加；`substr()` 如果第一个参数为负数，则加上字符串长度，如果第二个参数为负数，则当做 0 来处理；`substring()` 会把所有的负值都当做 0 来处理。

  ```js
  'hello world'.slice(-3)   // 'rld' -3 转换为 8，截取的位置基数从 8 到结束的部分
  'hello world'.slice(3, -7)   // 'l' -7 转换为 4，截取的位置基数从 3 到 3 的部分
  'hello world'.slice(-3, 7)   // '' -3 转换为 8，8~7，起始位置大于了结束位置，直接返回空字符串
  'hello world'.slice(-3, -7)   // '' -3 转换为 8，-7 转换为 4，8~4，起始位置大于了结束位置，直接返回空字符串

  'hello world'.substr(-3)   // 'rld'  -3 转换为 8（11 + -3 = 8）
  'hello world'.substr(3, -7)   // ''  -7 转换为 0 ，长度为 0 ，返回空字符串
  'hello world'.substr(-3, 7)   // 'rld'  -3 转换为 8 ，长度为 7 ，超出范围则截取到字符串结束
  'hello world'.substr(-3, -7)   // ''  -3 转换为 8，-7 转换为 0 ，长度为 0 ，返回空字符串

  'hello world'.substring(-3)   // 'hello world' -3 被当做 0 处理
  'hello world'.substring(3, -7)   // 'hel' -7 被当做 0 处理，变成了 3~0 ，该方法会将较大的数作为结束，所以也就是截取的位置基数从 0 到 2 的部分
  'hello world'.substring(-3, 7)   // 'hello w' -3 被当做 0 处理，截取的位置基数从 0 到 6 的部分
  'hello world'.substring(-3, -7)   // '' 都被当做 0 处理，所以返回空字符串
  ```

  > IE8 及之前的版本，在处理 substr() 传入负值的情况时，会返回原字符串。

- `indexOf() 以及 lastIndexOf()`

  这两个方法都是从一个字符串中搜索给定子字符串，返回该子字符串位置，如果没有找到，返回 -1。
  
  区别在于 `indexOf()` 是从开头向后查找，`lastIndexOf()` 是从结尾向前查找。

  该方法都可以接收第二个参数，表示从哪个基数位置开始查找。

  ```js
  'hello world'.indexOf('o')   // 4
  'hello world'.lastIndexOf('o')   // 7 从后向前查找，找到的是第二个 o 所在的位置

  'hello world'.indexOf('o', 6)   // 7 从位置 6 开始向后查找，找到的是第二个 o 所在的位置
  'hello world'.lastIndexOf('o', 6)   // 4 从位置 6 开始向前查找，找到的是第一个 o 所在的位置
  ```

  可以通过改变第二个参数，循环调用 `indexOf()` 或 `lastIndexOf()` 实现查找所有匹配字符串所出现的位置：

  ```js
  const str = 'my name is yinmu'
  let position = []
  let pos = str.indexOf('m')

  while (pos > -1) {
    position.push(pos)
    pos = str.indexOf('m', pos + 1)
  }

  console.log(position.join(','))   // '0,5,14'
  ```

- `trim()`

  ES5 新增方法，该方法会创建一个字符串的副本，删除前置及后缀的所有空格，然后返回结果。该方法不会改变原始字符串。

  ```js
  let str1 = '  hello world '
  let str2 = str1.trim()
  str1   // '  hello world '
  str2   // 'hello world'
  ```

  > 支持该方法的浏览器有 IE9+、Firefox 3.5+、Safari 5+、Opera 10.5+ 以及 Chrome。此外 Firefox 3.5+、Safari 5+ 以及 Chrome 8+ 还支持非标准的 `trimLeft()` 和 `trimRight()` 方法。

- `toLowerCase()、toLocaleLowerCase()、toUpperCase()、toLocaleUpperCase()`

  这些方法都是用来改变字符串大小写且并不会改变原字符串。

- `match()`

  在字符串上调用此方法与调用 RegExp 类型的 `exec()` 方法本质上一致。

  该方法只接受一个参数，要么是正则表达式，要么是 RegExp 对象，返回一个捕获组。

- `search()`

  该方法只接受一个参数，要么是正则表达式，要么是 RegExp 对象，返回字符串中第一个匹配项的索引，如果没有匹配项，则返回 -1。

  该方法只能从开头向后查找。

- `replace()`

  该方法用来替换字符串中的某段子字符串，并不会改变原字符串。

  接受两个参数，第一个参数可以是正则表达式或字符串，第二个参数可以是一个字符串或者函数。

  1）如果第一个参数是字符串，那么只会替换第一个子字符串，如果想替换全部，就需要用正则表达式，且指定 g 全局标识。

  ```js
  let str = 'cat,bat,sat,fat'
  str.replace('at', 'hh')   // "chh,bat,sat,fat"
  str   // "cat,bat,sat,fat"  原字符串并没有被改变，只是拷贝了一个副本
  str.replace(/at/g, 'hh')   // "chh,bhh,shh,fhh"
  ```

  2）如果第二个参数是字符串，可以用一些特殊字符，将正则表达式操作得到的值插入到结果字符中

  |字符序列|替换文本|
  |:-:|:-:|
  |$$|$|
  |$&|匹配整个模式的子字符串。与 RegExp.lastMatch 的值相同|
  |$'|匹配子字符串之前的子字符串。与 RegExp.leftContext 的值相同|
  |$`|匹配子字符串之后的子字符串。与 RegExp.rightContext 的值相同|
  |$n|匹配第 n 个捕获组的子字符串，其中 n 等于 0~9。如果正则表达式中没有定义捕获组，则使用空字符串|
  |$nn|匹配第 nn 个捕获组的子字符串，其中 nn 等于 01~99。如果正则表达式中没有定义捕获组，则使用空字符串|

  ```js
  let str = 'cat,bat,sat,fat'
  str.replace(/(.at)/g, 'word $1')   // "word cat,word bat,word sat,word fat"
  ```

  3）如果第二个参数是函数，在只有一个匹配项的情况下（即第一个参数为字符串），会向这个函数传递三个参数：模式的匹配项、模式匹配项在字符串中的位置、原始字符串。如果在第一个参数中定义了多个捕获组的情况下，传递给函数的参数依次为：模式的匹配项、第一个捕获组的匹配项，第二个捕获组的匹配项...、最后两个参数依然是模式的匹配项在字符串中的位置和原始字符串。

  ```js
  function htmlEscape (text) {
    return text.replace(/[<>"&]/g, function (match, pos, originalText) {
      switch (match) {
        case '<':
          return '&lt;';
        case '>':
          return '&gt;';
        case '&':
          return '&amp;';
        case '\"':
          return '&quot;';
      }
    })
  }

  htmlEscape('<p class=\"greeting\">Hello World!</p>')   // "&lt;p class=&quot;greeting&quot;&gt;Hello World!&lt;/p&gt;"
  ```

- `split()`

  该方法可以用指定的分隔符来将一个字符串分割成多个子字符串，并将结果放在数组中返回。

  该方法第一个参数可以是字符串，也可以是正则表达式。第二个参数用来指定数组的大小，可以确保返回的数组不会超过既定大小。

  ```js
  let colors = "red,blue,green,yellow"
  colors.split(',')   // ["red", "blue", "green", "yellow"]
  colors.split(',' 2)   // ["red", "blue"]
  colors.split(/[^\,]+/)   // ["", ",", ",", ",", ""]
  ```

- `localeCompare()`

  **不好用，不如直接用比较操作符（> = <）来比较**

  该方法用来比较两个字符串，根据以下情况做出返回值：

  1）如果要比较的字符串在字母表中应该排在被比较的字符串参数之前，则返回一个负数（多数情况为 -1）。

  2）如果要比较的字符串等于被比较的字符串参数，则返回 0 。

  3）如果要比较的字符串在字母表中应该排在被比较的字符串参数之后，则返回一个正数（多数情况为 1）。

  ```js
  'yin'.localeCompare('zi')   // -1
  'yin'.localeCompare('yin')   // 0
  'yin'.localeCompare('mu')   // 1
  ```

- `HTML 方法`

  **尽量不要用，因为无法表达语义且很多标签已经废弃了，了解即可。**

  以 js 代码的形式生成字符串格式的 html 标签。

  ```js
  'y'.anchor('z')   // "<a name="z">y</a>"
  'y'.big()   // "<big>y</big>"
  'y'.bold()   // "<bold>y</bold>"
  'y'.fixed()   // "<tt>y</tt>"
  'y'.fontcolor('#fff')   // "<font color="#fff">y</font>"
  'y'.fontsize('18px')   // "<font size="18px">y</font>"
  'y'.italics()   // "<i>y</i>"
  'y'.link('http://yinmu.me')   // "<a href="http://yinmu.me">y</a>"
  'y'.small()   // "<small>y</small>"
  'y'.strike()   // "<strike>y</strike>"
  'y'.sub()   // "<sub>y</sub>"
  'y'.sup()   // "<sup>y</sup>"
  ```

### 单体内置对象

指的是不必显示的实例化的对象，如 Object、Array、String。

这里重点讲解另外两种：Global 和 Math。

1. **Global 对象**

Global 对象可以说是 ECMAScript 中最特别的一个对象，因为不管怎么看，它都是不存在的。可以认为，不属于任何其他对象的属性和方法，都是它的属性和方法，所有全局作用域中定义的属性和方法，都是 Global 对象的属性。例如：`isNaN()`，`isFinite()`，`parseInt()` 和 `parseFloat()` 等。

在这里，我们将讲解一些其他的全局方法：

- `encodeURI()、encodeURIComponent()、decodeURI()、decodeURIComponent()`

  这四个方法都是用来处理 URI 编码和解码的。

  `encodeURI()` 主要用于整个 URI（例如：https://yinmu.me/docs/a b.html?id=1），它不会对其中的标准字符如冒号、斜杠、问号、井字号等都进行编码。
  
  `encodeURIComponent()` 主要用于对 URI 中的某一段进行编码，且会对它发现的任何非标准字符都进行编码。

  ```js
  encodeURI('https://yinmu.me/docs/a b.html?id=1')
  // "https://yinmu.me/docs/a%20b.html?id=1"  只对空格进行了编码

  encodeURIComponent('https://yinmu.me/docs/a b.html?id=1')
  // "https%3A%2F%2Fyinmu.me%2Fdocs%2Fa%20b.html%3Fid%3D1"  将所有的都进行了编码
  ```

  **实际项目中我们通常使用的是 `encodeURIComponent()`，只对 URI 后面的某些参数进行编码。**

  `decodeURI()` 只能解码 `encodeURI()` 进行的编码。

  `decodeURIComponent()` 可以对任何编码的都进行解码。

  > 这四个方法是用来替代 ES3 中的已经被废弃的 `escape()` 和 `unescape()` 的。

- `eval()`

  `eval()` 是整个 ECMAScript 语言中最强大的一个方法。它只接收一个参数，即要执行的 js 代码（字符串格式）。

  在 `eval()` 中创建的任何变量或函数都不存在提升，因为在解析代码的时候，他们只是一个字符串，只有当真正执行的时候，才会被插入到当前代码位置。但是 `eval()` 中的代码字符串可以引用外部所声明的变量或函数。

  ```js
  eval('function fn () { console.log(1) }')
  fn()   // 1
  ```

  **注：在严格模式下，在外部访问不到 eval() 中创建的任何变量或函数，且为 eval 赋值也会报错**

  ```js
  'use strict'

  eval('let a = 1')
  console.log(a)   // a is not defined

  eval = 'hello'   // Unexpected eval or arguments in strict mode
  ```

  > 因为 `eval()` 及其强大，所以在使用的时候必须谨慎，可能会有恶意用户输入危险代码（即代码注入）。

- `Global 对象的属性`

  |属性|说明|
  |:-:|:-:|
  |undefined|特殊值undefined|
  |NaN|特殊值NaN|
  |Infinity|特殊值Infinity|
  |Object|构造函数Object|
  |Array|构造函数Array|
  |Function|构造函数Function|
  |Boolean|构造函数Boolean|
  |String|构造函数String|
  |Number|构造函数Number|
  |Date|构造函数Date|
  |RegExp|构造函数RegExp|
  |Error|构造函数Error|
  |EvalError|构造函数EvalError|
  |RangeError|构造函数RangeError|
  |ReferenceError|构造函数ReferenceError|
  |SyntaxError|构造函数SyntaxError|
  |TypeError|构造函数TypeError|
  |URIError|构造函数URIError|

- `window 对象`

  Web 浏览器将 Global 这个全局对象作为 window 对象的一部分加以实现，因此全局作用域中声明的所有变量和函数，都成了 window 对象的属性。

2. **Math 对象**

与我们在 JavaScript 中直接编写计算功能相比，Math 对象所提供的计算功能执行起来要快得多。

- `Math 对象属性`

  Math 对象包含的属性大都是数据计算中可能会用到的一些特殊值。

  |属性|说明|
  |:-:|:-:|
  |Math.E|自然对数的底数，即常量e的值|
  |Math.LN10|10的自然对数|
  |Math.LN2|2的自然对数|
  |Math.LOG2E|以2为底e的对数|
  |Math.LOG10E|以10为底e的对数|
  |Math.PI|π的值|
  |Math.SQRT1_2|1/2的平方根（即2的平方根的倒数）|
  |Math.SQRT2|2的平方根|

- `min() 和 max()`

  两个方法都可以接收任意多的数值参数，来取出其中的最大值或最小值。

  ```js
  Math.min(3, 54, 36, 102)   // 3
  Math.max(3, 54, 36, 102)   // 102
  ```

  **此处有一个巧妙的方法，可以用来获取数组中数值的最大值和最小值：**

  ```js
  Math.max.apply(Math, [2, 5, 102, 44, 56])   // 102
  Math.min.apply(Math, [2, 5, 102, 44, 56])   // 2
  ```

- `ceil()、floor()、round()`

  这三个方法是用来对小数位进行舍入的方法。

  `Math.ceil()`执行向上舍入；`Math.floor()`执行向下舍入；`Math.round()`执行四舍五入。

- `random()`

  `Math.random()`返回大于等于 0 小于 1 的一个随机数。

  套用下面的公式，可以从某个整数范围内随机选择一个值：

  **值 = math.floor(Math.random() * 可能值的总数 + 第一个可能的值)**

  举个例子：

  ```js
  // 假设要获取 1-10 之间的随机一个整数
  const num = Math.floor(Math.random() * 10 + 1)

  // 假设要获取 2-9 之间的随机一个整数
  const num = Math.floor(Math.random() * 9 + 2)
  ```

  我们可以封装成一个固定的方法，来获取指定范围内的随机整数：

  ```js
  function selectFrom (lowerValue, upperValue) {
    const total = upperValue - lowerValue + 1
    return Math.floor(Math.random() * total + lowerValue)
  }

  selectFrom(2, 10)

  // 也可以从数组中随机取出一项
  const colors = ['red', 'yellow', 'gray', 'black', 'white', 'blue']
  const selectColor = colors[selectFrom(0, colors.length - 1)]
  ```

- `其他一些计算方法`

  |方法|说明|
  |:-:|:-:|
  |Math.abs(num)|返回num的绝对值|
  |Math.exp(num)|返回Math.E的num次幂|
  |Math.log(num)|返回num的自然对数|
  |Math.pow(num, power)|返回num的power次幂|
  |Math.sqrt(num)|返回num的平方根|
  |Math.acos(x)|返回x的反余弦值|
  |Math.asin(x)|返回x的反正弦值|
  |Math.atan(x)|返回x的反正切值|
  |Math.atan2(y,x)|返回y/x的反正切值|
  |Math.cos(x)|返回x的余弦值|
  |Math.sin(x)|返回x的正弦值|
  |Math.tan(x)|返回x的正切值|

  > 这些方法在不同的实现中可能会有不同的精度。

##  第 6 章：面向对象的程序设计

面向对象（Object-Oriented，OO）的语言有一个标志，就是它们都有类的概念，通过类可以创建任意多个具有相同属性和方法的对象。

ECMAScript 把对象定义为：无序属性的集合，其属性可以包含基本值、对象或函数。我们可以把 ECMAScript 的对象想象成散列表：一组组的键值对，其中值可以是数据或者函数。

### 理解对象

1. **属性类型**

ES5 在定义只有内部才用的特性时，描述了属性的各种特征，这些特性是为了 JavaScript 引擎用的，在我们平常的 js 代码中并不能直接访问它们。

ECMAScript 中有两种属性：数据属性和访问器属性。

1）数据属性

数据属性包含一个数据值的位置，在这个位置可以读取和写入值。数据属性有四种描述行为的特性：

- `[[Configurable]]`

  表示能否通过 delete 删除属性从而重新定义属性，能否修改属性的特性，或者能否把属性修改为访问器属性。我们默认手动创建的对象的属性，该特性值为 true。

- `[[Enumerable]]`

  表示能否通过 for-in 循环返回属性。我们默认手动创建的对象的属性，该特性值为 true。

- `[[Writable]]`

  表示能否修改属性的值。我们默认手动创建的对象的属性，该特性值为 true。

- `[[Value]]`

  这个属性的数据值。读取属性值时，从此位置读取；写入属性值时，把新值保存在这个位置。该特性默认值为 undefined。

**要修改属性的默认特性，必须使用 ES5 的 `Object.defineProperty()` 方法。该方法接收三个参数：属性所在的对象、属性的名字和一个描述符对象。其中描述符对象的属性必须是：`configurable` 、`enumerable` 、`writable` 、`value`。**

```js
let person = {}
Object.defineProperty(person, 'name', {
  writable: false,   // 规定了属性只读
  value: 'YinMu'   // 给出了值
})

console.log(person.name)   // 'YinMu'
person.name = 'xiaoqiang'  // 因为规定了该属性为只读的，在非严格模式下，赋值会被忽略，在严格模式下，会报错！
console.log(person.name)   // 'YinMu'
```

**注：如果我们将属性的 `configurable` 设置为 `false` ，则该属性除了 `writable` 之外的特性都无法再修改了。且如果用 `Object.defineProperty()` 创建一个对象的新属性，在不指定的情况下，`configurable` 、`enumerable` 、`writable` 特性的默认值都为 `false`。**

```js
let person = {}
Object.defineProperty(person, 'name', {
  writable: true,   // 规定了属性只读
  value: 'YinMu'   // 给出了值
})

console.log(person.name)   // 'YinMu'
delete person.name   // 未指定，configurable 默认值为 flase，此时执行 delete ，非严格模式下会被忽略，严格模式下会报错！
console.log(person.name)   // 'YinMu'
```

> IE8 是最早实现 Object.defineProperty() 的浏览器版本，但是该版本的实现存在诸多限制，只能在 DOM 对象上使用这个方法，而且只能创建访问器属性。且该方法无法被 hack ，所以这也是 Vue 2.x 不支持 IE8 的原因。

2）访问器属性

访问器属性不包含数据的值，它包含一对 getter 和 setter 函数（这两个函数并非必须）。在读取访问器属性时，会调用 getter 函数，这个函数负责返回有效的值；在写入访问器属性时，会调用 setter 函数并传入新值，这个函数负责决定如何处理数据。

访问器属性有四种特性：

- `[[Configurable]]`

  表示能否通过 delete 删除属性从而重新定义属性，能否修改属性的特性，或者能否把属性修改为数据属性。我们默认手动创建的对象的属性，该特性值为 true。

- `[[Enumerable]]`

  表示能否通过 for-in 循环返回属性。我们默认手动创建的对象的属性，该特性值为 true。

- `[[Get]]`

  在读取属性时调用的函数。特性值默认值为 undefined。

- `[[Set]]]`

  在写入属性时调用的函数。特性值默认值为 undefined。

**访问器属性不能直接定义，必须使用 `Object.defineProperty()` 来定义。**

```js
let book = {
  _year: 2004,   // 属性的前面加下划线，表示只能通过对象方法访问该属性。这是一种通用的约定。
  edition: 1
}

Object.defineProperty(book, 'year', {
  get: function () {   // 注意，此处不能用箭头函数，否则 this 将指向 window
    return this._year
  },
  set: function (newValue) {   // 注意，此处不能用箭头函数，否则 this 将指向 window
    this._year = newValue
    this.edition = newValue - 2004
  }
})

book.year = 2020
console.log(book.edition)   // 16
```

**注：不一定非得同时指定 getter 和 setter 。只指定 getter 函数特性意味着属性不能写，尝试写入属性则会被忽略，严格模式下会报错。如果只指定 setter 函数特性，则意味着属性不能读，尝试读，非严格模式下会返回 undefined ，严格欧式下会报错。**

2. **定义多个属性**

ES5 定义了 `Object.defineProperties()` 方法来通过描述符一次性定义多个属性。该方法接收两个参数，第一个参数为要添加和修改属性的对象，第二个参数为对象，其属性为要添加或修改的属性，且这些属性又对应各自的特性对象。

```js
let book = {}

Object.defineProperties(book, {
  _year: {
    writable: true,
    value: 2004
  },
  edition: {
    writable: true,
    value: 1
  },
  year: {
    get: function () {   // 注意，此处不能用箭头函数，否则 this 将指向 window
      return this._year
    },
    set: function (newValue) {   // 注意，此处不能用箭头函数，否则 this 将指向 window
      this._year = newValue
      this.edition = newValue - 2004
    }
  }
})
```

> 支持 Object.defineProperties() 方法的浏览器有：IE9+ 、Firefox 4+ 、Safari 5+ 、Opera 12+ 、Chrome 。

3. **读取属性的特性**

ES5 定义了 `Object.getOwnPropertyDescriptor()` 方法来获取给定属性的描述符。该方法接收两个参数，第一个参数为属性所在的对象，第二个参数要读取其描述符的属性名称。返回值为一个对象，如果是访问器属性，这个对象的属性有 `configurble` 、`enumerable` 、`get` 、`set` ；如果是数据属性，这个对象的属性有 `configurable` 、`enumerable` 、`writable` 、`value` 。

```js
let book = {}

Object.defineProperties(book, {
  _year: {
    writable: true,
    value: 2004
  },
  edition: {
    writable: true,
    value: 1
  },
  year: {
    get: function () {   // 注意，此处不能用箭头函数，否则 this 将指向 window
      return this._year
    },
    set: function (newValue) {   // 注意，此处不能用箭头函数，否则 this 将指向 window
      this._year = newValue
      this.edition = newValue - 2004
    }
  }
})

const descriptor1 = Object.getOwnPropertyDescriptor(book, '_year')
console.log(descriptor1)   // {value: 2004, writable: true, enumerable: false, configurable: false}

const descriptor2 = Object.getOwnPropertyDescriptor(book, 'year')
console.log(descriptor2)   // {enumerable: false, configurable: false, get: ƒ, set: ƒ}
```

> 支持 Object.getOwnPropertyDescriptor() 方法的浏览器有：IE9+ 、Firefox 4+ 、Safari 5+ 、Opera 12+ 、Chrome 。

### 创建对象

虽然 Object 构造函数和对象字面量都可以用来创建单个对象，但这些方式有个缺点：使用同一个接口创建很多对象，会产生大量的重复代码。比如创建一个拥有 name 属性的对象，要不停的重复创建，代码很冗余。

1. **工厂模式**

因为在 ECMAScript 中无法创建类（ES6 已经可以了），于是开发人员就发明了一种函数，用函数来封装以特定接口创建对象的细节。

```js
function createPerson (name, age, job) {
  const o = new Object()
  o.name = name
  o.age = age
  o.job = job
  o.sayName = function () {
    console.log(name)
  }
  return o
}

const xiaohua = createPerson('xiaohua', 12, 'student')
const xiaoqiang = createPerson('xiaoqiang', 13, 'student')
```

工厂模式虽然解决了创建多个相似对象的问题，但却没有解决对象识别的问题（即怎样知道一个对象的类型，它具体是谁的实例）。

2. **构造函数模式**

我们使用构造函数模式重写上一小节的例子：

```js
function Person (name, age, job) {
  this.name = name
  this.age = age
  this.job = job
  this.sayName = function () {
    console.log(this.name)
  }
}

const xiaohua = new Person('xiaohua', 12, 'student')
const xiaoqiang = new Person('xiaoqiang', 13, 'student')
```

我们可以看到，Person() 中的代码除了与 createPerson() 中有相同的部分外，还存在以下不同之处：

- 没有显示地创建对象
- 直接将属性和方法赋给了 this 对象
- 没有 return 语句

> **此外，函数名 Person 采用大驼峰方式。按照惯例，构造函数始终都应该以一个大写字母开头，而非构造函数则应该以一个小写字母开头。这种做法借鉴自其它 OO 语言，主要是为了区别普通函数，因为构造函数本身也是函数，只不过是专门用来创建对象的而已。**

要创建 Person 的新实例，必须使用 `new` 操作符。以这种方式调用构造函数实际上会经历以下 4 个步骤：

1）创建一个新对象

2）将构造函数的作用域赋给新对象（因此 this 指向了这个新对象）

3）执行构造函数中的代码（为这个新对象添加属性）

4）返回新对象

面试题：手写一个 new 函数，我们将所要 new 的类传入，并最终返回这个类的一个实例。

```js
function DemoFn (name) {
  this.name = name
}
DemoFn.prototype.say = function () {
  console.log(this.name)
}

// 要实现的效果：myNew(A, 'xiaohua')

function myNew (Fn, ...args) {
  const o = {}
  o.__proto__ = Fn.prototype
  Fn.call(o, ...args)
  return o
}

// 或者

function myNew (Fn, ...args) {
  const o = Object.create(Fn.prototype)   // 使用指定的原型对象及其属性去创建一个新的对象
  Fn.call(o, ...args)   // 绑定 this 到obj, 设置 obj 的属性
  return o
}

// 或者

function myNew (Fn, ...args) {
  const o = {}
  Object.setPrototypeOf(o, Fn.prototype)
  Fn.call(o, ...args)
  return o
}
```

**每个对象都会有一个 constructor 属性，用来标识对象类型，指向创建该对象的构造函数。**

对于上面例子创建的两个对象：

```js
console.log(xiaohua.constructor === Person)   // true
console.log(xiaoqiang.constructor === Person)   // true
```

**但是对于检测对象类型，还是 instanceof 更靠谱！**

我们例子创建的对象，既是 Object 的实例，又是 Person 的实例：

```js
console.log(xiaohua instanceof Person)   // true
console.log(xiaohua instanceof Object)   // true
```

创建自定义的构造函数意味着将来可以将它的实例标识为一种特定的类型，而这也正是构造函数模式胜过工厂模式的地方。

拓展：

- **将构造函数当做函数**

  构造函数与普通函数的唯一区别，就在于调用的方式不同。且构造函数也是函数，不存在定义构造函数的特殊语法。任何函数，只要通过 new 操作符来调用，那它就是构造函数；任何函数，如果不通过 new 操作符来调用，那它就是普通函数。

  ```js
  // 当做构造函数使用
  const xiaoli = new Person('xiaoli', 25, 'teacher')
  xiaoli.sayName()   // 'xiaoli'

  // 作为普通函数调用
  Person('xiaoli', 25, 'teacher')   // 因为构造函数是在全局作用域下定义的，此时添加到了 window 对象上
  window.sayName()   // 'xiaoli'

  // 在另一个对象的作用域中调用
  const o = new Object()
  Person.call(o, 'xiaoli', 25, 'teacher')
  o.sayName()   // 'xiaoli'
  ```

- **构造函数的问题**

  使用构造函数模式的主要问题，就是每个方法都要在每个实例上重新创建一遍。

  在前面的例子中，xiaohua 和 xiaoqiang 都有一个名为 sayName() 的方法，但这两个方法并不是同一个 Function 实例，因为在 ECMAScript 中函数时对象，每次定义一个函数，就是实例化了一个对象。等同于如下代码：

  ```js
  function Person (name, age, job) {
    this.name = name
    this.age = age
    this.job = job
    this.sayName = new Function('console.log(this.name)')
  }
  ```

  因此，不同实例上的同名函数时不相等的。

  ```js
  console.log(xiaohua.sayName === xiaoqiang.sayName)   // false
  ```

  当然，我们可以把函数定义到构造函数外部来解决这方法：

  ```js
  function Person (name, age, job) {
    this.name = name
    this.age = age
    this.job = job
    this.sayName = sayName
  }

  function sayName () {
    console.log(this.name)
  }

  const xiaohua = new Person('xiaohua', 12, 'student')
  const xiaoqiang = new Person('xiaoqiang', 13, 'student')
  ```

  这样确实解决了构造函数模式所带来的的弊端，但是又产生了新的弊端：在全局作用域中定义的函数实际上只能被某个对象调用，让全局作用域名不副实；而且如果对象需要定义很多方法，那就要定义很多个全局函数，这就没有丝毫封装性可言了。

3. **原型模式**

我们创建的每个**函数（并非对象）**都有一个 `prototype`（原型）属性，这个属性是一个指针，指向一个对象，而这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法。也就是说，prototype 就是通过调用构造函数而创建的那个实例对象的原型对象。

使用原型模式的好处是可以让所有的对象实例共享它们包含的属性和方法，也就是说，不必在构造函数中定义对象实例的信息，而是可以将这些信息直接添加到原型对象中。

```js
function Person () {}

Person.prototype.name = 'xiaohua'
Person.prototype.age = 12
Person.prototype.job = 'student'
Person.prototype.sayName = function () {
  console.log(this.name)
}

const person1 = new Person()
const person2 = new Person()

console.log(person1.sayName === person2.sayName)   // true
```

在此，我们将 sayName() 方法以及其他属性直接添加到了 Person 的 prototype 属性中，构造函数变成了空函数。我们同样可以调用构造函数来创建对象，而且新对象还会具有相同的属性和方法。但是与构造函数欧式不同的是，新对象 Person 的这些属性和方法是由所有实例共享的。

拓展：

- **理解原型对象**

  **无论什么时候，只要创建了一个新函数，就会根据特定的规则为该函数创建一个 prototype 属性，这个属性的值（对象）就是函数的原型对象。在默认情况下，所有原型对象都会自动获得一个 constructor (构造函数)属性，这个属性是一个指向 prototype 属性所在的函数的指针，也就是说 Person.protytype.constructor 指向 Person 。**而通过这个构造函数，我们就可以继续为原型对象添加其他属性和方法。

  ```js
  function Person () {}

  // 这个 Person.prototype 玩意就是原型对象，一定不要混淆概念！！！！
  console.log(Person.prototype)
  // Person.prototype   
  // > constructor: ƒ Person()   // 原型对象默认该有的属性
  // > __proto__: Object   // 这些都是从 Object 继承过来的
  ```

  **创建了自定义的构造函数之后，其原型对象默认只会取得 constructor 属性，至于其他方法，都是从 Object 继承而来的。**

  **当调用该构造函数创建一个新实例后，该实例的内部将包含一个指针（内部属性），指向构造函数的原型对象。**ES5 中管这个指针叫做 `[[Prototype]]` ，**虽然在脚本中没有标准的方式访问该指针，但 Firefox 、Safari 、Chrome 在每个对象上都支持一个属性 `__proto__` ，而在其他的实现中，则是不可见的。**

  要注意的一点就是：**这个连接存在于实例与构造函数的原型对象之间，而并非存在于实例与构造函数之间。**

  ![](https://yinmu.me/docs/images/js_1584282210244.jpeg)

  虽然在所有的视线中都无法直接访问 `[[Prototype]]`，但可以通过 `isPrototypeOf()` 方法来确定对象之间是否存在这种关系。如果 `[[Prototype]]` 指向调用 `isPrototypeOf()` 方法的对象（Person.prototype），那么就会返回 `true` 。

  ```js
  // 依附上面的例子
  Person.prototype.isPrototypeOf(person1)   // true
  Person.prototype.isPrototypeOf(person2)   // true
  ```

  ES5 新增了一个方法 `Object.getPrototypeOf()` ，在所有支持的实现中，这个方法返回 `[[Prototype]]` 的值。

  ```js
  Object.getPrototypeOf(person1) === Person.prototype   // true
  Object.getPrototypeOf(person1).sayName()   // 'xiaohua'
  ```

  查找机制：

  当代码读取某个对象的属性的时候，会执行一次搜索，目标是指定名字的属性。搜索首先从对象实例本身开始，如果实例中找到了该属性，则返回该属性的值，如果没有找到，则继续搜索指针指向的原型对象，在原型对象中查找具有给定名字的属性。比如上例中我们调用的 sayName() 方法，其实就是调用的 person1 的原型对象上的方法。

  > 原型（Person.prototype）开始创建的最初只包含 contructor 属性，该属性也是共享的，所以可以通过对象实例访问。

  虽然我们可以在实例中访问原型对象中的值，但却不能通过对象实例重写原型中的值（但我们可以直接修改原型对象的属性，比如通过 __proto__ 或者 setPrototypeOf()）。如果一个实例具有与原型对象相同的属性，读取的时候，会忽略原型对象里面的属性值，这个从查找机制就能看出来。

  当为一个对象添加一个属性时，这个属性会屏蔽原型对象中保存的同名属性，也就是说，添加这个属性会阻止我们访问原型中的那个属性，但不会修改那个属性。即使把新添属性值设为 null，也只会在实例中设置，我们依然无法访问原型对象中的同名属性（强制 __proto__ 这种不算）。我们可以使用 `delete 操作符`完全删掉该属性，从而让我们可以访问到原型对象中的同名属性。
  
  ```js
  function Person () {}

  Person.prototype.name = 'xiaohua'
  Person.prototype.age = 12
  Person.prototype.job = 'student'
  Person.prototype.sayName = function () {
    console.log(this.name)
  }

  const person1 = new Person()
  console.log(person1.name)   // 'xiaohua'
  person1.name = 'huahua'
  console.log(person1.name)   // 'huahua'
  console.log(Person.prototype.name)   // 'xiaohua'

  delete person1.name
  console.log(person1.name)   // 'xiaohua'
  ```

  使用 `hasOwnProperty()` 方法可以检测一个属性是存在于实例中还是原型中，只有给定属性存在于实例中，才会返回 `true` 。

  ```js
  const person1 = new Person()
  console.log(person1.name)   // 'xiaohua' 原型中属性
  person1.hasOwnProperty('name')   // false
  person1.name = 'huahua'
  person1.hasOwnProperty('name')   // true
  ```

  ES5 中，获取对象某个属性的描述符特性的方法 Object.getOwnPropertyDescriptor() 方法只能用于实例属性，如果要取得原型属性的描述符，则必须在原型对象上调用。

  ```js
  const person1 = new Person()
  const person2 = new Person()
  console.log(person1.name)   // 'xiaohua' 原型中属性
  person1.name = 'huahua'

  Object.getOwnPropertyDescriptor(person1, 'name')   // {value: "huahua", writable: true, enumerable: true, configurable: true}

  Object.getOwnPropertyDescriptor(person2, 'name')   // undefined

  Object.getOwnPropertyDescriptor(Person.prototype, 'name')   // {value: "xiaohua", writable: true, enumerable: true, configurable: true}
  ```

- **原型与 in 操作符**

  `in` 操作符有两种使用方法：单独使用和在 for-in 循环中使用。

  **单独使用时，`in` 操作符会在通过对象能够访问到给定属性时返回 `true` ，而无论该属性是存在于实例中还是原型对象中。**

  而 `hasOwnProperty()` 只有该属性存在于实例上时才返回 `true` ，所以结合两者，可以判定一个属性是否存在于原型对象上。

  ```js
  function hasPrototypeProperty (object, name) {
    // 如果一个属性不存在于自身实例上，但是可以访问到，那就说明一定存在于其原型对象上。
    return !object.hasOwnProperty(name) && (name in object)
  }

  function Person () {}

  Person.prototype.name = 'xiaohua'
  Person.prototype.age = 12
  Person.prototype.job = 'student'
  Person.prototype.sayName = function () {
    console.log(this.name)
  }

  const person1 = new Person()
  const person2 = new Person()

  person1.hasOwnProperty('name')   // false
  'name' in person1   // true 来自原型

  person1.name = 'huahua'
  person1.hasOwnProperty('name')   // true
  'name' in person1   // true 来自自身

  hasPrototypeProperty(person1, 'name')   // false 因为在实例中定义了属性 name
  hasPrototypeProperty(person2, 'name')   // true 在实例中没有 name 属性，但在原型中有
  ```