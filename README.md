# 📚 Library Management System

A modern, full-stack **Library Management System** built using the **MERN stack** with **Firebase Authentication**. This platform allows users to browse, borrow, return, and manage books online.

> ⚡ **Live Site**: [https://omar-library-management.netlify.app](https://omar-library-management.netlify.app)

---

##  Project Purpose

This project is designed to simplify the process of library management by:
- Making it easy to browse and search books.
- Allowing users to borrow and return books online.
- Letting admins or authorized users add, edit, or delete book entries.
- Providing a clean UI, secure authentication, and real-time updates.

---

## Tech Stack

### Frontend
- **React + Vite**
- **React Router DOM** – For navigation and private routes
- **Tailwind CSS** – Styling
- **Firebase Authentication** – Secure user login
- **React Toastify** – Notification system
- **React Helmet Async** – Dynamic page titles
- **React Rating Stars Component** – Show star ratings
- **React Icons** – Icon set
- **React Loader Spinner** – Global loading state UI

### Backend
- **Node.js + Express.js**
- **MongoDB + Mongoose** – Data storage and modeling
- **CORS** – Cross-origin access
- **Dotenv** – Environment variable management
- **Morgan** – Dev logging

---

## Live Demo

 [**View Live App**](https://omar-library-management.netlify.app)

 Sample credentials:
- Use Google Sign-In via Firebase (no sign-up form)

---

## Key Features

###  Authentication
- Login via Google with Firebase
- Auth-protected private routes

### 📚 Books Management
- Add, update, delete books (admin role)
- Book rating, quantity, image, and description
- Dynamic category pages

###  User Functionality
- Browse all books
- Filter by title and category
- Borrow/Return flow with quantity update
- View borrowed books
- Rating display for every book

###  UI/UX & Feedback
- Responsive layout
- Real-time toast notifications
- Global loading spinner
- Dynamic page titles per route

---

##  NPM Packages Used

### Frontend
```bash
npm install react-router-dom tailwindcss firebase react-toastify react-icons react-helmet-async react-rating-stars-component react-loader-spinner
