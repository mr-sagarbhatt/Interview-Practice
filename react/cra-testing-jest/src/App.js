import logo from './logo.svg'
import './App.css'
import { Basics, CommentForm, CommentList } from './components'
import { useState } from 'react'

function App() {
  const [comments, setComments] = useState([])

  return (
    <div className="App">
      {/* <Basics></Basics> */}
      <CommentForm {...{ setComments }}></CommentForm>
      <CommentList {...{ allComments: comments }}></CommentList>
    </div>
  )
}

export default App
