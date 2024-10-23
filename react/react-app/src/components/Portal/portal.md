# Using Portals in React

In React, a portal is a way to render a component outside of its parent hierarchy in the DOM. This is especially useful for modals, tooltips, or dropdowns that need to break out of their containing element for better positioning and styling.

## Creating a Portal

1. **Import `ReactDOM`**: You need to import the `createPortal` method from `react-dom`.
2. **Create the Portal Component**: Use `ReactDOM.createPortal` to render the component.
