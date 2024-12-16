# [React Testing Library](https://testing-library.com/docs/) (How to follow Test Driven Architecture)

# [Cheatsheet](https://testing-library.com/docs/react-testing-library/cheatsheet)

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
- After committing the test files it will not run the previous test files you have run all the test using given options in command line.

## FireEvent & User event

There are 2 ways to Simulating user actions.

1. Using `fireEvent` of `@testing-library/react` - it is synchronous
2. 2. Using `userEvent` of `@testing-library/user-event` - it is asynchronous so we have to add await before using its methods

## Mock API using Mock Service Worker

- When we are performing unit or integration testing we are not making an real API call because it may dependent on external API, and we are making n number of API calls while testing so it may increase load on a server.
- So basically we will mock an API call (simulate the behavior of real API where we replicate the response).
- We will making real API calls when performing Manual testing or End to End testing.

### Steps

1. We will create API request handlers to replicate the APIs.
2. We will create a fake server by importing the setupServer function from msw/node and call it, providing your request handlers as the argument.
3. Integrating MSW with any test runner like jest or vitest. There are three key steps to integrating MSW with any test runner:
   1. Enable mocking before all tests run (server.listen());
   2. Reset any request handlers between tests (server.resetHandlers());
   3. Restore native request-issuing modules after all tests run (server.close()).
4. The UI elements are appeared asynchronously so we will use findBy... method of RTL in test cases.

### Recommended Mock API server

- `msw` (Mock Service Worker) - It is a library that allows you to mock API calls in your application. It is a popular choice for mocking APIs in React applications.
  - Here we will create a mocks folder in src directory.
  - Then we will create a handlers.js file. Here we will mock APIs.
- `json-server` - It is a lightweight server that allows you to mock API calls by serving a JSON file as a mock API.
  - Here we will create a json file with the data.
  - Then we will run this json file (For Ex. db.json) using following command.
  - npm json-server db.json -p 3005 or npx json-server db.json -p 3005

# Vitest vs Jest vs React testing library?

1. `Jest:` Jest is a testing framework developed and maintained by Facebook. It is the most widely used testing tool in the JavaScript ecosystem, especially for React applications. It provides the test runner, assertion library, mocking functionality, and overall testing utilities.
2. `Vitest:` Vitest is a relatively new testing framework created by the developers behind Vite. It is designed to be a fast and modern alternative to Jest, with a focus on speed and simplicity. It works similarly to Jest, but with optimizations that make it faster for modern front-end applications.
3. `React Testing Library (RTL):` React Testing Library is not a full testing framework like Jest or Vitest but a library specifically for testing React components. It focuses on testing components in a way that mirrors how users interact with them, which results in tests that are more robust and meaningful.
   - Key Features of React Testing Library:
     1. `User-Centric Testing:` It encourages tests that simulate real user behavior by querying the DOM and interacting with components the way users would `(e.g., clicking buttons, entering text)`.
     2. `Minimal API:` RTL provides a simple API with methods like `render, fireEvent, and waitFor,` designed to interact with the DOM.
     3. `No implementation details:` RTL encourages you to avoid testing implementation details (such as internal state or method calls), focusing only on how the component behaves from the user's perspective.
     4. `Works with Jest/Vitest:` RTL works alongside Jest or Vitest to provide the necessary utilities for rendering components and interacting with them in tests.
   - To simulate user interactions, you would need an additional library like React Testing Library (RTL), Enzyme, or Cypress (for end-to-end tests).
   - Why You Need React Testing Library (RTL) with Jest or Vitest:
     - React Testing Library (RTL) is specifically built to interact with React components by mimicking user behavior, such as:
       - Rendering components.
       - Querying the DOM for elements (using queries like getByText, getByRole, etc.).
       - Simulating events like clicks, form submissions, or typing.

| Feature                        | **Jest**                                | **Vitest**                                  | **React Testing Library**                 |
| ------------------------------ | --------------------------------------- | ------------------------------------------- | ----------------------------------------- |
| **Type**                       | Test runner, assertion library, mocking | Test runner, assertion library, mocking     | Testing utility for React components      |
| **Mocking function or module** | Yes                                     | Yes                                         | No (but works with Jest/Vitest for mocks) |
| **Snapshot Testing**           | Yes                                     | Yes                                         | No                                        |
| **Code Coverage**              | Built-in                                | Built-in (via Vite)                         | No                                        |
| **Speed**                      | Fast, but slower than Vitest            | Very fast due to Vite optimizations         | N/A (depends on Jest/Vitest)              |
| **Primary Use**                | General-purpose testing framework       | Modern, fast testing (optimized for Vite)   | Testing React components                  |
| **Integration with Vite**      | Supported but not optimized             | Native integration and optimized            | Works with any test runner (Jest/Vitest)  |
| **Popularity**                 | Very popular, widely used               | Growing, newer but rapidly gaining traction | Very popular for React component tests    |
