import React from 'react';
import '../styles/BookList.css';

/**
 * BookList Component
 * Displays all books in a responsive card layout
 * Allows users to view book details and delete books
 * 
 * Props:
 * - books: Array of book objects to display
 * - onDeleteBook: Callback function to handle book deletion
 * - isLoading: Boolean to indicate if API request is in progress
 * - isLoadingBooks: Boolean to indicate if books are being fetched
 */
const BookList = ({ books, onDeleteBook, isLoading, isLoadingBooks }) => {
  /**
   * Handle delete button click
   * Asks for confirmation before deleting
   */
  const handleDeleteClick = (bookId, bookTitle) => {
    if (window.confirm(`Are you sure you want to remove "${bookTitle}" from the library?`)) {
      onDeleteBook(bookId);
    }
  };

  // Show loading message while fetching books
  if (isLoadingBooks) {
    return (
      <div className="book-list-container">
        <h2>Library Books</h2>
        <div className="loading-message">Loading books...</div>
      </div>
    );
  }

  return (
    <div className="book-list-container">
      <h2>Library Books ({books.length})</h2>
      
      {/* Show message if no books exist */}
      {books.length === 0 ? (
        <div className="empty-message">
          <p>No books in the library yet. Add one to get started!</p>
        </div>
      ) : (
        <div className="books-grid">
          {/* Render each book as a card */}
          {books.map((book) => (
            <div key={book._id} className="book-card">
              <div className="book-card-content">
                <h3 className="book-title">{book.title}</h3>
                <p className="book-author">
                  <strong>Author:</strong> {book.author}
                </p>
                <p className="book-isbn">
                  <strong>ISBN:</strong> {book.isbn}
                </p>
                <p className="book-year">
                  <strong>Year:</strong> {book.publicationYear}
                </p>
              </div>

              {/* Delete button with appropriate styling */}
              <button
                className="delete-btn"
                onClick={() => handleDeleteClick(book._id, book.title)}
                disabled={isLoading}
                title="Remove this book from the library"
              >
                {isLoading ? 'Removing...' : 'Delete'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookList;
