import React from 'react'
import { FirstRequest, Headers, PostRequest, GlobalInstance, CustomInstance, Interceptors } from './components'
import './axios.css'
// TODO: Global default configurations
// ? But what if we need to call different APIs with different base URLs or authentication methods?
// TODO: Then we can create custom instance for it.
import './axios-instances/global'

const Title = () => {
  return (
    <div className="title">
      <h1>
        <span>axios</span> tutorial
      </h1>
    </div>
  )
}

const Axios = () => {
  return (
    <main>
      <Title></Title>
      <FirstRequest></FirstRequest>
      <Headers></Headers>
      <PostRequest></PostRequest>
      <GlobalInstance></GlobalInstance>
      <CustomInstance></CustomInstance>
      <Interceptors></Interceptors>
    </main>
  )
}

export default Axios
