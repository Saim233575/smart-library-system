const Book = require('../models/Book');

/**
 * Get all books from database
 * GET /api/books
 */
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: books.length,
      data: books
    });
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve books. Please try again later.'
    });
  }
};

/**
 * Add a new book to database
 * POST /api/books
 * Required fields: title, author, isbn, publicationYear
 */
const addBook = async (req, res) => {
  try {
    const { title, author, isbn, publicationYear } = req.body;

    // Validate required fields
    if (!title || !author || !isbn || !publicationYear) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: title, author, isbn, and publication year.'
      });
    }

    // Create new book document
    const newBook = await Book.create({
      title,
      author,
      isbn,
      publicationYear
    });

    res.status(201).json({
      success: true,
      message: 'Book added successfully!',
      data: newBook
    });
  } catch (error) {
    console.error('Error adding book:', error);
    
    // Handle duplicate ISBN error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'A book with this ISBN already exists in the library.'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to add book. Please try again later.'
    });
  }
};

/**
 * Delete a book from database by ID
 * DELETE /api/books/:id
 */
const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findByIdAndDelete(id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found. It may have already been deleted.'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Book removed successfully!',
      data: book
    });
  } catch (error) {
    console.error('Error deleting book:', error);
    
    // Handle invalid MongoDB ID format
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        message: 'Invalid book ID format.'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to delete book. Please try again later.'
    });
  }
};

module.exports = {
  getAllBooks,
  addBook,
  deleteBook
};
