# Topics

- React Hooks
- State Management
- Config Drive UI
- Redux Toolkit
- Reusable Components
- Rich and Interactive UI
- Functional Comp.
- Props & State
- List & Keys
- Class Components
- Scaling React Apps
- Best Coding Practices
- React Router
- Optimizing React Apps
- Building Live Projects
- Bundlers & Babel
- JSX
- React.Fragment
- Code Splitting
- Dynamic UI
- Higher Order Comp.
- Pure Components
- Code Splitting
- React Testing Library
- Interview Questions
- Uncontrolled Comp.
- Building Custom Hooks
- Handling Events
- Conditional Rendering
- Tailwind CSS

# Interview Questions:

1. What is React and how does it work?
2. Hooks
3. HOC
4. Life cycle methods
5. State management
6. Redux
7. Custom Hooks
8. Lazy loading
9. Virtual DOM
10. SSR, SSG, CSR
11. Routing (RBAC - Role based access control)
12. Testing
13. Async Task
14. Reusability
15. Performance
16. Asset Optimization
17. Styling - Tailwind
18. Accessibility

- Accessibility
- Security
- Testing
- Performance

## React 18

### Need to create a root using ReactDOM.createRoot() function and pass root element to this function.

### Automatic Batching

If multiple states are updated in a single function it will rerender the components for a single time only.
Use `flushSync` from "react-dom" to rerender the components multiple time.

### start transition

startTransition() is used when states are dependent on each other and you want to update a state after another state is updated.

### Suspense

Suspense will show a loader or fallback UI while data is fetched from the server while using SSR.

## Key in React - In React, the key prop is an essential feature used primarily in lists of elements. It helps React identify which items have changed, are added, or are removed, thereby optimizing rendering and ensuring a more efficient update process.

### What is a Key?

**Purpose:** A key is a special string attribute that needs to be included when creating lists of elements. It serves as a unique identifier for each element in the list.

**Type:** The key should be a unique value within the list (not necessarily globally unique) and is typically a string or number.

### Why Use Keys?

**Performance Optimization:** When React re-renders a list, it uses keys to determine which items have changed. This minimizes DOM manipulations and optimizes rendering performance.

**Component Identity:** Keys help maintain the identity of components. If the key changes, React treats it as a new component and remounts it, potentially losing its state.

### Best Practices for Keys

**Unique IDs:** Whenever possible, use unique identifiers from your data

**Avoid Using Index as Key:** Using the array index as a key can lead to issues, especially if the list is reordered or items are added/removed. This can cause incorrect component states and performance issues.

**Consistency:** Keys should remain stable between renders. If the list order changes, make sure the keys remain the same for the items.

## Routes -

### Protected Routes - Routes which are accessible only after the login(Authentication).

### Private Routes - Routes which are accessible only to some of the roles only(Authorization).

react-router-dom

createBrowserRouter - This will enable client side routing for our web app. It uses the DOM History API to update the URL and manage the history stack.
RouterProvider - All data router objects are passed to this component to render your app and enable the rest of the data APIs.

# [Redux](https://www.youtube.com/watch?v=1zCNdVhdvHE&t=6798s&ab_channel=CoderDost)

Libraries used along with Redux:

- Redux: State management library
- react-redux: Redux state management library for react
- Redux-thunk: Middleware
- Redux-Toolkit
- RTK Query: Library for API fetching (Caching, Pulling mechanism)
- Redux Saga

## Redux Concepts/Terms

### What is Redux?

- A Library
- State management in JS
- A pattern (should follow a particular sequence)
- Independent of framework
- Helps to communicate within the components by overcome the props lifting and props drilling issue
- Access state from anywhere, change state from anywhere

`Redux is a predictable state container for JavaScript apps. It helps you manage the state of your application in a consistent, centralized way. It is most commonly used with React, but it can be used with any JavaScript framework or library.`

#### When to use Redux?

- Big application
- High frequency of state changes

```
Note: Redux can not be used directly with the redux as react uses states to render the elements so we have to use react-redux library.
```

#### Middlewares

`In Redux, middleware is used to extend and enhance the store's abilities. It provides a powerful mechanism for modifying the dispatching process, allowing you to insert custom logic between the time an action is dispatched and the time it reaches the reducer. Essentially, middlewares allow you to intercept, modify, or perform side effects during the dispatch cycle.`

## Redux with React

`Redux manage its states individually and react will not understand redux's states directly, so to map(merge) redux's states to a react's states we are using react-redux library.`

react-redux library provides following 3 things to merge the redux's states to a react's state:

- Generally we create a global `provider` component on top of the components so that store can accessible to all its children components.
- Access state from anywhere in react using `useSelector hook` without prop drilling.
- Change state from anywhere in react using `useDispatch hook` without prop drilling.

```
Note: We can use Redux Toolkit library which provides some advantages over react-redux library.
```

## [Redux Toolkit (RTK) with React](https://redux-toolkit.js.org/tutorials/quick-start)

[RTK APIs](https://redux-toolkit.js.org/introduction/getting-started#whats-included)

1. Create a Redux Store using `configureStore`.
2. Provide the Redux Store to React using `Provider from 'react-redux'`.
3. Create(configure) a Redux State Slice using `createSlice` which automatically creates actions and action creators and return a `reducer`. Or you can also create actions and action creators manually using `createAction` and also create a reducers using `createReducer` APIs.
4. Now we can read data from the store with `useSelector` and dispatch actions using `useDispatch`.

[createAsyncThunk](https://redux-toolkit.js.org/api/createAsyncThunk) - To create async API call in RTK.

```
Note: For API calls RTK query is preferable over `createAsyncThunk`. As RTK query provides caching for same request and polling for network issues etc.
```

## [RTK Query with React](https://redux-toolkit.js.org/rtk-query/overview#basic-usage)

## [Redux Saga (optional - Not recommended)](https://redux-saga.js.org/)

- An intuitive Redux side effect manager.
- Saga dependent on generator function so that it allows you to pause and resume its execution.

# [React Query](https://tanstack.com/query/latest/docs/framework/react/overview)

## packages Used: @tanstack/react-query, @tanstack/react-query-devtool

- It is a library for fetching data in a React Application.

## But why we need separate library for it?

1. Since React is a UI library, there is no specific pattern for data fetching.
2. We typically use the useEffect hook for data fetching and useState hook to maintain component state like loading, error state or the resulting data.
3. If the data is needed throughout the app, then we tend to use state management libraries like Redux.
4. Most of the state management libraries are good for working with client state. Ex.'theme' for an application / whether a modal is open.
5. State management libraries are not great for working with asynchronous or server state.

6) React Query provides a lot of features like caching, polling, retry, etc.

## client vs server state

1. client state:
   - persisted in your app memory and accessing or updating it is, synchronous.
2. server state:
   - Persisted remotely and requires asynchronous APIs for fetching or updating.
   - Has shared ownership.
   - Data can be updated by someone else without your knowledge.
   - UI data may not be in sync with the remote server/database data.
   - Challenging when you have to deal with caching, deduplication of multiple requests for the same data, updating stale data in the background, performance optimization in pagination and lazy-loading etc.

## Main Concepts

- **Query**: A query in React Query is a request for data (usually from an API or external source). It can be associated with certain parameters (like pagination) and provides methods to track its state.

Example:
`const { data, isLoading, isError } = useQuery('posts', fetchPosts);`

- **Mutation**: Mutations are used to modify data (e.g., POST, PUT, DELETE requests) on the server-side. Unlike queries, mutations don’t automatically refetch data.

Example:
`const mutation = useMutation(createPost);`

- **Query Key**: A query key is a unique identifier for each query. It’s used to distinguish one query from another in the cache.

Example:
`const { data } = useQuery(['posts', page], fetchPosts);`

- **useQuery Hook**: It’s the most common hook in React Query, used for fetching and caching data.

Example:
`const { data, error, isLoading } = useQuery('users', fetchUsers);`

- **useMutation** Hook: Used for performing server-side mutations (such as POST/PUT/DELETE requests).

Example:
`const mutation = useMutation(createNewPost);`

- **useQueryClient**: Provides access to the client object, allowing you to perform actions like invalidating queries, manually updating the cache, etc.

## Query Lifecycle and States

- React Query manages multiple states for each query:

1. isLoading: The query is still in the loading state.
2. isError: An error occurred while fetching data.
3. isSuccess: Data fetching was successful.
4. isFetching: Indicates if the query is in the process of being refetched.
5. data: The fetched data.
6. error: Error object when the query fails.

## Key Differences b/w isLoading and isFetching:

1. isLoading:

- true only during the initial load of the query.
- false once the query has either completed or failed (on first load).

2. isFetching:

- true anytime the query is actively being fetched, whether it's the first load or a background refetch.
- false once no fetch operation is happening.

## Summary of Scenarios Where React Query Will Refetch:

1. Window Focus: When the window/tab regains focus.
2. Network Status Change: When the network reconnects after being offline.
3. Query Invalidation: When you manually invalidate queries.
4. Component Mounting: When a component with a query is mounted for the first time.
5. Query Key Changes: When the query key or parameters change.
6. Polling: When using interval-based refetching (refetchInterval).
7. Manual Refetch: When you manually call the refetch function.
8. Background Refetching: When a query is backgrounded and then comes into view.
9. Stale Data: When the data becomes stale based on the staleTime.
10. After Mutation: After a mutation, trigger a refetch of dependent data.

## Steps to follow:

1. Wrap our components with QueryClientProvider.
2. Create an instance of QueryClient and pass as a client prop in QueryClientProvider which provides all the methods and hooks provided by the react-query.
3. Use hooks inside the components to fetch(read operation) the data(useQuery is used) or manipulate(create update, and delete operations) the data(useMutation hook is used).

useQuery Hook
The useQuery hook is used for fetching data. It is typically used to retrieve data from an API, a database, or any other external data source.

useMutation Hook
The useMutation hook is used for modifying data (e.g., creating, updating, or deleting data). Unlike useQuery, which is for fetching data, useMutation handles operations that change data.

## Optimistic Update:

- Optimistic Updates refer to a pattern where the UI is updated immediately in response to an action (e.g., submitting a form, deleting an item) before the request actually completes. This approach provides a more responsive user experience by assuming the server request will succeed, even though the actual server-side operation may still be in progress.

# [axios](https://axios-http.com/docs/intro)

- `Axios is a promise-based HTTP Client for node.js and the browser.` It is isomorphic (= it can run in the browser and nodejs with the same codebase). On the server-side it uses the native node.js http module, while on the client (browser) it uses XMLHttpRequests.
- Alternative to a `fetch API`.
- default method is get method.
- returns a promise
- response data located in data property
- error in error.response

## Different methods:

- axios.get(url) or axios(url)
- axios.post(url)
- axios.put(url)
- axios.patch(url)
- axios.delete(url)

### Set Headers in methods

1. For get, delete, head, options method: 1st argument - API endpoint, 2nd argument - config(Header, withCredentials, etc...)

- axios.get(url,{})
- Example:

```js
const { data } = await axios.get(url, {
  headers: { Accept: 'application/json' },
})
```

2. For other methods: 1st argument - API endpoint, 2nd argument - data and 3rd argument - config(Header, withCredentials, etc...)

- axios.post(url,{data},{})

## Global configurations

- Set global default configurations for all axios requests.
- But what if we need to call different APIs with different base URLs or authentication methods?
- Then we can create `custom instance` for it.

```js
axios.defaults.headers.common['Accept'] = 'application/json'
axios.defaults.baseURL = 'https://api.example.com'
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
```

## Custom Instances

- We can create custom instance for primary API calls in place of global defaults because what if we need to call different APIs with different base URLs or authentication methods.
- We can define multiple instances for multiple API servers.

```js
const authFetch = axios.create({
  baseURL: 'https://course-api.com',
  headers: {
    Accept: 'application/json',
  },
})
```

## Interceptors (we can add it to global as well as custom instances)

- Interceptors in Axios are used to run code or modify requests or responses before they are handled by then or catch. Axios provides two types of interceptors:

1. Request Interceptors: Intercept a request before it is sent to the server.
2. Response Interceptors: Intercept the response before it is handled by the .then() or .catch() block.

### Interceptors are powerful for tasks like:

- Modifying headers globally (e.g., adding authentication tokens).
- Handling request/response errors globally.
- Logging request/response data.
- Retry logic for failed requests.
