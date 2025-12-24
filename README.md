#Engineering Design Assignment – Expense Sharing Application

This is a full-stack Expense Sharing Application similar to Splitwise.
It allows users to create groups, add expenses, split costs, and view balances.

The project is built using React (Frontend) and Node.js + Express + MongoDB (Backend).

## Prerequisites

Before running the project, make sure you have the following installed:
Node.js (v16 or higher)
npm (comes with Node.js)
MongoDB
Either MongoDB Atlas (cloud) or local MongoDB

## 🚀 How to Run the Project Locally
### ▶️ Run Backend
cd backend
npm install

Create a .env file inside backend:

PORT=5000
MONGO_URI=your_mongodb_connection_string

Start backend:
npm run dev

Backend runs on:
http://localhost:5000

▶️ Run Frontend
Open a new terminal:
cd frontend
npm install
npm start

Frontend runs on:
http://localhost:3000

🔄 Application Flow
Frontend communicates with backend APIs
Users can:
Create groups
Add expenses
Split expenses
View balances

