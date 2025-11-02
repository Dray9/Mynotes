# Activity 2: Notes Application

A full-stack notes application with user authentication. Built with NestJS, React, TypeScript, and SQLite.

## Features

- 🔐 User registration and login with JWT authentication
- 📝 Create, read, update, and delete personal notes
- 🔒 Private notes - users can only access their own data
- 🎨 Clean and modern green-themed UI
- 📚 Swagger API documentation

## Technologies

**Backend:** NestJS, TypeScript, SQLite, JWT, bcrypt  
**Frontend:** React, Vite, Axios, React Router

## Prerequisites

Before running this application, install these programs:

1. **Node.js** - Download from https://nodejs.org
   - Click the green button labeled "LTS" (recommended version)
   - Install it (just click "Next" until it's done)

2. **Visual Studio Code (VS Code)** - Download from https://code.visualstudio.com
   - Install like any normal program

3. **Git** - Download from https://git-scm.com
   - Install it (just click "Next" until it's done)

## How to Run the Application

### Step 1: Clone the Project

1. Open **Visual Studio Code**
2. Press `Ctrl + Shift + P` (Windows) or `Cmd + Shift + P` (Mac)
3. Type: `Git: Clone` and paste this URL: `https://github.com/Dray9/Mynotes.git`
4. Select a folder where you want to save the project (e.g., Documents or Desktop)
5. Click "Open" when prompted

### Step 2: Start the Backend (Server)

1. In VS Code, open the terminal by pressing **Ctrl + `** (the backtick key, located above Tab)

2. Type these commands **one by one** (press Enter after each):
```bash
cd backend
```
```bash
npm install
```
*(Wait 2-3 minutes while it installs required packages)*
```bash
npm run start:dev
```

✅ **Success!** When you see "Server running on http://localhost:3000", it's working!

**⚠️ IMPORTANT: Keep this terminal window open!**

### Step 3: Start the Frontend (User Interface)

1. Click the **+** button in the terminal area (top-right corner) to open a second terminal

2. Type these commands **one by one**:
```bash
cd frontend
```
```bash
npm install
```
*(Wait 2-3 minutes while it installs required packages)*
```bash
npm run dev
```

✅ **Success!** When you see "Local: http://localhost:5173", it's ready!

### Step 4: Open the Application

1. Open your web browser (Chrome, Firefox, Edge, or Safari)
2. Go to: **http://localhost:5173**
3. You should see the login page! 🎉

## What You Should See

You should have **TWO terminals** running in VS Code:
```
Terminal 1: backend     ← Shows "Server running on http://localhost:3000"
Terminal 2: frontend    ← Shows "Local: http://localhost:5173"
```

**Both need to stay open while you use the app!**

## How to Stop the Application

1. Click on each terminal
2. Press `Ctrl + C` (or `Cmd + C` on Mac)
3. Do this for BOTH terminals

## How to Start It Again Later

1. Open VS Code
2. Open the Activity2-Notes-App folder (File → Open Folder)
3. Open TWO terminals
4. In Terminal 1:
```bash
cd backend
npm run start:dev
```
5. In Terminal 2:
```bash
cd frontend
npm run dev
```
6. Open browser to http://localhost:5173

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/register` | POST | Register new user |
| `/api/auth/login` | POST | Login user |
| `/api/notes` | GET | Get all user notes |
| `/api/notes` | POST | Create new note |
| `/api/notes/:id` | GET | Get specific note |
| `/api/notes/:id` | PUT | Update note |
| `/api/notes/:id` | DELETE | Delete note |

## Swagger API Documentation

Interactive API documentation available at: **http://localhost:3000/api-docs**

## Troubleshooting

| Problem | Solution |
|---------|----------|
| "Port already in use" | Close all terminals and try again |
| Website won't load | Make sure BOTH terminals are running |
| "npm: command not found" | You need to install Node.js first |
| Everything looks broken | Close VS Code completely and start over from Step 2 |

## Project Structure
```
Activity2-Notes-App/
├── backend/                # NestJS API
│   ├── src/
│   │   ├── auth/          # Authentication module
│   │   ├── users/         # Users module
│   │   ├── notes/         # Notes module
│   │   └── config/        # Database config
│   └── database.sqlite    # SQLite database
└── frontend/              # React UI
    └── src/
        ├── pages/         # Login, Register, Dashboard
        └── services/      # API calls
```
