import React, { memo } from 'react'

const Header = ({ forwardRef }) => {
  console.log(`Header rendered!`, forwardRef)
  return (
    <div>
      Header
      <input type="text" ref={forwardRef} />{' '}
    </div>
  )
}

// ! Normal component will re-rendered from the parent component if any of the state is changed.
// export default Header
// TODO: Memoized component will not re-rendered from the parent component if any of the state is changed until and unless its prop change, if we are passing a normal function as a prop here, it will also re-render the Memoized component due to referential inequality(on every re-render it create a new copy of a function definition and store on a different location in memory)
export default memo(Header)
