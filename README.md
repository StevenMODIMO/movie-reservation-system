# 🎬 Movie Reservation System (Backend)

A backend system for a movie reservation service that allows users to browse movies, view showtimes, reserve seats, and manage reservations. The system also includes role-based access for admin and regular users.

---

## 🚀 Project Overview

This project focuses on building a real-world backend system with complex business logic such as:

- Seat reservation handling (preventing overbooking)
- Showtime scheduling
- Role-based authentication and authorization
- Relational data modeling and reporting queries

---


## 📦 Project Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/StevenMODIMO/movie-reservation-system.git mrs
cd mrs
```
---

## 🎯 Goals

- Implement authentication and authorization
- Design a solid relational database schema
- Handle seat reservations safely and efficiently
- Support admin-level reporting and management
- Practice building scalable backend systems

---

## 👥 User Roles

### Regular Users
- Sign up and log in
- Browse movies and showtimes
- View available seats
- Reserve seats for a showtime
- View and cancel upcoming reservations

### Admin Users
- Add, update, and delete movies
- Manage showtimes
- View all reservations
- View capacity and revenue reports
- Promote users to admin (only admins can do this)

---

## 🎬 Core Features

### 1. Authentication & Authorization
- User sign-up and login
- Role-based access control (admin / user)
- Admin seeded initially in the system
- JWT-based authentication (recommended)

---

### 2. Movie Management
- Create, update, delete movies (admin only)
- Movies include:
  - Title
  - Description
  - Poster image
  - Genre(s)
- Movies are linked to multiple showtimes

---

### 3. Showtime Management
- Movies have scheduled showtimes
- Showtimes are date and time specific
- Each showtime has a defined seat capacity

---

### 4. Reservation System
- Users can view available seats per showtime
- Users can reserve one or more seats
- System prevents **overbooking**
- Users can:
  - View reservations
  - Cancel upcoming reservations only

---

### 5. Admin Reporting
Admins can:
- View all reservations
- Check seat occupancy per showtime
- View revenue generated per movie or showtime

---

## 🧠 Key Design Considerations

### Database Design
Think carefully about relationships between:

- Users
- Movies
- Showtimes
- Seats
- Reservations

### Seat Reservation Logic
- Prevent double booking
- Handle concurrent requests safely

### Scheduling
- Proper linkage between movies and showtimes

### Reporting
- Efficient aggregation queries for occupancy and revenue

### Security
- Secure authentication (JWT recommended)
- Role-based authorization

---

## 🛠️ Tech Stack (Suggested)

You can use any stack, but recommended:

- **Backend:** FastAPI / Django / Node.js (Express)
- **Database:** PostgreSQL or MySQL
- **ORM:** SQLModel / SQLAlchemy / Prisma
- **Auth:** JWT-based authentication

---
