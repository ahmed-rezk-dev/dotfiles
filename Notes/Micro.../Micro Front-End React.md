<!--toc:start-->

- [9 Patterns Every Developer Should Know](#9-patterns-every-developer-should-know)
- [Micro Frontend Techniques](#micro-frontend-techniques)
  - [Asynchronous Loading](#asynchronous-loading)
  - [Error Handling](#error-handling)
  - [SafeComponent](#safecomponent)
- [Sharing Functions and States](#sharing-functions-and-states)
  - [Sharing Functions](#sharing-functions)
  - [Sharing State (Nomenclature)](#sharing-state-nomenclature)
  - [Cons](#cons)
- [sources](#sources)
  - [Vite](#vite)
  - [Styling](#styling)
  <!--toc:end-->

![](https://miro.medium.com/v2/resize:fit:2880/1*ObN91fjDtJd2_F7NENlj6g.jpeg)

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

## Micro Frontend Techniques

1. **Asset Store.** The Asset Store approach involves decoupling frontend components and assets, such as JavaScript bundles, CSS files, and images, from the main application. By externalizing these assets to a central repository or CDN (Content Delivery Network), developers can share and reuse them across multiple applications or micro frontends. This approach promotes code reuse, simplifies maintenance, and improves performance by leveraging browser caching mechanisms.![](https://miro.medium.com/v2/resize:fit:700/1*QLQZDz-NKNtPSw2jfP10nQ.png)
2. **Module Federation.** Module Federation, a powerful technique introduced in webpack 5, enables dynamic loading and sharing of JavaScript modules between micro frontends at runtime. This approach allows developers to build independently deployable micro frontends that can seamlessly integrate. By dynamically importing remote modules, Module Federation fosters a modular architecture where micro frontends can evolve and scale independently, without sacrificing interoperability. ![](https://miro.medium.com/v2/resize:fit:700/1*tADx4bViUt3MKjfmYkDNSg.png)
3. **iFrames and Web Components.** While not strictly considered micro frontend techniques, iFrames and Web Components offer alternative approaches to achieve frontend modularity and encapsulation. iFrames enable developers to embed isolated HTML documents within a parent document, allowing for independent rendering and execution. Web Components, on the other hand, provide a standardized way to encapsulate and reuse UI components across different web applications. While these approaches come with their own set of trade-offs and considerations, they can be valuable tools in certain scenarios.

   **Key Concepts and Benefits** 2. **Decentralized Architecture -** Module Federation promotes a decentralized architecture, where each micro frontend is responsible for its own set of features and dependencies. This decentralization allows teams to work autonomously, independently deploying and scaling their micro frontends without impacting other parts of the application. 3. **Dynamic Module Loading -** One of the hallmark features of Module Federation is its support for dynamic module loading. By dynamically importing remote modules at runtime, micro frontends can fetch and integrate functionality on-demand, reducing initial loading times and improving performance. 4. **Shared Dependencies -** Module Federation facilitates the sharing of dependencies between micro frontends, minimizing duplication and optimizing resource utilization. Shared dependencies are loaded once and cached across micro frontends, ensuring consistency and reducing overhead.
   **Different impmlamtion** 1. Local Interfaces. 2. Remote Interface. 3. Federation controlling Federation. 4. Delegate Modules. 5. Component Level Ownership, & Federation + CLO.

### Asynchronous Loading

Asynchronous loading is utilized in the **import()** function calls within the **lazy()** function to enable dynamic and non-blocking loading of modules at runtime. By employing asynchronous loading, the browser can continue rendering the main application interface without waiting for the remote modules to be fetched and loaded. This approach enhances the user experience by reducing initial loading times and improving performance, particularly in scenarios where the application relies on external resources or micro frontends. As a result, users can interact with the application more quickly, while also benefiting from the modular and scalable architecture enabled by micro frontend techniques such as Module Federation.

The `<Suspense>` component with the fallback prop is used to provide a loading indicator or placeholder content while asynchronous operations, such as fetching remote modules, are in progress. In the given example, when the lazy() function triggers the asynchronous loading of remote components (Header and Footer), the `<Suspense>` component ensures that the specified fallback content (in this case, a simple “Loading…” message wrapped in a `<div>`) is displayed to the user until the asynchronous loading completes. This mechanism helps maintain a smooth and cohesive user experience by giving feedback to users that content is being loaded, thereby reducing perceived latency and preventing abrupt UI changes. Once the remote components are successfully loaded, the `<Suspense>` component switches to rendering the actual content, seamlessly transitioning from the loading state to the fully rendered state of the application.

### Error Handling

In the realm of micro frontend architecture, where independently deployable micro frontends collaborate to form a cohesive user experience, robust error-handling mechanisms are essential to ensure the resilience and reliability of the application. Enter SafeComponent — a pattern that provides a systematic approach to gracefully handling errors within micro frontend applications. Unlike traditional error-handling techniques that may result in cascading failures or abrupt UI disruptions, SafeComponent offers a proactive solution to detect and mitigate errors, thereby safeguarding the user experience. Let’s explore how SafeComponent works and its significance in the context of micro frontend architecture.

### SafeComponent

**SafeComponent** is a design pattern that encapsulates potentially error-prone components or modules within a protective wrapper, allowing for controlled error propagation and graceful degradation of functionality in the event of errors. By isolating error-prone code within SafeComponent boundaries, developers can prevent errors from propagating to higher-level components or disrupting the entire application. Moreover, SafeComponent provides mechanisms for error detection, logging, and recovery, enabling developers to respond to errors proactively and maintain application stability.

In React.js, **SafeComponent** can be implemented using error boundaries — special components that catch JavaScript errors anywhere within their child component tree and display a fallback UI instead. Let’s see how we can create a SafeComponent wrapper in React.js.

## Sharing Functions and States

### Sharing Functions

Sharing functions between micro frontends enables code reuse and promotes a modular approach to frontend development. Here’s an example demonstrating how to share a utility function across multiple micro frontends. Create utils.js in your Home application’s src dir
ectory. Then you have to expose it from **webpack.config.js**.

### Sharing State (Nomenclature)

**1. Using a Shared State Management Library**
If micro-frontends use a common state management solution like **Redux, Zustand, or Recoil**, the store can be exposed as a federated module.
**Pros**: Ensures a single source of truth across micro-frontends.
**Cons**: Tight coupling between micro-frontends.
**Exposing State from a Remote Micro-Frontend**

```javascript
// webpack.config.js (Remote App)
new ModuleFederationPlugin({
  name: "remoteApp",
  filename: "remoteEntry.js",
  exposes: {
    "./store": "./src/store", // Expose store for sharing
  },
  shared: ["react", "zustand"],
});
```

    Consuming the Shared Store in a Host

```javascript
// Import store from remote
import useStore from "remoteApp/store";

const Counter = () => {
  const count = useStore((state) => state.count);
  return <div>Counter: {count}</div>;
};
```

**2. Using Custom Events for Communication**
A **Custom Event System** allows micro-frontends to communicate **without direct dependencies.**
**Pros**: Fully decoupled communication, micro-frontends don’t need to know about each other.
**Cons**: Managing multiple events can become complex.
Publishing a Custom Event

```javascript
const updateUser = (user) => {
  window.dispatchEvent(new CustomEvent("USER_UPDATED", { detail: { user } }));
};
```

    Listening for the Event in Another Micro-Frontend

```javascript
window.addEventListener("USER_UPDATED", (event) => {
  console.log("User Updated:", event.detail.user);
});
```

**3. Using an Event Bus for Decoupled Communication**
Instead of using direct imports or shared state, micro-frontends can use an **event bus** to **publish and subscribe to events.**
**Pros**: Fully decoupled, better maintainability.
**Cons**: Requires managing an event-driven architecture.
Creating a Simple Event Bus

```javascript
 // eventBus.js (Shared between micro-frontends)
 const eventBus = {
   events: {},

   subscribe(event, callback) {
     if (!this.events[event]) this.events[event] = [];
     this.events[event].push(callback);
   }

   publish(event, data) {
     if (this.events[event]) {
       this.events[event].forEach(callback => callback(data));
     }
   }
 };
 export default eventBus;
```

    Publishing an Event

```javascript
import eventBus from "./eventBus";

eventBus.publish("USER_LOGIN", { username: "JohnDoe" });
```

    Subscribing to an Event

```javascript
import eventBus from "./eventBus";

eventBus.subscribe("USER_LOGIN", (data) => {
  console.log("User Logged In:", data.username);
});
```

**4. Using LocalStorage or SessionStorage**
For simple data persistence, micro-frontends can use the browser’s **LocalStorage or SessionStorage**.
**Pros**: Persistent across sessions.
**Cons**: No real-time updates between micro-frontends.
Storing Data

```javascript
localStorage.setItem("theme", "dark");
```

    Retrieving Data

```javascript
const theme = localStorage.getItem("theme");
console.log("Theme:", theme);
```

**5. Using React Context API for React-Based Micro-Frontends**
React’s **Context API** can be exposed as a federated module and consumed by other micro-frontends.
**Pros**: Simple, works well with React-based micro-frontends.
**Cons**: Tight coupling, only works in React applications.
Exposing a Context Provider

```javascript
export const ThemeContext = React.createContext("light");

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = React.useState("light");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

    Consuming Context in Another Micro-Frontend

```javascript
import { ThemeContext } from "remoteApp/ThemeProvider";

const { theme } = useContext(ThemeContext);
```

**Conclusion**

1. **Module Federation Plugin** enables **dynamic data sharing** between micro-frontends without duplicating dependencies.
2. **Choosing the right data-sharing strategy** depends on the application’s needs:
3. **Shared state (Zustand, Redux)** for a global store.
4. **Custom Events & Event Bus** for fully decoupled communication.
5. **LocalStorage** for persistent but static data.
6. **React Context API** for React-based applications.

- **For highly independent micro-frontends, Event Bus and Custom Events are the best choices.**

- **For applications needing global state management, Redux or Zustand is more suitable.**

### Cons

- Micro-frontend might seem like a silver bullet that can make teams scale in size infinitely, but it can also severely hinder performance, iteration speed, and make front-end development a mess. Isolation in the front-end is a myth. A breaking change in one micro-frontend can easily break another micro-frontend. You really don't want to end up with a distributed deadlock.

- at my job for about 2 years. I don't like it. It prevents us from migrating to Vite and adopting server-side frameworks like Remix. Turns out that most devs don't trust their changes until they test the entire app end-to-end, and micro-frontends just make running the whole app locally more difficult.

- Module federation only works if you're the kind of company that can afford to hire a team of extremely good and versalite front-end programmers to take care of all the quirks and build their own meta-framework, so that other programmer's productivity might slightly increase. If you're not operating at this scale, don't do it. If you do have the talents to spare, ask yourself if you'd rather want those developers to contribute to the product instead of working on making an architecture work.
- <https://www.reddit.com/r/reactjs/comments/1f4hika/microfrontend_experiences/>

## sources

1. [Micro-Frontends Course - Beginner to Expert](https://www.youtube.com/live/lKKsjpH09dU)
1. [Micro Frontends - Cam Jackson](https://martinfowler.com/articles/micro-frontends.html)
1. [https://micro-frontends.org/](https://micro-frontends.org/)
1. [ZackJackson - Module Federation, With Next.js and SSR](https://www.youtube.com/watch?v=yU7ARATZoUU)
1. [A Deep Dive into Micro Frontend Architecture with React.js](https://medium.com/@isuruariyarathna2k00/a-deep-dive-into-micro-frontend-architecture-with-react-js-264ca6edca6b)
1. <https://softjourn.com/insights/micro-frontend-architecture>
1. [Introduction to Micro Frontend Architecture: Scaling Frontend for Digital Innovation.](https://www.xcubelabs.com/blog/introduction-to-micro-frontend-architecture-scaling-frontend-for-digital-innovation/#:~:text=E-commerce%20Platforms%20and%20Multi-Tenant%20Architecture&text=Each%20tenant%20can%20have%20its,easier%20maintenance%2C%20and%20improved%20scalability)
1. [Mastering Micro Frontends: 9 Patterns Every Developer Should Know](https://medium.com/bitsrc/mastering-microfrontends-9-patterns-every-developer-should-know-397081673770)
1. [# Micro-Frontends Course - Beginner to Expert](https://www.youtube.com/live/lKKsjpH09dU)
1. **NextJS Specific**
1. [Micro-frontends with Next.js and Module Federation](https://alibek.dev/micro-frontends-with-nextjs-and-module-federation)
1. [Micro-frontend — 10+ Ways for State Management in Module Federation in Vite](https://amberfung.medium.com/micro-frontend-10-ways-for-state-management-in-module-federation-in-vite-7dbd3434bd5e)

## Watch Later

1. <https://www.youtube.com/watch?v=njXeMeAu4Sg>
2. <https://www.youtube.com/watch?v=uRKUxZQ74os>
3. <https://blog.nonstopio.com/a-deep-dive-into-module-federation-in-front-end-with-react-vite-37d17dd253a1>
4. <https://github.com/jherr/vite-mod-fed/blob/main/remote/vite.config.js>
5. <https://medium.com/@jyh.herng/typescript-react-micro-frontend-proof-of-concept-using-webpack-module-federation-93a70a41ac1>
6. <https://paria-heidari.medium.com/implementing-react-micro-frontend-a-step-by-step-guide-021488ec69c9>
7. <https://blog.bitsrc.io/micro-frontends-a-practical-step-by-step-guide-df10edf0e8d0>

### Typescript

1. [Typescript React Micro-frontend Proof Of Concept Using Webpack Module Federation](https://medium.com/@jyh.herng/typescript-react-micro-frontend-proof-of-concept-using-webpack-module-federation-93a70a41ac1)

### Vite

- [Build a Remote Micro Frontend with Vite, React, and TypeScript](https://freedium.cfd/https://levelup.gitconnected.com/remote-micro-frontend-8c84585ebf69)
- [How to Build Micro Frontends in React with Vite and Module Federation](https://www.freecodecamp.org/news/how-to-build-micro-frontends-in-react-with-vite-and-module-federation/)
- [A Deep Dive into Module Federation in Front-End with React + Vite](https://blog.nonstopio.com/a-deep-dive-into-module-federation-in-front-end-with-react-vite-37d17dd253a1)
- [Example Repo](https://github.com/jherr/vite-mod-fed/blob/main/remote/package.json)
- [Dev Mode Issue](https://github.com/originjs/vite-plugin-federation/issues/410)

### Styling

- [Building a Multi Brand Design System with Tailwind: Tips, Tricks and Tradeoffs](https://www.thinkmill.com.au/blog/building-a-multi-brand-design-system-with-tailwind-tips-tricks-and-tradeoffs)
- [Unlocking Power of Design Tokens: Practical Steps for Your Next Project](https://dev.to/annwebdotdev/syncing-design-tokens-with-tailwind-css-theme-4d4d)
- [How We Created Our Design System with TailwindCSS and Figma Tokens at AirMDR](https://medium.com/@himanshuchavda46/how-we-created-our-design-system-with-tailwindcss-and-figma-tokens-at-airmdr-029ea52a3efd)
- [Runtime made custom themes - dynamic tailwind.config.js #8949](https://github.com/tailwindlabs/tailwindcss/discussions/8949)
- [Efficient Theming with Tailwind CSS in React Application](https://medium.com/@mahamdaudahmed/efficient-theming-with-tailwind-css-in-react-application-f0f8f87accd1)

- Tools
  - `Husky` Leverages Git hooks to enforce code quality standards and run tests before commits and pushes, ensuring that only quality code is added to the repository.
  - `eslint` Statically analyzes your code to quickly find problems during coding.
  - `prettier` is an opinionated tool that encourages programmers to follow its formatting rules. It also parses the code and reprints it uniformly.
  - Enforcing changelog usage with one of blow options
    - semantic-release
      - `git-cz` combined with `commmitlint` to set rules for commit messages.
      - `commitizen` a standard way of committing
      - `cz-conventional-changelog` Like commitizen, you specify the configuration of cz-conventional-changelog through the package.json's config.commitizen key.
    - changesets `@changesets/cli`
    - <https://brianschiller.com/blog/2023/09/18/changesets-vs-semantic-release/>
