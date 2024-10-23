"use strict";
console.log(`Typescript is here`);
console.log(`Typescript is still here`);
// TODO: classes, type modifiers (readonly), Member Visibility/ Access Modifier (public, protected, private)
// TODO: readonly: cannot change the value of readonly property
// TODO: public: member(property or method) is accessible anywhere
// TODO: protected: member is accessible within class or sub class, not outside of the class
// TODO: private: member is accessible within class only, not accessible in sub class or outside of the class
class User {
    constructor(name, email) {
        // #email: string // ? you can also create private property using # as we are creating it in javascript, but use private keyword because it is much more clear to understand
        this.city = ''; // ! Typescript will give an error, if you have declared a class property but not initialized(assigned a default value) or not initialized in the constructor
        this.phone = 760060; // ?  readonly modifier. This prevents assignments to the field outside of the constructor.
        this.name = name; // ! Typescript will give an error, if not declared on top of the constructor
        this.email = email; // ! Typescript will give an error, if not declared on top of the constructor
    }
    // TODO: private method
    deleteToken() {
        console.log('Token Deleted');
    }
}
const sagar = new User('sagar', 'bhattsagar112@gmail.com');
sagar.city = 'Ahmedabad';
// sagar.city = 4 // ! Typescript will give an error, because we are assigning a number to a string
// sagar.phone = 12345 // ! Typescript will give an error, because we are assigning a value to read only variable
// sagar.email // ! Typescript will give an error, because email is private property so you cannot access outside of the class
// sagar.deleteToken() // ! Typescript will give an error, because deleteToken is private property so you cannot access outside of the class
console.log(sagar, sagar.city);
// TODO: Shorter/ Professional way to write the class
class PUser {
    constructor(name, email, city = '') {
        this.name = name;
        this.email = email;
        this.city = city;
        this.phone = 760060;
    }
}
const pSagar = new PUser('sagar', 'bhattsagar112@gmail.com');
pSagar.city = 'Ahmedabad';
console.log(pSagar, pSagar.city);
// TODO: getter-setter
// ? sometimes asked in interviews also
// TODO: getter-setter
class AppleUser {
    constructor(name, email, city) {
        this.name = name;
        this.email = email;
        this.city = city;
        this._courseCount = 1;
        this._courseNames = ['nextJs']; // TODO: protected member can accessible in child class but cannot be accessible outside of the class
        this.phone = 760060;
    }
    getAppleEmail() {
        return `apple${this.email}`;
    }
    // ? Getter Setter for private member
    get courseCount() {
        return this._courseCount;
    }
    // TODO: sometimes asked in interviews also that set accessor cannot have a return type
    // set courseCount1(courseNum): void {} // ! Typescript will give an error, that the set accessor cannot have a return type
    set courseCount(courseNum) {
        if (courseNum <= 1) {
            throw new Error('Course count should be more than 1.');
        }
        this._courseCount = courseNum;
    }
}
const appleUser = new AppleUser('sagar', 'bhattsagar112@gmail.com', 'Ahmedabad');
console.log(appleUser, appleUser.city);
// TODO: Inheritance: Used to get functionality which is already exists in a class, inherit class using extends keyword
// ? Inherit functionalities from parent class, but it cannot acquire the private members
class SubAppleUser extends AppleUser {
    constructor() {
        super(...arguments);
        this.isFamily = true;
    }
    changeCourseCount() {
        // this._courseCount = 4 // ! Typescript will give an error, because _courseCount is private property so you cannot access outside of the class
        this._courseNames = ['TypeScript']; // ? protected member can be accessible in child class but cannot be accessible outside of the class
    }
}
const subAppleUser = new SubAppleUser('sagar', 'bhattsagar112@gmail.com', 'Ahmedabad');
// subAppleUser._courseNames // ! Typescript will give an error, because _courseNames is protected property so you cannot access outside of the class or sub class
console.log(subAppleUser);
// ? class must have interface members, class may have extra members but not allowed to skip any of the interface member
class Instagram {
    constructor(cameraMode, filter, burst) {
        this.cameraMode = cameraMode;
        this.filter = filter;
        this.burst = burst;
    }
}
class Youtube {
    constructor(cameraMode, filter, burst, short) {
        this.cameraMode = cameraMode;
        this.filter = filter;
        this.burst = burst;
        this.short = short;
    }
    createStory() {
        console.log('Story was created!');
    }
}
// TODO: Abstract class, created using abstract keyword, extend abstract class using extends keyword
// ? cannot create an object of an abstract class, you must be inherit the abstract class
// ? class must have abstract methods, class may have extra members but not allowed to skip any of the abstract methods
class TakePhoto {
    constructor(cameraMode, filter) {
        this.cameraMode = cameraMode;
        this.filter = filter;
    }
    getReelTime() {
        // some complex calculation
        return 8;
    }
}
// const sr = new TakePhoto('test', 'test')  // ! Typescript will give an error, cannot create an instance of an abstract class
class NeWInstagram extends TakePhoto {
    constructor(cameraMode, filter, burst) {
        super(cameraMode, filter);
        this.cameraMode = cameraMode;
        this.filter = filter;
        this.burst = burst;
    }
    getSepia() {
        console.log('Sepia');
    }
    getReelTime() {
        // some complex calculation
        return 12;
    }
}
const sr = new NeWInstagram('test', 'test', 1);
console.log({ sr, reelTime: sr.getReelTime() });
// TODO: Generics: Makes components(functions) reusable, defined using <Type>
// TODO: Arrays and functions are generics behind the scene
const score = [];
const names = [];
// TODO: Generics Functions
// TODO: problem -> Here val can be any of the type, so we need to pass multiple types
// ? solution 1 - can use or operator to define possible types
function identityOne(val) {
    return val;
}
// ? solution 2 - can use any -> but not recommended to use any type
function identityTwo(val) {
    // return 'val' // ! Typescript will not give an error, because return type is any
    return val;
}
// TODO: solution 3 - can use generic type
// ? In a case of any -> type of parameter and return type can be anything
// ? In a case of Generics -> <Type> will lock the type of parameter and return type so both will be same
function identityThree(val) {
    // return 'val' // ! Typescript will give an error, type could be any arbitrary type which could be unrelated to string
    return val;
}
console.log(identityThree(3));
// TODO: Shorter way to define Type, (just use T)
function identityFour(val) {
    return val;
}
// TODO: In generics we can pass any type, it can be user defined type also
// TODO: Here we have passed the user defined data type
const i4 = identityFour(4); // ? Here default type is added automatically
const i4Number = identityFour(4);
const i4Bottle = identityFour({
    brand: 'pipal',
    type: 1,
}); // ? Here we have user defined data type - Bottle
console.log(i4, i4Number, i4Bottle);
// TODO: Generics Arrays -> T[] | Array<T>
// ? TODO: Return one value from array
function getSearchProducts(products) {
    // return 3 // ! Typescript will give an error, type could be any arbitrary type which could be unrelated to number
    // Dp some database operations
    const myIndex = 3;
    return products[myIndex];
}
// TODO: Arrow Function // Generally, people use a comma(,) after the Type (ex: <T,>), to distinguish between the ordinary tag(like html or JSX) and generics type
const getMoreSearchProducts = (products) => {
    // Dp some database operations
    const myIndex = 4;
    return products[myIndex];
};
// TODO: Using Type Parameters in Generic Constraints
// ? Here User defined type extends the number type
function anotherFunction(valOne, valTwo, valThree) {
    return {
        valOne,
        valTwo,
    };
}
// console.log(anotherFunction(3, '3')) // ! Typescript will give an error, because we have extended the second val type to number
console.log(anotherFunction(3, 4, {
    connection: '',
    username: '',
    password: '',
}));
// ? Generic class
class Sellable {
    constructor() {
        this.cart = [];
    }
    addToCart(products) {
        this.cart.push(products);
    }
}
// TODO: TS - Go through Narrowing (https://www.typescriptlang.org/docs/handbook/2/narrowing.html)
// ? Detection -> Need to aware of javascript behavior -> Ex: when we check the type of array or null it returns object
// ? typeof type guards -> use typeof for making a extra guard about what type of variable is coming up
// ? Here we need to add logic to handle all the cases
function detectType(val) {
    // return val.toLowerCase() // ! Typescript will give an error, because it can be wither number or string
    if (typeof val === 'string') {
        return val.toLowerCase();
    }
    return val + 3;
}
function provideId(id) {
    if (!id) {
        console.log('Please provide ID');
        return;
    }
    return id.toLowerCase();
}
function isAdminAccount(account) {
    if ('isAdmin' in account) {
        return account.isAdmin;
    }
    return false;
}
console.log(isAdminAccount({
    name: 'sagar',
    email: 'bhattsagar112@gmail.com',
    isAdmin: true,
}));
// TODO: instanceof narrowing
function logValue(x) {
    if (x instanceof Date) {
        console.log(x.toUTCString());
    }
    else {
        console.log(x.toUpperCase());
    }
}
console.log(logValue(new Date()));
console.log(logValue('new Date()'));
// ? IF not provided the return type of isFish function then it returns true or false
// ? "pet is Fish" is a type predicate
function isFish(pet) {
    return pet.swim !== undefined;
}
function getFood(pet) {
    if (isFish(pet)) {
        pet; // ? in isFish function the return type is boolean then it will not identify the pet type, so use type predicate in isFish function the return type
        return 'Fish food';
    }
    else {
        pet;
        return 'Bird food';
    }
}
function getTrueShape(shape) {
    if (shape.kind === 'circle') {
        return Math.PI * shape.radius ** 2;
    }
    return shape.side * shape.side;
}
// TODO: The never type & Exhaustiveness checking -> default shape should be type of never so that we can check for the Exhaustive cases
function getArea(shape) {
    switch (shape.kind) {
        case 'circle':
            return Math.PI * shape.radius ** 2;
        case 'square':
            return shape.side * shape.side;
        case 'rectangle': // ! Typescript will give an error, if we have not check for the rectangle case, because default case is never
            return shape.length * shape.width;
        default:
            const _defaultForShape = shape;
            return _defaultForShape;
    }
}
