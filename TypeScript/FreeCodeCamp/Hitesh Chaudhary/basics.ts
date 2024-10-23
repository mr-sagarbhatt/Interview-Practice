// TODO: 1.Variables | Data Types
// ? syntax: let variableName: type = value
// ? JavaScript has eight data types. Seven primitive types and one object Data type. The primitive types are number, string, boolean, bigint, symbol, undefined, and null. Everything else is an object in JavaScript.
// ? The TypeScript Type System supports all of them and also brings its own special types. They are unknown, any, void & never.

// TODO: Primitive data types: string, number, boolean
// * string
let greetings: String = 'Hello Sagar'
// greetings = 6 // ! Typescript give an error
greetings.toLowerCase()
console.log({ greetings })

// * number
let userId: number = 1
// userId.toUpperCase() // ! Typescript give an error
console.log({ userId })

// * boolean
let isLoggedIn: boolean = true
console.log({ isLoggedIn })

// TODO: Type Inference
// ? In TypeScript, there are several places where type inference is used to provide type information when there is no explicit type annotation.
let myNum = 6 // no explicit type annotation | We have already initialized a value
// ? The type of the myNum variable is inferred to be number. This kind of inference takes place when initializing variables and members, setting parameter default values, and determining function return types.
// myNum = 'sagar' // ! Typescript give an error, however we have not defined the explicit type annotation

myNum.toFixed(2)
console.log({ myNum })

// TODO: Special data types: any, unknown, never, undefined & null

// * any
// ? If we don't supply a type, it will be of type any by default.

let hero // ? inferred to be type any, such case define explicit type annotation
const getHero = () => 'Thor'
hero = getHero()
console.log({ hero })
// let hero: string // ? explicit type annotation
// const getHero = () => true // ! Typescript give an error
// hero = getHero()
// console.log({hero})

// TODO: Functions: Default return type is void
const addTwo = (num: number) => {
  // num.toUpperCase() // ! Typescript will not give an error, If not provided explicit type annotation in function definition for parameters
  return 'hello' // ! Typescript will not give an error, If not provided explicit type annotation in function definition for return type
  // return num + 2
}
const resAddTwo = addTwo(5)
// const resAddTwo = addTwo('5') // ! Typescript will not give an error, If not provided explicit type annotation in function definition for parameters
console.log({ resAddTwo })

// * Default Values
// ? we can omit type annotation for default parameter, it will be inferred by ts
const logInUser = (name: string, email: string, isPaid: boolean = false) => {
  return name
}
// const logInUser = (name: string, email: string, isPaid = false) => { // ? inferred by ts
//   return name
// }
// const resLogInUser = logInUser('Sagar', 'bhattsagar112@gmail.com', 'sagar') // ! Typescript will give an error, default param will inferred by ts
const resLogInUser = logInUser('Sagar', 'bhattsagar112@gmail.com')
// const resAddTwo = addTwo('5') // ! Typescript will not give an error, If not provided explicit type annotation in function definition
console.log({ resLogInUser })

// * Return Type
// * Single return type
const addTwoWithOneReturnType = (num: number): number => {
  // return 'hello' // ! Typescript will give an error, because we have provided explicit type annotation in function definition for return type
  return num + 2
}
const resAddTwoWithOneReturnType = addTwoWithOneReturnType(5)
console.log({ resAddTwoWithOneReturnType })

// * Multiple return type (UNION TYPE (|))
// ? We need to use UNION type for function which return multiple type
// ? it will return either a number or a string
const addTwoWithMultiReturnType = (num: number): number | string => {
  if (num > 5) return num
  return 'Add Val greater than 5'
}
const resAddTwoWithMultiReturnType = addTwoWithMultiReturnType(5)
console.log({ resAddTwoWithMultiReturnType })

// ? map : It will automatically
const heros = ['thor', 'spiderman', 'ironman']
// const heros = [1, 2, 3]
// const heros = []
// ? here we can omit the return type and param type in map function as it will automatically detect from default value, but we can specify the return type so that it can specific type
const arrHeros = heros.map((hero): string => {
  return `hero is ${hero}`
})
console.log({ arrHeros })

// TODO: void vs never
// * void
// ? need to define type annotation return type else function will return anything
const consoleError = (errMsg: string): void => {
  console.error(errMsg)
}
consoleError('consoleError')
console.log({ fnConsoleError: consoleError('console: consoleError') })

// * never
// ? The never type represents values which are never observed. In a return type, this means that the function throws an exception or terminates execution of the program.
const handleError = (errMsg: string): never => {
  throw new Error(errMsg)
}

// TODO: objects: ({})
// commonly we are passing a object to a function or returning a object from a function.
const user = {
  name: 'sagar',
  email: 'bhattsagar112@gmail.com',
  isActive: true,
}
const createUser = ({ name: string, isPaid: boolean }) => {}
// createUser({ name: 'sagar', isPaid: false, email: 'bhattsagar112@gmail.com' }) // ! Typescript will give an error, when we directly pass an object value to a function because we have asked for name and isPAid only, and email is not there
// ! Now when we will assign the object value to a variable, Typescript will not give an error, however we have asked for name and isPAid only
const newUSer = { name: 'sagar', isPaid: false, email: 'bhattsagar112@gmail.com' }
createUser(newUSer)

const createCourse = (): { name: string; price: number } => {
  return {
    name: 'reactjs',
    price: 399,
  }
}
console.log({ createCourse: createCourse() })

// TODO: Type aliases - Use type aliases for objects so that we don't need to write types at all places where we use that object.
type typeUser = {
  name: string
  email: string
  isActive: boolean
}

const createUserType = (user: typeUser) => user
console.log({ createUserType: createUserType(user) })

// TODO: Object Properties: readonly properties (can not change value) ,optional properties(?), Intersection properties(&)
// mongodb has unique _id for every record, which should not be manipulated, so we can use read only
type typeUserProfile = {
  readonly _id: string
  name: string
  email: string
  isActive: boolean
  credCardDetails?: number // ? This field is optional, so typescript will not throw any error if we do not pass it
}
const userProfile: typeUserProfile = {
  _id: '12345',
  name: 'sagar',
  email: 'bhattsagar112@gmail.com',
  isActive: true,
}

userProfile.email = 'bsaga112@gmail.com'
// userProfile._id = 'asa' // ! Typescript will give an error, because it is a read-only property and we are changing its value
console.log({ userProfile })

type typeCardNumber = {
  cardNumber: number
}
type typeCardDate = {
  cardDate: Date
}
// ? Intersection Types(&): is mainly used to combine existing object types.
// * DIFF: Type - A type cannot be changed after being created, Interface - You can add new fields to an existing interface (Reopening of interface)
// * DIFF: Type - Extending a type via intersections : using &,Interface - Inheritance in interface | Extending an interface : using extends keyword
// ? here we combine typeCardNumber and typeCardDate
type typeCardDetails = typeCardNumber &
  typeCardDate & {
    cvv: number // ! not good practice to combine object with existing object types
  }
const cardDetails: typeCardDetails = {
  cardNumber: 12345,
  cardDate: new Date(),
  cvv: 123,
}
console.log({ cardDetails })

// TODO: Arrays
// ? 2 types of syntax: Both syntax are good, can choose any of them but be consistent with one
// ? Empty array will be type of never
// * 1st way: Using square brackets(Type[])
// const marvelHeros = [] // ? type is never by default
const marvelHeros: string[] = [] // ? array of strings
const heroPower: number[] = [] // ? array of numbers
marvelHeros.push('spiderman')
heroPower.push(2)
console.log({ marvelHeros, heroPower })

// * 2nd way: Using a generic array type, Array<elementType>(Array<Type>)
const marvelHeros2: Array<string> = [] // ? array of strings
const heroPower2: Array<number> = [] // ? array of numbers

type typeUser1 = {
  name: string
  isActive: boolean
}
const arrUsers: Array<typeUser1> = []
arrUsers.push({
  name: 'sagar',
  isActive: true,
})
console.log({ arrUsers })

// * Array of arrays
const MLmodels: number[][] = [[255, 255, 255]]
const MLmodels2: Array<Array<number>> = [[255, 255, 255]]

// * ReadonlyArrays
const marvelHeros3: readonly string[] = ['spiderman'] // ? array of strings
const marvelHeros4: ReadonlyArray<string> = ['spiderman'] // ? array of strings

// marvelHeros3.push('thor') // ! Typescript will give an error, because it is a read-only property and we are changing its value
// marvelHeros4[0] = 'thor' // ! Typescript will give an error, because it is a read-only property and we are changing its value

// TODO: UNION Type(|) -> Combination of two or more data types, recommended to use union type over any, define strict type by adding possible types

let score: number | string = 33
score = 44
score = '55'

type typeUser2 = {
  name: string
  id: number
}
type typeAdmin2 = {
  username: string
  id: number
}
let sagar: typeUser2 | typeAdmin2 = { name: 'sagar', id: 334 }
sagar = { username: 'sagar', id: 334 }
// const getDbId = (id: number | string) => {
//   console.log(`DB id is: ${id}`)
// }

// * UNION Narrowing : Narrowing occurs when TypeScript can deduce a more specific type for a value based on the structure of the code.
const getDbId = (id: number | string) => {
  // id.toLowerCase() // ! Typescript will give an error, because type of id is either number or string, and toLowerCase() is not applied on type number
  // ? we need to check the type of id before performing any operation on it
  if (typeof id === 'string') {
    id.toLowerCase()
  }
}
getDbId(3)
getDbId('3')

// * UNION with array
const data: Array<number> = [1, 2, 3]
const data2: Array<string> = ['1', '2', '3']
const data3: Array<number | string> = [1, 2, '3']
const data4: (number | string)[] = [1, 2, '3']

// * literal assignment
let seatAllotment: 'aisle' | 'middle' | 'window'
seatAllotment = 'aisle'
// seatAllotment = 'crew' // ! Typescript will give an error, if we pass value other than 3.14

// TODO: Tuples -> Specialized array with some restrictions, need to place type inside of array [string, number], ex: rgb value
// ? A tuple type is another sort of Array type that knows exactly how many elements it contains, and exactly which types it contains at specific positions. But there is one problem that we can perform array methods on it.
// * Array: In array position of string and number type do not matters, and no restriction for array length
const arrUsers1: Array<string | number> = [1, 'sb', 'sb', 1]
console.log({ arrUsers1 })
// * Tuple: In tuples length and order of the array is matters
// const arrUsers2: [string, number] = [1, 'sb'] // ! Typescript will give an error, as we have not added value in specified order of types
// const arrUsers3: [string, number] = ['sb', 1, 'sb'] // ! Typescript will give an error, as we have added more values then specified order of types
const arrUsers3: [string, number] = ['sb', 1] // ? Here position of string and number type matters
console.log({ arrUsers3 })

let rgb: [number, number, number] // ? We can use tuple for rgb values where we have only three values which are numbers
rgb = [255, 123, 112]

// ! there is one problem in tuple that we can perform array methods on it.
type typeUserTuple = [number, string]
const userTuple: typeUserTuple = [112, 'bhattsagar112@gmail.com']
userTuple[1] = 'bsaga112@gmail.com'
userTuple.push(1, 's')
userTuple.push(1, 's')
userTuple.pop()
console.log({ userTuple })

// TODO: Enums -> Provide a set of values, So it will restrict the choice, Ex.can be used in e-commerce to restrict order status
// ? enum value starts with 0 and incremented by 1, we can override this value by assigning a new value
enum SeatChoice {
  AISLE,
  MIDDLE = 10,
  WINDOW,
  FOURTH = 22,
}

// ? If we assign a string value, then we need to a value for all enum members
enum SeatChoice2 {
  AISLE = 'aisle',
  MIDDLE = 10,
  WINDOW,
  FOURTH = 22,
}
// * When enum transpiled in js it creates a IIFE (Immediately Invoked Function Expression), To overcome this thing we can add const before enum declaration
const enum SeatChoice3 {
  AISLE = 'aisle',
  MIDDLE = 10,
  WINDOW,
  FOURTH = 22,
}
const sbSeat = SeatChoice3.AISLE
console.log({ sbSeat })

// TODO: Interface - An interface declaration is another way to name an object type.
interface IUser {
  readonly dbId: number
  email: string
  userId: number
  googleId?: string
  // startTrial: () => string // * 1way to declare function
  startTrial(): string // * 2way to declare function
  getCoupon(couponName: string, value: number): number
}
// * Reopening of interface: Adding new fields to an existing interface
interface IUser {
  githubToken: string
}
// * Inheritance in interface | Extending an interface : using extends keyword
interface IDemoInterface {
  demo?: boolean
}

// * DIFF: Type - A type cannot be changed after being created, Interface - You can add new fields to an existing interface (Reopening of interface)
// * DIFF: Type - Extending a type via intersections : using &,Interface - Inheritance in interface | Extending an interface : using extends keyword

interface IAdmin extends IUser, IDemoInterface {
  role: 'admin' | 'ta' | 'learner'
}

const user1: IUser = {
  dbId: 22,
  email: 'bhattsagar112@gmail.com',
  userId: 2211,
  githubToken: 'github',
  startTrial: () => user1.email,
  // getCoupon: () => 10,
  getCoupon: (name: 'sagar10', val: 10) => val,
}
// console.log({ user1, email: user1.startTrial(), coupon: user1.getCoupon() }) // ! Typescript will give you an error, if we do not pass the required param values
console.log({ user1, email: user1.startTrial(), coupon: user1.getCoupon('sagar11', 11) })

const admin: IAdmin = {
  role: 'admin',
  dbId: 22,
  email: 'bhattsagar112@gmail.com',
  userId: 2211,
  githubToken: 'github',
  startTrial: () => user1.email,
  getCoupon: (name: 'sagar10', val: 10) => val,
}
console.log({ admin })

export {}
