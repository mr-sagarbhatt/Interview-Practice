import React, { useEffect, useState } from 'react'
import axios from 'axios'

// TODO: Here we need to manage data fetching manually by defining useStates, useEffect and error handling. So it increase couple of efforts as well as code.
const PostsTraditionalWay = () => {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:3008/posts')
      setPosts(response.data)
    } catch (e) {
      setIsError(true)
    } finally {
      setIsLoading(false)(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  if (isLoading) {
    return (
      <div
        style={{
          color: 'blue',
        }}
      >
        Page is loading...
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
        Error has occurred...
      </div>
    )
  }

  return (
    <div className="post-list">
      {posts
        ? posts.map((post) => (
            <div className="post-item" key={post?.id}>
              <h3 className="post-title">{post?.title}</h3>
              <p className="post-body">{post?.body}</p>
            </div>
          ))
        : null}
    </div>
  )
}

export default PostsTraditionalWay
