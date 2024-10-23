import React, { useEffect, useRef, useState, useMemo, useCallback, useReducer, useLayoutEffect } from 'react'
import Header from './Header'
import { useAppContext } from '../../context/AppContext'
import useLocalStorage from './useLocalStorage'
import ForwardRefInput, { ForwardRefImperativeHandleInput } from './ForwardRefInput'

const Hooks = () => {
  let colorVar = 'red'
  const [colorState, setColorState] = useState('red')
  const [counter, setCounter] = useState(0)
  const [value, setValue] = useState(0)
  const [number, setNumber] = useState(0)
  const counterRef = useRef(0)
  const inputElem = useRef()

  const useEffectRef = useRef()
  const useLayoutEffectRef = useRef()

  const headerRef = useRef()
  const forwardRefInput = useRef()
  const forwardRefImperativeHandleInput = useRef()

  useEffect(() => {
    useEffectRef.current.style.background = 'red'
  }, [])
  useLayoutEffect(() => {
    useLayoutEffectRef.current.style.background = 'red'
  }, [])

  const initialState = { count: 0 }
  const reducer = (state, action) => {
    switch (action.type) {
      case 'increase': {
        return {
          ...state,
          count: state.count + 1,
        }
      }
      case 'decrease': {
        return {
          ...state,
          count: state.count - 1,
        }
      }
      case 'input': {
        return {
          ...state,
          count: action.payload,
        }
      }
      default: {
        return state
      }
    }
  }
  const [counterReducer, dispatch] = useReducer(reducer, initialState)

  const [userName, setUserName] = useLocalStorage('userName', '')
  const [userID, setUserID] = useLocalStorage('userID', '')

  // TODO: 3. Consuming the context in the component.
  const contextData = useAppContext()
  console.log({ colorVar, colorState, counterRef, contextData })

  const calculateCube = (number) => {
    console.log(`calculateCube function`, number)
    return Math.pow(number, 3)
  }

  // ! on every re-render it create a new copy of a function definition and store on a different location in memory
  //   const headerFun = () => {}
  // TODO: on every re-render it wil not create a new copy of a function definition and so it will have the same location in memory
  const headerFun = useCallback(() => {}, [])

  // ! This function will be executed on every re-render
  //   const cubeResult = calculateCube(number)
  // TODO: This function will be executed on number change only
  const cubeResult = useMemo(() => calculateCube(number), [number])

  // * Strict mode does some addition runtime checks in development mode and it will re-render components as well as the useEffects(for cleanup functions) twice.

  useEffect(() => {
    //   setCounter((prev) => prev + 1) // TODO: It will cause infinite re-render, on changing of state value re render the UI
    counterRef.current += 1 // TODO: It will not cause infinite re-render because on changing of ref value does not re render the UI
    console.log(`useEffect without dependency array - run on initial render(mounting) as well as on any state change`)
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      //   setCounter(counter + 1)
      setCounter((prev) => prev + 1)
    }, 1000)

    console.log(`useEffect with empty dependency array - [] - - run on initial render(mounting) only`)
  }, [])

  useLayoutEffect(() => {
    console.log(`useLayoutEffect gets called before printing the DOM elements.`)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      // TODO: It is better to update state with callback function instead of direct value because it will consider the previously updated value
      // setCounter(counter + 1) // it will only consider the initial value, it will not consider the previously updated value
      setCounter((prev) => prev + 1) // it will consider the previously updated value
    }, 1000)
    console.log(
      `useEffect with colorState dependency array - [colorState] - run on initial render(mounting) as well as on change of any dependency from the dependency array`,
    )

    // * cleanup functions calls on component unmounting
    return () => {
      console.log(`component unmounted`)
    }
  }, [colorState])

  return (
    <>
      <div>
        useState & useEffect
        <div>Color variable - {colorVar}</div>
        <div>Color state - {colorState}</div>
        <button
          onClick={() => {
            colorVar = 'blue' // It will not re-render the UI so we have to use state
            setColorState('blue') // It will re-render the UI
            console.log({ colorVar, colorState })
          }}
        >
          Blue
        </button>
        <div>Hooks component use effect updated {counter} times!</div>
      </div>

      <div>
        <div>useRef</div>
        <button onClick={() => setValue((prev) => prev - 1)}>-1</button>
        {value}
        <button onClick={() => setValue((prev) => prev + 1)}>+1</button>
        <div>Hooks component re-renders {counterRef?.current} times!</div>
        <div>
          <input type="text" ref={inputElem} />
          <button
            onClick={() => {
              console.log({ inputElem, input: inputElem.current })
              inputElem.current.focus()
              inputElem.current.style.background = 'blue'
            }}
          >
            focus
          </button>
        </div>
      </div>
      <div>
        <div>useMemo - Memoized function</div>
        <input type="text" value={number} onChange={(e) => setNumber(e.target.value)} ref={inputElem} />
        <div>Result: {cubeResult}</div>
        <button onClick={() => setValue((prev) => prev + 1)}>+1</button>
      </div>
      <div>
        <div>useCallback & memo</div>
        {/* ! This Header component rendered on every state change */}
        <button
          onClick={() => {
            headerRef.current.style.background = 'Red'
            headerRef.current.value = 1000
          }}
        >
          change input bg
        </button>
        <Header value={value} headerFun={headerFun} headerRef={headerRef}></Header>
        <div>Result: {cubeResult}</div>
        <button onClick={() => setValue((prev) => prev + 1)}>+1</button>
      </div>
      <div>
        <div>useReducer</div>
        <div>
          <button
            onClick={() => {
              dispatch({ type: 'decrease' })
            }}
          >
            Decrease
          </button>
          {counterReducer?.count}
          <button
            onClick={() => {
              dispatch({ type: 'increase' })
            }}
          >
            Increase
          </button>
          <input
            type="text"
            value={counterReducer?.count}
            onChange={(e) => {
              dispatch({
                type: 'input',
                payload: Number(e.target.value),
              })
            }}
          />
        </div>
        <div>
          <h4 ref={useEffectRef}>useEffect</h4>
          <h4 ref={useLayoutEffectRef}>useLayoutEffect</h4>
        </div>
        <div>
          <div>Custom Hook</div>
          <input
            placeholder="userName"
            type="text"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value)
            }}
          />
          <input
            placeholder="userID"
            type="text"
            value={userID}
            onChange={(e) => {
              setUserID(e.target.value)
            }}
          />
          Hello, {userName} with {userID}!
        </div>
        <div>
          <div>Forward Ref</div>
          <div>
            <ForwardRefInput ref={forwardRefInput}></ForwardRefInput>
            <button
              onClick={() => {
                forwardRefInput.current.value = 'Updated Value.'
                forwardRefInput.current.focus()
              }}
            >
              Update Value
            </button>
          </div>
          <div>Forward Ref with useImperativeHandle hook to expose only some of the methods to parent component</div>
          <div>
            <ForwardRefImperativeHandleInput ref={forwardRefImperativeHandleInput}></ForwardRefImperativeHandleInput>
            <button
              onClick={() => {
                forwardRefImperativeHandleInput.current.changeBackground('red')
                forwardRefImperativeHandleInput.current.focus()
              }}
            >
              Change Bg
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Hooks
