// ? function curring and recursion
// * Q: sum(1)(2)(3)(4)() should return 10

const add = (a) => {
  return (b) => {
    if (b) {
      console.log(a, b, `b`, a + b)
      return add(a + b)
    }
    console.log(a, `a`, b, `b`)
    return a
  }
}

console.log(add(2)(3)(5)(4)())
console.log(add(3)(2)(4)(5)(10)(11)())
