import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import AppProvider, { useAppContext } from './context/AppContext'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/Router/Login'
import ProtectedRoute from './components/Router/ProtectedRoute'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: '*',
    element: <p>404 - Not Found</p>,
  },
])

createRoot(document.getElementById('root')).render(
  // TODO: https://react.dev/reference/react/StrictMode
  // * Strict mode does some addition runtime checks in development mode and it will re-render components as well as the useEffects(for cleanup functions) twice.
  <StrictMode>
    {/* TODO: 2. Providing the context to the component. */}
    <AppProvider>
      {/* Comment it for react-query */}
      <RouterProvider router={router} />

      {/* Uncomment it for react-query */}
      {/* <App /> */}
    </AppProvider>
  </StrictMode>,
)
