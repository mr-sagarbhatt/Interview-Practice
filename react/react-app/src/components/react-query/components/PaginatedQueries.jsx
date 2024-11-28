import { keepPreviousData, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { useState } from 'react'

const fetchFruits = (limit) => (page) => () => {
  return axios.get(`http://localhost:3008/fruits?_limit=${limit}&_page=${page}`)
}

const PaginatedQueries = () => {
  const [limit, setLimit] = useState(4)
  const [page, setPage] = useState(1)

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['fruits', page],
    queryFn: fetchFruits(limit)(page),
    placeholderData: keepPreviousData, // TODO: Prevent loading text by showing on the screen and retain the previous data on the screen.
  })

  if (isLoading) {
    return <h2>Page is Loading...</h2>
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }

  return (
    <div className="container">
      {data?.data &&
        data?.data.map((item) => (
          <div key={item.id} className="fruit-label">
            {item.name}
          </div>
        ))}
      <button onClick={() => setPage((prev) => prev - 1)} disabled={page <= 1 ? true : false}>
        Prev Page
      </button>
      <button onClick={() => setPage((prev) => prev + 1)} disabled={page == 5 ? true : false}>
        Next Page
      </button>
    </div>
  )
}

export default PaginatedQueries
