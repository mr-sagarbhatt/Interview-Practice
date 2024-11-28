import React from 'react'
import { Home, PostsTraditionalWay, PostsRQ, PostDetailsRQ, PaginatedQueries, InfiniteQueries } from './components'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './ReactQuery.css'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const ReactQuery = () => {
  const queryClient = new QueryClient() // which provides all the methods and hooks provided by the react-query.

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/posts">Traditional Posts</Link>
              </li>
              <li>
                <Link to="/rq-posts">RQ Posts</Link>
              </li>
              <li>
                <Link to={`paginated-fruits`}>Paginated Fruits</Link>
              </li>
              <li>
                <Link to={`infinite-fruits`}>Infinite Fruits</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/posts" element={<PostsTraditionalWay />} />
            <Route exact path="/rq-posts" element={<PostsRQ />} />
            <Route exact path="/rq-posts/:postId" element={<PostDetailsRQ />} />
            <Route exact path="/paginated-fruits" element={<PaginatedQueries />} />
            <Route exact path="/infinite-fruits" element={<InfiniteQueries />} />
          </Routes>
        </div>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
    </QueryClientProvider>
  )
}

export default ReactQuery
