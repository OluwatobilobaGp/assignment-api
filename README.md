# 📚 College Appointment System API

This project is a **backend API** built with **Node.js**, **Express**, and **MongoDB**, designed to help **students** book appointments with **professors**. It includes **JWT authentication**, **role-based access**, and **automated tests**.

---

## 📌 Features

- 👩‍🏫 Professors can specify available time slots
- 🎓 Students can:
  - Register / Login
  - View available time slots
  - Book appointments
- ⛔ Professors can cancel appointments
- 🔐 JWT-based authentication for all users
- 🧪 One full end-to-end (E2E) test included using **Jest**

---

## 🛠️ Tech Stack

| Tool        | Purpose                           |
|-------------|------------------------------------|
| Node.js     | JavaScript runtime                |
| Express.js  | Web framework                     |
| MongoDB     | NoSQL database                    |
| Mongoose    | MongoDB ODM                       |
| JWT         | User authentication               |
| Jest        | Testing framework                 |
| dotenv      | Environment variable management   |
| Morgan      | HTTP request logger               |

---

## ⚙️ Installation

### 1. Clone the Repo

<pre>
git clone https://github.com/your-username/college-appointment-api.git cd college-appointment-api
</pre>

--- 

### 2. Install Dependencies

<pre>
npm install
</pre>

---
### 3. Create .env File
In the root directory, create a .env file:

<pre>
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/collegeApp
JWT_SECRET=supersecretkey
</pre>

--- 
