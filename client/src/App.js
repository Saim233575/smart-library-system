import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import './App.css';

/**
 * Main App Component
 * Manages the overall state and coordinates between BookForm and BookList components
 * Handles API communication with the backend
 */
const App = () => {
  // State management
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingBooks, setIsLoadingBooks] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  // Base URL for API requests
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  /**
   * Fetch all books from backend
   * Called on component mount and after adding/deleting a book
   */
  const fetchBooks = async () => {
    try {
      setIsLoadingBooks(true);
      setErrorMessage('');

      const response = await axios.get(`${API_BASE_URL}/books`);

      if (response.data.success) {
        setBooks(response.data.data);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching books:', error);
      setErrorMessage('Failed to load books. Please refresh the page.');
      setBooks([]);
    } finally {
      setIsLoadingBooks(false);
    }
  };

  /**
   * useEffect Hook
   * Fetch books when component mounts
   */
  useEffect(() => {
    fetchBooks();
  }, []);

  /**
   * Handle adding a new book
   * Sends POST request to backend with book data
   * 
   * @param {Object} formData - Book object with title, author, isbn, publicationYear
   */
  const handleAddBook = async (formData) => {
    try {
      setIsLoading(true);
      setErrorMessage('');

      const response = await axios.post(`${API_BASE_URL}/books`, formData);

      if (response.data.success) {
        // Add new book to local state
        setBooks(prev => [response.data.data, ...prev]);
        // Show success message (in real app, could use a toast notification)
        console.log('Book added successfully:', response.data.message);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error('Error adding book:', error);
      // Display user-friendly error message
      const errorMsg = error.response?.data?.message || 'Failed to add book. Please try again.';
      setErrorMessage(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle deleting a book
   * Sends DELETE request to backend with book ID
   * 
   * @param {String} bookId - MongoDB ObjectId of the book to delete
   */
  const handleDeleteBook = async (bookId) => {
    try {
      setIsLoading(true);
      setErrorMessage('');

      const response = await axios.delete(`${API_BASE_URL}/books/${bookId}`);

      if (response.data.success) {
        // Remove book from local state
        setBooks(prev => prev.filter(book => book._id !== bookId));
        console.log('Book deleted successfully:', response.data.message);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error('Error deleting book:', error);
      // Display user-friendly error message
      const errorMsg = error.response?.data?.message || 'Failed to delete book. Please try again.';
      setErrorMessage(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      {/* Header Section */}
      <header className="app-header">
        <div className="header-content">
          <h1> Smart Library Management System</h1>
          <p>Efficiently manage your book collection</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="app-main">
        <div className="container">
          {/* Error Message Display */}
          {errorMessage && (
            <div className="error-banner">
              <span> {errorMessage}</span>
              <button 
                onClick={() => setErrorMessage('')}
                className="error-close"
              >
                ✕
              </button>
            </div>
          )}

          {/* Book Form Component */}
          <BookForm 
            onAddBook={handleAddBook} 
            isLoading={isLoading}
          />

          {/* Book List Component */}
          <BookList 
            books={books} 
            onDeleteBook={handleDeleteBook}
            isLoading={isLoading}
            isLoadingBooks={isLoadingBooks}
          />
        </div>
      </main>

      {/* Footer Section */}
      <footer className="app-footer">
        <p>&copy; 2024 Smart Library Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
