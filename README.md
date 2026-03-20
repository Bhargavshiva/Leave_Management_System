# Leave Management System

A **web-based leave management system** where employees can apply for leave and employers can approve/reject requests. Built with **Vue.js**, **Tailwind CSS**, **Node.js**, and **MongoDB Atlas**.

---

## Features

### Employee
- Sign up / Log in  
- Apply for leave (Sick / Casual)  
- View status of applied leaves (Pending / Approved / Rejected)  

### Employer
- Sign up / Log in  
- View all leave requests from employees  
- Approve or reject leave requests  

### Common
- Role-based access control  
- JWT authentication  
- Responsive UI with Tailwind CSS  

---

## Tech Stack

- **Frontend:** Vue.js + Tailwind CSS  
- **Backend:** Node.js + Express.js  
- **Database:** MongoDB Atlas  
- **Authentication:** JWT  
- **Deployment:** AWS EC2  

---

## Project Structure
backend/
├── models/
├── routes/
├── controllers/
├── server.js
├── .env

frontend/
├── src/
│ ├── api/
│ ├── components/
│ ├── views/
│ ├── router/
│ └── main.js
├── index.html
├── package.json


## Setup Instructions

### Backend
1. Install dependencies:

```bash
cd backend
npm install

2. Create a .env file:

MONGO_URI=<your MongoDB Atlas URI>
JWT_SECRET=<your secret>
PORT=5000

3. Start backend server:

npm run dev


Frontend

1. Install dependencies:

cd frontend
npm install

2. Run frontend:

npm run dev

Your app will run at http://localhost:5173 (frontend) and connect to backend at http://localhost:5000.


API Endpoints
Auth

POST /signup — User signup

POST /login — User login

Leaves

POST /api/leaves/apply — Apply leave (Employee)

GET /api/leaves/my — Get my leave requests (Employee)

GET /api/leaves/all — Get all leave requests (Employer)

PUT /api/leaves/:id — Approve/Reject leave (Employer)

Deployment

Deploy backend and frontend to AWS EC2 (Free Tier).

Ensure environment variables are set correctly on server.

Backend should be reachable from frontend via full IP address: http://<EC2_PUBLIC_IP>:5000.

