import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// TODO: Define a service using a base URL and expected endpoints
export const adminApi = createApi({
  reducerPath: 'admin',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3008/' }),
  endpoints: (builder) => ({
    getAccounts: builder.query({
      query: () => `accounts`,
      transformResponse: (res) => res.sort((a, b) => b?.id - a?.id),
      providesTags: ['accounts'],
    }),
    addAccount: builder.mutation({
      query: ({ id, amount }) => ({
        url: 'accounts',
        method: 'POST',
        body: { id, amount },
      }),
      invalidatesTags: ['accounts'],
    }),
    deleteAccount: builder.mutation({
      query: (id) => ({
        url: `accounts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['accounts'],
    }),
    updateAccount: builder.mutation({
      query: ({ id, amount }) => ({
        url: `accounts/${id}`,
        method: 'PATCH',
        body: { amount },
      }),
      invalidatesTags: ['accounts'],
    }),
  }),
})

// TODO: Export hooks for usage in functional components, which are auto-generated based on the defined endpoints
export const { useGetAccountsQuery, useAddAccountMutation, useDeleteAccountMutation, useUpdateAccountMutation } =
  adminApi
