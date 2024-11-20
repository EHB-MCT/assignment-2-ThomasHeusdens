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

- **Task**: Enhanced the `CoursePage` for displaying individual course units.
  - Created `CourseSidebar` and `UnitViewer` components to modularize the `CoursePage`.
  - Implemented a `CoursePage` layout with a sidebar for units and a viewer for detailed unit content.
  - Added navigation to the `UnitViewer` for switching between units dynamically.
  - Designed a responsive layout with CSS:
    - Sidebar (`unitsSideBar`) displays a list of units.
    - Viewer (`unitViewer`) displays unit details, including optional video content.
    - Added hover effects and ensured the layout adapts well to various screen sizes.
  - Tested functionality using sample JSON data for units.

- **Task**: Updated the backend to support unit data.
  - Created a `Unit` schema in `models/Unit.js` to store detailed unit information.
  - Added an API route in `routes/unitRoutes.js` to fetch units by `courseId`.
  - Updated `server.js` to include the `unitRoutes` API endpoint.
  - Tested backend API using Postman, ensured units were fetched correctly.

- **Task**: Populated the database with units.
  - Generated and imported JSON data for 8 courses, each with 4 units.
  - Ensured units have diverse attributes, including optional videos.
  - Ran a script to convert `courseId` fields in the database to `ObjectId` for consistency.

- **Task**: Improved UI for navigation and user experience.
  - Added a clickable "X" button to exit the `CoursePage` and navigate back to the homepage.
  - Styled the "X" button for consistent design, including hover effects and responsiveness.
  - Ensured all components align with the design of the `Home` page.

- **Task**: Refactored the `Home` component.
  - Moved the `courses` rendering logic into a new `Courses` component for better modularity.
  - Updated `Home.js` to focus on fetching and passing data to the `Courses` component.
  - Simplified `Home.js` and added detailed function comments for clarity.

- **Outcome**: Fully functional `CoursePage` with a sidebar and detailed unit viewer. Backend supports unit data and retrieves units dynamically based on `courseId`. Database populated with rich sample data for courses and units. Frontend components are modular and well-documented, improving code readability. Navigation between pages and units works seamlessly.

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