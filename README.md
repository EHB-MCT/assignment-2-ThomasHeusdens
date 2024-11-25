# **Can Academy**

A simplified Khan Academy-like platform designed track user engagement, and analyze learning behaviors. Built using **React** for the frontend, **Node.js** for the backend, and **MongoDB** for data storage.

---

## **License**

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE.md) file for license rights and limitations (MIT).

---

## **Why I'm Doing This Project**

This project is part of an academic exercise to learn data aggreggation and data visualisation to:
- Integrate and work with modern web technologies such as React, Node.js, and MongoDB.
- Solve real-world challenges like tracking user interaction and engagement.

---

## **Why Is It Useful**

Educational platforms are vital for modern learning environments. This project explores how to:
1. Track and improve engagement using collected data.
2. Enable personalized learning paths by analyzing user activity.

The insights from this project can be extended to improve user experience design.

---

## **Getting Started**

To set up and run the project locally:

### Prerequisites
- Node.js (v16+ recommended)
- MongoDB (local or cloud, e.g., MongoDB Atlas)
- NPM or Yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/EHB-MCT/assignment-2-ThomasHeusdens
   cd Assignment-2-ThomasHeusdens
   ```

2. Set up the backend:
   ```bash
   cd backend
   npm install
   ```

3. Create a `.env` file in the `backend` folder:
   ```
   MONGO_URI=mongodb+srv://thomasheusdens:Pilou031003-@web2.j1djvfa.mongodb.net/dev5?retryWrites=true&w=majority
   JWT_SECRET=i_dont_know_what_this_is
   ```
   
4. Add this line under Scripts in your package.json in the backend
   ```
   "dev": "nodemon server.js"
   ```

5. Start the backend:
   ```bash
   npm run dev
   ```

6. Set up the frontend:
   ```bash
   cd ../frontend
   npm install
   npm start
   ```

7. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## **Where Can I Find Help**

If you encounter any issues:
1. Check the [GitHub Issues](https://github.com/EHB-MCT/assignment-2-ThomasHeusdens/issues) page for solutions or report a new issue.
2. Review the documentation in this README or project files.
3. Contact the authors via email.

---

## **Status of the Project**

This project is currently in the **development phase**. 
- Basic functionality, such as content listing, API integration, user authentication, enhanced activity tracking, is complete.
- Future improvements include:
  - User interactivity tracking such as how much the user scrolled on a webpage.

---

## **Authors**

- **Thomas Heusdens** - *Full-stack Developer* - [GitHub](https://github.com/ThomasHeusdens) - [Email](mailto:thomas.heusdens@student.ehb.be)

---

## **Contributing**

Contributions are welcome! Here's how you can get involved:

1. **Suggest New Features**: Open a feature request by creating a GitHub issue.
2. **Report Bugs**: Submit a detailed bug report using the GitHub Issues page.
3. **Get in Touch**: Reach out via email or GitHub for further discussions.

Please read the [Code of Conduct](#code-of-conduct) before contributing.

### How to Contribute
1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## **Code of Conduct**

We value an open and inclusive community. All contributors are expected to adhere to the following principles:

1. **Respect**: Be respectful in all communications.
2. **Inclusivity**: Ensure that the community is welcoming to individuals of all backgrounds and experiences.
3. **Constructive Feedback**: Provide and accept feedback respectfully and constructively.
4. **Zero Tolerance for Harassment**: Any form of harassment or discrimination will not be tolerated.

Violations of the Code of Conduct may result in temporary or permanent suspension from the project.

For full details, please review our [Code of Conduct](CODE_OF_CONDUCT.md).