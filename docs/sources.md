# **Sources & References**

## 📌 **Overview**
This document provides an overview of the sources used during the development of the project. The goal is to correctly reference external information, code snippets, tutorials, and documentation that have helped solve complex problems.

---

## 📂 **Table of contents**
1. [Projectopzet & Basisconfiguratie](#project-setup)
2. [Backend Functionalities](#backend-functionalities)
3. [Frontend Functionalities](#frontend-functionalities)
4. [Authentication & Security](#authentication--security)
5. [Data Visualisation & Charts](#data-visualisation--charts)
6. [Calculations](#calculations)

---

## 📌 **Project setup**
  - [React Docs](https://reactjs.org/) – Basic structure and setup of the frontend.  
  - [Node.js Docs](https://nodejs.org/en/docs/) – Backend setup and configuration.  
  - [MongoDB Docs](https://www.mongodb.com/docs/) – Database configuration and collection management.  
  - [Express.js Docs](https://expressjs.com/) – Setup of the backend API.  
  - [GitHub Docs](https://docs.github.com/) – Version control and collaboration via Git.

---

## ⚙ **Backend Functionalities**
  - [Express.js Documentation](https://expressjs.com/) – Official documentation for setting up Express routes and middleware.
  - [Express Router](https://expressjs.com/en/guide/routing.html#express-router) – Used to create modular, mountable route handlers.
  - [Express Middleware Guide](https://expressjs.com/en/guide/using-middleware.html) – Explains how middleware functions work in Express.
  - [Express listen() Method](https://expressjs.com/en/4x/api.html#app.listen) – Official documentation on starting an Express server.
  - [Organizing Express.js Applications](https://softwareontheroad.com/ideal-nodejs-project-structure/) – Best practices for structuring routes and controllers in Express apps.
  - [Defining Mongoose Schemas and Models](https://learn.codesignal.com/preview/lessons/3237/defining-mongoose-schemas-and-models) – Setting up `models` and basic requests.
  - [Mongoose: How to use singular name for collection](https://www.slingacademy.com/article/mongoose-how-to-use-singular-name-for-collection/) – Refering to the name of the collection.
  - [Mongoose findOne()](https://mongoosejs.com/docs/api.html#model_Model.findOne) – Used to find a single user by email or UUID.
  - [Mongoose findOneAndUpdate()](https://mongoosejs.com/docs/api/model.html#model_Model.findOneAndUpdate) – Used to increment sequence values for unique IDs.
  - [Mongoose connect()](https://mongoosejs.com/docs/connections.html#connecting-to-mongodb) – Used to establish a database connection before executing the update operation.
  - [Mongoose updateMany()](https://mongoosejs.com/docs/api/model.html#model_Model.updateMany) – Performs bulk updates on documents.
  - [Mongoose Error Handling](https://mongoosejs.com/docs/api/error.html) – Guides for properly handling errors during database operations.
  - [Mongoose disconnect()](https://mongoosejs.com/docs/api/connection.html#connection_Connection-close) – Properly closes the database connection after script execution.
  - [Gracefully Closing a MongoDB Connection](https://mongoosejs.com/docs/connections.html#disconnecting) – Ensures that the script does not leave open database connections.
  - [Best Practices for MongoDB Data Migration](https://www.mongodb.com/developer/products/mongodb/best-practices-migrations/) – Ensures that schema changes are applied efficiently without disrupting the database.
  - [MongoDB $inc Operator](https://www.mongodb.com/docs/manual/reference/operator/update/inc/) – Increments a field’s value.
  - [MongoDB Collections & Schema Design](https://www.mongodb.com/docs/manual/core/data-modeling-introduction/) – Best practices for structuring data collections like `UserActivity`.
  - [MongoDB Unique Indexes](https://www.mongodb.com/docs/manual/indexes/#unique-indexes) – Used to ensure no duplicate user activities are stored.
  - [MongoDB Connection Best Practices](https://www.mongodb.com/developer/products/mongodb/mongodb-connection-best-practices/) – Best practices for handling database connections in MongoDB applications.
  - [MongoDB ObjectId Data Type](https://www.mongodb.com/docs/manual/reference/bson-types/#objectid) – Explanation of the `ObjectId` format and why it’s used for referencing documents.
  - [MongoDB $toObjectId Operator](https://www.mongodb.com/docs/manual/reference/operator/aggregation/toObjectId/) – Used to convert string fields to `ObjectId` in aggregation pipelines.
  - [MongoDB Aggregation Framework](https://www.mongodb.com/docs/manual/aggregation/) – Explanation of aggregation stages and operators.
  - [REST API Best Practices](https://www.restapitutorial.com/) – Guidelines followed to structure authentication endpoints.
  - [Try-Catch in Async Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch) – Ensures that errors in asynchronous operations do not break the server.
  - [Using $set in MongoDB](https://www.mongodb.com/docs/manual/reference/operator/update/set/) – Used to update document fields dynamically.
  - [dotenv npm package](https://www.npmjs.com/package/dotenv) – Used to securely load environment variables like `MONGO_URI` from a `.env` file.
  - [Best Practices for Storing Environment Variables](https://12factor.net/config) – Ensures secure handling of database credentials.
  - [Running Node.js Scripts](https://nodejs.dev/en/learn/how-to-use-the-nodejs-cli/) – Guide on executing JavaScript files in a Node.js environment.
  - [Understanding Node.js Event Loop](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/) – Explains how the server listens for incoming requests asynchronously.
  - [Using the Node.js File System](https://nodejs.org/api/fs.html) – Best practices for structuring scripts in a Node.js backend.
  - [Using try/catch in Async Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch) – Ensures proper handling of exceptions when connecting to MongoDB.
  - [Using Node.js for Data Migration](https://dev.to/aws-builders/how-to-migrate-your-database-with-nodejs-and-mongodb-3e9h) – Guides on writing Node.js scripts for MongoDB migrations. 
  - [body-parser npm Package](https://www.npmjs.com/package/body-parser) – Middleware used to parse JSON requests in Express.
  - [CORS MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) – Explanation of how CORS works.
  - [cors npm Package](https://www.npmjs.com/package/cors) – Official npm package for handling CORS in Express applications.

---

## 🎨 **Frontend Functionalities**
  - [React Official Documentation](https://react.dev/) – General React concepts and best practices.
  - [React Functional Components](https://react.dev/learn/your-first-component) – Explanation of functional components in React.
  - [React JSX Documentation](https://react.dev/learn/writing-markup-with-jsx) – Understanding JSX syntax in React components.
  - [React useState Hook](https://react.dev/reference/react/useState) – Managing form input state with `useState`.
  - [React Handling Events](https://react.dev/learn/responding-to-events) – Explanation of event handling in React.
  - [Handling Forms in React](https://react.dev/learn/forms) – Guide on form inputs and submission in React applications.
  - [React Controlled Components](https://react.dev/learn/sharing-state-between-components#controlled-components) – Explanation of controlled input elements in React forms.
  - [HTML Form Input Types](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) – Documentation on different form input types.
  - [Form Submission in React](https://react.dev/learn/responding-to-events#event-handler-functions) – Preventing default behavior and handling form submission.
  - [React Router Documentation](https://reactrouter.com/en/main/start/tutorial) – Used for navigation between the Login and Register pages.
  - [React Router Link Component](https://reactrouter.com/en/main/components/link) – Explanation of how to use `<Link>` for navigation in a React app.
  - [React Memoization with useCallback](https://react.dev/reference/react/useCallback) – Used to memoize calculation functions to prevent redundant executions.
  - [React useEffect Hook](https://react.dev/reference/react/useEffect) – Handles side effects, such as fetching data when the component mounts.
  - [React useCallback Hook](https://react.dev/reference/react/useCallback) – Optimizes function references, preventing unnecessary re-renders of dependent functions.
  - [useParams Hook](https://reactrouter.com/en/main/hooks/use-params) – Retrieves the `courseId` from the URL to fetch the corresponding analytics data.
  - [useNavigate Hook](https://reactrouter.com/en/main/hooks/use-navigate) – Enables programmatic navigation, such as returning to the homepage.  
  - [Axios HTTP Requests](https://axios-http.com/docs/intro) – Used to fetch course analytics from the backend.
  - [JWT Token Decoding](https://www.npmjs.com/package/jsonwebtoken) – Retrieves the user's ID from the JWT stored in localStorage.
  - [JavaScript Array .filter() Method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) – Used to filter video vs. non-video units.
  - [JavaScript Array .map() Method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) – Extracts `scrollPercentage` and `timeSpent` values for calculations.
  - [JavaScript Array .sort() Method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) – Sorts `viewedAt` timestamps to find the most recent unit a user accessed.  - [CSS Tricks](https://css-tricks.com/) – Styling and layout optimization.  
  - [MDN Web Docs](https://developer.mozilla.org/) – General JavaScript and DOM manipulations.
  - [React Functional Components](https://react.dev/learn/your-first-component) – Guide on creating and using functional components in React.
  - [JSX in React](https://react.dev/learn/writing-markup-with-jsx) – Explanation of JSX syntax used for rendering elements.
  - [Passing Props in React](https://react.dev/learn/passing-props-to-a-component) – How to pass and use props (`unit`) inside the `UnitViewer` component.
  - [React Conditional Rendering](https://react.dev/learn/conditional-rendering) – Explanation of how `{unit.videoURL ? (...) : null}` works.
  - [Axios Error Handling](https://axios-http.com/docs/handling_errors) – Ensures proper error messages are displayed when registration fails.
  - [Window.alert() - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/alert) – Used to notify the user about registration success or failure.
  - [Console Logging in JavaScript](https://developer.mozilla.org/en-US/docs/Web/API/Console/log) – Used for debugging API responses.
  - [MDN: The `<iframe>` Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe) – Used for embedding videos inside React components.
  - [YouTube Embed API](https://developers.google.com/youtube/iframe_api_reference) – Guide on embedding YouTube videos using `iframe`.
  - [Inline Styles in React](https://react.dev/learn/adding-styles#using-the-style-prop) – Guide on using inline styles in JSX.

---

## 🔒 **Authentication & Security**
  - [OAuth 2.0 Overview](https://oauth.net/2/) – Secure authentication concepts.  
  - [JWT Authentication in React](https://blog.logrocket.com/jwt-authentication-best-practices/) – Best practices for authentication.
  - [JSON Web Token (JWT) Documentation](https://www.npmjs.com/package/jsonwebtoken) – Used for token-based authentication.
  - [JWT Best Practices](https://blog.logrocket.com/jwt-authentication-best-practices/) – Guidelines for implementing secure authentication.
  - [JWT Secret & Environment Variables](https://www.npmjs.com/package/dotenv) – Using `.env` files to store the JWT secret key securely.
  - [Best Practices for Secure API Authentication](https://developer.okta.com/blog/2019/03/08/simple-rest-api-authentication) – Insights into securing API endpoints.
  - [Managing Sessions in Express](https://www.npmjs.com/package/express-session) – Handling user login sessions.
  - [Best Practices for Stateless Authentication](https://developer.okta.com/blog/2017/06/21/what-the-heck-is-oauth) – Managing authentication in a RESTful manner.
  - [Express Error Handling](https://expressjs.com/en/guide/error-handling.html) – Used to handle authentication and database errors properly.
  - [bcrypt Docs](https://www.npmjs.com/package/bcrypt) – For hashing passwords.
  - [Salting and Hashing Passwords](https://auth0.com/blog/hashing-in-action-understanding-bcrypt/) – Explanation of why bcrypt is secure for password storage.
  - [UUID npm package](https://www.npmjs.com/package/uuid) – Used to generate unique user IDs.
  - [UUID Validation](https://www.npmjs.com/package/uuid#validate) – Used to check if a given ID is a valid UUID before verifying users.
  - [Protected Routes](https://www.robinwieruch.de/react-router-private-routes/) - Used to redirect the user to the login page when he tries to reach a restricted page.

---

## 📊 **Data Visualisation & Charts**
  - [AG Charts API Documentation](https://www.ag-grid.com/react-data-grid/charts-api/) – Explains `series`, `axes`, and `data` formatting.
  - [JavaScript Date Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) – Used to calculate the difference between `today` and the last `viewedAt` date of a unit.
  - [Date Object - getTime() Method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime) – Converts dates into timestamps for time difference calculations.
  - [AG Charts Docs](https://www.ag-grid.com/react-charts/) – Used to create charts in `CourseAnalytics` and `GeneralAnalytics`.
  - [D3.js Guide](https://d3js.org/) – Tried it, but did not work as wanted.

---

## 🔢 **Calculations**
  - [JavaScript Date Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) – Used for calculating the time between viewed units.  
  - [Array Reduce in JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) – Used for calculating averages in statistics.
  - [Array.prototype.length - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length) - Used to check if the array is empty before performing calculations.
  - [Basic Arithmetic Operations in JavaScript - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#arithmetic_operators) - Covers division (`/`) for calculating the average (`total / values.length`).