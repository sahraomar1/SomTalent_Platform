# SomTalent

**Connecting Somaliland talent to remote jobs worldwide.**

🎥 **Demo Video:** [Paste your video link here]  
📄 **SRS Document:** [Paste your SRS document link here]

---

## Project Overview

SomTalent is a web-based platform that connects job seekers in Somaliland with remote opportunities from global employers. It provides job matching, resume management, training modules with certification, and an interview scheduling system — all within a role-based environment for job seekers, employers, and admins.

---

## Problem Statement

Many skilled individuals in Somaliland face challenges accessing remote job opportunities due to limited exposure to global job markets, a lack of structured platforms, and few training resources. SomTalent addresses this by providing a complete hiring ecosystem tailored to this context.

---

## System Actors

| Actor | Capabilities |
|---|---|
| **Job Seeker** | Sign up, upload resume, browse and apply for jobs (with cover letter + screening answers), complete training modules, earn certificates, track applications |
| **Employer** | Post jobs with screening questions, review applicants and their resumes/cover letters, shortlist/accept/reject candidates, schedule interviews (online or physical) |
| **Admin** | View all users, verify employer accounts, suspend/activate users, monitor platform statistics |

---

## Key Features

- Bilingual interface (English and Somali)
- Role-based dashboards with live statistics
- Resume upload and employer-facing resume viewing
- Cover letter submission on job application
- Screening questions during job application
- Skill-based match score system
- Training modules with certificate issuance
- Interview scheduling (online or physical) with meeting links/locations
- In-app notification system for all events
- Admin-controlled employer verification with request/approve flow
- User suspend and activate controls for admin
- Frontend input validation (email, password, phone)
- Session persists across browser tabs and restarts

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite) |
| Backend | Node.js + Express |
| Database | MongoDB (local) |
| File Uploads | Multer |
| Password Security | bcryptjs |

---

## Prerequisites

Before running this project, make sure you have:

- **Node.js v18 or higher** — [Download here](https://nodejs.org)
- **npm v9 or higher** (comes with Node.js)
- **MongoDB installed and running locally** — [Download here](https://www.mongodb.com/try/download/community)

### How to install and start MongoDB locally

**Windows:**
1. Download MongoDB Community Server from the link above
2. Run the installer (choose "Complete" setup)
3. MongoDB runs as a Windows service automatically after installation
4. Verify it is running by opening Command Prompt and typing: `mongosh.`

**macOS (using Homebrew):**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Ubuntu/Linux:**
```bash
sudo apt-get install -y mongodb
sudo systemctl start mongod
sudo systemctl enable mongod
```

You do not need to create a database manually — MongoDB will create the `somtalent` database automatically when the app first runs.

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/SomTalent.git
cd SomTalent
```

---

### 2. Backend setup

```bash
cd backend
npm install
```

Create a file called `.env` inside the `backend/` folder:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/somtalent
```

> This connects to your local MongoDB instance. The database named `somtalent` will be created automatically on first run.

Start the backend server:

```bash
npm run dev
```

You should see:
```
MongoDB connected
Server running on http://localhost:5000
Default admin created: admin@somtalent.com / admin123
```

On first startup, the server automatically:
- Creates the `somtalent` database and all collections
- Seeds 3 training modules
- Creates the default admin account
- Creates the `uploads/` folder for resume storage

---

### 3. Frontend setup

Open a **new terminal window** (keep the backend running), then:

```bash
cd frontend
npm install
npm run dev
```

The frontend will run at: `http://localhost:5173`

---

## Running the Project

You must have **two terminal windows open at the same time**:

| Terminal | Command | URL |
|---|---|---|
| Terminal 1 (backend) | `cd backend && npm run dev` | http://localhost:5000 |
| Terminal 2 (frontend) | `cd frontend && npm run dev` | http://localhost:5173 |

Open `http://localhost:5173` in your browser.

---

## Default Admin Credentials

An admin account is created automatically on first run:

| Field | Value |
|---|---|
| Email | `admin@somtalent.com` |
| Password | `admin123` |

Use these to log in and access the Admin Dashboard, verify employer accounts, and manage users.

---

## Testing Instructions

Use separate browser profiles or incognito windows to test multiple roles simultaneously.

**As a Job Seeker:**
1. Go to Join / Login → Create Account → As Job Seeker
2. Fill in name, email, password, skills, work history and upload a resume
3. Log in → Browse Jobs → answer screening questions → write a cover letter → click Apply
4. Go to Training Modules → click Complete Module → check your certificate in Certificates tab
5. Check Notifications for updates

**As Employer:**
1. Sign up as an Employer with a company name and website
2. Log in → Post Job → fill in job details and screening questions
3. Go to Employer Dashboard → review incoming applications
4. Shortlist a candidate → accept → schedule an interview (choose online or physical)
5. The job seeker will receive a notification with interview details

**As Admin:**
1. Log in with `admin@somtalent.com` / `admin123`
2. View the Admin Dashboard for platform statistics
3. Go to Users → verify a pending employer or suspend a user

---

## Project Structure

```
SomTalent/
├── backend/
│   ├── index.js          # Express server — all API routes and logic
│   ├── package.json
│   ├── .env              # Created by you (not committed to GitHub)
│   └── uploads/          # Auto-created — stores uploaded resumes
└── frontend/
    ├── src/
    │   └── App.jsx       # Main React component — all UI and logic
    └── package.json
```

---

## Notes

- MongoDB must be running locally before starting the backend
- Both the backend and frontend servers must be running at the same time
- The `uploads/` folder is created automatically — do not create it manually
- The `.env` file must not be committed to GitHub (it is in `.gitignore`)
- Resume files are served at `http://localhost:5000/uploads/`
- The app supports English and Somali — use the language toggle button in the header

---

## Author

**Sahra Omar**  
African Leadership University  
[Your GitHub Profile Link]
