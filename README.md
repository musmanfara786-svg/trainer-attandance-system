# BQ Trainer System - Trainer Attendance Management System

A client-side web application for trainers to manage class timetables, student registrations, and daily attendance tracking. All data is stored in the browser's **localStorage** — no backend or database required.

## Features

- **Dashboard** — Overview with active students count, total classes, today's class, and attendance percentage
- **Timetable Management** — Add, edit, and delete classes (subjects, batches, days, time, room, capacity)
- **My Classes** — View all classes with occupancy progress bars and search functionality
- **Student Management** — Register, edit, view, and soft-delete students with search
- **Attendance Marking** — Mark students as Present/Absent/Leave per class and date
- **Monthly Attendance Register** — View a matrix of attendance per student per day for any month
- **Student Details** — View individual student info and attendance history

## Tech Stack

- HTML5 • CSS3 • Tailwind CSS (CDN)
- Vanilla JavaScript
- Font Awesome 6.5.2 (CDN)
- Google Fonts (Poppins)
- localStorage for data persistence

## Getting Started

### Default Login Credentials

- **Email:** `trainer@gmail.com`
- **Password:** `123456`

### How to Run

Since this is a static front-end application, no build tools or server are required:

1. **Open directly:** Double-click `index.html` in any modern browser
2. **Or use a local server (recommended):**
   ```bash
   # Using Python
   python -m http.server 8080

   # Using Node.js
   npx serve .

   # Or use VS Code Live Server extension
   ```
   Then open `http://localhost:8080` in your browser.

### Usage Flow

1. **Login** with the default credentials above
2. **Set up Timetable** — Add classes (each must total exactly 4 hours/week: 2 hours × 2 days)
3. **Register Students** — Go to Students page and register students under a class
4. **Mark Attendance** — Select class and date, mark attendance, and save

**Important:** All data is stored in localStorage. Clearing browser data will erase everything.

## Screenshots

<!-- Add screenshots here if desired -->

## License

MIT
