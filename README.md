# 🐦 HireNest — Job Portal

A full-stack MERN job portal where employers can post jobs and candidates can browse and apply. Built with React, Node.js, Express, and MongoDB.

## 🔗 Live Links

- **Frontend:** https://hirenest-seven.vercel.app
- **Backend:** https://hirenest-server.onrender.com

## ✨ Features

- JWT-based user authentication (Register/Login)
- Post, edit, and delete job listings
- Browse all available jobs publicly
- Filter jobs by location, type, price range, and status
- Apply Now button with external application link
- Seller dashboard to manage your postings
- Form validation on registration and login
- Fully responsive UI

## 🛠️ Tech Stack

**Frontend**
- React + Vite
- Tailwind CSS
- Axios
- React Router
- SweetAlert2

**Backend**
- Node.js
- Express.js
- MongoDB (Native Driver)
- JSON Web Tokens (JWT)
- bcryptjs

**Deployment**
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

## 🚀 Run Locally

**1. Clone the repo**
```bash
git clone https://github.com/kritiarora01/hirenest.git
cd hirenest
```

**2. Setup Backend**
```bash
cd server
npm install
```

Create a `.env` file in the server folder:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

```bash
node index.js
```

**3. Setup Frontend**
```bash
cd client
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## 📁 Project Structure

```
hirenest/
├── client/          # React frontend
│   └── src/
│       ├── api/         # Axios API calls
│       ├── components/  # Header, Footer, JobCard, JobForm
│       ├── context/     # Auth context
│       ├── pages/       # Home, Login, Register, Seller, AllJobs, AddJob
│       └── routes/      # App routes, Private route
├── server/          # Express backend
│   ├── controllers/ # Auth & Job controllers
│   ├── middleware/  # JWT auth middleware
│   ├── models/      # User & Job models
│   └── routes/      # Auth & Job routes
```

## 👩‍💻 Author

**Kriti Arora** — [@kritiarora01](https://github.com/kritiarora01)