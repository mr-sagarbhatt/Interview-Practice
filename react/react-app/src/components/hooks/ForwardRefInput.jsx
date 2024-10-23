import React, { forwardRef, useImperativeHandle, useRef } from 'react'

const ForwardRefInput = (props, ref) => {
  return <input ref={ref} name="forwardRefInput" />
}

export const ForwardRefImperativeHandleInput = forwardRef((props, ref) => {
  const inputRef = useRef(null)

  //  TODO: The useImperativeHandle hook allows you to customize the instance value that is exposed when using ref with forwardRef. This is particularly useful when you want to expose specific methods or properties of a child component to a parent component.

  useImperativeHandle(ref, () => ({
    // TODO: Exposing a method to the parent
    focus: () => inputRef.current.focus(),
    changeBackground(value) {
      inputRef.current.style.background = value
    },
  }))

  return <input ref={inputRef} name="forwardRefInput" />
})

export default forwardRef(ForwardRefInput)
