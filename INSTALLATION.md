# Installation & Startup Guide

## Prerequisites Check

Before starting, verify you have installed:

```bash
# Check Node.js version (should be v14.0.0+)
node --version

# Check npm version
npm --version
```

If not installed, download from [nodejs.org](https://nodejs.org)

---

## Quick Start (5 minutes)

### 1. Backend Setup

```bash
# Navigate to server folder
cd server

# Install dependencies
npm install

# Create .env file (copy from .env.example and add MongoDB URI)
cp .env.example .env

# Edit .env with your MongoDB connection string
# Then start the server
npm run dev
```

**Expected output:**
```
✓ MongoDB Connected: cluster0.mongodb.net
✓ Smart Library Server running on port 5000
✓ API available at http://localhost:5000/api
```

### 2. Frontend Setup (Open NEW Terminal)

```bash
# Navigate to client folder
cd client

# Install dependencies
npm install

# Start React development server
npm start
```

**Expected output:**
```
Compiled successfully!

You can now view smart-library-client in the browser.
  Local: http://localhost:3000
```

### 3. Test the Application

1. Open browser to `http://localhost:3000`
2. Fill out the form with book details:
   - Title: "The Great Gatsby"
   - Author: "F. Scott Fitzgerald"
   - ISBN: "978-0743273565"
   - Year: 1925
3. Click "Add Book"
4. Verify the book appears in the list below
5. Click "Delete" to remove the book

---

## Complete Installation Instructions

### Backend Setup

#### Step 1: Navigate to Server Directory
```bash
cd server
```

#### Step 2: Install All Dependencies
```bash
npm install
```

This installs:
- `express` - Web framework
- `mongoose` - MongoDB object modeling
- `cors` - Cross-Origin Resource Sharing
- `dotenv` - Environment variable management

#### Step 3: Configure MongoDB Connection

```bash
# Copy example env file
cp .env.example .env
```

Edit `.env` file and add your MongoDB Atlas connection string:

```env
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/smart-library?retryWrites=true&w=majority
PORT=5000
FRONTEND_URL=http://localhost:3000
```

📖 See [MONGODB_SETUP.md](MONGODB_SETUP.md) for detailed MongoDB Atlas setup

#### Step 4: Start Backend Server

**Development Mode** (with auto-reload):
```bash
npm run dev
```

**Production Mode**:
```bash
npm start
```

Server runs on: `http://localhost:5000`

API base URL: `http://localhost:5000/api`

---

### Frontend Setup

#### Step 1: Navigate to Client Directory
```bash
cd client
```

#### Step 2: Install All Dependencies
```bash
npm install
```

This installs:
- `react` - UI framework
- `react-dom` - React rendering
- `axios` - HTTP client for API requests

#### Step 3: Configure API URL (Optional)

Create `.env.local` in client folder for production API:

```env
REACT_APP_API_URL=https://your-backend-url.com/api
```

If not set, defaults to: `http://localhost:5000/api`

#### Step 4: Start React Development Server
```bash
npm start
```

This:
- Compiles React code
- Opens browser automatically at `http://localhost:3000`
- Enables hot module reloading (saves automatically update)

---

## Running Both Servers

### Option 1: Two Terminal Windows (Recommended)

**Terminal 1:**
```bash
cd server
npm run dev
```

**Terminal 2:**
```bash
cd client
npm start
```

### Option 2: Using npm-run-all (Optional)

Install globally:
```bash
npm install -g npm-run-all
```

From root directory:
```bash
npm-run-all --parallel start:server start:client
```

---

## Troubleshooting

### Backend Issues

**Error: "Cannot find module 'express'"**
```bash
cd server
npm install
```

**Error: "MongoDB connection failed"**
- Check MongoDB Atlas connection string in `.env`
- Verify IP whitelist in MongoDB Atlas Network Access
- Ensure database user credentials are correct

**Error: "Port 5000 already in use"**
```bash
# Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Frontend Issues

**Error: "Cannot find module 'react'"**
```bash
cd client
npm install
```

**Error: "CORS error - blocked request"**
- Ensure backend is running on port 5000
- Check CORS origin in `server/server.js`
- Verify `FRONTEND_URL` in `.env`

**Error: "API endpoint not found"**
- Check `REACT_APP_API_URL` environment variable
- Verify backend server is running
- Check network tab in browser dev tools

**Cannot connect to `http://localhost:3000`**
- Port 3000 might be in use
- Change port: `PORT=3001 npm start`
- Check terminal output for the actual port

---

## First-Time Setup Checklist

- [ ] Node.js and npm installed
- [ ] MongoDB Atlas account created
- [ ] `.env` file created with MongoDB URI
- [ ] Backend dependencies installed (`npm install` in server/)
- [ ] Frontend dependencies installed (`npm install` in client/)
- [ ] Backend started (`npm run dev` in server/)
- [ ] Frontend started (`npm start` in client/)
- [ ] Application loads at `http://localhost:3000`
- [ ] Can add and delete books successfully

---

## Available Scripts

### Backend Scripts

```bash
npm start     # Run server in production
npm run dev   # Run server in development with auto-reload
```

### Frontend Scripts

```bash
npm start     # Start development server
npm build     # Build for production
npm test      # Run tests
npm eject     # Eject from create-react-app (not reversible)
```

---

## Environment Variables Reference

### Backend (.env)

| Variable | Required | Example |
|----------|----------|---------|
| MONGODB_URI | Yes | `mongodb+srv://...` |
| PORT | No | `5000` |
| FRONTEND_URL | No | `http://localhost:3000` |

### Frontend (.env.local)

| Variable | Required | Example |
|----------|----------|---------|
| REACT_APP_API_URL | No | `http://localhost:5000/api` |

---

**Everything set up? Start building! 🚀**
