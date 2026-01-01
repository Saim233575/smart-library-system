#  Smart Library Management System

A modern, full-stack web application for efficiently managing a library's book collection. Built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js), this application allows librarians and users to add, view, and remove books from the library.

##  Features

-  **Add Books** - Submit new books with title, author, ISBN, and publication year
-  **View Books** - Browse all books in a responsive card layout
-  **Delete Books** - Remove books from the library collection
-  **Responsive Design** - Works seamlessly on devices from 320px (mobile) and above
-  **Real-time Updates** - Instant UI updates without page reload
-  **Error Handling** - User-friendly error messages for all operations
-  **RESTful API** - Clean, well-documented REST endpoints


##  Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14.0.0 or higher)
- **npm** or **yarn** package manager
- **MongoDB Atlas account** (for cloud database)
- **Git** for version control

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/smart-library-system.git
cd smart-library-system
```

### Step 2: Setup Backend (Server)

#### 2.1 Install Backend Dependencies

```bash
cd server
npm install
```

#### 2.2 Configure Environment Variables

Create a `.env` file in the server directory (copy from `.env.example`):

```bash
cp .env.example .env
```

Edit `.env` and add your MongoDB connection string:

```env
# Get MongoDB URI from MongoDB Atlas (https://www.mongodb.com/cloud/atlas)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/smart-library?retryWrites=true&w=majority
PORT=5000
FRONTEND_URL=http://localhost:3000
```

#### 2.3 Start the Backend Server

```bash
# Development mode with auto-reload
npm run dev

# Or for production
npm start
```

The server will run on `http://localhost:5000`

### Step 3: Setup Frontend (Client)

#### 3.1 Open a New Terminal

```bash
cd client
```

#### 3.2 Install Frontend Dependencies

```bash
npm install
```

#### 3.3 Start the React Development Server

```bash
npm start
```

The application will open automatically at `http://localhost:3000`

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### 1. Get All Books
```
GET /api/books
```

**Response (Success - 200):**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "isbn": "978-0743273565",
      "publicationYear": 1925,
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

#### 2. Add a New Book
```
POST /api/books
Content-Type: application/json

{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "isbn": "978-0743273565",
  "publicationYear": 1925
}
```

**Response (Success - 201):**
```json
{
  "success": true,
  "message": "Book added successfully!",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "isbn": "978-0743273565",
    "publicationYear": 1925
  }
}
```

**Response (Error - 400):**
```json
{
  "success": false,
  "message": "A book with this ISBN already exists in the library."
}
```

#### 3. Delete a Book
```
DELETE /api/books/:id
```

**URL Example:** `DELETE /api/books/507f1f77bcf86cd799439011`

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Book removed successfully!",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "isbn": "978-0743273565",
    "publicationYear": 1925
  }
}
```

**Response (Error - 404):**
```json
{
  "success": false,
  "message": "Book not found. It may have already been deleted."
}
```
##  Error Handling

### Frontend Error Handling
- Try-catch blocks around all API calls
- User-friendly error messages displayed in banner
- Loading states to prevent duplicate submissions
- Input validation before form submission

### Backend Error Handling
- Try-catch blocks in all route controllers
- Duplicate ISBN detection (unique index)
- Invalid MongoDB ObjectID validation
- Database connection error handling
- Detailed error logging

### Error Messages
```javascript
// Input validation error
"Please fill in all required fields"

// Duplicate ISBN error
"A book with this ISBN already exists in the library."

// Book not found error
"Book not found. It may have already been deleted."

// Server error
"Failed to add book. Please try again later."
```
### Environment Variables for Production
```env
# Frontend (.env file in client folder)
REACT_APP_API_URL=https://your-backend-url.com/api

# Backend (.env file in server folder)
MONGODB_URI=mongodb+srv://...
PORT=5000
FRONTEND_URL=https://your-frontend-url.com
```

