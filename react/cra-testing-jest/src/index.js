import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

// TODO: Browser/Client/React Testing
// import { worker } from './mocks/browser'
// // TODO: Start the worker to intercept requests (only in development)
// if (process.env.NODE_ENV === 'development') {
//   console.log(`object`)
//   worker
//     .start({
//       onUnhandledRequest: 'bypass',
//     })
//     .then(() => {
//       console.log('MSW worker is running')
//     })
// }

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
