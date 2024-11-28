//  ? HOC that runs function only once

const add = (a, b) => a + b

const runOnce = (fn) => {
  let hasOnce = false
  return (...args) => {
    if (!hasOnce) {
      hasOnce = true
      console.log(`Running...`)
      return fn(...args)
    }
    console.log(`Run only once.`)
  }
}

const addOnce = runOnce(add)

console.log(addOnce(2, 3))
console.log(addOnce(2, 3))
console.log(addOnce(2, 3))
console.log(addOnce(2, 3))
console.log(addOnce(2, 3))
