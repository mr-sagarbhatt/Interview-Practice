import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

// * GET Query
const fetchPosts = () => {
  return axios.get(`http://localhost:3008/posts`)
}

// * POST mutation
const addPost = (post) => {
  return axios.post(`http://localhost:3008/posts`, post)
}

// TODO: Here we don't need to manage data fetching manually by defining useStates, useEffect and error handling. So it doesn't increase couple of efforts as well as code.
// TODO: Additionally it also provides
// ? dev tools: To check inner working of react-query,
// ? caching,
// ? validations and much more.

// TODO: Features provided by react-query
// ? Query cache:
// * - React-query provides `query cache` for 5 mins by default, so it doesn't set `isLoading state` to true and relies on the cache data for the subsequent requests. however the server's data might get updated during this period and cache may not have latest data so it does `background refetch` is triggered for the same query. If fetch is successful new data gets updated in the UI. And it provides `isFetching state` for it.
// ? StaleTime property (Used in conjunction with Query cache):
// * - Every single time when the component unmounts, revisit or refresh the page, or changed the browser's tab it will `refetch the query` as it assumes that data is `stale(outdated)` and it is changing every time. So react-query provides `staleTime property` to change it. The default value of `staleTime is 0`(in milliseconds). So if provide the staleTime value till that time it will consider the data is `fresh` and after expiration of that time is again flag the data is `stale(outdated)`.
// ? Polling
// * - Used where we need to make network calls in regular intervals of time.
// * - `refetchInterval property` is used for poling. The default value is false. However we can pass value in milliseconds to enable it.
// * - The polling will stop once you change the Browser's Tab. To enable it you can set `refetchIntervalInBackground` it to true, which is false by default.

// TODO: useQuery on click
// ? enabled Property
// * - As we know every single time when the component unmounts, revisit or refresh the page, or changed the browser's tab it will `refetch the query`.
// * - But now we want to fetch it on click of a button only. So first we need to change the `enabled property` to false so it will disable the automatic refetching when query(component) get mounts or changes query keys.
// * -Then we can call `refetch function returned from the useQuery hook` to make fetch request on click of a button.

const PostsRQ = () => {
  // TODO: useQuery Hook: It’s the most common hook in React Query, used for fetching and caching data.
  // TODO: Query Key: A query key is a unique identifier for each query. It’s used to distinguish one query from another in the cache.
  // * Examples:
  // * /posts: ["posts"]
  // * /posts/1: ["posts", post.id]
  // * /posts/1/comments: ["posts", post.id, "comments"]
  // TODO: Query Function: A callback function that always return a promise.
  const { data, isLoading, isError, error, isFetching, refetch } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    // staleTime: 30000,
    // refetchInterval: 1000,
    // refetchIntervalInBackground: true,
    // enabled: false,
  })

  // TODO: useMutation Hook: It’s the most common hook in React Query, used for adding, updating and deleting the data.
  const queryClient = useQueryClient()
  // ? Query invalidation:
  // * - it invalidates the query cache when the query key changes. So if we change the query key, it will fetch the data from the server instead of relying on the cache data.

  const {
    mutate,
    isError: isAddPostError,
    error: addPostError,
  } = useMutation({
    mutationFn: addPost,
    // onSuccess: (newData) => {
    //   // TODO: After the mutation the query(list of posts) data will not be refetch again so the list of the data will be not updated. We have to refetch it by invalidate the related cache. It required the `invalidateQueries` method of queryClient which we have passed in QueryClientProvider parent component. But here it will make a new API call to fetch only one new record which we have added. So we can update cached query data using `setQueryData` method of queryClient.
    //   // queryClient.invalidateQueries('posts')
    //   queryClient.setQueriesData(['posts'], (oldQueryData) => {
    //     return {
    //       ...oldQueryData,
    //       data: [...oldQueryData.data, newData.data],
    //     }
    //   })
    // },

    // TODO: Optimistic Update: Optimistic Updates refer to a pattern where the UI is updated immediately in response to an action (e.g., submitting a form, deleting an item) before the request actually completes. This approach provides a more responsive user experience by assuming the server request will succeed, even though the actual server-side operation may still be in progress. We can achieve using onMutate, onError and onSettled properties.
    onMutate: async (newPost) => {
      // TODO: Cancel any outgoing refetch so that they do not override the optimistic update and we will use `cancelQueries` method of a queryClient.
      // * Why we are canceling it: To prevent race conditions and to ensure consistent state.
      await queryClient.cancelQueries(['posts'])
      // TODO: We need a old query data to roll back in case of mutation fail and we will use `getQueryData` method of a queryClient.
      const previousPostsData = queryClient.getQueryData(['posts'])

      queryClient.setQueriesData(['posts'], (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [...oldQueryData.data, { ...newPost, id: String(oldQueryData?.data?.length + 1) }],
        }
      })

      // TODO: Returning previous post data in case of error.
      return { previousPostsData }
    }, // * called before the mutation function fired and receives same payload as mutation function.
    onError: (_error, _post, context) => {
      // TODO: context gives an access to the previous post data returned from the onMutate method which we will set to the cached query data.
      queryClient.setQueryData(['posts'], context.previousPostsData)
    },
    onSettled: () => {
      // TODO: Triggered if any error occurred or not. Here we may fetch query data so that it can sync with the server.
      // TODO: If there are any concurrent data updated happen we can omit this step.
      queryClient.invalidateQueries(['posts'])
    },
  })

  // For mutation
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

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

  console.log({ isLoading, isFetching, data })

  const handleSubmit = (e) => {
    e.preventDefault()

    const post = { title, body }
    console.log({ post })
    mutate(post)
    setTitle('')
    setBody('')
  }

  return (
    <div className="post-list">
      <form onSubmit={handleSubmit}>
        <input onChange={(e) => setTitle(e.target.value)} placeholder="Enter post title" value={title} />
        <input onChange={(e) => setBody(e.target.value)} placeholder="Enter post body" value={body} />
        <button type="submit">Post</button>
      </form>
      {data?.data
        ? data?.data.map((post) => (
            <Link to={`/rq-posts/${post?.id}`}>
              <div className="post-item" key={post?.id}>
                <h3 className="post-title">{post?.title}</h3>
                <p className="post-body">{post?.body}</p>
              </div>
            </Link>
          ))
        : null}
      <button onClick={refetch}>Fetch Posts</button>
    </div>
  )
}

export default PostsRQ
