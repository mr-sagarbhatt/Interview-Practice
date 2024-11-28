import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { useParams, Link } from 'react-router-dom'

const fetchPostDetails = (postId) => () => {
  return axios.get(`http://localhost:3008/posts/${postId}`)
}

const PostDetailsRQ = () => {
  const { postId } = useParams()
  console.log({ postId })

  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ['posts', postId],
    queryFn: fetchPostDetails(postId),
  })

  if (isLoading) {
    return (
      <div
        style={{
          color: 'white',
        }}
      >
        Page is loading...
      </div>
    )
  }

  if (isFetching) {
    return (
      <div
        style={{
          color: 'white',
        }}
      >
        Refreshing the data...
      </div>
    )
  }

  if (isError) {
    return (
      <div
        style={{
          color: 'red',
        }}
      >
        {error.message}
      </div>
    )
  }

  const { title, body } = data?.data || {}

  return (
    <>
      <div className="post-details-container">
        <div className="post-details-title">{title}</div>
        <div className="post-details-body">{body}</div>
        <Link to={`/rq-posts`} style={{ color: 'white', textDecoration: 'underline' }}>
          Back
        </Link>
      </div>
    </>
  )
}

export default PostDetailsRQ
