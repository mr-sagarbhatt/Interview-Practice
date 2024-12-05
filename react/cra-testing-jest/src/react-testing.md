# [React Testing Library](https://testing-library.com/docs/) (How to follow Test Driven Architecture)

- @testing-library/jest-dom: jest-dom is a companion library for Testing Library that provides custom DOM element matchers for Jest
- @testing-library/user-event: Used to test user interactions

## Why Testing ?

- Whenever a new feature is added in a project then it might be possible that it breaks the existing feature so to avoid this situation, testing libraries (Test Driven Architecture) are used.

## What to test ?

- We need to write test cases according to the functionality (behavior when user interact with the app) of the app.

## Types of testing

1. `Unit Testing:` When we test a component in isolation
2. `Integration Testing:` When we test one or more components
3. `End to End Testing:` Need a browser to test (Automate testing) it, usually done by the automation

## React Testing Library with JEST(RTL) basics

- File Extension suffix must be: `.test.js` | `.spec.js` | `__tests__/.js` (All test files with suffix .js must be inside **test** folder)
- In React Testing Library, testing functions like `test and describe are provided by Jest to organize and execute tests`. These functions help structure the tests, describe the functionality being tested, and allow you to run assertions on your components. Let's break down how these functions work and their typical usage in RTL.

1. `test() or it() Function:` The test function (also called it in Jest) is used to define a single test case. Inside the test block, you define what you want to check about your component, including rendering it, simulating user actions, and asserting that the component behaves as expected.

2. `describe() Function:` The describe function is used to group related test cases together. It's a way to organize your tests into logical sections. It takes two arguments:

   1. A string describing the group of tests.
   2. A callback function that contains multiple test() cases.

3. `beforeEach() and afterEach() Functions:` These functions are used to run some code before or after each test. They are useful for setting up or tearing down test data

## Queries

- Queries are the methods that Testing Library gives you `to find elements on the page`.
- There are several `types of queries ("get", "find", "query")`; the difference between them is whether the query will `throw an error` if no element is found or if it will `return a Promise and retry`.
- Depending on what page content you are selecting, different queries may be more or less appropriate.
- `After selecting an element`, you can use the `Events API or user-event` to fire events and simulate user interactions with the page, or use Jest and jest-dom to make assertions about the element.

| Type of Query         | 0 Matches   | 1 Match        | >1 Matches   | Retry (Async/Await) |
| --------------------- | ----------- | -------------- | ------------ | ------------------- |
| **Single Element**    |             |                |              |                     |
| getBy...              | Throw error | Return element | Throw error  | No                  |
| queryBy...            | Return null | Return element | Throw error  | No                  |
| findBy...             | Throw error | Return element | Throw error  | Yes                 |
| **Multiple Elements** |             |                |              |                     |
| getAllBy...           | Throw error | Return array   | Return array | No                  |
| queryAllBy...         | Return []   | Return array   | Return array | No                  |
| findAllBy...          | Throw error | Return array   | Return array | Yes                 |

### Methods and Objects used in test() ot it() function

1. `render():` The render method in React Testing Library is used to render a React component into the DOM for testing purposes. This method is a core part of RTL and is used to simulate the component's behavior within a testing environment.
2. `screen:` The screen object in React Testing Library provides a global object that allows you to query and interact with the rendered DOM. It is essentially an alternative to destructuring queries directly from the render function. The advantage of using screen is that it provides a more concise and consistent API for querying elements, as it doesn't require destructuring individual query methods.
   1. `screen.getByRole():` Used to find an element by its role attribute, which is part of the ARIA specification (Accessible Rich Internet Applications).. exact: false used to find by case insensitive.
   2. `getByTestId:` A query function used to find elements by their `data-testid attributes`. This method is often used when other more user-centric queries cannot be used.
3. `logRoles():` Primarily used for logging the accessible roles of elements in a container for debugging and accessibility purposes.
4. `expect():` Used for making assertions in tests, and it's part of Jest, which is commonly used alongside React Testing Library.
5. `toBeInTheDocument():` A matcher provided by the @testing-library/jest-dom library, which is used to check whether an element is present in the document.

## Unit Testing and TDD (Test Driven Architecture) (Comment Form Component)

- `Test Driven Architecture:` First we write test cases, then we implement functionality, and then again retest the functionality.

## FireEvent & User event

## Listing all comments unit testing

## Integration testing

## Mock API using Mock Service Worker
