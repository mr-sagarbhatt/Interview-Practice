## useSate - Used to crete a state(variables to store the data) in components and updates the UI(re-render the UI) when state changes.

We can pass the default value to it and it will return an array with default value and the function to update the value.
It is better to update state with callback function instead of direct value because it will consider the previously updated value

## useEffect - Used to perform side effects like Fetching Data from the API, Directly updating the DOM, Timers like setTimeout and srtInterval.

In class components, we have lifecycle methods to perform actions in a specific lifecycle stage of our component. For us to do something similar and perform side effects in our functional components, the React team created the useEffect Hook.

It takes 2 arguments callback function and optional dependency array.
There are 3 ways to use it.

1. dependency array is optional so we can omit it (it will run on initial render(mounting) as well as on any state change)
2. we can either pass an empty array (it will run on initial render(mounting) only)
3. with some dependencies (it will run on initial render(mounting) as well as on change of any dependency from the dependency array)

So every useEffect run once when the component is mounted.
We can also return a function(called cleanup function) from the useEffect which will execute when the component is unmounted.

## useRef - allow us to create the mutable variables, which will not re-render the component and it is also used for accessing/ manipulating the DOM elements.

## memo - Used to memoize component, it will re-render only if its prop is changed.

It takes a component as a value and return a memoized component.

`Normal component` will re-rendered from the parent component if any of the state is changed.
`Memoized component` will not re-rendered from the parent component if any of the state is changed until and unless its prop changed.
If we are passing a normal function as a prop in Memoized component, it will also re-render the Memoized component due to referential inequality(because on every re-render it creates a new copy of a function definition and store on a different location in memory)

## useMemo - returns a memoize value.(caching a value so that it doesn't need to ne recalculated.)

It takes 2 arguments.

1. callback function
2. dependency array

The useMemo hook only runs when one of its dependencies gets updated.

## useCallback - cache a function definition between re-renders. It means, it doesn't create multiple instance of same function when re-render happens.

It takes 2 arguments.

1. callback function
2. dependency array

The useCallback hook only runs when one of its dependencies gets updated.
When we memoize the component we should pass the memoized function to it because of referential inequality.
If we are passing a normal function as a prop in Memoized component, it will also re-render the Memoized component due to referential inequality(because on every re-render it creates a new copy of a function definition and store on a different location in memory)

## The useMemo and useCallback functions are similar and used to improve the performance.

The main difference between useMemo and useCallback is:

- useMemo returns a memoized value
- useCallback returns a memoized function

## useContext - Used to manage data globally in the React app.

Allow you to access data from any component without explicitly passing it down through props at every level.
There are 3 steps involves.

1. Creating the context and Provider for the component.
2. Providing the context to the component.
3. Consuming the context in the component.

Mainly it is used to pass the theme and authentication details.

## useReducer - Similar to useState, but instead of providing the state and setter function. It provides state and dispatch function.

It accepts 2 arguments.

1. Reducer function - A function that specifies how the state gets updated.
   - It takes 2 arguments.
     1. state - current state
     2. action - It contains type and payload(data)
   - Here we either directly mutate the state or also get data using payload and mutate the state.
2. Initial state - initial value of the state.

and returns current state and dispatch function.

## useLayoutEffect - Works similarly to useEffect, but it is called before the User Interface gets mounted.

useEffect gets called after printing the DOM elements.
useLayoutEffect gets called before printing the DOM elements.

So we can use useLayoutEffect for measuring DOM elements, animate elements, fixing flickering issue and for API calling.
But React official document says that it can hurt the performance of the React App, so it is recommended to use useEffect hook when possible.

## custom hook - React allow us to create our own hook which is called custom hook.

Logic that can be used by multiple components from a project then we can create a custom hook for it.
We will start the custom hook name with "use" as React hooks.

## forwardRef - Is used to pass ref from parent component to child component.

Let say if you have a input in parent component and button inside a child component and focus input on click of button then we can create a function in parent component and pass it to a child component but you have a button in parent component and want to update the input which is inside child component then either We can pass ref as prop to child components or we can pass ref to child component and wrap it with forwardRef.

We can pass refs as props to components, but forwardRef is specifically designed to allow a functional component to expose its internal ref to its parent.

## useImperativeHandle

The useImperativeHandle hook allows you to customize the instance value that is exposed when using ref with forwardRef. This is particularly useful when you want to expose specific methods or properties of a child component to a parent component.
