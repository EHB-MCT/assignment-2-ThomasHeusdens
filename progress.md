# **Progress Log**

### **Project: Khan Academy Clone**

---

## **Day 1**
- **Task**: Set up the project structure.
  - Created folders for `backend` and `frontend`.
  - Initialized Node.js for the backend and React for the frontend.
  - Installed required dependencies:
    - Backend: `express`, `mongoose`, `body-parser`, `cors`, `dotenv`
    - Frontend: `axios`, `react-router-dom`

- **Task**: Implemented backend functionality.
  - Created a MongoDB database (`dev5`) in the `Web2` cluster and a collection named `Courses`.
  - Built the `Course` schema in `models/Course.js`.
  - Added an API route in `routes/courseRoutes.js` for retrieving all courses.
  - Set up the main server in `server.js` to connect to MongoDB and serve the API.

- **Task**: Created frontend functionality.
  - Built the `Home` page in `pages/Home.js` to fetch and display course data from the backend.
  - Set up routing in `App.js` using React Router.
  - Configured `index.js` to render the React app.

- **Task**: Populated the database and tested the project.
  - Imported sample JSON data into the `Courses` collection.
  - Fixed issues with database connection and empty API responses.
  - Verified backend functionality using Postman and ensured courses appear in the frontend.

- **Task**: Improved project documentation.
  - Added `README.md` with:
    - Project description.
    - License (MIT).
    - Code of conduct.
    - Contributing guidelines.
    - Setup and usage instructions.
  - Added comments to all files for better code readability.
  - Pushed the project to GitHub with a meaningful commit message.


- **Outcome**: Basic project structure is ready. Backend API for fetching courses is functional. Frontend is integrated with the backend and displays courses. Data retrieval and display are working as expected. Project is well-documented and uploaded to GitHub.

---

## **Day 2**

- **Outcome**: 

---

## **Day 3**

- **Outcome**: 

---

## **Day 4**

- **Outcome**: 

---

## **Day 5**

- **Outcome**: 

---

## **Next Steps**
- Add user authentication (e.g., login/signup).
- Implement user activity tracking and storing in MongoDB.