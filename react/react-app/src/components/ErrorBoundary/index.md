## Error Boundary - Used to catch the JS error, it should be a class component as it uses life cycle methods to catch an error.

In React, an Error Boundary is a component that helps you catch JavaScript errors in the component tree below it, log those errors, and display a fallback UI instead of crashing the entire component tree. Error boundaries can be particularly useful for preventing a whole application from breaking due to errors in a specific part of the UI.

ErrorBoundary component should be a class component and we need to use following 2 methods.

1. getDerivedStateFromError(error) - A static method to update state to display a fallback UI when an error is caught.
2. componentDidCatch(error, errorInfo) - A method to Log the error and perform side effects when an error occurs in a descendant component.

## Key Points About Error Boundaries

**Class Components:** Traditionally, error boundaries are implemented using class components because they need to use lifecycle methods.

**Catch Errors:** They catch errors in:

    - Rendering
    - Lifecycle methods
    - Constructors
    - Not Caught: They do not catch errors in:

**Event handlers**

    - Asynchronous code (e.g., setTimeout, Promises)
    - Server-side rendering
