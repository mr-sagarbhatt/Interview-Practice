import React, { useState, Suspense, lazy, useEffect } from 'react'
import {
  WithoutCodeSplitComponent,
  codeSplitFunctionToSplit,
  JSX,
  CreateElement,
  Hooks,
  HOC,
  Recursion,
  LifeCycleMethods,
  ErrorBoundary,
  Portal,
} from './components'
import Logout from './components/Router/Logout'
import { useAppContext } from './context/AppContext'
const LazyCodeSplitComponent = lazy(() => import('./components/code-splitting/CodeSplitComponent'))

// ! Code splitting of a function - Not recommended
console.log(codeSplitFunctionToSplit(10, 20))

// TODO: Code splitting of a function through a callback
import('./components/code-splitting/codeSplitFunctionToSplit').then((result) => {
  console.log(result.default(10, 20))
})

function App() {
  const { isAuthenticated, login, logout } = useAppContext()

  useEffect(() => {
    const API_ENDPOINT = `http://localhost:3002/`
    let data
    const fetchData = async () => {
      const res = await fetch(API_ENDPOINT)
      const data = await res.json()
      console.log(`fetch local data:`, data)
      return data
    }
    fetchData()
  }, [])

  return (
    <>
      <Logout></Logout>
      {/* Code Splitting */}
      <>
        {/* * Without code Splitting */}
        <WithoutCodeSplitComponent></WithoutCodeSplitComponent>
        {/* * With code Splitting - But we can not call it directly we need to wrap it with the Suspense*/}
        {/* <LazyCodeSplitComponent></LazyCodeSplitComponent> */}
        <Suspense fallback={<div>Loading...</div>}>
          <LazyCodeSplitComponent></LazyCodeSplitComponent>
        </Suspense>
      </>
      {/* JSX and create element */}
      <>
        <JSX byUsing="JSX."></JSX>
        <CreateElement byUsing="React.createElement."></CreateElement>
      </>
      {/* Hooks */}
      <>
        <Hooks></Hooks>
      </>
      {/* HOC */}
      <>
        <HOC></HOC>
      </>
      {/* Recursion */}
      <>
        <Recursion></Recursion>
      </>
      {/* Life cycle methods */}
      <>
        <LifeCycleMethods></LifeCycleMethods>
      </>
      {/* ErrorBoundary */}
      <>
        <ErrorBoundary></ErrorBoundary>
      </>
      {/* Portal */}
      <>
        <Portal></Portal>
      </>
    </>
  )
}

export default App
