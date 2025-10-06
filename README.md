<div align="center">

# 🧩 Fullstack Todo App

### A Fullstack Task Management System built for the **CoverageX Software Engineering Assignment**

🚀 _Showcasing backend API design, frontend development, database integration, automated testing, and Docker-based deployment._

[![Docker](https://img.shields.io/badge/Docker-Ready-blue?logo=docker)](https://www.docker.com/)
[![Node.js](https://img.shields.io/badge/Node.js-Backend-green?logo=node.js)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-Frontend-61DAFB?logo=react)](https://react.dev/)
[![Vitest](https://img.shields.io/badge/Tested%20With-Vitest-orange?logo=vitest)](https://vitest.dev/)

</div>

---


🎥 **Project Demo Video**  
<a href="https://youtu.be/2h-lQ6OSOYw" target="_blank">
  <img src="https://img.youtube.com/vi/2h-lQ6OSOYw/0.jpg" width="600" alt="CoverageX Todo App Demo">
</a>


## 🧭 Table of Contents

1. [🚀 Tech Stack](#-tech-stack)
2.  [🧰 Running the Project (via Docker Compose)](#-running-the-project-via-docker-compose)
3. [📁 Folder Structure](#-folder-structure)  
4. [⚙️ Environment Variables](#️-environment-variables)  
5. [🧪 Running Tests](#-running-tests)  
6. [🗂️ Features](#️-features)  
7. [🧱 Docker Architecture Overview](#-docker-architecture-overview)  
8. [🧑‍💻 Author](#-author)  
9. [🏁 Final Notes for Reviewers](#-final-notes-for-reviewers)  


---




## 🚀 Tech Stack

### 🖥️ **Frontend**
- ⚛️ React (Vite)
- 🟦 TypeScript
- 🎨 Tailwind CSS
- 🔔 React Toastify (notifications)
- 🔗 Axios (HTTP client)

### ⚙️ **Backend**
- 🟩 Node.js with Express.js
- 🛢️ MySQL Database
- 🔓 CORS
- 🔐 Dotenv for environment configuration
- 🔄 Nodemon for hot reload during development

### 🧪 **Testing**
- 🧠 Vitest (unit + integration testing)
- 🚦 Supertest (API endpoint testing)
- 📊 Coverage reports using `@vitest/coverage-v8`

### 🐳 **Containerization**
- 🧰 Docker and Docker Compose
- 🧩 Multi-service setup (frontend, backend, MySQL)
- 💾 Persistent storage using Docker volumes

---



## 📁 Folder Structure

```bash
coveragex-assignment/
├── backend/
│   ├── controllers/
│   │   └── taskController.js
│   ├── routes/
│   │   └── taskRoutes.js
│   ├── models/
│   │   └── db.js
│   ├── tests/
│   │   └── taskRoutes.test.js
│   ├── .env
│   ├── Dockerfile
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AddTask.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   └── TaskList.jsx
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env
│   ├── Dockerfile
│   ├── index.html
│   └── package.json
│
├── docker-compose.yml
├── .gitignore
├── README.md
└── .env
```



## ⚙️ Environment Variables


- 🔧 Backend (.env)
``` 
PORT=5000
DB_HOST=mysql
DB_USER=root
DB_PASSWORD=root
DB_NAME=todo_app
DB_PORT=3306
# DB_NAME_TEST=todo_app_test
```


 - 🐬 Main Folder (.env)
```
MYSQL_ROOT_PASSWORD=root
MYSQL_DATABASE=todo_app
PORT=5000
DB_HOST=mysql
DB_USER=root
DB_PASSWORD=root
DB_NAME=todo_app
# DB_NAME_TEST=todo_app_test
```


💡 Note:
- All required .env files are included and pre-configured.
- The default credentials work automatically with Docker Compose.
- You can update them if you wish to use custom settings.




## 🧰 Running the Project (via Docker Compose)

- 1️⃣ Clone the Repository
```
git clone https://github.com/KaveeshYoshitha/coveragex-assignment.git
cd coveragex-assignment
```


- 2️⃣ Run the Full Stack
```
docker compose up -d --build
```


- 3️⃣ Access the App
 
   🌐 Frontend: http://localhost:5173

   ⚙️ Backend API: http://localhost:5000

   🐬 MySQL: localhost:3307


- 4️⃣ Stop Everything
```
docker compose down -v
```



## 🧪 Running Tests
  ### NOTE: RUN THE FULL STACK BEFORE TESTING
  ```
    docker compose up -d --build
```

- ▶️ Backend Tests
```
docker compose exec backend sh -c "npm run test"
```

- 📊 View Backend Coverage
```
docker compose exec backend sh -c "npx vitest run --coverage"
```

- 🧩 Frontend Tests
```
docker compose exec frontend sh -c "npm run test"
```

- 📈 View Frontend Coverage
```
docker compose exec frontend sh -c "npx vitest run --coverage"
```



## 🗂️ Features

- ✅ Add Tasks – Create new tasks with title & description
- ✅ Get Tasks – View the latest or all tasks
- ✅ Mark as Done – Update task completion status
- ✅ Error Handling – Toast notifications for UI feedback
- ✅ Unit & Integration Tests – Ensures reliability
- ✅ Dockerized Setup – One command to start everything

  

## 🧱 Docker Architecture Overview
- 🖥️ Frontend	React app (Vite)	5173
- ⚙️ Backend	Node.js + Express API	5000
- 🛢️ MySQL	Database	3306 (internal), 3307 (host)

- 🕸️ All containers communicate via a shared Docker network: todoapp




## 🧑‍💻 Author
<div align="center">

👋 Kaveesh Yoshitha
🎓 Software Engineering Undergraduate | 💻 Web Developer 
📍 Sri Lanka


</div>



## 🏁 Final Notes for Reviewers
<div align="center">


- ✨ No manual setup required! ✨
  Simply run:
```
docker compose up -d --build
```


Everything (Frontend, Backend, MySQL) starts automatically.
The app and tests are self-contained — all database tables and data are auto-created during runtime.

</div>
