# Lifecycle Methods in React: Class vs Functional Components

In React, lifecycle methods help manage a component's lifecycle, from its initial creation to its removal from the DOM. The approach to lifecycle methods differs between class components and functional components with hooks. Here’s a comparison:

## Class Components

Class components have several built-in lifecycle methods that you can override:

### Mounting

- **constructor**: Initializes state and binds methods.
- **componentDidMount**: Called after the component is mounted. Great for API calls or subscriptions.

### Updating

- **componentDidUpdate**: Invoked immediately after an update occurs. Use this for responding to prop or state changes.
- **shouldComponentUpdate**: Allows you to prevent unnecessary re-renders.

### Unmounting

- **componentWillUnmount**: Used for cleanup, like invalidating timers or cancelling network requests.

### Error Handling

- **componentDidCatch**: Captures errors in the component tree.

## Functional Components with Hooks

With the introduction of hooks in React 16.8, functional components can manage lifecycle events similarly:

### Mounting

- **useEffect(() => { ... }, [])**: Runs after the first render. Good for API calls or subscriptions.

### Updating

- **useEffect(() => { ... }, [dependencies])**: Runs after every render when the specified dependencies change. This is similar to `componentDidUpdate`.

### Unmounting

- Return a cleanup function from **useEffect**: This runs when the component unmounts, similar to `componentWillUnmount`.

### Error Handling

- Functional components can’t use `componentDidCatch`, but you can use the `ErrorBoundary` component for error handling.

## Summary

- **Class Components**: Use specific lifecycle methods to manage component behavior throughout its lifecycle.
- **Functional Components**: Use `useEffect` to handle side effects, covering mounting, updating, and unmounting in one place.

With functional components and hooks, the code can often be more concise and easier to understand, especially for managing related effects together.

# Summary of Lifecycle Methods

| Phase      | Method                            | Description                                                                            |
| ---------- | --------------------------------- | -------------------------------------------------------------------------------------- |
| Mounting   | `constructor`                     | Initialize state and bind methods.                                                     |
|            | `static getDerivedStateFromProps` | Update state based on props before rendering.                                          |
|            | `render`                          | Render the UI.                                                                         |
|            | `componentDidMount`               | Invoked immediately after the component is mounted.                                    |
| Updating   | `static getDerivedStateFromProps` | Update state based on new props.                                                       |
|            | `shouldComponentUpdate`           | Decide whether to re-render.                                                           |
|            | `render`                          | Re-render the UI.                                                                      |
|            | `getSnapshotBeforeUpdate`         | Capture some information before the DOM is updated.                                    |
|            | `componentDidUpdate`              | Invoked after updates are applied.                                                     |
| Unmounting | `componentWillUnmount`            | Cleanup before the component is removed from the DOM.                                  |
| Error      | `static getDerivedStateFromError` | Update state to display a fallback UI when an error is caught.                         |
|            | `componentDidCatch`               | Log the error and perform side effects when an error occurs in a descendant component. |
