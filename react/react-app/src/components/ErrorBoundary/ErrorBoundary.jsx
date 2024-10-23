import React from 'react'
import Counter from './Counter'
import ErrorBoundaryClass from './ErrorBoundaryClass'

const ErrorBoundary = () => {
  return (
    <div>
      ErrorBoundary
      <ErrorBoundaryClass>
        <Counter></Counter>
      </ErrorBoundaryClass>
      <ErrorBoundaryClass>
        <Counter></Counter>
      </ErrorBoundaryClass>
    </div>
  )
}

export default ErrorBoundary
