import React from 'react'

const withDarkMode = (Component) => {
  const styles = {
    backgroundColor: '#212529',
    color: '#eee',
  }

  return (props) => {
    return (
      <div style={styles}>
        <Component {...props}></Component>
      </div>
    )
  }
}

export default withDarkMode
