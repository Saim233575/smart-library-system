const express = require('express');
const router = express.Router();
const { getAllBooks, addBook, deleteBook } = require('../controllers/bookController');

/**
 * Book API Routes
 * Base URL: /api/books
 */

// GET /api/books - Retrieve all books
router.get('/', getAllBooks);

// POST /api/books - Add a new book
router.post('/', addBook);

// DELETE /api/books/:id - Delete a book by ID
router.delete('/:id', deleteBook);

module.exports = router;
