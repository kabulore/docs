---
sidebar: auto
footer: MIT Licensed | Made with Yinmu
---

# 《你不知道的 JavaScript》

> 作者：Kyle Simpson [美]

## 第一部分：作用域与闭包

### 第 1 章：作用域是什么

几乎所有的编程语言最基本的功能之一，就是能够存储变量的值，并且在之后能对其访问和修改。我们需要设计一套良好的规则来存储变量，并且之后能方便的找到这些变量，这套规则就叫做作用域。

**1.1 编译原理**

在传统编译语言的流程中，程序中的一段源代码在执行之前会经历三个步骤，统称为“编译”。

- 分词/词法分析（Tokenizing/Lexing）

  这个过程将字符组成的字符串分解成有意义的代码块，这些代码块被称为词法单元（token）。比如 `var a = 2;` 会被分解为 `var`、`a`、`=`、`2`、`；`。空格是否作为词法单元，取决于空格在这门语言中是否有意义。

- 解析/语法分析（Parsing）

  这个过程是将词法单元流（数组）转换成一个由元素逐级嵌套所组成的代表了程序语法结构的树。这个树被称为“抽象语法树”（Abstract Syntax Tree，AST）。

- 代码生成

  将 AST 转换成可执行代码的过程被称为代码生成。

对比那些编译过程只有以上三个步骤的语言的编译器，JavaScript 引擎要复杂的多。例如，在词法分析和代码生成阶段有特定的步骤来对运行性能进行优化，包括冗余元素进行优化等。

**1.2 理解作用域**

- 引擎

  从头到尾负责整个 JavaScript 程序的编译及执行过程

- 编译器

  负责语法分析及代码生成等。

- 作用域

  负责收集并维护所有声明的标识符（变量）组成的一系列查询，并实施一套非常严格的规则，确定当前执行的代码对这些标识符的访问权限。

以 `var a = 2;` 为例，当编译器遇到 `var a` 的时候，会先去查找作用域链中是否已经声明了 `a` 变量，如果是，编译器会忽略该声明，继续进行编译；否则它会要求作用域在当前作用域下的集合中声明一个新的变量，并命名为 `a`。接下来处理 `a = 2;` 的操作，会向作用域链中查找 `a` 变量并赋值，如果找不到，就会抛出异常。

编译器在进行赋值操作的时候，会根据赋值操作的目标和源数据分成两种查询机制：LHS 和 RHS 。对于位于赋值操作左侧的，执行 LHS 查询机制，而处理源数据的的，则执行 RHS 查询机制。

**1.3 作用域链**

当要查找一个变量的时候，首先会在当前作用域下进行查找，如果找不到，则向包含当前作用域的父级作用域进行查找，再找不到，则再向上一个父级查找，这样一层层的，就形成了作用域链。当找到这个变量的定义或找到全局作用域下还是没找到的时候，就停止查找。

**1.4 异常**

如果找遍整个作用域链都无法找到该变量的声明，则会抛出 ReferenceError 异常（此处忽略隐式创建全局变量的情况）。

如果找到了该变量，但是对该变量进行了一些不合理的操作，则会抛出 TypeError 异常。

### 第 2 章：词法作用域

作用域一共分为两种，大多数编程语言所使用的都是词法作用域，还有一种叫做动态作用域，比如 Bash 脚本、Perl 中的一些模式等在使用。

**2.1 词法阶段**

词法作用域就是定义在词法阶段的作用域，是由你在写代码时将变量和块作用域写在哪里来决定的，因此当词法分析器处理代码时会保持作用域不变（大部分情况是这样）。

```js
function foo(a) {
  var b = a * 2
  function bar(c) {
    console.log(a, b, c)
  }
  bar(b * 3)
}
foo(2)   // 2, 4, 12
```

以上面代码为例：顶级作用域包含着 foo；下一层作用域位于 foo 函数体内部，包含着 a、b、bar；再下一层作用域，包含着 c。

作用域查找会在找到第一个匹配的标识符的时候停止。在多层嵌套的作用域中可以定义同名的标识符，这叫做“遮蔽效应”，即内部的标识符会“遮蔽”了外部的标识符。

全局变量会自动成为全局对象（浏览器环境中的 window）的属性，可以通过访问全局对象属性的方式找到这些全局变量。但非全局作用域的变量如果被遮蔽了，在当前作用域下就无法访问到了。

对于函数来说，无论函数在哪里被调用，也无论它如何被调用，它的词法作用域都只由函数声明时所处的位置决定。

词法作用域只会查找一级标识符，比如 a 、b ，如果代码中引用了某个变量的属性（如 a.b ），则只会查找该标识符 a，找到该变量后，对象属性访问规则会接管对其属性 b 的访问。

**2.2 欺骗词法**

如果在代码运行时修改了词法作用域，这种操作也叫做欺骗词法作用域。JavaScript 中有两种方法可以实现。一种是 eval ，另一种是 with 。

欺骗词法作用域会导致性能下降，实际代码中不推荐使用。

- `eval`

  eval 可以接收一个字符串为参数，并将其中的内容作为要执行的代码执行在该位置。需要注意的是，在严格模式下，eval 在运行时有自己的词法作用域，所以无法修改当前作用域。

- `with`

  with 通常被用来作为重复引用一个对象中多个属性的快捷方式，可以不需要重复引用对象本身。

  尽管 with 可以将一个对象处理为词法作用域，但是这个块内部正常的 var 声明并不会被限制在这个块的作用域中，而是被添加到 with 所处的作用域中。

由于 JavaScript 引擎在编译阶段会进行很多的性能优化，其中有些优化依赖于能够根据代码的词法进行静态分析，预先确定所有变量和函数的定义位置，才能在执行过程中快速的找到所需要的标识符。如果大量使用 eval 和 with ，会让引擎的这些优化完全无效，所以极度影响性能。

### 第 3 章：函数作用域和块作用域

作用域一共分为两种，大多数编程语言所使用的都是词法作用域，还有一种叫做动态作用域，比如 Bash 脚本、Perl 中的一些模式等在使用。

**3.1 函数中的作用域**

函数作用域的含义是指，属于这个函数的全部变量都可以在整个函数的范围内（包括其子作用域）使用及复用。

**3.2 隐藏内部实现**

如果我们把一些代码块用函数进行包装，那么外部是无法访问其内部变量的，也就等于把这些代码块隐藏起来了。

这个被常用作于软件设计中的最少知识原则（LKP），即在软件设计的过程中，一个实体要尽可能少的与其他实体发生相互作用。

还有一个好处就是可以规避命名冲突。

**3.3 函数作用域**

立即执行函数表达式（IIFE：IMmediately Invoked Function Expression）有两种方式：`(function(){})()` 或者 `(function(){}())`，第二种方式更为常用。

在 UMD(Universal Module Definition) 模式中被广泛使用：

```js
(function(root, factory){})(this, function(){})
```

其实就是一种高阶函数的运用。

**3.4 块作用域**

在 ES5 中，`with`、`try...catch 中的 catch 分句` 以及函数都会创建一个块级作用域。

在 ES6 中，每个 `{}` 就是一个块级作用域。

### 第 4 章：提升

包含变量和函数在内的所有声明（仅限 var 和 function，不包括 let 和 const）都会在任何代码被执行前首先处理。声明会在编译阶段就处理，而赋值则会等到执行阶段。

函数声明会被提升，但函数表达式不会被提升。

在重复声明的代码中，函数首先会被提升，然后才是变量。

```js
foo()

var foo

function foo() {
  console.log(1)
}

foo = function() {
  console.log(2)
}
```

以上代码运行结果是 1，而不是 2。

var 的声明被提升，后续如果又 var 了同名变量，会被忽略。但是函数不这样，函数的提升是 声明 + 赋值，后续遇到同名函数，依然是 声明 + 赋值，会覆盖之前声明的函数。

```js
foo()

funtion foo() {
  console.log(1)
}

var foo = function() {  // 注意，这个是函数表达式，函数的声明并不会被提升
  console.log(2)
}

function foo() {
  console.log(3)
}
```

以上代码运行结果为 3 ，因为后续的函数声明将前面的给覆盖了。

### 第 5 章：作用域闭包

当在一个函数的作用域外部访问了这个函数作用域内部的变量，就生成了闭包。

我们来玩一个有意思的例子：

```js
var data = []
for (var i = 0; i < 3; i++) {
  data[i] = function () {
    console.log(i)
  }
}
// 对其进行一些改造
// 使得 data[i]() 的执行结果等于 i
```

如果我们不进行改造，那么以上代码不管是 data 数组的第几项执行，打印结果都为 3。

接下来我们用一些方法来实现：

```js
// 第一种
var data = []
for (var i = 0; i < 3; i++) {
  (function (i) {
    return data[i] = function () {
      console.log(i)
    }
  })(i)
}

// 第二种
var data = []
for (var i = 0; i < 3; i++) {
  (data[i] = function() {
    console.log(arguments.callee.i)   // arguments.callee 已经被弃用，现实中不应该在使用它，严格模式下也会报错。
  }).i = i
}

// 第三种
var data = []
for (let i = 0; i < 3; i++) {
  data[i] = function () {
    console.log(i)
  }
}
```

## 第二部分：this 和对象原型

### 第 1 章：关于 this

this 不指向函数本身，也不指向函数的词法作用域。

this 是在运行时绑定的，它的绑定与函数声明的位置没有关系，只取决于函数的调用方式。当一个函数被调用时，会创建一个执行上下文 EC ，this 就是这个 EC 的一个属性，会在函数执行的过程中用到。

### 第 2 章：this 全面解析

**2.1 调用位置**

要想弄明白 this 到底指向的什么，就去分析调用栈，要先去分析当前的调用栈所在的作用域。

```js
var name = 0
function foo () {
  var name = 1
  console.log(this.name)
}
foo()   // 0 当前调用栈是 foo ，当前调用栈所在的作用域为全局作用域
```

**2.2 绑定规则**

- 默认绑定

  当函数独立调用的时候，就会使用该规则，默认绑定 this 在非严格模式下会绑定到 window 上，在严格模式下为 undefined 。

- 隐式绑定

  当函数的调用中包含上下文的时候，会执行隐式绑定。

  ```js
  var a = 0

  function foo() {
    console.log(this.a)
  }

  var obj = {
    a: 1,
    foo: foo
  }

  obj.foo()   // 1
  ```

  或者

  ```js
  var a = 0

  var obj = {
    a: 1,
    foo: function() {
      console.log(this.a)
    }
  }

  obj.foo()   // 1
  ```

  需要明确的一点就是，虽然将 obj 的对象的引用赋值为一个函数，但从严格意义上来说，这个函数都不属于这个对象。但是当我们使用 obj.foo() 来调用的时候，obj 对象拥有了该函数的引用，所以 this.a 等价于 obj.a 。

  再看个例子：

  ```js
  var a = 0

  var obj1 = {
    a: 1,
    foo: function() {
      console.log(this.a)
    }
  }

  var obj2 = {
    a: 2,
    obj1: obj1
  }

  obj2.obj1.foo()   // 1 
  ```

  这种情况需要注意，在对象的引用中，只有最后一层在调用中起作用，所以 foo() 里的 this 还是指向的 obj1 。

  再来看一种隐式丢失情况：

  ```js
  var a = 0

  var obj = {
    a: 1,
    foo: function() {
      console.log(this.a)
    }
  }

  var bar = obj.foo

  bar()   // 0
  ```

  上面这种情况，其实已经丢失了 obj 对象的引用，所以 this 又进行了默认绑定，指向了 window 。

  还有一种情况跟上例是一样的道理，就是函数在作为回调函数传入的时候：

  ```js
  var a = 0

  var obj = {
    a: 1,
    foo: function() {
      console.log(this.a)
    }
  }

  function doFn(fn) {
    fn()
  }

  doFn(obj.foo)   // 0  传入的也只是 foo 函数的引用，已经丢失了对象的引用。
  ```

- 显示绑定

  使用 call 、apply 或 bind 来手动绑定函数执行上下文。如果我们在调用这些方法时传入的是普通值（字符串类型、布尔类型或者数字类型），那么这个普通值会被转换成它的对象形式（new String() 、new Boolean() 或者 new Number()）。

- new 绑定

  ```js
  var a = 0

  function Foo(a) {
    this.a = a
  }

  var bar = new Foo(1)

  console.log(bar.a)   // 1
  ```

**2.3 优先级**

new 绑定 > 显示绑定 > 隐式绑定 > 默认绑定

所以我们可以总结一下判断 this 指向的规则：

- 1）函数是否通过 new 调用？如果是的话，this 指向新创建的实例。

- 2）函数是否通过 call、apply 或者 bind 绑定调用？如果是，this 指向绑定的对象。

- 3）函数是否在某个上下文对象中调用？如果是，this 指向该上下文对象。

- 4）使用默认绑定，在非严格模式下 this 指向 window ，严格模式下 this 为 undefined 。

**2.4 绑定例外**

如果把 null 或者 undefined 作为 this 的绑定对象传入到 call 、apply 或者 bind 方法中，这些值在调用的时候会被忽略，实际上应用的是默认绑定规则。

```js
var a = 0

var obj = {
  a: 1,
  foo: function() {
    console.log(this.a)
  }
}

obj.foo.call(null)   // 0  执行了默认绑定
```

还有一种情况需要注意，就是在间接引用的时候：

```js
var a = 0

var obj1 = {
  a: 1,
  foo: function() {
    console.log(this.a)
  }
}

var obj2 = {
  a: 2
}

obj2.foo = obj1.foo

obj2.foo()   // 2  此处 foo 调用的时候，上下文仍然是 obj2

// 注意下面的情况

var a = 0;

var obj1 = {
  a: 1,
  foo: function() {
    console.log(this.a);
  }
};

var obj2 = {
  a: 2
};

(obj2.foo = obj1.foo)();   // 0  这个时候，obj2.foo 只是把 foo 函数引过来执行，并没有绑定上下文
```

**2.5 箭头函数的 this 指向**

箭头函数并不适用以上四种绑定规则。

箭头函数的指向取决于外层作用域，且一旦绑定无法被修改（new 、call 等都无效）。

```js
var a = 0;

var obj1 = {
  a: 1,
  foo: () => {
    console.log(this.a);
  }
};

obj1.foo()   // 0  当前执行所在的作用域为全局，且全局的 a = 0 所以输出 0

(function () {
  this.a = 3
  return obj1.foo()
})();   // 3  当前执行所在的作用域为块级作用域，且该作用域内的 a = 3 所以输出 3  
```

### 第 3 章：对象

`null` 其实属于基本数据类型，但是执行 `typeof null` 结果会是 `'object'`。这是因为在 JavaScript 中，对象在底层的表示为二进制，且如果二进制前三位都为 0 就会判定为是 object 类型，而 null 恰巧它的二进制是全 0 ，所以就把它当成了 object ，这其实是个 bug 。

基本数据类型并不是对象，所谓的 “JavaScript 中万物皆对象” 是错误的！

### 第 4 章：混合对象“类”

掌握类的概念，及多态，继承，混入等。JavaScript 中没有真正意义上的类。

### 第 5 章：原型

in 操作符可以检查整条原型链。

**5.1 属性设置与屏蔽**

给一个对象设置属性并不仅仅是添加一个新属性或者修改已有的属性那么简单。假设我们需要设置 `myObject` 对象上的 `foo` 属性值为 `"bar"` ，即 `myObject.foo = "bar"`。

我们分别配合例子来探究一下完整的过程：

- 如果 myObject 对象中包含名为 foo 的普通数据访问属性，这条赋值语句只会修改已有的属性值。

  ```js
  var grandpa = {
    x: 1
  }

  var father = Object.create(grandpa)

  var myObject = Object.create(father)

  myObject.foo = function () {}

  console.log(myObject.foo)   // f (){}

  myObject.foo = 'bar'

  console.log(grandpa.foo)   // undefined
  console.log(father.foo)   // undefined
  console.log(myObject.foo)   // bar
  ```

- 如果 foo 不是直接处在于 myObject 中，会遍历原型链，如果原型链上找不到 foo ，则会直接把该属性添加到 myObject 中并赋值。

  ```js
  var grandpa = {
    x: 1
  }

  var father = Object.create(grandpa)

  var myObject = Object.create(father)

  myObject.foo = 'bar'

  console.log(grandpa.foo)   // undefined
  console.log(father.foo)   // undefined
  console.log(myObject.foo)   // bar
  ```

- 如果 foo 属性既存在于 myObject 中，又存在于原型链中，则会发生屏蔽。myObject 中的 foo 属性会屏蔽原型链中的 foo 属性。

  ```js
  var grandpa = {
    x: 1,
    foo: 123
  }

  var father = Object.create(grandpa)

  var myObject = Object.create(father)

  myObject.foo = 'bar'

  console.log(grandpa.foo)   // 123
  console.log(father.foo)   // 123
  console.log(myObject.foo)   // bar
  ```

- 如果 foo 不直接存在于 myObject 中而是存在于原型链上层时，将会分为以下三种情况：

  1）如果在原型链上层存在名为 foo 的普通数据访问属性并且没有被标记为只读（writable: false），那么就会在 myObject 中添加一个名为 foo 的属性，它是屏蔽属性。

  ```js
  var grandpa = {
    x: 1,
  }

  Object.defineProperty(grandpa, 'foo', {
    value: 123,
    writable: true
  })

  var father = Object.create(grandpa)

  var myObject = Object.create(father)

  myObject.foo = 'bar'

  console.log(grandpa.foo)   // 123
  console.log(father.foo)   // 123
  console.log(myObject.foo)   // bar
  ```

  2）如果在原型链上层存在名为 foo 的普通数据访问属性并且被标记为只读（writable: false），那么无法修改已有的属性或者在 myObject 上创建屏蔽属性。如果运行在严格模式下，会抛出一个错误。在非严格模式下，该条赋值语句会被忽略。

  ```js
  var grandpa = {
    x: 1,
  }

  Object.defineProperty(grandpa, 'foo', {
    value: 123,
    writable: false
  })

  var father = Object.create(grandpa)

  var myObject = Object.create(father)

  myObject.foo = 'bar'   // 非严格模式下该条语句被忽略；严格模式下抛错：TypeError: Cannot assign to read only property 'foo' of object '#<Object>'

  console.log(grandpa.foo)   // 123
  console.log(father.foo)   // 123
  console.log(myObject.foo)   // 123

  Object.defineProperty(myObject, 'foo', {
    value: 'bar'
  })

  console.log(myObject.foo)   // bar 这样可以赋值成功

  myObject.foo = 'panda'

  console.log(myObject.foo)   // bar  注意，这样还是赋值不成功

  Object.defineProperty(myObject, 'foo', {   // 注意，这行会报错：TypeError: Cannot redefine property: foo ，不允许重复用此方法设置同一个属性的值
    value: 'panda'
  })

  myObject.foo = 'shit'

  console.log(myObject.foo)   // 已经执行不到这里了
  ```

  注意，这样规定只是为了模拟类的继承，父类的属性如果设置了只读，那继承到子类自然也只能只读，虽然实质上并没有发生继承。更奇葩的是这个限制只存在于 = 赋值操作符，如果使用 Object.defineProperty() 并不会受影响。

  如果我们重写了 foo 属性的 writable 特性，则又可以赋值了：

  ```js
  var grandpa = {
    x: 1,
  }

  Object.defineProperty(grandpa, 'foo', {
    value: 123,
    writable: false
  })

  var father = Object.create(grandpa)

  var myObject = Object.create(father)

  myObject.foo = 'bar'   // 非严格模式下该条语句被忽略；严格模式下抛错：TypeError: Cannot assign to read only property 'foo' of object '#<Object>'

  console.log(grandpa.foo)   // 123
  console.log(father.foo)   // 123
  console.log(myObject.foo)   // 123

  Object.defineProperty(myObject, 'foo', {   // 注意，如果我们修改了 writable 特性改为非只读，就又可以 = 赋值了
    value: 'panda',
    writable: true   // 不允许修改
  })

  console.log(myObject.foo)   // panda

  myObject.foo = 'shit'

  console.log(myObject.foo)   // 已经执行不到这里了
  ```

  3）如果在原型链上层存在 foo 且它是一个 setter ，那它一定会调用这个 setter。foo 不会被添加到 myObject 上，也不会重新定义 foo 这个 setter 。

  ```js
  var grandpa = {
    x: 1,
    get foo() {
      return this._foo_
    },
    set foo(val) {
      this._foo_ = 'hello:' + val
    }
  }

  var father = Object.create(grandpa)

  var myObject = Object.create(father)

  myObject.foo = 'bar'   // 执行 foo setter

  console.log(grandpa.foo)   // undefined
  console.log(father.foo)   // undefined
  console.log(myObject.foo)   // hello:bar
  ```

有些情况下会隐式产生屏蔽，需要当心：

```js
var father = {
  x: 1,
}

var myObject = Object.create(father)

console.log(father.hasOwnProperty('x'))   // true
console.log(myObject.hasOwnProperty('x'))   // false

myObject.x++   // 此处会隐式的在 myObject 中创建 x 属性

console.log(father.x)   // 1
console.log(myObject.x)   // 2

console.log(father.hasOwnProperty('x'))   // true
console.log(myObject.hasOwnProperty('x'))   // true
```

**5.2 类**