import React, { useState } from 'react';
import '../styles/BookForm.css';

/**
 * BookForm Component
 * Functional component that renders a form to add new books to the library
 * Manages form input state and handles form submission
 * 
 * Props:
 * - onAddBook: Callback function to handle book submission
 * - isLoading: Boolean to indicate if API request is in progress
 */
const BookForm = ({ onAddBook, isLoading }) => {
  // State management for form inputs
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    publicationYear: new Date().getFullYear()
  });

  /**
   * Handle input field changes
   * Updates the corresponding form field in state
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'publicationYear' ? parseInt(value) : value
    }));
  };

  /**
   * Handle form submission
   * Validates inputs and calls parent component callback
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (!formData.title.trim() || !formData.author.trim() || !formData.isbn.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    // Call parent callback with form data
    onAddBook(formData);

    // Clear form after successful submission
    setFormData({
      title: '',
      author: '',
      isbn: '',
      publicationYear: new Date().getFullYear()
    });
  };

  return (
    <div className="book-form-container">
      <h2>Add New Book</h2>
      <form onSubmit={handleSubmit} className="book-form">
        {/* Book Title Input */}
        <div className="form-group">
          <label htmlFor="title">Book Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter book title"
            disabled={isLoading}
            required
          />
        </div>

        {/* Author Name Input */}
        <div className="form-group">
          <label htmlFor="author">Author Name *</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            placeholder="Enter author name"
            disabled={isLoading}
            required
          />
        </div>

        {/* ISBN Number Input */}
        <div className="form-group">
          <label htmlFor="isbn">ISBN Number *</label>
          <input
            type="text"
            id="isbn"
            name="isbn"
            value={formData.isbn}
            onChange={handleInputChange}
            placeholder="Enter ISBN (e.g., 978-0-123456-78-9)"
            disabled={isLoading}
            required
          />
        </div>

        {/* Publication Year Input */}
        <div className="form-group">
          <label htmlFor="publicationYear">Publication Year *</label>
          <input
            type="number"
            id="publicationYear"
            name="publicationYear"
            value={formData.publicationYear}
            onChange={handleInputChange}
            placeholder="Enter publication year"
            disabled={isLoading}
            required
            min="1900"
            max={new Date().getFullYear()}
          />
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          className="submit-btn"
          disabled={isLoading}
        >
          {isLoading ? 'Adding Book...' : 'Add Book'}
        </button>
      </form>
    </div>
  );
};

export default BookForm;
