<!--toc:start-->

- [9 Patterns Every Developer Should Know](#9-patterns-every-developer-should-know)
- [Integration approaches / How Micro Frontends Work?](#integration-approaches-how-micro-frontends-work)
  - [The Shell Application (or Container)](#the-shell-application-or-container)
  - [Independent Micro Frontend Modules](#independent-micro-frontend-modules)
  - [Loading and Rendering Micro Frontends](#loading-and-rendering-micro-frontends)
    - [Client-Side Composition / Build-time integration](#client-side-composition-build-time-integration)
    - [Server-Side Composition](#server-side-composition)
    - [Edge-Side Composition](#edge-side-composition)
    - [Run-time integration via iframes](#run-time-integration-via-iframes)
    - [Run-time integration via JavaScript](#run-time-integration-via-javascript)
    - [Run-time integration via Web Components](#run-time-integration-via-web-components)
- [Communication Between Micro Frontends](#communication-between-micro-frontends)
  - [Global Event Bus](#global-event-bus)
  - [Shared State Management](#shared-state-management)
  - [URL-Based Communication](#url-based-communication)
  - [Custom APIs or Services](#custom-apis-or-services)
  - [Window Messaging (PostMessage API)](#window-messaging-postmessage-api)
  - [Local Storage or Session Storage](#local-storage-or-session-storage)
  - [Custom Events](#custom-events)
- [Sources](#sources)
- [Learn More](#learn-more)
<!--toc:end-->

## 9 Patterns Every Developer Should Know

1. **Micro Apps:** Offers high autonomy and fault isolation but requires careful routing management and caching strategies to optimize performance.
2. **Microfrontends with iFrames:** Provides strong isolation and ease of implementation but can have performance overhead and challenges in maintaining a cohesive user experience.
3. **App Shell:** Ensures a consistent user experience and centralized management of shared services but requires compatible technology stacks and optimized performance strategies.
4. **Microfrontends with NPM:** Promotes modular development and easy rollback through versioning but necessitates complete rebuilds for updates and careful dependency management.
5. **Module Federation:** Facilitates runtime flexibility and independent module updates, though it demands a sophisticated setup and robust dependency management.
6. **Microfrontends with Bit Components:** Enhances universal composability and cross-team collaboration, leveraging both build-time and runtime integration, with strong dependency visualization.
7. **Backend for Microfrontend (BFMF):** Provides optimized performance and clear ownership by aligning backend services with microfrontends, though it increases overall system complexity and resource requirements.
8. **Event Sourcing-Based Microfrontends:** Ensures real-time updates and consistent state through event-driven architecture but requires a robust event store and efficient event handling mechanisms.
9. **Hypermedia Pattern:** Offers high flexibility and reduced coupling with dynamic client adaptation driven by hypermedia controls but involves complex implementation and performance considerations.

## Integration approaches / How Micro Frontends Work?

### The Shell Application (or Container)

> [!NOTE] At the core of a micro frontend architecture is a **shell application** — also called the “container” or “host” — which serves as the main entry point for the user. The shell is responsible for:

- **Loading micro frontends dynamically**: The shell fetches and displays individual micro frontends as needed, often based on user actions or routes within the application.
- **Orchestrating layout and navigation**: It manages the structure and routing of the application, ensuring each micro frontend is loaded in the right place at the right time.
- **Handling shared state and dependencies**: The shell can also manage common libraries, utilities, or services used by different micro frontends to avoid duplication and keep the application lightweight.

### Independent Micro Frontend Modules

Each micro frontend is a standalone application with its own codebase, development pipeline, and often even its own team. These modules are typically focused on a specific domain, such as a shopping cart, user profile, or product search. Because each module is self-contained, it has:

- Independent Build and Deployment: Micro frontends can be deployed separately from the rest of the application, allowing teams to release new features or updates without waiting on other modules.
- Technology Independence: Each micro frontend can be built using the best-suited framework for the task. For example, one team might use React for the checkout process while another uses Angular for product recommendations.

### Loading and Rendering Micro Frontends

There are multiple ways the shell can load and display micro frontends:

#### Client-Side Composition / Build-time integration

- One approach that we sometimes see is to publish each micro frontend as a package, and have the container application include them all as library dependencies. Here is how the container's package.json might look for our example app:
- In client-side composition, the shell application dynamically loads the micro frontend bundles on the client side (i.e., in the user’s browser). This is common in Single Page Applications (SPAs) where JavaScript frameworks handle dynamic routing and component rendering. Tools like Webpack Module Federation or Single-SPA can help manage this composition.

```json
{
  "name": "@feed-me/container",
  "version": "1.0.0",
  "description": "A food delivery web app",
  "dependencies": {
    "@feed-me/browse-restaurants": "^1.2.3",
    "@feed-me/order-food": "^4.5.6",
    "@feed-me/user-profile": "^7.8.9"
  }
}
```

#### Server-Side Composition

In server-side composition, micro frontends are combined on the server before being sent to the client. This approach is often used with Server-Side Rendering (SSR) frameworks (like Next.js or Express) to improve performance by reducing initial load times and enhancing SEO.

#### Edge-Side Composition

In this approach, micro frontends are combined at the CDN level or at edge servers closer to the user. This strategy allows faster delivery by serving different parts of the application from servers geographically near the user.

#### Run-time integration via iframes

One of the simplest approaches to composing applications together in the browser is the humble iframe. By their nature, iframes make it easy to build a page out of independent sub-pages. They also offer a good degree of isolation in terms of styling and global variables not interfering with each other.

```html
<html>
  <head>
    <title>Feed me!</title>
  </head>
  <body>
    <h1>Welcome to Feed me!</h1>

    <iframe id="micro-frontend-container"></iframe>

    <script type="text/javascript">
      const microFrontendsByRoute = {
        "/": "https://browse.example.com/index.html",
        "/order-food": "https://order.example.com/index.html",
        "/user-profile": "https://profile.example.com/index.html",
      };

      const iframe = document.getElementById("micro-frontend-container");
      iframe.src = microFrontendsByRoute[window.location.pathname];
    </script>
  </body>
</html>
```

#### Run-time integration via JavaScript

The next approach that we'll describe is probably the most flexible one, and the one that we see teams adopting most frequently. Each micro frontend is included onto the page using a <script> tag, and upon load exposes a global function as its entry-point. The container application then determines which micro frontend should be mounted, and calls the relevant function to tell a micro frontend when and where to render itself.

```html
<html>
  <head>
    <title>Feed me!</title>
  </head>
  <body>
    <h1>Welcome to Feed me!</h1>

    <!-- These scripts don't render anything immediately -->
    <!-- Instead they attach entry-point functions to `window` -->
    <script src="https://browse.example.com/bundle.js"></script>
    <script src="https://order.example.com/bundle.js"></script>
    <script src="https://profile.example.com/bundle.js"></script>

    <div id="micro-frontend-root"></div>

    <script type="text/javascript">
      // These global functions are attached to window by the above scripts
      const microFrontendsByRoute = {
        "/": window.renderBrowseRestaurants,
        "/order-food": window.renderOrderFood,
        "/user-profile": window.renderUserProfile,
      };
      const renderFunction = microFrontendsByRoute[window.location.pathname];

      // Having determined the entry-point function, we now call it,
      // giving it the ID of the element where it should render itself
      renderFunction("micro-frontend-root");
    </script>
  </body>
</html>
```

#### Run-time integration via Web Components

One variation to the previous approach is for each micro frontend to define an HTML custom element for the container to instantiate, instead of defining a global function for the container to call.

```html
<html>
  <head>
    <title>Feed me!</title>
  </head>
  <body>
    <h1>Welcome to Feed me!</h1>

    <!-- These scripts don't render anything immediately -->
    <!-- Instead they each define a custom element type -->
    <script src="https://browse.example.com/bundle.js"></script>
    <script src="https://order.example.com/bundle.js"></script>
    <script src="https://profile.example.com/bundle.js"></script>

    <div id="micro-frontend-root"></div>

    <script type="text/javascript">
      // These element types are defined by the above scripts
      const webComponentsByRoute = {
        "/": "micro-frontend-browse-restaurants",
        "/order-food": "micro-frontend-order-food",
        "/user-profile": "micro-frontend-user-profile",
      };
      const webComponentType = webComponentsByRoute[window.location.pathname];

      // Having determined the right web component custom element type,
      // we now create an instance of it and attach it to the document
      const root = document.getElementById("micro-frontend-root");
      const webComponent = document.createElement(webComponentType);
      root.appendChild(webComponent);
    </script>
  </body>
</html>
```

## Communication Between Micro Frontends

Since each micro frontend is a separate module, communication between them can be a challenge. Here are some strategies to enable communication while maintaining module independence:

### Global Event Bus

A shared event bus (like an observer pattern) allows micro frontends to broadcast and listen to events. For example, when a user adds an item to their cart, the cart micro frontend might broadcast an “item added” event that other modules, like “checkout,” can listen to.

**Example:** Use an event bus library (e.g., PubSub) to facilitate communication. Publish and subscribe to events using an event bus.

```javascript
const EventBus = require("eventbusjs");

// Publishing an event
EventBus.dispatch("userLoggedIn", null, { userId: 12345 });

// Subscribing to an event
EventBus.addEventListener("userLoggedIn", (event) => {
  console.log(event.target.userId);
});
```

### Shared State Management

Some micro frontend architectures use a global state management solution, like Redux or RxJS, to manage state that needs to be shared across modules.

### URL-Based Communication

By encoding state or data into the URL, micro frontends can communicate without direct dependencies on each other. This is useful in cases where changes to filters or navigation options should be reflected across multiple modules.

```javascript
// Setting URL parameter
const userId = 12345;
window.location.href = `/dashboard?userId=${userId}`;

// Reading URL parameter
const params = new URLSearchParams(window.location.search);
const userId = params.get("userId");
```

### Custom APIs or Services

Sometimes, a central API or service layer can mediate communication between micro frontends. This service can handle more complex interactions or serve as a single source of truth for shared data.

**Example:** Use shared backend services or APIs to fetch and update data.Each micro-frontend makes HTTP requests to the same API endpoint.

```javascript
// Fetching user data from an API
fetch("https://api.example.com/user/12345")
  .then((response) => response.json())
  .then((data) => console.log(data));
```

### Window Messaging (PostMessage API)

The window.postMessage API allows secure communication between different browsing contexts (e.g., iframes). Each micro frontend can send messages to and receive messages from other frontends using this API.

```javascript
// Sending a message
const iframe = document.getElementById('childFrame');
iframe.contentWindow.postMessage('Hello from parent', '*');

// Receiving a message
window.addEventListener('message', (event) => {
  console.log(event.data);
});Local Storage or Session Storage
```

### Local Storage or Session Storage

Data is stored as key-value pairs in the browser’s Local or Session Storage. Micro frontends can read/write simple, non-sensitive data like user preferences or theme settings.

```javascript
// Setting data in local storage
localStorage.setItem("user", JSON.stringify({ userId: 12345 }));

// Getting data from local storage
const user = JSON.parse(localStorage.getItem("user"));
```

### Custom Events

Use custom events to communicate between micro-frontends. Dispatch an event in one micro-frontend and listen for it in another.

```javascript
// Dispatching an event
const event = new CustomEvent("userLoggedIn", { detail: { userId: 12345 } });
window.dispatchEvent(event);

// Listening for the event
window.addEventListener("userLoggedIn", (event) => {
  console.log(event.detail.userId);
});
```

## Sources

- <https://martinfowler.com/articles/micro-frontends.html#IntegrationApproaches>

## Learn More

1. [Consumer-Driven Contracts: A Service Evolution Pattern](https://martinfowler.com/articles/consumerDrivenContracts.html)
2. [Strangler Fig pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/strangler-fig)
3. [Pattern: Backends For Frontends](https://samnewman.io/patterns/architectural/bff/)

- [Microservice Interview Questions: The basics](https://metoro.io/blog/microservice-interview-questions?utm=google-ads-ai-observability)
- [What are microservices?](https://microservices.io/)

