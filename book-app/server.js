const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));


let books = [];
let id = 1;

// Homepage route
app.get('/', (req, res) => {
  res.send('Welcome to the Book API!');
});

// Get all books
app.get('/books', (req, res) => {
  res.json(books);
});

// Add a new book
app.post('/books', (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ error: 'Please provide title and author' });
  }
  const book = { id: id++, title, author };
  books.push(book);
  res.status(201).json(book);
});

// Update a book by id
app.put('/books/:id', (req, res) => {
  const bookId = Number(req.params.id);
  const book = books.find(b => b.id === bookId);
  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }
  const { title, author } = req.body;
  if (title) book.title = title;
  if (author) book.author = author;
  res.json(book);
});

// Delete a book by id
app.delete('/books/:id', (req, res) => {
  const bookId = Number(req.params.id);
  const index = books.findIndex(b => b.id === bookId);
  if (index === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }
  books.splice(index, 1);
  res.json({ message: 'Book deleted' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
