import React from 'react'

const JSX = ({ byUsing }) => {
  return (
    <section
      className="className"
      style={{
        color: 'red',
      }}
      key="randomKey"
    >
      <h4>Created Nested Element With {byUsing}</h4>
    </section>
  )
}

export default JSX
