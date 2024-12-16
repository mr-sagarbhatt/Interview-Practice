import { render, screen } from '@testing-library/react'
import Basics from './Basics'

// TODO: 1. test() Function
// * The test function (also called it in Jest) is used to define a single test case. Inside the test block, you define what you want to check about your component, including rendering it, simulating user actions, and asserting that the component behaves as expected.
test(`test 1`, () => {
  // TODO: First we have to render a component which we are testing
  // TODO: render method in React Testing Library
  // * The render method in React Testing Library is used to render a React component into the DOM for testing purposes. This method is a core part of RTL and is used to simulate the component's behavior within a testing environment.
  render(<Basics></Basics>)

  // TODO: 2. screen object in React Testing Library
  // * The screen object in React Testing Library provides a global object that allows you to query and interact with the rendered DOM. It is essentially an alternative to destructuring queries directly from the render function. The advantage of using screen is that it provides a more concise and consistent API for querying elements, as it doesn't require destructuring individual query methods.

  // * `screen.getByRole():` Used to find an element by its role attribute, which is part of the ARIA specification (Accessible Rich Internet Applications).. exact: false used to find by case insensitive.
  const buttonElem = screen.getByRole('button', { name: 'Test button', exact: false })

  // TODO: `expect():` Used for making assertions in tests, and it's part of Jest, which is commonly used alongside React Testing Library.
  // TODO: `toBeInTheDocument():` A matcher provided by the @testing-library/jest-dom library, which is used to check whether an element is present in the document.
  expect(buttonElem).toBeInTheDocument()
})

// TODO: 2. describe() Function
// * The describe function is used to group related test cases together. It's a way to organize your tests into logical sections. It takes two arguments:
// * 1. A string describing the group of tests.
// * 2. A callback function that contains multiple test() cases.
