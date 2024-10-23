// 'use strict'
const GITHUB_URL = `https://api.github.com/users/mr-sagarbhatt`

// ? Throttling - throttle window resizing
let resizeCounter = 0
const resizeFun = function () {
  console.log(`called on resize`, resizeCounter++)
}
const throttle = (fn, limit) => {
  let flag = true
  return function () {
    const context = this
    if (flag) {
      fn.apply(context, arguments)
      flag = false
      setTimeout(() => {
        flag = true
      }, limit)
    }
  }
}
const throttleFun = throttle(resizeFun, 1000)
window.onresize = () => {
  throttleFun()
}

// ? Debouncing - debounce search operation
let debounceCounter = 0
const getDataDebounce = function () {
  console.log(`Debouncing example`, debounceCounter++)
}

const debounce = function (fn, delay) {
  let timer
  return function () {
    const context = this
    // TODO: Need to clear a timer so that setTimeout callback function doesn't get executed
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(context, arguments)
    }, delay)
  }
}

const debounceFun = debounce(getDataDebounce, 300)

// ? polyfill for Map and reduce
const polyfillArr = [5, 1, 2, 3, 4]
Array.prototype.myMap = function (fn) {
  const arr = []
  for (let i = 0; i < this.length; i++) {
    arr.push(fn(this[i], i, this))
  }
  return arr
}

Array.prototype.myFilter = function (fn) {
  const arr = []
  for (let i = 0; i < this.length; i++) {
    const flag = fn(this[i], i, this)
    if (flag) arr.push(this[i])
  }
  return arr
}

Array.prototype.myReduce = function (fn, defaultValue) {
  let result = defaultValue === undefined ? this[0] : defaultValue
  for (let i = 0; i < this.length; i++) {
    result = fn(result, this[i], i, this)
  }
  return result
}

// if (!Array.prototype.sort) {
Array.prototype.mySort = function (compareFunction) {
  for (let i = 0; i < this.length - 1; i++) {
    for (let j = 0; j < this.length - i - 1; j++) {
      if (compareFunction ? compareFunction(this[j], this[j + 1]) > 0 : this[j] > this[j + 1]) {
        const temp = this[j]
        this[j] = this[j + 1]
        this[j + 1] = temp
      }
    }
  }
  return this
}
// }

const polyfillArrMap = polyfillArr.myMap((i) => i * 2)
const polyfillArrFilter = polyfillArr.myFilter((i) => i > 4)
const polyfillArrReduce = polyfillArr.myReduce((acc, curr) => (acc < curr ? acc : curr))
const polyfillArrSort = polyfillArr.mySort((a, b) => b - a)
console.log(polyfillArrMap, polyfillArrFilter, polyfillArrReduce, polyfillArrSort)

// ? recursion
const tempData = {
  name: 'sagar',
  surname: 'bhatt',
  others: [],
  phone: null,
  email: undefined,
  address: {
    home: {
      city: 'Ahmedabad',
    },
    office: {
      city: 'Ahmedabad',
    },
  },
}
// * Output should be user_name, user_address_home_city etc...

const manipulatedData = (obj, prefix, output = {}) => {
  for (key in obj) {
    const newKey = prefix + '_' + key
    // * Ways to check value is object or not
    // typeof obj[key] === 'object' // return null, arrays, objects
    // obj[key] instanceof Object // return arrays, objects
    // obj[key].constructor === Object // return error for null and undefined
    // Object.prototype.toString.call(obj[key]) === '[object Object]' // return objects only // here we are using Object toString method because value does not have toString method then gives error (for null and undefined)
    if (Object.prototype.toString.call(obj[key]) === '[object Object]') {
      manipulatedData(obj[key], newKey, output)
    } else {
      output[newKey] = obj[key]
    }
  }
  return output
}
console.log(manipulatedData(tempData, 'user'))

// ? function curring and recursion
// * Q: sum(1)(2)(3)(4)() should return 10

const sum = (num1) => {
  return (num2) => {
    if (num2) {
      return sum(num1 + num2)
    }
    return num1
  }
}
console.log(`Sum: ${sum(1)(2)(3)(4)(5)(6)()}`)

// ? call, apply, bind
const printDetails = function (hometown, state) {
  console.log(`${this.name} ${this.surname} from ${hometown}, ${state}`)
}
const o1 = {
  name: 'sagar',
  surname: 'bhatt',
  printFullName: function () {
    console.log(`${this.name} ${this.surname}`)
  },
}
o1.printFullName()
printDetails.call(o1, 'Ahmedabad', 'Gujarat')
printDetails.apply(o1, ['Ahmedabad', 'Gujarat'])

// * function borrowing
const o2 = {
  name: 'harsh',
  surname: 'bhatt',
}
o1.printFullName.call(o2)
// * call: Invoke function immediately with specified this context and arguments.
printDetails.call(o2, 'Ahmedabad', 'Gujarat')
// * apply: Invoke function immediately with specified this context and arguments in an array.
printDetails.apply(o2, ['Ahmedabad', 'Gujarat'])
// * bind: Return a new function with specified this context and optional pre-filled arguments, to be invoked later.
const newPrintDetails = printDetails.bind(o2, 'Ahmedabad', 'Gujarat')
newPrintDetails()

// TODO: Polyfill for bind: Crete an own bind function for the older browsers which doesn't support it.
// * To create a bind following things need to consider: 1) Need to assign to functions' prototype so that they can accessible on every functions, 2) Need to access the function using "this" keyword, 3) Need to get object and arguments form bind method as well as other arguments from the new bind function
Function.prototype.myBind = function (...args) {
  const fn = this
  const remainingArgs = args.splice(1)
  return function (...args2) {
    fn.apply(args[0], [...remainingArgs, ...args2])
  }
}
const myBindPrintDetails = printDetails.myBind(o2, 'Ahmedabad', 'Gujarat')
myBindPrintDetails()
const myBindPrintDetails2 = printDetails.myBind(o2, 'Ahmedabad')
myBindPrintDetails2('Gujarat')

// ? prototype, prototype chian, prototypal inheritance
const strConstructorFunEx = new String('string constructor function') // * Example of string constructor function
const strLiteralEx = 'string literal' // * Example of string literal

console.log(`type of strConstructorFunEx`, typeof strConstructorFunEx) // * type of string constructor function will be object
console.log(`type of strLiteralEx`, typeof strLiteralEx) // * type of string constructor function will be string when we are using any property or method it will become an object

// TODO: Adding custom method(typeof) to all strings using "String.prototype" similarly we can define it for Array, Number, Date
String.prototype.typeof = function () {
  console.log(`type of "${this}" is "${typeof this}"`)
}
strConstructorFunEx.typeof()
strLiteralEx.typeof()

// TODO: strLiteralEx and String constructor function both have same prototype object, so every string has same prototype object as String constructor function
console.log(strLiteralEx.__proto__, String.prototype, strLiteralEx.__proto__ === String.prototype)
// TODO: strLiteralEx prototype also link to another prototype same as Object constructor function
console.log(
  strLiteralEx.__proto__.__proto__,
  String.prototype.__proto__,
  Object.prototype,
  strLiteralEx.__proto__.__proto__ === Object.prototype,
)
// TODO: Object prototype also has prototype which is null, which shows the end of the prototype chain
console.log(
  strLiteralEx.__proto__.__proto__.__proto__,
  Object.prototype.__proto__,
  strLiteralEx.__proto__.__proto__.__proto__ === Object.prototype.__proto__,
)

const funProto = function () {}
const arrProto = [1, 2, 3, 4, 5]
const numProto = 1
const objProto = {}
const boolProto = true
const arrowFunProto = () => {}
console.log(
  `funProto.__proto__:`,
  funProto.__proto__,
  funProto.__proto__.__proto__,
  funProto.__proto__.__proto__.__proto__,
)
console.log(`funProto.prototype:`, funProto.prototype)
console.log(
  `arrProto.__proto__:`,
  arrProto.__proto__,
  arrProto.__proto__.__proto__,
  arrProto.__proto__.__proto__.__proto__,
)
console.log(
  `numProto.__proto__:`,
  numProto.__proto__,
  numProto.__proto__.__proto__,
  numProto.__proto__.__proto__.__proto__,
)
console.log(`objProto.__proto__:`, objProto.__proto__, objProto.__proto__.__proto__)
console.log(
  `boolProto.__proto__:`,
  boolProto.__proto__,
  boolProto.__proto__.__proto__,
  boolProto.__proto__.__proto__.__proto__,
)
console.log(
  `arrowFunProto.__proto__:`,
  arrowFunProto.__proto__,
  arrowFunProto.__proto__.__proto__,
  arrowFunProto.__proto__.__proto__.__proto__,
)
console.log(`arrowFunProto.prototype:`, arrowFunProto.prototype)

// TODO: Updating prototype of an object
let object1 = {
  name: 'Sagar',
  city: 'Ahmedabad',
  getInfo: function () {
    console.log(`${this.name} from ${this.city}`)
  },
}
let object2 = {
  name: 'Harsh',
}
// ! Never do this
object2.__proto__ = object1
console.log(`object2 prototype`, object2.__proto__)
console.log(object1.getInfo())
console.log(object2.getInfo())

// TODO: Everything in js(array, string, function) refers to an "object" and object refers to "null".
function multiple5(num) {
  this.num = num
  return num * 5
}
const multiple5Arrow = (num) => {
  this.num = num
  return num * 5
}

multiple5.power = 2
multiple5Arrow.power = 2
console.log(multiple5(5))
console.log(multiple5.power)
console.log(multiple5.prototype)
console.log(multiple5Arrow(5))
console.log(multiple5Arrow.power)
console.log(multiple5Arrow.prototype)

function createUser(username, score) {
  this.username = username
  this.score = score
}
createUser.prototype.increment = function () {
  this.score++
}
createUser.prototype.printMe = function () {
  console.log(`${this.username} ${this.score}`)
}

// TODO: We have to call createUser using "new" keyword to access the printMe and increment function.

// * Here's what happens behind the scenes when the new keyword is used:
// * A new object is created: The new keyword initiates the creation of a new JavaScript object.
// * A prototype is linked: The newly created object gets linked to the prototype property of the constructor function. This means that it has access to properties and methods defined on the constructor's prototype.
// * The constructor is called: The constructor function is called with the specified arguments and this is bound to the newly created object. If no explicit return value is specified from the constructor, JavaScript assumes this, the newly created object, to be the intended return value.
// * The new object is returned: After the constructor function has been called, if it doesn't return a non-primitive value (object, array, function, etc.), the newly created object is returned.

const user1 = new createUser('sagar', 11)
const user2 = createUser('harsh', 19)

user1.printMe()
user1.increment()
user1.printMe()

// TODO: Inheritance - 2 ways, 1) old - using __proto__ property, 2) Object.setPrototypeOf(object1, object2) method - where object1 - The object to change its prototype. , object2 -  The value of the new prototype or null.

const User = {
  name: 'chai',
  email: 'chai@google.com',
}

const Teacher = {
  makeVideo: true,
}

const TeachingSupport = {
  isAvailable: false,
}

const TASupport = {
  makeAssignment: 'JS assignment',
  fullTime: true,
  __proto__: TeachingSupport,
}

Teacher.__proto__ = User

// modern syntax
Object.setPrototypeOf(TeachingSupport, Teacher)

let anotherUsername = 'ChaiAurCode     '

String.prototype.trueLength = function () {
  console.log(`${this}`)
  console.log(`True length is: ${this.trim().length}`)
}

anotherUsername.trueLength()
'hitesh'.trueLength()
'iceTea'.trueLength()

// ? "this" keyword

// * this in global space
console.log(`this in global space`, this)

// * this inside a function
function thisNonStrictMode() {
  console.log(`this inside a function - non-strict mode`, this)
}
thisNonStrictMode()
function thisStrictMode() {
  'use strict'
  console.log(`this inside a function - strict mode`, this)
}
thisStrictMode()

// * this inside non-strict mode - (this substitution)

// TODO: If the value of this keyword is undefined or null, this keyword will be replaced with globalObject, only in non-strict mode, because of this substitution.

// * this keyword value depends on how this is called (window)
function x() {
  'use strict'
  console.log(`this inside a function - strict mode`, this)
}
x() // strict mode - undefined, non-strict mode - window because of this substitution.
window.x() // strict mode or non-strict mode - window

// * this inside a object's method

const student = {
  name: 'sagar',
  printName: function () {
    console.log(`this inside a object's method`, this.name)
  },
}
student.printName()

// * call apply bind methods (sharing methods)

// TODO: We can share obj method to obj2 using call, apply and bind method
const student2 = {
  name: 'harsh',
}
student.printName.call(student2) // TODO: Now value of this inside function will be student2

// * this inside arrow function
console.log(
  `"this" in below method(arrow function) will behave same like it is behave in its enclosing lexical context `,
  this,
)
const obj = {
  a: 10,
  b: () => {
    console.log(`this inside arrow function`, this)
  },
}
obj.b() // TODO: this will be window because arrow function does not have its own this binding so this refers to its lexical scope where is enclosed,

// * this inside nested arrow function
const obj2 = {
  a: 10,
  b: function () {
    console.log(
      `"this" in below method(arrow function) will behave same like it is behave in its enclosing lexical context `,
      this,
    )
    const c = () => {
      console.log(`this inside arrow function`, this)
    }
    c()
  },
}
obj2.b() // TODO: this will be obj2 because arrow function does not have its own this binding so this refers to its lexical scope where is enclosed,

// * this inside DOM

// ? Async await
// Handle Error - 2 ways - 1) try/catch 2) catch function after function call as it always return a promise
async function getGithubData() {
  try {
    try {
      const res = await fetch(GITHUB_URL)
    } catch (err) {
      console.error({ err })
    }
    const data = await res.json()
    console.log({ data })
  } catch (err) {
    console.error({ err })
  }
}
getGithubData()
// getGithubData().catch((err) => console.error({ err }))

// TODO: This async function always return a promise
async function getData() {
  // return 'Get data function'
  return new Promise((resolve, reject) => resolve('Get data function'))
}
getData().then((data) => console.log({ data }))

// How do we handle promises before async/await using promises
const newPromise = new Promise((resolve) => {
  setTimeout(() => {
    resolve('Promise resolved value')
  }, 10000)
  // resolve('Promise resolved value')
})

const newPromise2 = new Promise((resolve) => {
  setTimeout(() => {
    resolve('Promise resolved value 2')
  }, 5000)
  // resolve('Promise resolved value')
})

function handlePromiseUsingThen() {
  // TODO: JS Engine will not wait for the promise to be resolved
  newPromise.then((data) => console.log({ data }))
  console.log('inside handlePromiseUsingThen')
}
console.log('before calling handlePromiseUsingThen')
handlePromiseUsingThen()
console.log('after calling handlePromiseUsingThen')

async function handlePromiseUsingAsyncAwait() {
  // TODO: use await before a promise that has to be resolves and await keyword can only be used inside async function
  // TODO: JS Engine will waiting for the promise to be resolved
  console.log(`Hello world`)
  const data = await newPromise
  console.log({ data })
  console.log('inside handlePromiseUsingAsyncAwait')

  const data2 = await newPromise
  console.log({ data2 })
  console.log('inside handlePromiseUsingAsyncAwait')

  const data3 = await newPromise2
  console.log({ data3 })
  console.log('inside handlePromiseUsingAsyncAwait')

  const data4 = await newPromise2
  console.log({ data4 })
  console.log('inside handlePromiseUsingAsyncAwait')
}
console.log('before calling handlePromiseUsingAsyncAwait')
handlePromiseUsingAsyncAwait()
console.log('after calling handlePromiseUsingAsyncAwait')

// ? Promise.all() - Promise.allSettled(), Promise.race(), Promise.any()
const p1 = new Promise((resolve, reject) => {
  // setTimeout(() => resolve('p1 fulfilled'), 3000)
  setTimeout(() => reject('p1 rejected'), 3000)
})
const p2 = new Promise((resolve, reject) => {
  // setTimeout(() => resolve('p2 fulfilled'), 1000)
  setTimeout(() => reject('p2 rejected'), 1000)
})
const p3 = new Promise((resolve, reject) => {
  // setTimeout(() => resolve('p3 fulfilled'), 2000)
  setTimeout(() => reject('p3 rejected'), 2000)
})

// Promise.all([p1, p2, p3])
//   .then((result) => console.log({ result }))
//   .catch((err) => console.error({ err }))

// Promise.allSettled([p1, p2, p3])
//   .then((result) => console.log({ result }))
//   .catch((err) => console.error({ err }))

// Promise.race([p1, p2, p3])
//   .then((result) => console.log({ result }))
//   .catch((err) => console.error({ err }))

Promise.any([p1, p2, p3])
  .then((result) => console.log({ result }))
  .catch((err) => {
    console.error({ err })
    // when using promise.any() and all promises are rejected then to get all errors from AggregateError we can use "errors" property
    console.error({ errors: err.errors })
  })

// ? Promise

// 1)
// const githubUser = fetch(GITHUB_URL)
// console.log(githubUser)
// const githubUserData = githubUser.then((user) => user.json())
// console.log({ githubUserData })
// const data = githubUserData.then((user) => console.log({ user }))
// console.log({ data })

// 2) Create Promise
const cart = []
// const cart = ['shoes', 'kurta']

// "then" take 2 callbacks 1) for resolve case 2) for rejection case
createOrder(cart)
  .then(
    // Function to handle resolve case, we will get the values which we have passed in resolve function in promise
    function (orderID) {
      console.log({ orderID })
      return orderID
    },
    // function (err) {
    //   // Function to handle rejection case, we will get the values which we have passed in reject function in promise
    //   console.log(`From Then 1`)
    //   console.log(err)
    //   console.log(err?.message)
    // },
  )
  // .catch(function (err) {
  //   // Function to handle rejection case
  //   console.log(`From Catch Block 1`)
  //   console.log(err)
  //   console.log(err?.message)
  // })
  .then(
    // Function to handle resolve case, we will get the values which we have passed in resolve function in promise
    function (orderID) {
      console.log({ orderID })
      return proceedToPayment(orderID)
    },
    // function (err) {
    //   // Function to handle rejection case, we will get the values which we have passed in reject function in promise
    //   console.log(`From Then Block 2`)
    //   console.log(err)
    //   console.log(err?.message)
    // },
  )
  // .catch(function (err) {
  //   // Function to handle rejection case
  //   console.log(`From Catch Block 2`)
  //   console.log(err)
  //   console.log(err?.message)
  // })
  .then(
    // Function to handle resolve case, we will get the values which we have passed in resolve function in promise
    function (paymentInfo) {
      console.log({ paymentInfo })
    },
    // function (err) {
    //   // Function to handle rejection case, we will get the values which we have passed in reject function in promise
    //   console.log(`From Then Block 3`)
    //   console.log(err)
    //   console.log(err?.message)
    // },
  )
  .catch(function (err) {
    // Function to handle rejection case
    console.log(`From Catch Block 3`)
    console.log(err)
    console.log(err?.message)
  })
  .then(
    // Function to handle resolve case, we will get the values which we have passed in resolve function in promise
    function () {
      console.log(
        `This "then" block will be no matter what happens, because we have already handled the rejection case using multiple catch blocks.`,
      )
    },
  )
  .finally(
    // Function to handle resolve case, we will get the values which we have passed in resolve function in promise
    function () {
      console.log(`This "finally" block will be no matter what happens.`)
    },
  )

// TODO: Function that return a promise
function createOrder(cart) {
  function validateCart(cart) {
    return cart.length > 0 ? true : false
  }

  const promise = new Promise(function (resolve, reject) {
    if (!validateCart(cart)) {
      // ! We have to handle this error while calling this function
      const err = new Error('Cart is empty.')
      reject(err)
    }
    // const orderID = Math.random().toString().substring(2, 12)
    const orderID = Date.now()
    if (orderID) {
      resolve(orderID)
    }
  })
  return promise
}

function proceedToPayment(orderID) {
  return new Promise(function (resolve, reject) {
    // if (!orderID) {
    //   reject('Payment Failed')
    // }
    resolve('Payment Successful')
  })
}

// ? HOC
const radius = [1, 2, 3, 4]
const area = (radius) => Math.PI * radius * radius
const circumference = (radius) => 2 * Math.PI * radius
const diameter = (radius) => 2 * radius
// const calculate = (arr, logic) => {
//   let output = []
//   for (let i = 0; i < arr.length; i++) {
//     output.push(logic(arr[i]))
//   }
//   return output
// }
// console.log(`area`, calculate(radius, area))
// console.log(`circumference`, calculate(radius, circumference))
// console.log(`diameter`, calculate(radius, diameter))

Array.prototype.calculate = function (logic) {
  let output = []
  for (let i = 0; i < this.length; i++) {
    output.push(logic(this[i]))
  }
  return output
}
// console.log(`area`, radius.calculate(area))
// console.log(`circumference`, radius.calculate(circumference))
// console.log(`diameter`, radius.calculate(diameter))

// ? Block code for 10s

// console.log('Block code for 10s <==> start')
// setTimeout(() => {
//   console.log(
//     `It should run after 5 seconds, but our main thread(global execution context in call stack) is busy in executing the code, so it will be logged after completion of it.`,
//   )
// }, 5000)

// const startDate = new Date().getTime()
// let endDate = startDate
// while (endDate < startDate + 10000) {
//   endDate = new Date().getTime()
//   console.log(`Blocked code for 10s`, startDate, endDate)
// }

// console.log('Block code for 10s <==> end')

//  ? Event Listener with Closure
const eventListenerWithClosure = document.getElementById('eventListenerWithClosure')
function attachedEventListener() {
  let count = 0
  eventListenerWithClosure.addEventListener('click', function fn() {
    ++count
    console.log(`Clicked ${count} ${count === 1 ? 'time' : 'times'}.`)
  })
}
// attachedEventListener()

//  ? callback functions
// setTimeout(() => {
//   console.log(`Runs after 5 seconds, this callback function will be added in call stack after 5 seconds`)
// }, 5000)

// function x(y) {
//   console.log(`x`)
//   y()
// }

// x(function y() {
//   console.log(`y`)
// })

//  ? function statement or function declaration - normal function
function functionStatement() {
  console.log(`A Function Statement or Function Declaration`)
}
// functionStatement()

//  ? function expression - Assign a function to a variable
var functionExpression = function () {
  console.log(`A Function Expression`)
}
// functionExpression()

//  ? Diff b/w function statement & function expression - Hoisting (function expression will throw TypeError while calling before declaration as it treated like a normal variable)
// functionStatement()
// functionExpression()

//  ? Anonymous functions - A function without a name, An anonymous function is used as a value as it does not have its own identity(name)
var anonymousFunction = function () {
  console.log(`An Anonymous Function`)
}

//  ? Named function expression - Assign a named function to a variable
var namedFunctionExpression = function fnName() {
  console.log(`We can access this function statement/expression but not outside of this function`, fnName)
}
// namedFunctionExpression()

//  ? First class functions or First class Citizens - Ability to be used a function as a value, can be passed a function as an argument and ca be return a function is called first class function
const firstClassFunction = function (fn) {
  return function () {
    console.log(fn)
  }
}
// firstClassFunction(function () {
//   console.log(`A first Class Function`)
// })()

//  ? closure
function outerMost() {
  const b = 'outer most function'
  return function outer() {
    function inner() {
      console.log({ a, b })
    }
    const a = 'closure'
    return inner
  }
}
// outerMost()()()

//  ? closure other examples

// ? data hiding/ encapsulation

function counter() {
  var count = 0
  return function () {
    count++
    console.log(count)
  }
}
const counter1 = counter()
// counter1()
// counter1()
const counter2 = counter()
// counter2()
// counter2()

// ? constructor function

function Counter() {
  let count = 0
  this.increment = function () {
    count++
    console.log({ count })
  }
  this.decrement = function () {
    count--
    console.log({ count })
  }
}
const counterObj = new Counter()
// counterObj.increment()
// counterObj.increment()
// counterObj.increment()
// counterObj.decrement()
// counterObj.decrement()

//  ? print 1 to 5 after 1 second
// function x() {
//   // for (let i = 1; i < 6; i++) {
//   //   setTimeout(() => {
//   //     console.log({ i })
//   //   }, i * 1000)
//   // }
//   for (var i = 1; i < 6; i++) {
//     function y(x) {
//       setTimeout(() => {
//         console.log({ x })
//       }, x * 1000)
//     }
//     y(i)
//   }
// }
// x()

//  ? HOC that runs function only once
// function runOnce(fn) {
//   let hasOnce = false
//   return function (...args) {
//     if (!hasOnce) {
//       hasOnce = true
//       return fn(...args)
//     } else {
//       console.log(`Sorry, it can run only once!`)
//     }
//   }
// }

//  ? HOC to Memoize Values - cache values
// function memoize(fn) {
//   const cache = new Map()

//   return function (...args) {
//     const key = [...args]?.sort((a, b) => b - a).toString()
//     console.log({ key, args, arguments })
//     if (cache.has(key)) {
//       console.log(`from cache`, key, cache.get(key))
//       return cache.get(key)
//     }
//     const result = fn(...args)
//     cache.set(key, result)
//     return result
//   }
// }

// const myFunction = () => console.log('run once')
// const add = (a, b) => a + b

// const newFunction = runOnce(myFunction)
// newFunction()
// newFunction()
// newFunction()

// const memoizedAdd = memoize(add)
// const ma1 = memoizedAdd(2, 3)
// const ma2 = memoizedAdd(2, 3)
// const ma3 = memoizedAdd(3, 2)
// const ma4 = memoizedAdd(2, 3)
// console.log({
//   ma1,
//   ma2,
//   ma3,
//   ma4,
// })
