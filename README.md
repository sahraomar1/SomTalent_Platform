# SomTalent

**Connecting Somaliland talent to remote jobs worldwide.**

🚀 **Live App:** [https://somtalent-platform-1.onrender.com](https://somtalent-platform-1.onrender.com)  
🎥 **Demo Video:** [Paste your video link here]  
📄 **SRS Document:** [Paste your SRS document link here]
---

## Project Overview

SomTalent is a full-stack web application designed to bridge the gap between skilled job seekers in Somaliland and global remote employers. The platform features a bilingual interface (English and Somali), role-based dashboards, and a complete recruitment ecosystem including training modules and automated interview scheduling.

---

## System Architecture

The application follows the **MERN Stack** (MongoDB, Express, React, Node.js) and is fully deployed in a cloud-native environment:

* **Frontend:** React (Vite) hosted on **Render** as a Static Site.
* **Backend:** Node.js/Express hosted on **Render** as a Web Service.
* **Database:** **MongoDB Atlas** (Cloud-hosted Cluster).
* **Security:** JWT authentication and bcryptjs password hashing.

---

## Key Features

-   **Bilingual Interface:** Seamless toggle between English and Somali.
-   **Multi-Role System:** Custom dashboards for **Job Seekers**, **Employers**, and **Admins**.
-   **End-to-End Recruitment:** Resume uploads, screening questions, and cover letter submissions.
-   **Training & Certification:** Integrated learning modules with automated certificate generation.
-   **Interview Ecosystem:** Tools for scheduling virtual or physical interviews with live notifications.
-   **Admin Management:** Employer verification workflow and user account status controls (suspend/activate).

---

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React (Vite) |
| **Backend** | Node.js + Express |
| **Database** | MongoDB Atlas (Cloud) |
| **File Storage** | Multer (Server-side storage) |
| **Authentication** | JSON Web Tokens (JWT) & bcryptjs |
| **Deployment** | Render |

---

## Deployment & Live Access

The project is currently live and accessible via the web. No local database installation is required to test the production environment.

* **Production Frontend:** `https://somtalent-platform-1.onrender.com`
* **Production API:** `https://somtalent-platform.onrender.com`

---

## Local Development Setup

If you wish to run the project locally on your machine:

### 1. Clone the Repository
```bash
git clone [https://github.com/sahraomar1/SomTalent_Platform.git](https://github.com/sahraomar1/SomTalent_Platform.git)
cd SomTalent_Platform
```

### 2. Backend Configuration
Navigate to the `Backend/` folder and create a `.env` file:
```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
```
Install dependencies and start the server:
```bash
cd Backend
npm install
node index.js
```

### 3. Frontend Configuration
Ensure your frontend API calls point to `http://localhost:5000`.
```bash
cd frontend
npm install
npm run dev
```

---

## Default Admin Credentials

For evaluation and testing of the Admin Dashboard:

| Field | Value |
| :--- | :--- |
| **Email** | `admin@somtalent.com` |
| **Password** | `admin123` |

---

## Project Structure

```text
SomTalent_Platform/
├── Backend/
│   ├── index.js          # Main Express server & API routes
│   ├── package.json      # Backend dependencies
│   ├── .env              # Environment variables (Hidden)
│   └── uploads/          # Directory for stored resumes
└── frontend/
    ├── src/
    │   └── App.jsx       # Main React application logic
    ├── dist/             # Production build folder (for Render)
    └── package.json      # Frontend dependencies
```

---

## Author

**Sahra Omar** *African Leadership University*