import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

// TODO: Steps to achieve infinite scroll
// ? 1) Use useInfiniteQuery hook instead of useQuery hook
// ? 2) The queryFn inside a useInfiniteQuery hook always get a pageParam property for a page number.
// ? 3) Add initialPageParam property in useInfiniteQuery which is used to set the initial page number of the infinite query.
// ? 4) Add getNextPageParam property in useInfiniteQuery which is a method to calculate the next page number. If it doesn't find the next page it returns `undefined` as the next page. It has 2 params: lastPage and allPages. So based on the API intelligence on what the next page is or by manual calculation, the next page needs to be calculated and returned from the getNextPageParam method.
// * lastPage: It contains the entire API response of the last, most recent data fetch.
// * allPages: It is an array of objects, each object is the entire API response of all the past data fetches.

// TODO: `useInfiniteQuery hook` is used to make infinite scroll. Instead of array of data it returns array of pages which contains array of data.
const fetchFruits =
  (limit) =>
  ({ pageParam }) => {
    // TODO: `useInfiniteQuery -> queryFn always receive a pageParam property with a value of page number.`
    return axios.get(`http://localhost:3008/fruits?_limit=${limit}&_page=${pageParam}`)
  }

const InfiniteQueries = () => {
  const [limit, setLimit] = useState(10)
  // TODO: `fetchNextPage` is used to load more data
  // TODO: `hasNextPage` is used to check if it has a next page
  // TODO: `isFetchingNextPage` is used to check if the data is fetching from the API.
  const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['fruits'],
    queryFn: fetchFruits(limit),
    initialPageParam: 1,
    getNextPageParam: (_lastPage, allPages) => {
      if (allPages.length < 5) {
        return allPages.length + 1
      } else {
        return undefined
      }
    },
  })

  // TODO: The useInView hook makes it easy to monitor the inView state of your components. `inView` will be true when the `ref` element will be in view.
  const { ref, inView } = useInView()

  // TODO: It will fetch the next page whenever the isView is true.
  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [fetchNextPage, inView])

  console.log({ data })

  if (isLoading) {
    return <h2>Page is Loading...</h2>
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }

  return (
    <div className="container">
      {/* {data?.data &&
        data?.data?.map((fruit) => {
          return (
            <div className="fruit-item" key={fruit.id}>
              {fruit.name}
            </div>
          )
        })} */}
      {data?.pages &&
        data?.pages?.map((page) => {
          return page.data.map((fruit) => (
            <div className="fruit-item" key={fruit.id}>
              {fruit.name}
            </div>
          ))
        })}
      {/* Infinite Scroll with load more button */}
      {/* <button disabled={!hasNextPage} onClick={fetchNextPage}>
        Load More...
      </button> */}
      {/* Infinite Scroll without load more button */}
      <div ref={ref}>{isFetchingNextPage ? `Loading...` : null}</div>
    </div>
  )
}

export default InfiniteQueries
