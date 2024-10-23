"use strict";
// TODO: 1.Variables | Data Types
// ? syntax: let variableName: type = value
// ? JavaScript has eight data types. Seven primitive types and one object Data type. The primitive types are number, string, boolean, bigint, symbol, undefined, and null. Everything else is an object in JavaScript.
// ? The TypeScript Type System supports all of them and also brings its own special types. They are unknown, any, void & never.
Object.defineProperty(exports, "__esModule", { value: true });
// TODO: Primitive data types: string, number, boolean
// * string
var greetings = 'Hello Sagar';
// greetings = 6 // ! Typescript give an error
greetings.toLowerCase();
console.log({ greetings: greetings });
// * number
var userId = 1;
// userId.toUpperCase() // ! Typescript give an error
console.log({ userId: userId });
// * boolean
var isLoggedIn = true;
console.log({ isLoggedIn: isLoggedIn });
// TODO: Type Inference
// ? In TypeScript, there are several places where type inference is used to provide type information when there is no explicit type annotation.
var myNum = 6; // no explicit type annotation | We have already initialized a value
// ? The type of the myNum variable is inferred to be number. This kind of inference takes place when initializing variables and members, setting parameter default values, and determining function return types.
// myNum = 'sagar' // ! Typescript give an error, however we have not defined the explicit type annotation
myNum.toFixed(2);
console.log({ myNum: myNum });
// TODO: Special data types: any, unknown, never, undefined & null
// * any
// ? If we don't supply a type, it will be of type any by default.
var hero; // ? inferred to be type any, such case define explicit type annotation
var getHero = function () { return 'Thor'; };
hero = getHero();
console.log({ hero: hero });
// let hero: string // ? explicit type annotation
// const getHero = () => true // ! Typescript give an error
// hero = getHero()
// console.log({hero})
// TODO: Functions: Default return type is void
var addTwo = function (num) {
    // num.toUpperCase() // ! Typescript will not give an error, If not provided explicit type annotation in function definition for parameters
    return 'hello'; // ! Typescript will not give an error, If not provided explicit type annotation in function definition for return type
    // return num + 2
};
var resAddTwo = addTwo(5);
// const resAddTwo = addTwo('5') // ! Typescript will not give an error, If not provided explicit type annotation in function definition for parameters
console.log({ resAddTwo: resAddTwo });
// * Default Values
// ? we can omit type annotation for default parameter, it will be inferred by ts
var logInUser = function (name, email, isPaid) {
    if (isPaid === void 0) { isPaid = false; }
    return name;
};
// const logInUser = (name: string, email: string, isPaid = false) => { // ? inferred by ts
//   return name
// }
// const resLogInUser = logInUser('Sagar', 'bhattsagar112@gmail.com', 'sagar') // ! Typescript will give an error, default param will inferred by ts
var resLogInUser = logInUser('Sagar', 'bhattsagar112@gmail.com');
// const resAddTwo = addTwo('5') // ! Typescript will not give an error, If not provided explicit type annotation in function definition
console.log({ resLogInUser: resLogInUser });
// * Return Type
// * Single return type
var addTwoWithOneReturnType = function (num) {
    // return 'hello' // ! Typescript will give an error, because we have provided explicit type annotation in function definition for return type
    return num + 2;
};
var resAddTwoWithOneReturnType = addTwoWithOneReturnType(5);
console.log({ resAddTwoWithOneReturnType: resAddTwoWithOneReturnType });
// * Multiple return type (UNION TYPE (|))
// ? We need to use UNION type for function which return multiple type
// ? it will return either a number or a string
var addTwoWithMultiReturnType = function (num) {
    if (num > 5)
        return num;
    return 'Add Val greater than 5';
};
var resAddTwoWithMultiReturnType = addTwoWithMultiReturnType(5);
console.log({ resAddTwoWithMultiReturnType: resAddTwoWithMultiReturnType });
// ? map : It will automatically
var heros = ['thor', 'spiderman', 'ironman'];
// const heros = [1, 2, 3]
// const heros = []
// ? here we can omit the return type and param type in map function as it will automatically detect from default value, but we can specify the return type so that it can specific type
var arrHeros = heros.map(function (hero) {
    return "hero is ".concat(hero);
});
console.log({ arrHeros: arrHeros });
// TODO: void vs never
// * void
// ? need to define type annotation return type else function will return anything
var consoleError = function (errMsg) {
    console.error(errMsg);
};
consoleError('consoleError');
console.log({ fnConsoleError: consoleError('console: consoleError') });
// * never
// ? The never type represents values which are never observed. In a return type, this means that the function throws an exception or terminates execution of the program.
var handleError = function (errMsg) {
    throw new Error(errMsg);
};
// TODO: objects: ({})
// commonly we are passing a object to a function or returning a object from a function.
var user = {
    name: 'sagar',
    email: 'bhattsagar112@gmail.com',
    isActive: true,
};
var createUser = function (_a) {
    var string = _a.name, boolean = _a.isPaid;
};
// createUser({ name: 'sagar', isPaid: false, email: 'bhattsagar112@gmail.com' }) // ! Typescript will give an error, when we directly pass an object value to a function because we have asked for name and isPAid only, and email is not there
// ! Now when we will assign the object value to a variable, Typescript will not give an error, however we have asked for name and isPAid only
var newUSer = { name: 'sagar', isPaid: false, email: 'bhattsagar112@gmail.com' };
createUser(newUSer);
var createCourse = function () {
    return {
        name: 'reactjs',
        price: 399,
    };
};
console.log({ createCourse: createCourse() });
var createUserType = function (user) { return user; };
console.log({ createUserType: createUserType(user) });
var userProfile = {
    _id: '12345',
    name: 'sagar',
    email: 'bhattsagar112@gmail.com',
    isActive: true,
};
userProfile.email = 'bsaga112@gmail.com';
// userProfile._id = 'asa' // ! Typescript will give an error, because it is a read-only property and we are changing its value
console.log({ userProfile: userProfile });
var cardDetails = {
    cardNumber: 12345,
    cardDate: new Date(),
    cvv: 123,
};
console.log({ cardDetails: cardDetails });
// TODO: Arrays
// ? 2 types of syntax: Both syntax are good, can choose any of them but be consistent with one
// ? Empty array will be type of never
// * 1st way: Using square brackets(Type[])
// const marvelHeros = [] // ? type is never by default
var marvelHeros = []; // ? array of strings
var heroPower = []; // ? array of numbers
marvelHeros.push('spiderman');
heroPower.push(2);
console.log({ marvelHeros: marvelHeros, heroPower: heroPower });
// * 2nd way: Using a generic array type, Array<elementType>(Array<Type>)
var marvelHeros2 = []; // ? array of strings
var heroPower2 = []; // ? array of numbers
var arrUsers = [];
arrUsers.push({
    name: 'sagar',
    isActive: true,
});
console.log({ arrUsers: arrUsers });
// * Array of arrays
var MLmodels = [[255, 255, 255]];
var MLmodels2 = [[255, 255, 255]];
// * ReadonlyArrays
var marvelHeros3 = ['spiderman']; // ? array of strings
var marvelHeros4 = ['spiderman']; // ? array of strings
// marvelHeros3.push('thor') // ! Typescript will give an error, because it is a read-only property and we are changing its value
// marvelHeros4[0] = 'thor' // ! Typescript will give an error, because it is a read-only property and we are changing its value
// TODO: UNION Type(|) -> Combination of two or more data types, recommended to use union type over any, define strict type by adding possible types
var score = 33;
score = 44;
score = '55';
var sagar = { name: 'sagar', id: 334 };
sagar = { username: 'sagar', id: 334 };
// const getDbId = (id: number | string) => {
//   console.log(`DB id is: ${id}`)
// }
// * UNION Narrowing : Narrowing occurs when TypeScript can deduce a more specific type for a value based on the structure of the code.
var getDbId = function (id) {
    // id.toLowerCase() // ! Typescript will give an error, because type of id is either number or string, and toLowerCase() is not applied on type number
    // ? we need to check the type of id before performing any operation on it
    if (typeof id === 'string') {
        id.toLowerCase();
    }
};
getDbId(3);
getDbId('3');
// * UNION with array
var data = [1, 2, 3];
var data2 = ['1', '2', '3'];
var data3 = [1, 2, '3'];
var data4 = [1, 2, '3'];
// * literal assignment
var seatAllotment;
seatAllotment = 'aisle';
// seatAllotment = 'crew' // ! Typescript will give an error, if we pass value other than 3.14
// TODO: Tuples -> Specialized array with some restrictions, need to place type inside of array [string, number], ex: rgb value
// ? A tuple type is another sort of Array type that knows exactly how many elements it contains, and exactly which types it contains at specific positions. But there is one problem that we can perform array methods on it.
// * Array: In array position of string and number type do not matters, and no restriction for array length
var arrUsers1 = [1, 'sb', 'sb', 1];
console.log({ arrUsers1: arrUsers1 });
// * Tuple: In tuples length and order of the array is matters
// const arrUsers2: [string, number] = [1, 'sb'] // ! Typescript will give an error, as we have not added value in specified order of types
// const arrUsers3: [string, number] = ['sb', 1, 'sb'] // ! Typescript will give an error, as we have added more values then specified order of types
var arrUsers3 = ['sb', 1]; // ? Here position of string and number type matters
console.log({ arrUsers3: arrUsers3 });
var rgb; // ? We can use tuple for rgb values where we have only three values which are numbers
rgb = [255, 123, 112];
var userTuple = [112, 'bhattsagar112@gmail.com'];
userTuple[1] = 'bsaga112@gmail.com';
userTuple.push(1, 's');
userTuple.push(1, 's');
userTuple.pop();
console.log({ userTuple: userTuple });
// TODO: Enums -> Provide a set of values, So it will restrict the choice, Ex.can be used in ecommerce to restrict order status
// ? enum value starts with 0 and incremented by 1, we can override this value by assigning a new value
var SeatChoice;
(function (SeatChoice) {
    SeatChoice[SeatChoice["AISLE"] = 0] = "AISLE";
    SeatChoice[SeatChoice["MIDDEL"] = 10] = "MIDDEL";
    SeatChoice[SeatChoice["WINDOW"] = 11] = "WINDOW";
    SeatChoice[SeatChoice["FOURTH"] = 22] = "FOURTH";
})(SeatChoice || (SeatChoice = {}));
// ? If we assign a string value, then we need to a value for all enum members
var SeatChoice2;
(function (SeatChoice2) {
    SeatChoice2["AISLE"] = "aisle";
    SeatChoice2[SeatChoice2["MIDDEL"] = 10] = "MIDDEL";
    SeatChoice2[SeatChoice2["WINDOW"] = 11] = "WINDOW";
    SeatChoice2[SeatChoice2["FOURTH"] = 22] = "FOURTH";
})(SeatChoice2 || (SeatChoice2 = {}));
var sbSeat = "aisle" /* SeatChoice3.AISLE */;
console.log({ sbSeat: sbSeat });
var user1 = {
    dbId: 22,
    email: 'bhattsagar112@gmail.com',
    userId: 2211,
    githubToken: 'github',
    startTrial: function () { return user1.email; },
    // getCoupon: () => 10,
    getCoupon: function (name, val) { return val; },
};
// console.log({ user1, email: user1.startTrial(), coupon: user1.getCoupon() }) // ! Typescript will give you an error, if we do not pass the required param values
console.log({ user1: user1, email: user1.startTrial(), coupon: user1.getCoupon('sagar11', 11) });
var admin = {
    role: 'admin',
    dbId: 22,
    email: 'bhattsagar112@gmail.com',
    userId: 2211,
    githubToken: 'github',
    startTrial: function () { return user1.email; },
    // getCoupon: () => 10, // ! Typescript will not give you an error, if we declare the method without any params
    getCoupon: function (name, val) { return val; },
};
console.log({ admin: admin });
