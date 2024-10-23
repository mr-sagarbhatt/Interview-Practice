import React, { Component } from 'react'

export default class Counter extends Component {
  constructor() {
    super()
    console.log(`Counter sub component constructor method: to initialize values before page load.`)
  }

  componentDidMount() {
    console.log(`Counter sub component componentDidMount method: When component render first time.`)
  }

  componentDidUpdate(prevProp, prevState) {
    console.log({ prevProp, prevState }, this.props.number)

    if (prevProp.number !== this.props.number) {
      console.log(`Counter sub component componentDidUpdate method: component updated.`)
    } else {
      console.log(`Counter sub component componentDidUpdate method: component not updated.`)
    }
  }

  componentWillUnmount() {
    console.log(`Counter sub component componentWillUnmount method: component removed.`)
  }

  render() {
    console.log(`Counter sub component render method: to return jsx.`)
    return <div>Class component: {this.props.number}</div>
  }
}
