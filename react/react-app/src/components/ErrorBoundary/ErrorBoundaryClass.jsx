import React, { Component } from 'react'

export default class ErrorBoundaryClass extends Component {
  constructor() {
    super()

    this.state = {
      error: null,
      errorInfo: null,
    }
  }

  static getDerivedStateFromError(error) {
    return { error: error }
  }

  componentDidCatch(error, errorInfo) {
    return this.setState({
      error: error,
      errorInfo: errorInfo,
    })
  }

  render() {
    if (this.state.error) {
      return (
        <div>
          <div>Something went wrong..!</div>
          <div
            style={{
              whiteSpace: 'pre-wrap',
            }}
          >
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state?.errorInfo?.componentStack && this.state?.errorInfo?.componentStack}
          </div>
        </div>
      )
    } else {
      return this.props.children
    }
  }
}
