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
git clone https://github.com/OluwatobilobaGp/assignment-api.git
cd college-appointment-api
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

### 4. Running the App
<pre>
npm start
</pre>

Server will run at: http://localhost:5000

---

###  5. API Endpoints
METHOD	ENDPOINT	DESCRIPTION	AUTH
POST	/api/auth/register	Register a student or professor	❌
POST	/api/auth/login	Login and get a JWT token	❌
POST	/api/availability	Professors add available slots	✅
GET	/api/availability/:profId	Students view prof’s available slots	✅
POST	/api/appointments	Students book a slot with a prof	✅
DELETE	/api/appointments/:id	Professors cancel appointment	✅
GET	/api/appointments	Students see their bookings	✅

✅ All protected routes require a valid JWT token in the Authorization header.

---

### 6. Run Test

<pre>
npm test
</pre>
The test script includes:

- Connection to DB

- Creation of users (Student A1, A2 & Professor P1)

- Booking & cancelling appointments

- Assertions on expected behavior

---

### 7. Folder Structure

<pre>
college-appointment-api/
│
├── controllers/        # Business logic
├── models/             # Mongoose schemas
├── routes/             # API route handlers
├── test/               # Jest test file
├── seed/               # DB seeder (optional)
├── .env                # Environment variables
├── app.js              # App entry point
├── server.js           # Connects DB and starts server
└── README.md
</pre>

---

### 8.  Seed the Database
To populate the database with demo users and slots:

- Create a script like seed.js inside /seed

- Run:
<pre>
node seed
</pre>

---

### 9. Git Ignore
Make sure this is in your .gitignore file:

<pre>
node_modules/
.env
</pre>

---

### 10. Example JWT Auth Header
When making requests to protected endpoints, pass the JWT like this:

