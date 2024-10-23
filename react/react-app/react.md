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
