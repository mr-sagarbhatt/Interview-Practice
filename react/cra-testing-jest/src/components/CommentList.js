import React from 'react'

const CommentList = ({ allComments }) => {
  if (allComments.length == 0) {
    return <h6>No Comments</h6>
  }

  return (
    <div>
      <ul>
        {allComments.map((item) => {
          return <li key={item.id}>{item.text}</li>
        })}
      </ul>
    </div>
  )
}

export default CommentList
