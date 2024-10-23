<samp>

# Typescript ( Used for Type Safety ) (.ts , .tsx for components)

[_*Use typescript playground for example and config*_](https://www.typescriptlang.org/play)

    - Used for Type Safety which is missing in javascript
    - Superset of javascript
    - everything is available in typescript which we can you use in javascript and lot more
    - allow us to write javascript in precise manner so that the code faces lot less error in the run time
    - Error will displayed when we write the code (code editor give a red squiggly line)
    - typescript is a development tool and typescript code will converted in javascript

## what typescript does?

    - static Checking : When we write the code parser or syntax is being analyzed by the IDEs, analyze the code as we type, checking the code at compile time
    - TypeScript actually only performs static type checking at compile-time.
    - Check the code and give a hint that it might get error, still possible our code will run well
    - Helps to figuring out what data is processed, what data is about to coming from any resources, what data is your function going to send out
    - we don't required explicit type checking

## Situations where typescript used

    - A function accepts 2 numbers
    - A function returns a string

## how typescript work?

    - typescript code will converted in javascript

## Syntx

`let variableName: type = value`

# Topics

## Type Safety

    - Type Safety is missing in javascript
    - Ex: If you add number with string value (1 + '1' = 11 | null + 1 = 1 | undefined + 1 = NaN)

## [_*Data Types*_](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)

    Number, String, Boolean, Null, Undefined, Object, Array, Tuples, Any, Never, Void, unknown

    Primitive data types: string, number, boolean
    Object data types: Interface, Class, Enum, Arrays, Tuples
    Special(other) data types: any, unknown, never, undefined & null

    JavaScript has eight data types. Seven primitive types and one object Data type. The primitive types are number, string, boolean, bigint, symbol, undefined, and null. Everything else is an object in JavaScript.
    The TypeScript Type System supports all of them and also brings its own special types. They are unknown, any, void & never.

#### [_*Type Inference*_](https://www.typescriptlang.org/docs/handbook/type-inference.html)

    In TypeScript, there are several places where type inference is used to provide type information when there is no explicit type annotation.
    Ex: let myNum = 6 | Here we have no explicit type annotation | also here We have already initialized a value
    The type of the myNum variable is inferred to be number. This kind of inference takes place when initializing variables and members, setting parameter default values, and determining function return types.

# Two ways of installation (Globally | Locally)

    - Globally : For all projects | Installed in system. Used it for learning
    - Locally : For individual projects we required ts config file for configuration

# Points To Remember (Best practices: "")

## [_*Types*_](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)

    Any: "Not a good practice to use type Any", If possible specify the type. If we don't supply a type, variable will be of type any by default and we can change it through ts config. file
    Number: JavaScript does not have a special runtime value for integers, so there’s no equivalent to int or float - everything is simply number.
    "No need to define explicit type for some case", "Type Inference" will take place when initializing variables and members, setting parameter default values, and determining function return types.
    "For other scenarios we need to define explicit type annotation else type will be any by default."

#### [_*Type Aliases*_](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases)

    Use type aliases for objects so that we don't need to write types at all places where we use that object.

#### [_*void vs never*_](https://stackoverflow.com/questions/37910669/what-is-the-difference-between-never-and-void-in-typescript)

    void: A function that doesn't explicitly return a value implicitly returns the value undefined in JavaScript. Although we typically say that such a function "doesn't return anything", it returns. We usually ignore the return value in these cases. Such a function is inferred to have a void return type in TypeScript.
    never: A function that has a never return type never returns. It doesn't return undefined, either. The function doesn't have a normal completion, which means it throws an error or never finishes running at all or an infinite loop.

## [_*Function*_](https://www.typescriptlang.org/docs/handbook/2/functions.html)

    Return type of function is void, if it will not return anything.
    "Define a return type of a function, so it could be clear whether function will return something or not"

## [_*objects*_](https://www.typescriptlang.org/docs/handbook/2/objects.html)

    Typescript will give an error, when we directly pass an object value to a function which do not match with type annotation. But when we will assign the same object value to a variable, Typescript will not give an error, however the object value do not match with type annotation.

#### Object Properties: [_*Readonly properties*_](https://www.typescriptlang.org/docs/handbook/2/objects.html#readonly-properties), [_*Optional properties(?)*_](https://www.typescriptlang.org/docs/handbook/2/objects.html#optional-properties), [_*intersection Types(&)*_](https://www.typescriptlang.org/docs/handbook/2/objects.html#intersection-types)

    Readonly properties: we can not change value of readonly field, we can use it for mongodb which has unique _id for every record, which should not be manipulated.
    Optional properties: If field is optional, typescript will not throw any error if we do not pass it
    Intersection Types(&):  is mainly used to combine existing object types. "not a good practice to combine object with existing object types"

## [_*Arrays*_](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#arrays)

    2 types of syntax: "Both syntax are good, can choose any of them but be consistent with one"
    1st way: Using square brackets(Type[])
    2nd way: Using a generic array type, Array<elementType>(Array<Type>)

---

    Static/Dynamic Typing is about when type information is acquired (Either at compile time or at runtime)
    Strong/Weak Typing is about how strictly types are distinguished (e.g. whether the language tries to do an implicit conversion from strings to numbers).

## [_*Tuple*_](https://www.typescriptlang.org/docs/handbook/2/objects.html#tuple-types)

    A tuple type is another sort of Array type that knows exactly how many elements it contains, and exactly which types it contains at specific positions. "But there is one problem that we can perform array methods on it."

## [_*Enum*_](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#enums)

    Provide a set of values, So it will restrict the choice, Ex.can be used in ecommerce to restrict order status.
    enum value starts with 0 and incremented by 1, we can override this value by assigning a new value.
    If we assign a string value, then we need to provide a value for all enum members.
    "When enum transpiled in js it creates a IIFE (Immediately Invoked Function Expression), To overcome this thing we can add const before enum declaration"

## [_*Interface*_](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#interfaces)

    An interface declaration is another way to name an object type. created using interface keyword.
    Reopening of interface: Adding new fields to an existing interface.
    Inheritance in inteface | Extending an interface : using extends keyword
    Typescript will not give you an error, if we declare the method without any params but will give you an error, if we do not pass the param values

## [_* Type vs Interface*_](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces)

    "Type - A type cannot be changed after being created, Interface - You can add new fields to an existing interface (Reopening of interface)"
    "Type - Extending a type via intersections : using &, Interface - Inheritance in inteface | Extending an interface : using extends keyword"

</samp>
