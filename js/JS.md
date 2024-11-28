<samp>

# Topics

- 'this'
- Prototypal Inheritance
- IIFE
- Closure
- Null vs undefined
- Loop vs Map
- call & apply
- Hoisting
- Event Delegation
- Attribute vs Properties
- Ternary Operators
- Promises vs Callbacks
- Single Page Applications
- JS Frameworks
- Higher-Order
- Storage: Local storage vs Session storage vs Cookies

---

## Namaste JS - Akshay Saini

[Playlist](https://www.youtube.com/playlist?list=PLlasXeu85E9cQ32gLCvAvr9vNaUccPVNP)

### Everything in js happens inside an "Execution Context" which has 2 components

1. Memory (called variable environment)(Hoisting) - Stored all variables and functions as key value pair
2. Code (called Thread of Execution) - Code is executed one line at a time

JS is a synchronous single-threaded language.

### When we run a JS code an execution context is created which is called "Global Execution Context" and once code is executed an execution context will be deleted.

There are 2 phases of execution context.

1. Memory Creation Phase - where it scan all the variables and assign a undefined to it and for function it assigns whole function
2. Code Execution Phase - Executes the code line by line and add value in memory, executes(invoke) functions

When a function is executed(invoked) a new execution context is created for that function wth allocated memory to all parameters and variables. After execution of a function a new execution context is deleted and control passed to old execution context.

### This execution context is managed by the "Call Stack".

First Global execution is added in the call stack and whenever a new execution context(function invokes) is created and it is added in the call stack and popped out when finished.
Call stack maintains the order of execution of execution contexts.
Call stack known as Execution Context Stack, Program Stack, Control Stack, Runtime Stack, Machine Stack.

### Hoisting

Execution context creation phase scan all the variables and assign a undefined to it and for function it assigns whole function is called hoisting
or
Hoisting is a mechanism in JavaScript where variables and functions are moved to the top of their scope before.
arrow functions are treated as variable when they hoisted.

### JS engine always create an execution context along with some of the objects like window object (called global object), this object whenever we run any JS file whether the file is empty or it has some content.

"In global level this refers to a window object." (this === window).
In browsers window is known as a global object in other environments like node, it can be different.
When we create any variable outside of the function is created in a global space.
When we create any variable inside a function is created in a local space.
We can access all the global variables using the window object.

### Scope, scope chain and closures are related to lexical environment (lexical environment means in order/hierarchy or where the code is placed physically)

Whenever the execution context is created its lexical environment is created.
This lexical environment is local memory as well as reference to the lexical environment of its parent.
"Scope is where you can access the specific variable or function in our code."
Scope is same for all type of function, normal as well as arrow function.
So when we have a function inside a function then the inner function creates a scope chain where it has access of its parent's lexical environment and parent has access of its parent's lexical environment
"chain of lexical environments is called scope chain which defines whether a variable and function is defined in scope or not"

### Temporal dead zone, let and const declarations are hoisted? SyntaxError, ReferenceError and TypeError?

TDZ(Temporal dead zone) is a period of time when a variable is declared but not yet initialized.
let and const declarations are hoisted but in different way, they are in Temporal dead zone for time being
var declarations are stored to global memory where let and const declarations are stored in a separate memory.
let and const variables are not attached to window object.

ReferenceError:
1)If we are trying to access the variable which is in TDZ it gives ReferenceError. 2) variable which is not defined or not in a scope.

SyntaxError: It will not execute the code.
1)When redeclare a same variable using let or const. 2) When we are not initialize a const variable.

TypeError: It will not execute the code.
1)When assign a value to const variable.

### Block - A compound statement(combining number of js statements)

So we can use it where JS required only one statement like in if else, loops, switch
Lexical environment also works same in block also

### Shadowing - variables which has the same name in block or function and outside of the block or function and you are accessing through the block then it will get or set the value from the current block

var variables are shadowed and also change the value of the variable outside of the block as they stored in the same memory.
let and const variables are shadowed but not change the value of the variable as they stored in a separate memory.
You can not shadow a let variable inside a block using var variable, it gives you an error.

### Closure: A function along with its lexical environment forms a closure .

If functions are called or returned from a function they return or called with closure (with function code and all its memory and parent lexical scope).

#### Uses of closures

Module design pattern
Curring
Functions like once
memoize
maintaining state in async world
setTimeouts
Iterators

#### Disadvantages of closures

Closures consume a lot of memory. Creating a function within a function causes memory duplication, which slows down the application.
Closures are not garbage collected when functions are internally connected.

### Anonymous functions, first class functions, function statement, function expression, function declaration

#### function statement or function declaration - normal function

<!-- function functionStatement() {
  console.log(`A Function Statement or Function Declaration`)
} -->

#### function expression - Assign a function to a variable or function that acts like a value

<!-- var functionExpression = function () {
  console.log(`A Function Expression`)
} -->

#### Diff b/w function statement & function expression - Hoisting (function expression will throw TypeError while calling before declaration as it treated like a normal variable)

#### Anonymous functions - A function without a name, An anonymous function is used as a value as it does not have its own identity(name)

<!-- function () {
  console.log(`An Anonymous Function`)
} -->

#### Named function expression - Assign a named function to a variable

#### Function Arguments - values which we are passing when we called a function

#### Function Parameters - values which we are taking when we declare/create a function

#### first class functions or first class citizens - Ability to be used a function as a value, can be passed a function as an argument and ca be return a function is called first class function

### callback functions - Passing function as an argument - JS is synchronous and single-threaded but due to callbacks we can do async things in js

#### Blocking the main thread - Something that blocks the call stack (For ex: function has some heavy operation that take 30 or 40s to run which block the main thread (call stack))

#### Event Listeners - have to remove event listeners so that the variables or closures get garbage collected by js

`Event listeners are heavy (taking more memory) so we have to remove it when we are not using it.`

### Web API - We can extend the functionality of browsers using these web APIs.

These APIs are attached to browsers global object (window).

For ex:
fetch API - Methods to fetch data from web servers.
console API - Methods to access the browser's debugging console.
DOM API - While there are many DOMs (each HTML, XML, and SVG document has a DOM), there’s just one DOM API, which is a W3C specification. The DOM API is written in JavaScript, and you can use it to manipulate the DOM of a web document using JavaScript. [Link](https://webdesign.tutsplus.com/what-is-the-dom-api-for-javascript--cms-35650a)

### Event Loop - It will watch over the call stack and callback queue(task queue), if call stack is empty it will add the callback from the callback queue to the call stack.

Every synchronous JS code is executed by the call stack line by line, it can not handle the async code.
Event loop is used to handle the async code. There is a callback queue that holds the async code to
be executed. When the call stack is empty, the event loop takes the first task from the callback queue
and add it to the call stack.
For example: If any setTimeout timer is completed, callback will be added into the callback queue and as soon as the call stack is empty event loop will add this callback into the call stack.

### Micro task Queue - Callback functions are added which come through promises and mutation observers(will check if there is any mutation occurred in DOM tree or not and execute some callbacks)

Same as a callback queue there is a micro task queue which has more priority then the callback queue.
Any of the promises callback or mutation observer callback is added into the micro task queue and all other callbacks are added into the callback queue.

[Link](https://www.w3schools.com/jsref/api_web.asp)

### Javascript Runtime Environment - Container that has everything to run a JS program

Every browser has Javascript Runtime Environment that includes following things:
JS Engine
Set of APIs
Event Loop
Callback Queue
Micro Task Queue

### JS Engine

JS Engine takes code as input, this code is goes with 3 steps:

1. Parsing - Syntax Parser will convert the code in to AST(Abstract Syntax Tree) and pass it to the compilation step
   [AST Link](https://astexplorer.net/)
2. Compilation - Interpreter converts AST to byte code and on same time compiler also optimize the code while interpreter executes the code line by line and once the code is converted to byte code it moves to the execution step
3. Execution - Store all variables and function in Memory heap, Create execution context in call stack, and Garbage collector(GC) free up memory when the variable is no longer needed (GC uses Mark and sweep algorithm)

### Interpreter - Executes code line by line, it is fast as it does not compile the code before execution

### Compiler - Optimize the code and executes it, it is more efficient as the code is optimized before execution

### JS is compiled or interpreted language?

It is depends on the JS engine either it is only interpreted or both interpreted and JIT complied
JS engine ues interpreter along with a compiler called JIT Compilation(Just-in-time Compilation)

### Functional Programming and Higher Order Functions(HOC)

HOC - A function that can take a function as an argument(callback) or return a function.

`Break down a logic into multiple smaller modules(functions)`
`Achieve Reusability, Modularity, DRY using Functional Programming`

Array.prototype.{functionName} = function () {}
functionName function is available in all array, just like map, filter, forEach and other functions

### Map, Filter, Reduce

map - Transform(Change/Modify) an array and get a new array from it.
filter - filter values from an array and get a new array from it.
reduce - return a single value from an array.

### Callback - Function passed as an argument

Using callback we can achieve asynchronous code in js
For Ex: Passing a function in setTimeout function to run code after some time

Issues:

1. Callback Hell - Callback hell in JavaScript occurs when multiple callbacks are nested within a function, creating a complex and hard-to-maintain code structure that resembles a pyramid, hence the term “pyramid of doom.” Our code grows horizontally not vertically.
2. Inversion of control - Loose control of the code while using callbacks, because the control of the function goes to another function that how it can call the callback function and it may create some issues(didn't call the function or it may called twice etc).

### Promises - The Promise object represents the eventual completion (or failure) of an asynchronous operation and its resulting value.

[Link](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Other definitions:
A container for a future value or A placeholder which will be filled later with the value or A placeholder for certain period of time until we receive a value from an asynchronous operation.

Promise can resolve just once. Which has following 2 major properties (state and result)
promise has 2 states - "pending", "fulfilled", "rejected" - Initial state "pending" after completion "fulfilled" or "rejected"
promise has a result - "undefined", "actual data returned by the function" - Initial result "undefined" after completion "actual data returned by the function" - This result is immutable.

We can attach callback handlers to promise's "then" function which solves the "Inversion of control" issue from callback as we have a control over calling a function
We can also perform promise chaining using multiple "then" function where once promise return another promise which solve the "Callback Hell" issue from callback
"then" function take 2 callbacks 1) for resolve case 2) for rejection case
Also We can catch errors(rejection) from top of the chain(every promises above the catch block) by attaching a callback in promise's "catch" function.
So we can attach are multiple catch block in a promises chain
There is also a "finally" function we can attached to the chain, which will be executed if promise get resolved or rejected.
`NOTE: If a promise is rejected in a then it will execute rejection callback if provided, otherwise will propagate to the next then with a rejection callback or to a catch if no further then handles it. If no then in the chain handles the rejection, the catch at the end of the chain will handle it.`
`NOTE: We can also use then function after the catch block to so that it does not handle the rejection case and runs then callback even after the any of the promise is rejected.`

#### How to create a promise?

A "Promise" constructor is used to create a promise, it takes a function with 2 parameters "resolve" and "reject".
"resolve" and "reject" are functions given by JS to build promises.

#### Promise APIs - Promise.all(), Promise.allSettled(), Promise.race(), Promise.any()

##### Promise.all() - wait for all of them to settle amd get fulfilled and then return the result, if any of them rejected immediately return the rejected result

To make parallel API calls, It will take iterables(ex: array) of promises as input and return array of promises' result.
If all promises are resolved? - It will wait for all of them to settle and then return the result.
If any of the promises is rejected? - It will immediately throw an error as soon as any of them is rejected and it is the same error which it will get from that rejected promise as a result. It will not wait for the other promises whether they are fulfilled or not.
ex: Promise.all([p1, p2, p3])

##### Promise.allSettled() - wait for all of them to settle whether it is fulfilled or rejected and then return the result

To make parallel API calls, It will take iterables(ex: array) of promises as input and return array of promises' result.
If all promises are resolved? - It will wait for all of them to settle and then return the result.
If any of the promises is rejected? - It will wait for all of them to settled(fulfiller or rejected) whether any of them is rejected or not. If fulfilled then return the result otherwise a result with rejected status.
If all of the promises are rejected? - It will wait for all of them to settled and return an array of result with rejected status from all the promises.
ex: Promise.allSettled([p1, p2, p3])

##### Promise.race() - return the first settled promise whether it is fulfilled or rejected

To make parallel API calls, It will take iterables(ex: array) of promises as input and "return a result from the first settled(fulfiller or rejected) promise whether it is fulfilled or rejected" not an array of result from all the promises.
If all promises are resolved? - It will return a result from the first settled(whether fulfilled or rejected) promise.
If any of the promises is rejected? - return a result from the first settled(whether fulfilled or rejected) promise.
ex: Promise.race([p1, p2, p3])

##### Promise.any() - wait for the first settled promise which is fulfilled

To make parallel API calls, It will take iterables(ex: array) of promises as input and "wait for the first promise to get fulfilled and then return a result from the first fulfilled promise" not an array of result from all the promises.
If all promises are resolved? - It will return a result from the first fulfilled promise not the rejected one.
If any of the promises is rejected? - return a result from the first fulfilled promise not the rejected one.
If all of the promises are rejected? - It will wait for all of them to settled and return an aggregateError. From the aggregateError you can take a array errors using "errors" property. err.errors
ex: Promise.any([p1, p2, p3])

### Async Await - async and await is used to handle the promises

Once the async function's execution is started JS engine will suspend the execution context of that async function until the promise gets resolved.
This async/await is syntactic sugar over the then/catch block, behind the scene it also uses the then/catch block.

#### async - used before a function to create an async function which always return a promise

Async function always return a promise, either we can explicitly return a new promise or implicitly this function will wrap a returned value into a promise

#### await - use await before a promise that has to be resolves and await keyword can only be used inside async function

#### Handle Errors

We can wrap our async function code in try/catch block or we can attach "catch" function after async function call as it always return a promise.

### This

"this" will work differently in every context, in global context, in nested function, in arrow function, in strict and non-strict mode. In most cases, It is determined by how a function is called(runtime binding).

#### this in global space

non-strict and strict mode: It represents global object which is window in browser and global in node.js.

#### this inside a function

non-strict mode it is window object.
strict mode it is undefined.

#### this inside non-strict mode - (this substitution)

If the value of this keyword is undefined or null, this keyword will be replaced with globalObject, only in non-strict mode, because of this substitution.

#### this keyword value depends on how this is called (window)

non-strict mode it is window object.
strict mode it is undefined but if we called using window or any other object them it represent that object.

#### this inside a object's method

non-strict and strict mode: It will refer to object itself.

#### call apply bind methods (sharing methods)

non-strict and strict mode: We can share methods across different object by using call, apply, and bind methods. It will modify the value of this method and reference to new object.

#### this inside arrow function

Arrow function do not have their own "this" binding. They take value of this from the lexical environment where they are enclosed.

#### this inside nested arrow function

Arrow function do not have their own "this" binding. They take value of this from the lexical environment where they are enclosed. Also Arrow functions do not have their own arguments object. If you need to access the arguments, you must use rest parameters:

#### this inside DOM - reference to HTMLElement.

#### this inside class, constructor.

### Diff b/w function and constructor functions

`functions` are used for general tasks and computations. Ex: To perform some task on click of button
`constructor functions` are specifically designed to create and initialize objects. The use of "new" with constructor functions enables object creation and initialization, making it possible to create multiple instances with shared methods and properties. Ex: Creating and Managing User Profiles

For Ex:

```
function Car(make, model) {
  this.make = make;
  this.model = model;
}

Car.prototype.drive = function() {
  return `Driving a ${this.make} ${this.model}`;
};

const myCar = new Car('Toyota', 'Camry');
console.log(myCar.drive()); // Output: Driving a Toyota Camry

```

#### this Binding:

`Function:` In a regular function, this refers to the context from which the function was called (e.g., the global object in non-strict mode or undefined in strict mode).
`Constructor Function:` this refers to the new object being created. Inside a constructor function, this is bound to the new instance.

#### Return Value:

`Function:` Can return any value, including primitives, objects, or functions. If no return value is specified, undefined is returned.
`Constructor Function:` Automatically returns the new instance if new is used. If the constructor function explicitly returns an object, that object will be returned instead of the newly created instance.

### Prototype, Prototype chian and Prototypal Inheritance

JS engine attaches an object with some properties and methods via prototype (`__proto__` or prototype) to every variables or functions when they are created. And this attached prototype to a new variable or functions also points to some other properties and methods via prototype and so on until an object is reached with null. This is called prototype chain.

#### Diff b/w `__proto__` and prototype:

`__proto__`: An internal property that provides access to an object's prototype. It’s used to inspect or modify the prototype chain but is considered a legacy feature. So in modern JavaScript, manipulating prototypes directly via `__proto__` is generally avoided in favor of more standardized methods and practices. Instead of using `__proto__`, it's recommended to use Object.getPrototypeOf() and Object.setPrototypeOf() for manipulating prototype chains

`prototype`: A property of constructor functions that allows you to define shared properties and methods for all instances created by the constructor.

#### Diff b/w constructor function vs literals while creating a variable:

`Constructor Functions`: More verbose, creates object instances with additional methods and properties. Less common for primitives in modern JavaScript.
Ex: const arr = new Array(1, 2, 3); // Creates an array with elements 1, 2, 3

`Literals`: More concise, preferred for creating primitive values directly or for arrays. Offers better performance and readability for most use cases.
Ex: const arr = [1, 2, 3]; // Creates an array with elements 1, 2, 3

##### Method (prototype) Availability

`Constructor Functions`: Objects created with constructors (e.g., new String(), new Number()) have methods available on the corresponding prototype. For instance, new String("Hello").toUpperCase() will work with a String object.

`Literals`:
Primitive values created with literals are automatically converted to objects when needed. For example, "Hello".toUpperCase() works because JavaScript temporarily converts the string primitive to a String object to access the method.

In programming, inheritance refers to passing down characteristics from a parent to a child so that a new piece of code can reuse and build upon the features of an existing one. JavaScript implements inheritance by using objects. Each object has an internal link to another object called its prototype. That prototype object has a prototype of its own, and so on until an object is reached with null as its prototype. By definition, null has no prototype and acts as the final link in this prototype chain.
[Link](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)

JS default behavior is "prototypal behavior".
new keyword, this keyword, class, prototypal inheritance are possible through the "prototypal behavior". (in console we can see - "[[Prototype]]")
Arrow functions do not have "prototype"("[[Prototype]]") property, so that they don't their own "this" binding.

### call, apply and bind methods: In JavaScript, call, apply, and bind are methods that allow you to control the context (this) in which a function is executed.

can help in various scenarios, such as function borrowing, partial application, and ensuring correct context in callbacks.

#### Key Differences:

`call:` Invoke function immediately with specified this context and arguments.
`apply:` Invoke function immediately with specified this context and arguments in an array.
`bind:` Return a new function with specified this context and optional pre-filled arguments, to be invoked later.

#### Use Cases:

`call:` When you need to invoke a function immediately with a specific context and arguments.
`apply:` When you have arguments in an array and want to pass them to a function with a specific context.
`bind:` When you need a function with a specific context and optional pre-filled arguments, to be executed later.

### Polyfill for bind

Polyfill - browser fallback
Crete an own bind function for the older browsers which doesn't support it.
To create a bind following things need to consider:

1. Need to assign to functions' prototype so that they can accessible on every functions,
2. Need to access the function using "this" keyword,
3. Need to get object and arguments form bind method as well as other arguments from the new bind function

### Function curring: Copying a method and create more methods out of it by presetting some arguments to it.

Currying is a functional programming technique in JavaScript where a function with multiple arguments is transformed into a sequence of functions, each taking a single argument. Essentially, currying allows you to break down a function that takes multiple arguments into a series of functions that each take one argument.

2 ways 1) Using bind, 2) Using closures

### Debouncing and Throttling (limiting the rate of function execution) - both are used for performance optimization.

Debouncing and throttling are two techniques used in programming, particularly in the context of handling events like user interactions, scrolling, or resizing, to improve performance and reduce unnecessary processing.

`Debouncing` is used to delay the execution of a function until after a certain period of inactivity. This is useful for cases where you want to wait for a pause in activity before performing an action.
`Debouncing`: Make function call when difference b/w 2 events(ex: key press) are greater than the certain limit of time
Examples: Search bar, Search Suggestions, Form Validation, Scroll Position Save

`Throttling` is used to ensure a function is executed at most once in a specified time period, regardless of how frequently events occur. This helps in managing the rate of execution and can be useful for tasks that need to be performed periodically rather than continuously.
`Throttling`: Make function call after certain limit of time
Examples: Window resize, Load More button

### Event Bubbling (Default Behavior) - Event triggers on the target and then propagates up.

`Definition:` When an event occurs on an element, it first runs the event handlers on that element, and then it propagates up to its parent elements in the DOM.
`Example:` If you click a button inside a <div>, the click event triggers on the button first, then on the <div>, and so on up the DOM tree.

### Event Capturing - Event travels down from the root to the target.

`Definition:` This is the opposite of bubbling. The event starts from the root of the DOM and travels down to the target element.
`Usage:` You can enable capturing by setting the third argument of addEventListener to true.

### Event Delegation - A technique that use bubbling to handle events on a parent element instead of each child, optimizing performance and memory usage.

`Definition:` This is a technique where you attach a single event listener to a parent element instead of multiple listeners to child elements. It leverages event bubbling to catch events from child elements.
`Benefits:` Reduces memory usage and improves performance by minimizing the number of event listeners.

### preventDefault() - Prevents the default action that belongs to the event. This is useful when you want to stop the browser’s default behavior from occurring.

### stopPropagation() - Stops the event from propagating (bubbling or capturing) to parent elements. This is useful when you want to prevent other event handlers from being executed on parent elements.

# Algorithms used in JS engine

Mark and sweep (Used by GC)
Inlining (Used by Compiler)
copy elision (Used by Compiler)
Inline caching (Used by Compiler)

</samp>

all about prototype and prototypal inheritance in js
what do you mean by js is Prototypes based language
how to access prototype property in js to different data types
