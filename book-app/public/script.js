const API_URL = 'http://localhost:3000/books';

const bookForm = document.getElementById('bookForm');
const bookList = document.getElementById('bookList');

// Load books on page load
window.onload = loadBooks;

// Get all books and display
function loadBooks() {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      bookList.innerHTML = '';
      data.forEach(book => {
        const li = document.createElement('li');
        li.innerHTML = `${book.title} by ${book.author}
          <button onclick="deleteBook(${book.id})">Delete</button>`;
        bookList.appendChild(li);
      });
    });
}

// Add book
bookForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;

  fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, author })
  })
  .then(() => {
    bookForm.reset();
    loadBooks();
  });
});

// Delete book
function deleteBook(id) {
  fetch(`${API_URL}/${id}`, { method: 'DELETE' })
    .then(() => loadBooks());
}
