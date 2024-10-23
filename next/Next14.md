<samp>

# APP route

## layout.js or layout.tsx - component that is available across all the pages. Also you can create layout for a specific page.

It is root level or top most level component where all pages are passed as a children.

## page.js or page.tsx - component that is passed as a children in layout.tsx component.

## Routing - done through the conventions (the rules which we need to follow) than configuration.

### conventions

- Routes must be put inside of the app folder.
- Every file that represents a route must be named page.js or page.tsx
- Each folder represents a path in the URL.

### Types of Route - nested - folderName, dynamic - [folderName], nested dynamic - folderName/[folderName]/[folderName]

- dynamic routes value can be accessed using params prop in server components and using router.query in client components.

### Catch-all Segments (required) - [...slug] - Component will be executed only if some params after the parent route were added to the URL otherwise return 404.

- If there are lots of nested dynamic routes involve, we can use catch-all segments to handle all the nested dynamic routes without defining it, all routes will be handled by the Catch-all Segments itself.

### optional Catch-all Segments - [[...slug]] - Component will be executed even if some params after the parent route were not added to the URL.

## Project Organization (File/Folder structure)

- Next.js does not enforce any project organization rules.
- Next.js provide conventions (3 ways).
  1. Safe collocation by default
     - Having related methods or components nearby in the route folder itself, it is safe no user can able to access it, user can access only page.js or page.tsx. Ex. Dashboard needs progressbar and data table components, so we can crete Dashboard route folder along with progressbar and data table components.
  2. Private Folders
     - These folders/subfolders will not be considered by the routing system.
     - To create one, we start the folder name with an underscore.
     - So we can create util methods, UI components (buttons, form, format date utility function etc).
  3. Route Groups
     - Allow us to logically group routes and project files without affecting the URL path structure using round braces ().

## RSC - React Server Components (One of type of React components)

- React Server Components is a new architecture introduced by the React team in version 18 which Next.js was quick to embrace.
- This architecture introduces a new way of creating React components, splitting them into two types:
  1. Server Components (SC)
     - In Next.js all components are server components by default.
     - They may have ability to run tasks such as reading files or fetching data from database.
     - However they don't have ability to use hooks or handle user interactions.
  2. Client Components (CC)
     - To create a Client component, you have to add "use client" at the top of the component.
     - They don't have ability to run tasks such as reading files or fetching data from database.
     - They have ability to use hooks or handle user interactions.

## Navigation - Client side routing

If we use anchor tag <a></a> for navigation it will fetch the entire page again so the page getting reload again and again on every request.
So we have to use Link tag <Link></Link> for the client side routing.

Link tag Advantage

- Link tag is provided by next/link module.
- It stops to send the request to the server, therefor handling the routing in the client side itself.
- Whenever Next.js sees a Link component in the page currently displayed, it automatically prefetches the page.

### Programmatic Navigation

- We can Programmatically navigate using useRouter hook is provided by next/navigation module.
- So we may have to create the component as a client component.
- It provides some methods:
  1. router.push() - send to the specific page.
  2. router.replace() - send to the specific page by replacing the current page.
  3. router.forward() - send to the next page.
  4. router.back() - send to the previous page.

## Rendering

Rendering is the process of converting React components into HTML elements that the browser can understand and display to the user.
This process of rendering takes some amount of time.
You need to know where to do the rendering (client or the server side) based on the needs of the business.

### Types of Rendering:

#### 1. Static Site Generation (SSG)

- Generates HTML at build time.
- Ideal for pages that can be pre-rendered and don’t change often.
- Use the `getStaticProps` function to fetch data during the build process.

#### 2. Server-Side Rendering (SSR)

- Generates HTML on each request.
- Useful for dynamic pages that need fresh data on every visit.
- Implemented using the `getServerSideProps` function.

#### 3. Client-Side Rendering (CSR)

- Renders pages on the client using JavaScript.
- Next.js supports CSR for components that can load data after the initial page load, typically using React hooks like `useEffect`.

#### 4. Incremental Static Regeneration (ISR)

- Allows you to update static pages after the site is built without needing to rebuild the entire site.
- Use the `revalidate` option in `getStaticProps` to specify how often a page should be regenerated.

#### 5. API Routes

- Next.js allows you to create API endpoints that can be called from the client-side.
- Useful for fetching data or performing actions without a separate backend.

`Note: In the App Router of Next.js, getStaticProps and getServerSideProps are not used as they were in the Pages directory. Instead, you achieve similar functionality through server components and the fetch API, but the mechanisms and behavior differ slightly`

### Data Fetching Method:

#### Pages Directory:

- `getStaticProps`: Used for static generation. It runs at build time and allows pre-rendering of pages with static content.
- `getServerSideProps`: Used for server-side rendering. It runs on every request and fetches data server-side.
- `Client-Side Rendering`: In the Pages directory, all components are client-side by default unless you create a specific API route or use server components so you can use React hooks like useEffect to fetch data on the client side.

#### App Router:

- `Static Generation`: Use the fetch API with caching and revalidation options directly in a server component.
- `Server-Side Rendering`: Also achieved by using the fetch API in a server component, but without caching for each request.
- `Client-Side Rendering`: you can use React hooks like useEffect to fetch data on the client side but you must use "use client"; at the top of your file to indicate that the component should be rendered on the client side

## Client-Side Rendering (CSR) - On a very high level majority of the processing is done on the client-side.

Client-side rendering is when component code is transformed into the UI within the browser, in other words, the rendering process happens in the client and not on the server.
React uses CSR for building SPAs.

### There are some drawbacks of CSR: - To solve this we can use SSR

1. Performance:

   - Here, because browser does all the work, namely, data fetching, computing UI, and making HTML interactive, the user's side of the experience might be slow.
   - The user might only see a blank screen/loading spinner until the rendering process (download, parse and execute JS) is done.
   - As more and more features are added, the JS bundle size also increase further increasing user waiting time.

2. SEO

   - Generating HTML that only contains a div tag at the start is not best for SEO as there is no content fot the search engine to index.

## Server-Side Rendering (CSR) - On a very high level majority of the processing is done on the server-side.

### How it works:

- client request to the server, server generate the HTML and send full HTML (Non-interactive UI) and JS reference.
- Now client request JS and making UI interactive.
- Making UI interactive is called the hydration.

### Hydration:

- During hydration, React takes control of the browser, reconstructing the component tree in memory based on the static HTML that was served.
- It carefully plans the placement of interactive elements within this tree. Then, React proceeds to bind the necessary JavaScript logic to these elements.
- This involves initializing the application state, attaching event handlers for actions, such as clicks and mouseovers, and setting up any other dynamic functionalities required for a fully interactive user experience.

### Advantages:

1. SEO

   - SEO is improved because search engine effortlessly index the server-rendered content as they don't have to execute JS.

2. Performance: Provide faster initial page load.
   - User's device immediately shows the HTML content and not a blank screen because all the processing/rendering is done on the server-side and not on the client-side.
   - Note that even though the content is visible instantly, it is not interactive.

### Types of SSR:

1. Server side Generation (SSG)

- SSG occurs at build time, when the application is deployed on the server. This results in pages that are already rendered and ready to serve. It is ideal for content that doesn't change often, like blog posts.

2. Server side rendering (SSR)

- SSR, on the other hand, renders pages on-demand in response to user requests. It is suitable for personalized content like social media feeds, where the HTML depends on the logged-in user

### Drawbacks:

Drawbacks of SSR

1. You have to fetch everything before you can show anything

   - Components cannot start rendering and then pause or "wait" while data is being loaded.
   - If a component needs to fetch data from a database or another source (like an API), this fetching must be completed before the server can begin rendering the page.
   - This can delay the server's response time to the browser, as the server must finish collecting the necessary data before any part of the page can be sent to the client

2. You have to load everything before you can hydrate anything

   - For successful hydration, where React adds interactivity to the server-rendered HTML, the component tree in the browser must exactly match the server-generated component tree.
   - This means all the JavaScript for the components must be loaded on the client before you can start hydrating any of them.

3. You have to hydrate everything before you can interact with anything

   - React hydrates the component tree in a single pass, meaning once it starts hydrating, it won't stop until it's finished with the entire tree.
   - As a consequence, all components must be hydrated before you can interact with any of them.

In short,

1. Having to load the data for the entire page - solve using suspense
2. Load the JavaScript for the entire page - solve using code splitting
3. Hydrate the entire page

- create an "all or nothing" waterfall problem that spans from the server to the client, where each issue must be resolved before moving on to the next one.
- This is inefficient if some parts of your app are slower than others, as is often the case in real-world apps.

### Code Splitting

- Code Splitting allows you to mark specific code segments as not immediately necessary for loading, signalling your bundler to segregate them into separate <script> tags.
- Using 'React.lazy` for code splitting enables you to separate the main section's code from the primary JavaScript bundle.
- The JavaScript containing React and the code for the entire application, excluding the main section, can now be downloaded independently by the client, without having to wait for the main section's code.

### Selective Hydration on the Client

- This is crucial, because by wrapping the main section within `<Suspense>`, you have indicated to React that it should not prevent the rest of the page from not just streaming but also from hydrating.
- This feature, called selective hydration allows for the hydration of sections as they become available, before the rest of the HTML and the JavaScript code are fully downloaded.
- The JavaScript containing React and the code for the entire application, excluding the main section, can now be downloaded independently by the client, without having to wait for the main section's code.

- Selective Hydration offers a solution to the third issue: the necessity to "hydrate everything to interact with anything".
- React begins hydrating as soon as possible, enabling interactions with elements like the header and the side navigation without waiting for the main content to be hydrated.
- This process is managed automatically by React.
- In scenarios where multiple components are awaiting hydration, React prioritizes hydration based on user interactions.

### Drawbacks of Suspense SSR

1. First, even though JavaScript code is streamed to the browser asynchronously, eventually, the entire code for a web page must be downloaded by the user.

- As applications add more features, the amount of code users need to download also grows.
- This leads to an important question: should users really have to download so much data?

2. Second, the current approach requires that all React components undergo hydration on the client-side, irrespective of their actual need for interactivity.

- This process can inefficiently spend resources and extend the loading times and time to interactivity for users, as their devices need to process and render components that might not even require client-side interaction.
- This leads to another question: Should all components be hydrated, even those that don't need interactivity?

3. Third, in spite of servers' superior capacity for handling intensive processing tasks, the bulk of JavaScript execution still takes place on the user's device.

- This can slow down the performance, especially on devices that are not very powerful.
- This leads to another important question: Should so much of the work be done on the user's device?

To solve these 3 issues React provides, React server components (RSC).

## React Server Components (RSC)

- React Server Components (RSC) represents a new architecture designed by the React team
- This approach uses the strengths of both server and client environments, optimizing for efficiency, load times and interactivity.
- The architecture introduces a dual-component model:
  1. Client components:
  2. Server components
- This distinction is not based on the functionality of the components but rather on where they execute and the specific environments they are designed to interact with.

### Advantages of Server components:

- Improved data fetching.
- Reduced bundle size.
- Caching.
- Direct access to server side resources.
- Enhanced security.
- Faster initial page load and first contentful paint.
- improved SEO.
- Efficient streaming.

</samp>
