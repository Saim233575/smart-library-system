# Architecture & Code Documentation

## Project Architecture Overview

The Smart Library Management System follows a **three-tier architecture pattern**:

```
┌─────────────────────────────────────────────┐
│          FRONTEND (React)                   │
│  • Components (BookForm, BookList)          │
│  • State Management (useState, useEffect)   │
│  • HTTP Requests (Axios)                    │
│  • Styling (CSS)                            │
└────────────────┬────────────────────────────┘
                 │ HTTP/REST API
                 ↓
┌─────────────────────────────────────────────┐
│       BACKEND (Express.js)                  │
│  • API Routes (/api/books)                  │
│  • Controllers (Business Logic)             │
│  • Models (Data Validation)                 │
│  • Middleware (CORS, JSON Parser)           │
└────────────────┬────────────────────────────┘
                 │ Query/Commands
                 ↓
┌─────────────────────────────────────────────┐
│       DATABASE (MongoDB)                    │
│  • Collections (books)                      │
│  • Documents (book records)                 │
│  • Schemas (data structure)                 │
└─────────────────────────────────────────────┘
```

---

## Frontend Architecture (React)

### Component Hierarchy

```
App (Root Component)
├── BookForm (Add Book Component)
│   ├── Form Input Fields
│   └── Submit Button
└── BookList (Display Books Component)
    ├── Book Cards (Mapped)
    │   ├── Book Title
    │   ├── Author
    │   ├── ISBN
    │   ├── Year
    │   └── Delete Button
    └── Empty State / Loading Message
```

### Component Descriptions

#### 1. App.js (Main Component)
**Purpose:** Manage global state and API communication

**State:**
- `books` - Array of all books
- `isLoading` - Loading state during API calls
- `isLoadingBooks` - Loading state for fetching books
- `errorMessage` - Error notification message

**Methods:**
- `fetchBooks()` - GET request to fetch all books
- `handleAddBook(formData)` - POST request to add new book
- `handleDeleteBook(bookId)` - DELETE request to remove book

**Key Features:**
- Uses `useEffect` hook to fetch books on mount
- Manages error messages with cleanup
- Coordinates data flow between child components
- Handles API error responses gracefully

#### 2. BookForm.js (Form Component)
**Purpose:** Collect user input and submit new books

**State:**
- `formData` - Form input values (title, author, isbn, year)

**Props:**
- `onAddBook(formData)` - Callback function from parent
- `isLoading` - Boolean to disable form during submission

**Form Fields:**
1. **Book Title** - Text input for book name
2. **Author Name** - Text input for author
3. **ISBN Number** - Text input for ISBN
4. **Publication Year** - Number input with min/max validation

**Validation:**
- Client-side checks for empty fields
- Backend validation for duplicate ISBN
- Form resets after successful submission

#### 3. BookList.js (List Component)
**Purpose:** Display all books in responsive card layout

**Props:**
- `books` - Array of book objects to display
- `onDeleteBook(id)` - Callback for delete action
- `isLoading` - Boolean to disable delete during submission
- `isLoadingBooks` - Boolean to show loading message

**Features:**
- Responsive grid layout (CSS Grid)
- Delete confirmation dialog
- Empty state message when no books
- Loading message while fetching

---

## Backend Architecture (Express.js)

### Route Structure

```
/api
├── /books (GET)    - Retrieve all books
├── /books (POST)   - Add new book
└── /books/:id (DELETE) - Remove book by ID
```

### File Organization

#### 1. server.js (Main Server File)
**Responsibilities:**
- Initialize Express application
- Configure middleware (JSON parser, CORS)
- Connect to MongoDB
- Define route handlers
- Start server on PORT 5000

**Middleware:**
```javascript
app.use(express.json());           // Parse JSON bodies
app.use(cors());                   // Enable CORS
```

**Error Handling:**
- 404 route not found
- Database connection errors
- Try-catch blocks in routes

#### 2. models/Book.js (Mongoose Schema)
**Defines book document structure:**

```javascript
{
  title: String (required),
  author: String (required),
  isbn: String (required, unique),
  publicationYear: Number (required),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

**Validation:**
- All fields required with error messages
- ISBN must be unique (prevents duplicates)
- Auto-timestamps for tracking

#### 3. controllers/bookController.js (Business Logic)
**Contains three main functions:**

##### a. getAllBooks()
- **Route:** GET /api/books
- **Logic:**
  1. Query all books from database
  2. Sort by creation date (newest first)
  3. Return with success response
- **Error Handling:** Database errors caught and logged

##### b. addBook()
- **Route:** POST /api/books
- **Logic:**
  1. Validate required fields present
  2. Check if ISBN already exists
  3. Create new book in database
  4. Return created book
- **Error Handling:**
  - Missing field validation (400)
  - Duplicate ISBN detection (400)
  - Database errors (500)

##### c. deleteBook()
- **Route:** DELETE /api/books/:id
- **Logic:**
  1. Find book by ID
  2. Delete from database
  3. Return deleted book
- **Error Handling:**
  - Book not found (404)
  - Invalid ID format (400)
  - Database errors (500)

#### 4. routes/bookRoutes.js (Route Definitions)
**Maps HTTP methods to controller functions:**

```javascript
router.get('/', getAllBooks);      // GET /api/books
router.post('/', addBook);         // POST /api/books
router.delete('/:id', deleteBook); // DELETE /api/books/:id
```

---

## Database Schema

### Book Collection

```javascript
{
  _id: ObjectId,                    // MongoDB auto-generated ID
  title: String,                    // e.g., "The Great Gatsby"
  author: String,                   // e.g., "F. Scott Fitzgerald"
  isbn: String,                     // e.g., "978-0743273565"
  publicationYear: Number,          // e.g., 1925
  createdAt: ISODate,              // Auto-generated timestamp
  updatedAt: ISODate,              // Auto-updated timestamp
  __v: Number                       // Mongoose versioning
}
```

---

## Data Flow Diagrams

### Adding a Book

```
User Input → Form Submission
    ↓
BookForm validates fields
    ↓
onAddBook() called with formData
    ↓
App.handleAddBook() sends POST request
    ↓
Backend validates and creates book
    ↓
MongoDB stores book
    ↓
Response returns book object
    ↓
App.setBooks() updates local state
    ↓
BookList re-renders with new book
```

### Deleting a Book

```
User clicks Delete → Confirmation dialog
    ↓
onDeleteBook(bookId) called
    ↓
App.handleDeleteBook() sends DELETE request
    ↓
Backend finds and deletes book
    ↓
MongoDB removes document
    ↓
Response confirms deletion
    ↓
App.setBooks() filters out deleted book
    ↓
BookList re-renders without book
```

### Fetching Books

```
App mounts → useEffect hook runs
    ↓
fetchBooks() sends GET request
    ↓
Backend queries MongoDB
    ↓
Returns all books array
    ↓
App.setBooks() updates state
    ↓
BookList re-renders with books
```

---

## Error Handling Strategy

### Frontend Error Handling

**Location:** App.js - try-catch blocks in API calls

```javascript
try {
  const response = await axios.get(`${API_BASE_URL}/books`);
  // Handle success
} catch (error) {
  // Extract error message from response
  const errorMsg = error.response?.data?.message || 'Default error';
  setErrorMessage(errorMsg);
}
```

**Error Display:**
- Error banner component at top of page
- User-friendly messages (not technical)
- Close button to dismiss
- Automatic styling (red background)

### Backend Error Handling

**Location:** controllers/bookController.js - try-catch blocks

**Error Types:**

| Error | Status | Message |
|-------|--------|---------|
| Missing fields | 400 | "Please provide all required fields..." |
| Duplicate ISBN | 400 | "A book with this ISBN already exists..." |
| Book not found | 404 | "Book not found..." |
| Invalid ID | 400 | "Invalid book ID format." |
| Database error | 500 | "Failed to [action]. Please try again later." |

---

## Code Comments Guide

Every file includes comments explaining:

### Component Comments
```javascript
/**
 * Component Name
 * Purpose and description
 * 
 * Props:
 * - propName: Type - description
 * 
 * State:
 * - stateName: Type - description
 */
```

### Function Comments
```javascript
/**
 * Function description
 * What it does and why
 * 
 * @param {Type} paramName - parameter description
 * @returns {Type} - return value description
 */
```

### Complex Logic Comments
```javascript
// Explain the "why" not the "what"
// What the code does is obvious from reading it
// Why it's done this way is not always clear
```

---

## Security Considerations

### Current Implementation
- ✅ CORS enabled for development
- ✅ JSON body size limited
- ✅ Input validation on backend
- ✅ Unique ISBN constraint

### Production Recommendations
- 🔒 Restrict CORS to specific origin
- 🔒 Add authentication/authorization
- 🔒 Validate all user inputs
- 🔒 Use HTTPS for all requests
- 🔒 Add rate limiting
- 🔒 Sanitize database queries
- 🔒 Use environment variables for secrets

---

## Performance Considerations

### Current Optimizations
- ✅ CSS Grid for responsive layout
- ✅ Conditional rendering (empty states)
- ✅ Loading states prevent duplicate requests
- ✅ Database indexes on ISBN field

### Future Improvements
- 📈 Pagination for large book collections
- 📈 Caching with Redis
- 📈 Database query optimization
- 📈 Frontend code splitting
- 📈 Image optimization
- 📈 CDN for static assets

---

## Testing Recommendations

### Unit Tests
- Test each component with different props
- Test controller functions with mock data
- Test form validation logic

### Integration Tests
- Test API endpoints with requests
- Test database operations
- Test error handling flows

### E2E Tests
- Test complete user workflows
- Test form submission and validation
- Test book deletion with confirmation

---

**This architecture provides a solid foundation for a scalable, maintainable book management system!** 📚
