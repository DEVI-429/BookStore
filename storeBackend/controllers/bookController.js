const Book = require('../models/book');

exports.getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.getBookByISBN = async (req, res) => {
    try {
        const book = await Book.findOne({ isbn: req.params.isbn });
        if (!book) {
            return res.status(404).json({ msg: 'Book not found' });
        }
        res.json(book);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.getBooksByAuthor = async (req, res) => {
    try {
        const books = await Book.find({ author: req.params.author });
        res.json(books);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.getBooksByTitle = async (req, res) => {
    try {
        const books = await Book.find({ title: req.params.title });
        res.json(books);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};
