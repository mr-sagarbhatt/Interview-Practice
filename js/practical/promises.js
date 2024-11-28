const promise = new Promise(() => {})
console.log({ promise })

const promise1 = new Promise((resolve) => {
  resolve()
})
console.log({ promise1 })

const promise2 = new Promise((resolve, reject) => {
  reject()
})
console.log({ promise2 })

const promise3 = new Promise((resolve) => {
  resolve('Resolved')
})
console.log({ promise3 })
