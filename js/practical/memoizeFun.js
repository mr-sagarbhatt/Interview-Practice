// ? HOC to Memoize Values - cache values

const add = (a, b) => a + b

const memoize = (fn) => {
  const cache = new Map()

  return (...args) => {
    const key = args.sort().toString()

    if (cache.has(key)) {
      console.log(`From cache`)
      return cache.get(key)
    }

    const result = fn(...args)
    cache.set(key, result)
    return result
  }
}

const memoizedAdd = memoize(add)

console.log(memoizedAdd(2, 3))
console.log(memoizedAdd(3, 2))
