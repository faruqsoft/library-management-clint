import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import Spinner from '../components/Spinner';
import toast from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext';

const CategoryBooks = () => {
  const { category } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  //Step 2: Fetch books by category
  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_BASE_URL}/api/books/category/${category}`)
      .then(res => res.json())
      .then(data => {
        setBooks(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching books:', err);
        setLoading(false);
      });
  }, [category]);

  // Step 3: Fetch borrowed books of the user
  useEffect(() => {
    if (user?.email) {
      fetch(`${import.meta.env.VITE_BASE_URL}/api/borrow?email=${user.email}`)
        .then(res => res.json())
        .then(data => {
          const borrowedBookIds = data.map(b => b.bookId);
          setBorrowedBooks(borrowedBookIds);
        })
        .catch(err => console.error('Error fetching borrowed books:', err));
    }
  }, [user?.email]);

  // Step 4: Borrow handler
const handleBorrow = async (book) => {
  if (!user) {
    toast.error('You must be logged in to borrow a book');
    return;
  }

  const borrowData = {
    bookId: book._id,
    title: book.title,
    image: book.image,
    category: book.category,
    borrowedDate: new Date(),
    returnDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days later
    userEmail: user.email
  };

  try {
    toast.loading('Borrowing the book...', { id: 'borrow' });

    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/borrow`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(borrowData),
    });

    const result = await res.json();

    if (res.ok) {
      toast.success(`Borrowed "${book.title}" successfully!`, { id: 'borrow' });
      setBorrowedBooks(prev => [...prev, book._id]);
    } else {
      toast.error(` ${result.message || 'Borrow failed'}`, { id: 'borrow' });
    }
  } catch (error) {
    toast.error(`Network error: ${error.message}`, { id: 'borrow' });
  }
};



  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 capitalize">📚 Books in {category} Category</h2>

      {loading ? (
        <Spinner />
      ) : books.length === 0 ? (
        <p className="text-lg text-gray-600">No books found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map(book => {
            const alreadyBorrowed = borrowedBooks.includes(book._id); 
            return (
              <div key={book._id} className="bg-white shadow-md rounded-lg p-4">
                <img
                  src={book.image}
                  alt={book.title}
                  className="h-48 w-full object-cover rounded"
                />
                <h3 className="text-xl font-semibold mt-2">{book.title}</h3>
                <p className="text-gray-600">{book.author}</p>
                <p className="text-sm">Available: {book.quantity}</p>

                <button
                  disabled={book.quantity === 0 || alreadyBorrowed}
                  onClick={() => handleBorrow(book)}
                  className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
                >
                  {alreadyBorrowed ? 'Already Borrowed' : 'Borrow'}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CategoryBooks;
