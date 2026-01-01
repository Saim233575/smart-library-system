const mongoose = require('mongoose');

/**
 * Book Schema Definition
 * Defines the structure for book documents in MongoDB
 * Fields: title, author, isbn (unique identifier), publicationYear
 */
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a book title'],
    trim: true
  },
  author: {
    type: String,
    required: [true, 'Please provide an author name'],
    trim: true
  },
  isbn: {
    type: String,
    required: [true, 'Please provide an ISBN number'],
    unique: true,
    trim: true
  },
  publicationYear: {
    type: Number,
    required: [true, 'Please provide a publication year']
  }
}, {
  timestamps: true // Automatically add createdAt and updatedAt fields
});

/**
 * Create and export Book model
 * The model provides methods to interact with the books collection
 */
const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
