# **Progress Log**

### **Project: Can Academy**

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


- **Outcome**: Basic project structure is ready. Backend API for fetching courses is functional. Frontend is integrated with the backend and displays courses. Data retrieval and display are working as expected. Code is clean, modular, and well-documented, ensuring maintainability. All changes are successfully merged into the `main` branch.

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

- **Outcome**: Fully functional `CoursePage` with a sidebar and detailed unit viewer. Backend supports unit data and retrieves units dynamically based on `courseId`. Database populated with rich sample data for courses and units. Frontend components are modular and well-documented, improving code readability. Navigation between pages and units works seamlessly. Code is clean, modular, and well-documented, ensuring maintainability. All changes are successfully merged into the `main` branch.

---

## **Day 3**

- **Task**: Added user authentication functionality.
  - Integrated **JWT-based authentication** in the backend.
    - Set up `authRoutes.js` to handle `register`, `login`, and `logout` requests.
    - Used `bcrypt` for password hashing and `jsonwebtoken` for generating JWT tokens.
    - Created a `User` schema in `models/User.js` to store user credentials, subscription types, and registration dates.
  - Implemented middleware to verify JWT tokens and handle secure routes.
  - Ensured the backend API supports error handling for invalid credentials and missing fields.

- **Task**: Created authentication pages on the frontend.
  - Built `Login` and `Register` pages with forms for user credentials.
  - Integrated user authentication into the `Home` page.
    - Checked token validity on page load to update login status.
    - Added dynamic buttons for `Login`, `Register`, and `Logout` based on authentication state.
  - Added logout functionality:
    - Sent logout requests to the backend to invalidate tokens.
    - Removed tokens from `localStorage` and updated state on successful logout.
  - Styled forms and buttons to align with the overall project design.

- **Task**: Implemented user activity tracking.
  - Created a `UserActivity` schema in `models/UserActivity.js` to log viewed units.
  - Built a backend route (`userActivityRoutes.js`) to:
    - Save viewed units for a specific user.
    - Prevent duplicates by checking if a unit is already logged.
    - Retrieve all units a user has viewed for a specific course.
  - Integrated activity tracking in the frontend:
    - Automatically logged the first unit of a course when opened.
    - Logged additional units dynamically when the user navigated through the course.
    - Displayed a checkmark (`✓`) in the `UnitsSidebar` for viewed units.

- **Task**: Displayed user progress on the homepage.
  - Enhanced the `Home` page to calculate and display course progress.
    - Fetched all units for each course from the backend.
    - Retrieved viewed units for the logged-in user using the activity API.
    - Calculated progress as a percentage (`viewedUnits / totalUnits * 100`).
  - Updated the `Courses` component to show progress under each course description:
    - Example: `Course done: 50%`.
  - Styled progress indicators to match the design.

- **Task**: Improved backend reliability and database consistency.
  - Ensured duplicate entries are avoided when logging unit views.
  - Added API endpoints to check if a unit is already logged before saving it.
  - Resolved merge conflicts in the `feature/track-user-activity` branch and ensured functionality after merging with `main`.

- **Task**: Cleaned up and refactored the project.
  - Consolidated repetitive logic into reusable functions for the backend.
  - Added comments and documentation to all new code for better readability.
  - Squashed multiple commits into a single commit during Git rebase for a cleaner history.
  - Pushed all changes to the `main` branch with a meaningful commit message.

- **Outcome**: Fully functional authentication system with user activity tracking and progress display. Users can log in, register, and see their progress for each course on the homepage. The backend reliably tracks viewed units without duplicates. The frontend dynamically updates viewed units and progress, providing a seamless experience. Codebase is clean, modular, and well-documented. All changes are successfully merged into the `main` branch.

---

## **Day 4**

- **Task**: Implemented user behavior tracking.

  - Added a feature to track how much time a user spends on a unit page.
  - Created a new UserBehavior schema in models/UserBehavior.js to log user interactions:
    - Fields include userId, courseId, unitId, timeSpent, videoIncluded, and date.
  - Built a backend API endpoint (userBehaviorRoutes.js) to:
    - Log the time spent on a unit page.
    - Include a flag (videoIncluded) to indicate whether the unit contains a video.
    - Ensure proper error handling and data validation.
  - Integrated behavior tracking into the frontend:
    - Started a timer when the user enters a unit.
    - Logged the total time spent when the user leaves the unit or navigates away.
    - Prevented duplicate entries by using useRef to manage logging state.

- **Outcome**: Fully functional user behavior tracking for unit pages. Accurate logging of time spent, with duplicate entries and premature logs eliminated. Backend and frontend are seamlessly integrated to handle behavior tracking. Code is clean, modular, and well-documented, ensuring maintainability. All changes are successfully merged into the `main` branch.

---

## **Day 5**

- **Task**: Refined Backend API
  - Refracted every UserBehavior to UserTimeSpent.
  - Updated the `/time-spent` endpoint to check if an entry already exists for a specific user, course, and unit. If found, the `timeSpent` is added to the existing value; otherwise, a new entry is created.
  - Modified the `UserScrollPercentage` schema and related endpoints to include a `videoIncluded` field to track whether the unit contains a video.

- **Task**: Improved Scroll Tracking
  - Ensured that only the highest scroll percentage is logged when leaving a unit or switching units, with redundant entries being deleted from the database.
  - Implemented a fix to reset the scroll position to the top of the page when navigating to a new unit.

- **Task**: Code Optimization:
  - Simplified and documented key functions, ensuring maintainability and readability.
  - Enhanced cleanup logic for tracking and logging user behavior to prevent unnecessary database writes.

- **Outcome**: The scroll tracking was refined to ensure that only the highest scroll percentage is logged when leaving a unit, with redundant entries being deleted, and the page now resets to the top when navigating to a new unit. For time tracking, the /time-spent endpoint was updated to add new time spent to existing entries for a user, course, and unit instead of creating duplicates. These changes optimize data accuracy and enhance the user behavior tracking system. Code is clean, modular, and well-documented, ensuring maintainability. All changes are successfully merged into the `main` branch.

---

## **Day 6**

- **Task**: Improved Course Analytics
  - Enhanced the `CourseAnalytics` page to display user behavior data for specific courses.
  - Added two grouped bar charts:
    - **Scroll Behavior**: Displays scroll percentages for units grouped by units with and without videos.
    - **Time Spent**: Displays time spent on units grouped by units with and without videos.
  - Addressed issues with displaying two separate bars for units with and without videos:
    - Fixed the logic to ensure units are correctly grouped and averaged by video inclusion.
    - Updated chart configurations to support proper grouping and labeling of bars.

- **Task**: Experimented with Chart Libraries
  - Initially tried using **D3.js** for flexible custom charts but faced challenges with integration into React and complexity for grouped bar charts.
  - Switched to **AG Charts**, which provided an easier integration and a robust API for grouped bar charts.
  - Attempted to use a **Calendar Chart** to visualize user activity over time:
    - Discovered it was better suited for enterprise-scale data.
    - Decided it was not appropriate for the current project scope and reverted to bar charts.

- **Outcome**: Fully functional `CourseAnalytics` page displaying scroll percentages and time spent data, grouped by video inclusion. Addressed visualization challenges with grouped bar charts and chose AG Charts as the preferred library for its flexibility and ease of use. Successfully debugged and resolved grouping issues, ensuring accurate and meaningful data visualization for users. Code is clean, modular, and well-documented, ensuring maintainability. All changes are successfully merged into the `main` branch.

---

## **Day 7**

- **Task**: Visualized General Analytics
  - Added a new page, `GeneralAnalytics`, to display aggregated user behavior data for all courses.
  - Implemented two grouped bar charts:
    - **Scroll Behavior**: Displays average scroll percentages for courses grouped by units with and without videos.
    - **Time Spent**: Displays average time spent for courses grouped by units with and without videos.
  - Fetched data dynamically from the backend, including:
    - All courses, units, scroll percentages, and time spent data.
  - Processed data on the frontend to calculate grouped averages for visualization.
  - Enhanced chart responsiveness and styling for better user experience.

- **Task**: Improved Navigation
  - Added a "General Analytics" button on the homepage to navigate to the analytics page.
  - Styled navigation components for consistency with the project design.

- **Task**: Backend Updates
  - Created new API endpoints for fetching all scroll and time data across courses to support general analytics.
  - Refactored database queries to optimize performance and accuracy.

- **Task**: Code Optimization
  - Consolidated repetitive code for chart options and data processing.
  - Enhanced logging for debugging data inconsistencies.
  - Added detailed comments to new functions for clarity and maintainability.

- **Outcome**: Fully functional `General Analytics` page with aggregated charts for user behavior across all courses. Improved navigation flow and backend support for efficient data retrieval. Code is clean, modular, and well-documented, ensuring maintainability. All changes are successfully merged into the `main` branch.

---

## **Next Steps**
- Show personal messages in the analytics.
- Update ReadMe with bronvermelding.