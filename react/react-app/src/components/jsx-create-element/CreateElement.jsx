import React, { createElement, Fragment } from 'react'

const CreateElement = ({ byUsing }) => {
  // TODO: - The `createElement` method takes three parameters:
  // TODO: - 1) The type of the element (e.g., a string for HTML tags or a React component).
  // TODO: - 2) Props (an object containing properties to pass to the element).
  // TODO: - 3) Children (any child elements or text).
  return (
    <Fragment>
      {createElement(
        'section',
        {
          className: 'className',
          style: {
            color: 'red',
          },
          key: 'randomKey',
        },
        createElement('h4', null, `Created Nested Element With ${byUsing}`),
      )}
    </Fragment>
  )
}

export default CreateElement
