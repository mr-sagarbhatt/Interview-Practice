<samp>

# [Node JS](<(https://nodejs.org/en)>) - JavaScript is not a language or framework, it is a JavaScript runtime environment to run JavaScript

`How normally JavaScript code runs? -> Using JavaScript engine placed inside browser.`

`Node js runs JavaScript code without browser using JavaScript engine and it also use libuv library for the backend operations like db connection, file operaions etc.`

`Node js is JavaScript Runtime environment that uses v8 engine to run JavaScript and libuv to perform backend operations both are connected to each other which is called node bindings.`

`In browser JavaScript engine is a runtime which has global object called window and node js which which has global object called global.`

`Node js alternate: Deno.`

## Browser Runtime VS Node JS Runtime:

- Browser Runtime has `window object`, Node JS Runtime has `global object`.
- Browser Runtime has `document object` for DOM, `history` for browser history, `location` for URL, `navigator` for back button, Node JS Runtime doesn't have these objects/APIs because they are browser specific so they doesn't required in Node JS, so Node JS has other APIs/objects which required for a server or JS code like `process`, `__filename`, `__dirname`, `require()` to import JS module or library.
- [List of Node JS Global APIs](https://nodejs.org/docs/latest/api/globals.html).

## Versions: LTS vs Current

- LTS: LTS called Long term support has stable version, always major version has even number
- Current: Current has latest version new Features, always major version has odd number

## How to run code using Node JS?

By 2 ways,

1. [REPL](https://nodejs.org/en/learn/command-line/how-to-use-the-nodejs-repl) called Read, Eval, Print and Loop
   - In command line just type command "node" and it will activate the REPL mode to run the JavaScript code.
   - Basically it will read the JavaScript input, evaluate it, print the output and wait for the other JavaScript input and loop through these phases.
2. create a JavaScript file and run it using node command.
   - Create a JavaScript file and in command line just type command "node {fileName}" and it will run JavaScript code.

[Node Releases](https://nodejs.org/en/about/previous-releases)

## [Node js APIS](https://nodejs.org/docs/latest/api/process.html)

process object or global.process object - return the current Node.js process.

process.argv - Return arguments in terms of array of string, ex: If we run a js file it has node JS executable as first argument (for node), a file which we have run as a second argument (for server.js) and any other argument which we have passed like array, string, object etc.

## Internal of Node JS:

- Node JS have v8 engine to run basic JavaScript and libuv to run some task which are not handled by the v8 engine like read files, create server, connect to database.

`JavaScript Engine -> Node.js APIs like fs, http, path, crypto etc. (written in js) -> Node.js bindings (written in c++) -> libuv (written in c)`

- Here Code that can not be executed directly by the JavaScript Engine will call the corresponding module from the Node.js APIs, these APIs can not perform things directly so it has to use libuv (which interact with the OS) by using Node.js bindings.

### [Node.js GitHub Project](https://github.com/nodejs/node), [libuv GitHub Project](https://github.com/libuv/libuv/tree/v1.x/src)

Here lib folders contains Node.js APIs(libraries like fs, http, path, repl etc) and src contains Node.js bindings.

## Synchronous vs Asynchronous and Non-Blocking I/O

- JavaScript is synchronous(Blocking) by default so it will execute the code line by line and Node.js is asynchronous(Non-Blocking) by default.
- Node.js provides both asynchronous(Non-Blocking) and synchronous(Blocking) ways to perform.
- Event loop is used to manage asynchronous tasks in both js and Node.js. In node js it is implemented using libuv.

### Key Concepts of Non-Blocking I/O:

1. Input/Output (I/O) operations: It include tasks such as reading from or writing to a file, making network requests, or querying a database. These operations can take time to complete, especially over networks or when accessing disks.

2. Blocking vs. Non-Blocking:

- Synchronous(Blocking) code wait for the task to finish.
- Asynchronous(Non-Blocking) code doesn't wait for the task to finish, run the task in the background and move to another task.

3. Event Loop: Node.js uses an event loop to manage operations. When an asynchronous I/O operation is initiated, Node.js registers a callback and continues to execute other code.

- Node.js is called non-blocking I/O because it allows asynchronous processing of I/O operations without pausing the execution of the code.

`In Node.js V8 engine does manage certain asynchronous aspects through its microtask queue(like promise callbacks), it does not implement the full event loop for I/O operations. That role is handled by libuv in the Node.js environment.`

## Single Threaded, Worker Treads and Process

- Javascript is a single-threaded language, meaning that just one line of code may be run at once.
- Node.js is also a single-threaded, but it offers multi-threading capabilities through thread pool and child processes for specific use cases.

- Thread can not run independently we can run it through the process, Process can spawn single thread or multiple threads and executed using CPU core.

### How node.js file executed?

- When we run a Node.js file it will create a process and spawn a main thread(event loop and v8 engine). This main thread occupied a single CPU core to be executed so it will not utilize other CPU cores. That is why node js is called single threaded. The JavaScript engine creates a global execution context and pushed to a call stack (LIFO). Here Synchronous code is executed line by line and asynchronous functions (like I/O operations, timers, or promises) are invoked, they do not block the call stack. Instead, they return immediately, allowing the execution to continue and Once the call stack is empty, the event loop processes any pending asynchronous callbacks.
- For all asynchronous tasks it depends on event loop which is implemented using libuv.
- For asynchronous tasks like to interact with network, JavaScript engine will call the libuv to execute the task so it will call the OS and OS create a thread or multiple thread according to the requirement. So it will utilize the other CPU cores and works like a multi threaded.
- For asynchronous tasks like to interact with file, it will not handle by the CPU core as it will not create a new thread but it will be added to a thread pool and give the output to the event loop to execute the callback.
- Thread pool has a main thread and 4 other thread which we can extend using os module.

## Event loop, event queue (Callback Queue), thread pool

- There are 2 types of operations, Blocking and Non-blocking.
- Node has Non-blocking architecture so it doesn't block the code execution.
- If operation is non-blocking then executed directly but if it is blocking it may execute in main thread (only in some cases) or it will be passed to thread pool or created a new thread for execution by os depending on the operation. So blocking threads are non-blocking because it is executed on the main thread and passed to thread pool or created a new thread for execution by the os depending on the operation.
- When non-blocking operation initiated the control is returned immediately to the next line of code. Once the non-blocking operation is complete (e.g., the file has been read), the associated callback function is placed in the `event queue(FIFO)` then `event loop` will fetch the request, if the request is Non-blocking operation then executed on the `main thread` itself (by event loop and v8 engine which is executed by single thread on single cpu core), if the request is blocking operation (file system or network) then either executed by `thread pool` (for file system) or a new tread (for network) on CPU core.

## Phases of Event loop - 6 phases

- Callbacks should be executed in which order is decided by the phases of Event loop
- All phases denotes a queue

1. timers - executes setTimeout, setInterval callbacks
2. pending callbacks - executes System errors
3. idle, prepare - used by the node js internally, prepare event loop for the next phases and gether information for the upcoming events
4. poll (important phase) - executes all callbacks (all async calls like reading file, network call) except setTimeout, setInterval, setImmediate, and close callbacks
5. check - executes setImmediate callbacks
6. close callbacks - executes close callbacks like socket's close callback, mongodb close connection callback

Micro task phase/ Micro task queue - execute callbacks from process.nextTick(), Promises

When the code is executed event loop registers all the callbacks in the respective queues and then it will execute all the first micro task queue and then other event loop queues, after completing all the phases it will again back to the phase one.

## [Events](https://nodejs.org/api/events.html) and [Event Emitter class](https://nodejs.org/api/events.html#class-eventemitter)

- Node.js is an asynchronous event-driven javaScript runtime.
- It uses observer design pattern .
- The Observer Design Pattern is a behavioral design pattern that defines a one-to-many relationship between objects. In this pattern, an Observer (or listener) registers itself with a Subject (or publisher) to be notified of changes or events. This pattern is commonly used in scenarios where changes in one object need to trigger updates in other objects without tightly coupling them.
- Node.js provides a built-in module called events, which allows you to easily implement the Observer pattern through the EventEmitter class.

Ex:
io.on("connected", () => {})
where io: Emitter, connected: event, () => {} - listener

## [HTTPS](https://nodejs.org/api/https.html) - Create web server

---

# JavaScript Engine vs. JavaScript Runtime in Node.js

## JavaScript Engine

The JavaScript engine is responsible for interpreting and executing JavaScript code. In Node.js, the V8 engine is used.

### Key Components

1. **Parser**:

   - Converts JavaScript code into an **Abstract Syntax Tree (AST)**.
   - Checks for syntax errors.

2. **Compiler**:

   - Translates the AST into **bytecode** or machine code.
   - Uses **Just-In-Time (JIT) compilation** for performance optimization.

3. **Interpreter**:

   - Executes the compiled bytecode.
   - Interacts with the compiler for efficient execution.

4. **Memory Management**:

   - Handles memory allocation for variables and objects.
   - Manages **garbage collection** to free up memory no longer in use.

5. **Execution Context**:

   - Maintains the context for executing code, including:
     - **Variable environments** (scope)
     - **Closure contexts**

6. **Call Stack**:
   - A LIFO (Last In, First Out) data structure.
   - Keeps track of function calls and their execution contexts:
     - When a function is called, its context is pushed onto the stack.
     - When the function completes, it is popped off.

## JavaScript Runtime

The JavaScript runtime provides the environment in which JavaScript code runs, integrating the engine with additional capabilities.

### Key Components

1. **JavaScript Engine**:

   - The V8 engine that executes JavaScript code, including all engine components (parser, compiler, interpreter, memory management, and call stack).

2. **Node.js APIs**:

   - Built-in modules and libraries for server-side functionality, including:
     - **File System (`fs`)**: For file operations.
     - **HTTP (`http`)**: For creating web servers and managing requests.
     - **Path (`path`)**: For handling file and directory paths.
     - **Events (`events`)**: For managing events and creating event emitters.

3. **Event Loop**:

   - Manages asynchronous operations by processing events and executing queued callbacks.
   - Ensures that non-blocking code can execute smoothly, allowing for efficient handling of I/O.

4. **libuv**:

   - A library that abstracts asynchronous I/O operations.
   - Enables Node.js to perform non-blocking operations on files, network, etc.

5. **Callback Queue**:
   - Holds callbacks that are ready to be executed after the call stack is empty.
   - Includes both microtasks (like resolved promises) and regular callbacks from events.

## Summary of Differences

| Aspect                      | JavaScript Engine                                                                 | JavaScript Runtime                                                                                    |
| --------------------------- | --------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| **Definition**              | The core component that executes JavaScript code.                                 | The environment providing context for executing JavaScript, including the engine and additional APIs. |
| **Key Components**          | Parser, Compiler, Interpreter, Memory Management, Execution Context, Call Stack   | JavaScript Engine, Node.js APIs, Event Loop, libuv, Callback Queue                                    |
| **Call Stack Role**         | Manages function calls and execution contexts, crucial for synchronous execution. | Not a separate component; part of the engine's execution management.                                  |
| **Functionality**           | Parsing, compiling, and executing JavaScript code.                                | Includes the engine plus APIs, event loop, and features for server-side programming.                  |
| **Asynchronous Operations** | Not applicable                                                                    | Managed by the event loop and libuv.                                                                  |

## Conclusion

The **JavaScript Engine** (like V8) focuses on executing JavaScript code through parsing, compiling, and managing execution contexts (including the call stack). The **JavaScript Runtime** in Node.js encompasses the engine along with additional features and APIs that enable server-side development, manage asynchronous operations, and provide a complete environment for running JavaScript applications. The **call stack** plays a crucial role in maintaining the order of function execution, enabling synchronous behavior within the overall runtime environment.

---

# Event Loop in JavaScript vs. Node.js

The event loop is a fundamental concept in JavaScript that allows for asynchronous programming, but its implementation and context differ between JavaScript (in browsers) and Node.js. Here’s a breakdown of how the event loop works in both environments:

## Event Loop in JavaScript (Browsers)

1. **Single-threaded Execution**:

   - JavaScript in browsers runs on a single thread, meaning it can only execute one piece of code at a time.

2. **Call Stack**:

   - When functions are invoked, they are pushed onto the call stack. When they complete, they are popped off the stack.

3. **Event Loop**:

   - The event loop continuously checks the call stack and the task queue (or event queue).
   - If the call stack is empty, the event loop takes the first task from the task queue and pushes it onto the call stack for execution.

4. **Web APIs**:

   - Asynchronous operations (like `setTimeout`, AJAX requests, and DOM events) are handled by the browser's Web APIs.
   - Once an asynchronous operation completes, a callback is added to the task queue.

5. **Microtasks Queue**:
   - Promises and other microtasks (like Mutation Observers) are handled in a separate queue.
   - The microtasks queue is processed before the next task from the task queue is executed, ensuring higher priority for promise resolution.

## Event Loop in Node.js

1. **Single-threaded with libuv**:

   - Node.js also runs JavaScript on a single thread, but it leverages the libuv library for asynchronous I/O operations, which can use multiple threads for non-blocking tasks.

2. **Call Stack**:

   - Similar to the browser environment, Node.js maintains a call stack for executing synchronous JavaScript code.

3. **Event Loop**:

   - The event loop in Node.js is more complex due to additional phases (timers, I/O callbacks, idle, poll, check, and close callbacks) that are part of the libuv implementation.
   - Each phase has specific tasks that it processes in order.

4. **Asynchronous I/O**:

   - I/O operations are offloaded to libuv, which manages them in a thread pool. When an I/O operation completes, its callback is queued in the event loop to be executed during the appropriate phase.

5. **Microtasks Queue**:
   - Node.js also supports microtasks (like promise resolutions) that are handled similarly to how they are in browsers, processed after the current stack execution but before the next event loop phase.

## Summary

- **JavaScript in Browsers**: The event loop is primarily responsible for handling UI events, timers, and asynchronous calls via Web APIs, with a simpler structure focused on tasks and microtasks.

- **Node.js**: The event loop is implemented through libuv, with a more intricate design that includes multiple phases for handling various types of I/O operations, timers, and callbacks.

Both environments share the fundamental concept of the event loop but differ in implementation details and the types of asynchronous operations they manage.

---

# Handling Asynchronous Tasks in Node.js

In Node.js, handling a mix of asynchronous tasks like timers, callbacks, promises, network calls, file system tasks, and heavy calculations involves a combination of the event loop, the thread pool, and worker threads. Here's how each type of task would be managed:

## 1. Timer

- **Mechanism**: Node.js uses the event loop to handle timers.
- **Behavior**: When a timer (e.g., `setTimeout`) is set, it schedules a callback to be executed after the specified time. Once the timer expires, the callback is queued in the callback queue to be executed when the call stack is empty.

## 2. Callback

- **Mechanism**: Callbacks are queued in the event loop.
- **Behavior**: When an asynchronous operation completes (like a network request), the associated callback is pushed to the callback queue. It will be executed when the call stack is empty.

## 3. Promise

- **Mechanism**: Promises use the microtask queue.
- **Behavior**: When a promise is resolved or rejected, the `.then()` or `.catch()` callbacks are added to the microtask queue. The event loop processes this queue before moving to the next event loop tick, ensuring that promise callbacks run before other callbacks in the callback queue.

## 4. Network Call

- **Mechanism**: Network calls are handled asynchronously by Node.js using the event loop and the `thread pool` (via `libuv`).
- **Behavior**: When a network request (e.g., using `http` or `axios`) is made, it runs in the background. Once the response is received, the callback associated with that request is added to the callback queue for execution.

## 5. File System Task

- **Mechanism**: File system operations also use the `thread pool` for non-blocking I/O.
- **Behavior**: When a file system task (e.g., reading a file with `fs.readFile`) is initiated, it is handed off to a thread in the thread pool. Once the operation completes, the callback is added to the callback queue.

## 6. Heavy JS Calculations

- **Mechanism**: Heavy computations should ideally be offloaded to `worker threads` to prevent blocking the event loop.
- **Behavior**: If the calculations are executed in the main thread, they will block the event loop, preventing other tasks from being processed until completion. To avoid this, you can use worker threads (via the `worker_threads` module) to run the calculations in parallel. The result can be communicated back to the main thread via messaging.

## Summary of Execution Flow

1. **Timers**: Scheduled, then executed after expiration (callback queue).
2. **Callbacks**: Added to the callback queue upon completion of their asynchronous operation.
3. **Promises**: Their resolution/rejection handlers are added to the microtask queue and executed before the callback queue.
4. **Network Calls**: Asynchronous, with callbacks added to the callback queue upon completion.
5. **File System Tasks**: Non-blocking, with callbacks added to the callback queue after completion.
6. **Heavy Calculations**: Ideally handled by worker threads to avoid blocking the event loop.

## Execution Order

- The event loop checks the call stack and executes any functions there.
- Once the call stack is empty, it processes the microtask queue (e.g., promise callbacks).
- Next, it processes the callback queue (e.g., timers, network call callbacks, file system callbacks).
- If using worker threads, their results will also be handled as messages when they complete.

By leveraging these mechanisms, Node.js efficiently manages various types of tasks while maintaining responsiveness.

</samp>
