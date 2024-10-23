import React, { Component } from 'react'
import Counter from './Counter'
import Counter1 from './Counter1'

class LifeCycleMethods extends Component {
  // TODO: In life cycle 3 phases are there,. 1.Mounting, 2.Updating and 3.UnMounting

  constructor() {
    console.log(`constructor method: to initialize values before page load.`)

    super() // TODO: To call the Parent Constructor
    // TODO: In js super() is used to, 1. Calling the Parent Constructor, 2. Accessing Parent Methods, 3. Accessing Static Methods
    // super() is also used for Accessing Parent Methods for ex. super.greet()

    this.state = {
      count: 0,
    }
  }

  componentDidMount() {
    console.log(`componentDidMount method: When component render first time.`)
  }

  componentDidUpdate(prevProp, prevState) {
    console.log({ prevProp, prevState }, this.state.count)
    if (prevState.count !== this.state.count) {
      console.log(`componentDidUpdate method: component updated.`)
    } else {
      console.log(`componentDidUpdate method: component not updated.`)
    }
  }

  componentWillUnmount() {
    console.log(`componentWillUnmount method: component removed.`)
  }

  increment() {
    this.setState({
      ...this.state,
      count: this.state.count + 1,
    })
  }

  render() {
    console.log(`render method: to return jsx.`)
    return (
      <div>
        Life Cycle Methods
        <Counter number={this.state.count}></Counter>
        <Counter1 number={this.state.count}></Counter1>
        <button onClick={this.increment.bind(this)}>increment with normal function</button>
        <button onClick={() => this.increment()}>increment with arrow function</button>
      </div>
    )
  }
}

export default LifeCycleMethods
