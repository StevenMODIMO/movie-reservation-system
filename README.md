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
git clone https://github.com/StevenMODIMO/movie-reservation-system.git
cd movie-reservation-system
```

The project is organized into two applications:

```text
movie-reservation-system/
├── mrs-backend/       # FastAPI backend
├── mrs-frontend/      # Next.js frontend
└── README.md
```

---

# 🔧 Backend Setup

The backend is located inside the `mrs-backend` directory.

```bash
cd mrs-backend
```

The backend requires:

* Python 3.10+
* PostgreSQL
* A Python virtual environment

---

## 🪟 Windows Setup

### Option 1 — Python `venv`

Create the virtual environment:

```powershell
py -m venv .venv
```

Activate it in **PowerShell**:

```powershell
.venv\Scripts\Activate.ps1
```

Or in **Command Prompt**:

```cmd
.venv\Scripts\activate.bat
```

After activation, your terminal should look similar to:

```text
(.venv) C:\...\movie-reservation-system\mrs-backend>
```

Upgrade pip:

```powershell
py -m pip install --upgrade pip
```

Install dependencies:

```powershell
py -m pip install -r requirements.txt
```

---

### Option 2 — Conda

If you use Conda:

```powershell
conda create -n mrs-backend python=3.12
conda activate mrs-backend
```

Then install the dependencies:

```powershell
python -m pip install -r requirements.txt
```

---

## 🐧 Linux Setup

Navigate to the backend:

```bash
cd mrs-backend
```

Create a virtual environment:

```bash
python3 -m venv .venv
```

Activate it:

```bash
source .venv/bin/activate
```

Upgrade pip:

```bash
python -m pip install --upgrade pip
```

Install dependencies:

```bash
python -m pip install -r requirements.txt
```

If `venv` is not installed on Ubuntu/Debian:

```bash
sudo apt install python3-venv
```

---

## 🍎 macOS Setup

Navigate to the backend:

```bash
cd mrs-backend
```

Create a virtual environment:

```bash
python3 -m venv .venv
```

Activate it:

```bash
source .venv/bin/activate
```

Upgrade pip:

```bash
python -m pip install --upgrade pip
```

Install dependencies:

```bash
python -m pip install -r requirements.txt
```

---

# 🔐 Backend Environment Variables

Inside the `mrs-backend` directory, create a file named:

```text
.env
```

Add the following variables:

```env
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/mrs"
BLOB_READ_WRITE_TOKEN="your_vercel_blob_read_write_token"
SECRET_KEY="your_secret_key"
ALGORITHM="HS256"
ACCESS_TOKEN_EXPIRE_MINUTES=80
```

### Example `.env`

Use your own values. The values below are **dummy values for development/documentation purposes only**:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/mrs"
BLOB_READ_WRITE_TOKEN="vercel_blob_example_token_replace_me"
SECRET_KEY="replace_with_a_secure_random_secret_key"
ALGORITHM="HS256"
ACCESS_TOKEN_EXPIRE_MINUTES=80
```

> ⚠️ **Never commit your real `.env` file to Git.**
>
> Make sure `.env` is included in your `.gitignore`:

```gitignore
.env
.venv/
__pycache__/
```

The `DATABASE_URL` assumes PostgreSQL is running locally and that a database named `mrs` has already been created.

For example:

```sql
CREATE DATABASE mrs;
```

---

# 🗄️ Database Setup

Make sure PostgreSQL is running and that the database configured in `DATABASE_URL` exists.

Example:

```text
PostgreSQL
Host: localhost
Port: 5432
Database: mrs
Username: postgres
Password: your_password
```

This project uses Alembic for database migrations, run:

```bash
alembic upgrade head
```

from inside the `mrs-backend` directory.

---

# ▶️ Running the Backend

Make sure the Python virtual environment is activated.

From:

```text
mrs-backend/
```

run:

```bash
fastapi dev
```

For a production-style run:

```bash
fastapi run
```

The API should be available at:

```text
http://127.0.0.1:8000
```

FastAPI's interactive API documentation is available at:

```text
http://127.0.0.1:8000/docs
```

---

# 💻 Frontend Setup

The frontend is a Next.js application located inside:

```text
mrs-frontend/
```

Open another terminal and navigate to it:

```bash
cd mrs-frontend
```

The frontend requires:

* Node.js 18+
* npm, pnpm, yarn, or another supported package manager

Check your Node.js installation:

```bash
node --version
```

Check npm:

```bash
npm --version
```

---

## 📦 Install Frontend Dependencies

Using npm:

```bash
npm install
```

Or using pnpm:

```bash
pnpm install
```

Or using yarn:

```bash
yarn install
```

---

# 🔐 Frontend Environment Variables

Create a `.env.local` file inside:

```text
mrs-frontend/
```

Example:

```env
NEXT_PUBLIC_API_URL="http://127.0.0.1:8000"
```

If the frontend requires additional environment variables, add them to this file according to the configuration used by the application.

Example project structure:

```text
movie-reservation-system/
├── mrs-backend/
│   ├── .env
│   ├── .venv/
│   ├── requirements.txt
│   └── ...
│
├── mrs-frontend/
│   ├── .env.local
│   ├── package.json
│   └── ...
│
└── README.md
```

> ⚠️ **Never commit `.env.local` if it contains secrets.**

Add it to `.gitignore`:

```gitignore
.env.local
```

---

# ▶️ Running the Frontend

From the `mrs-frontend` directory:

```bash
npm run dev
```

Or for a better experience, build the project and start it in production mode:
```bash
npm run build
```
And then:
```bash
npm run start
```

The Next.js application should be available at:

```text
http://localhost:3000
```

---

# 🚀 Running the Full Application

You will generally need **two terminals**.

### Terminal 1 — Backend

```bash
cd movie-reservation-system/mrs-backend
```

Activate your virtual environment.

Windows:

```powershell
.venv\Scripts\Activate.ps1
```

Linux/macOS:

```bash
source .venv/bin/activate
```

Then:

```bash
fastapi dev
```

### Terminal 2 — Frontend

```bash
cd movie-reservation-system/mrs-frontend
npm run dev
```

The applications will then run approximately as:

```text
Frontend
http://localhost:3000

        │
        │ HTTP requests
        ▼

Backend
http://127.0.0.1:8000

        │
        │ SQL
        ▼

PostgreSQL
localhost:5432/mrs
```

---

## ✅ Verify the Installation

### Backend

Open:

```text
http://127.0.0.1:8000/docs
```

You should see the FastAPI Swagger documentation.

### Frontend

Open:

```text
http://localhost:3000
```

You should see the Movie Reservation System frontend.

If both applications are running successfully, the development environment is ready.


# 🎯 Goals

- Implement authentication and authorization
- Design a solid relational database schema
- Handle seat reservations safely and efficiently
- Support admin-level reporting and management
- Practice building scalable backend systems

---

# 👥 User Roles

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

# 🎬 Core Features

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

# 🧠 Key Design Considerations

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
