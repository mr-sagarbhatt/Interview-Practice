// ? constructor function

function Counter() {
  this.count = 0

  this.increment = () => this.count++
  this.decrement = () => this.count--
}

const counter1 = new Counter()

console.log(counter1, counter1.count)

counter1.increment()
counter1.increment()
counter1.increment()

console.log(counter1, counter1.count)

counter1.decrement()
counter1.decrement()

console.log(counter1, counter1.count)
