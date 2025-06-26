# 🛡️ RBAC Blog Platform

This is a full-stack blog application implementing **Role-Based Access Control (RBAC)** using the **MERN stack (MongoDB, Express.js, React, Node.js)**. The platform ensures secure user authentication and authorization with two roles: **Admin** and **User**.

Admins can perform CRUD operations on blog posts, while regular users can only view them.

---

## 🚀 Features

- 🔐 JWT-based user authentication
- 🧑‍💼 Role-based access (admin/user)
- 📝 Blog management (Create, Read, Update, Delete) — *admin only*
- 📄 View blogs — *all users*
- 🧾 Password hashing with bcrypt
- 🧠 Secure route protection using middleware
- 📫 Basic error handling and loading states
- 🌐 Fully responsive React frontend
- ✅ Simple and beginner-friendly UI

---

## ⚙️ Tech Stack

### 📦 Backend:
- Node.js
- Express.js
- MongoDB (Mongoose ODM)
- JWT for authentication
- Bcrypt for password hashing
- dotenv for environment variables
- CORS middleware

### 🎨 Frontend:
- React.js (Functional Components + Hooks)
- React Router DOM
- Axios (for API calls)
- CSS (custom styling)

---

## 📁 Folder Structure
rbac-blog-app/
├── backend/
│ ├── server.js
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ └── .env
└── frontend/
├── public/
└── src/
├── pages/
├── components/
├── App.js
├── App.css
└── index.js


---

## 🛠 How to Run the Project (VS Code)

### Prerequisites
- Node.js installed
- MongoDB installed locally OR MongoDB Atlas account
- VS Code editor

---

### 🔄 Step 1: Clone the Repository

⚙️ Step 2: Setup Backend
1. cd backend
2. npm install
3. Create .env file in backend/ folder:
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your_jwt_secret
4. To use MongoDB locally:
   MONGO_URI=mongodb://localhost:27017/rbac-blog

⚙️ Step 3: Setup Frontend
cd ../frontend
npm install

▶️ Step 4: Run the Application
In backend terminal: npm run dev
In frontend terminal: npm start

Backend runs at: http://localhost:5000
Frontend runs at: http://localhost:3000

🧪 How to Test the Application
Register a user with role: admin

Login and go to Admin Dashboard to add blogs

Register another user with role: user

Login as user and try viewing blogs

Confirm users cannot access admin routes (create/update/delete)

🧱 Project Architecture
Backend:
server.js – Express entry point

models/ – Mongoose schemas (User, Blog)

routes/ – API endpoints for auth and blog operations

middleware/ – Auth and role-check middleware

Frontend:
App.js – Main app with routes

components/Navbar.js – Navigation bar

pages/ – Pages: Login, Register, BlogList, AdminDashboard

🔐 Security Measures
Passwords hashed using bcrypt

JWT-based stateless authentication

Role-based access using protected routes

CORS enabled for cross-origin access

Basic input validation and error handling

📋 Completed Features
✅ User signup/login
✅ JWT token-based authentication
✅ Admin-only blog management
✅ User-only blog view
✅ Protected frontend & backend routes
✅ Complete responsive design
✅ Full VS Code and local setup guide
✅ Beginner-friendly clean UI

⚠️ Known Limitations / Issues Faced
1. Email verification and real-time updates not implemented yet due to time constraints

2. No Redux or advanced state management (kept simple)

3. Minimal form validations


🤝 Acknowledgements
This project was built with the help of Claude AI to generate boilerplate code and guide project structure, along with additional help from ChatGPT to refine implementation and setup instructions.

📬 Contact
For questions or suggestions, feel free to reach out:

Name: Nikhil Raj

GitHub: github.com/itsnewcoder


---

Let me know if you want the `.env`, `package.json`, or `index.html` templates as well. I can also help you implement **email verification** or **real-time updates** if your deadline allows.


