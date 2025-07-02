import { useEffect, useState, useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext';

const MyBorrowed = () => {
  const { user } = useContext(AuthContext);
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    if (user?.email) {
      toast.loading('Loading your borrowed books...');
      fetch(`${import.meta.env.VITE_BASE_URL}/api/borrow?email=${user.email}`)
        .then(res => res.json())
        .then(data => {
          setBorrowedBooks(data);
          toast.dismiss();
        })
        .catch(err => {
          toast.error('Failed to fetch borrowed books');
        });
    }
  }, [user]);

  const handleReturn = async (id) => {
    const confirm = window.confirm('Are you sure you want to return this book?');
    if (!confirm) return;

    try {
      toast.loading('Returning book...', { id: 'return' });

      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/borrow/${id}`, {
        method: 'DELETE'
      });

      const result = await res.json();

      if (res.ok) {
        toast.success(result.message, { id: 'return' });
        setBorrowedBooks(prev => prev.filter(book => book._id !== id));
      } else {
        toast.error(result.message || 'Failed to return the book', { id: 'return' });
      }
    } catch (err) {
      toast.error(`Something went wrong: ${err.message}`, { id: 'return' });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6">📘 My Borrowed Books</h2>

      {borrowedBooks.length === 0 ? (
        <p className="text-lg text-gray-600">No books borrowed.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {borrowedBooks.map(book => (
            <div key={book._id} className="bg-white shadow-lg rounded-lg p-4">
              <img src={book.image} alt={book.title} className="h-40 w-full object-cover rounded" />
              <h3 className="text-xl font-semibold mt-2">{book.title}</h3>
              <p className="text-gray-600 capitalize">{book.category}</p>
              <p className="text-sm">Borrowed: {new Date(book.borrowedDate).toLocaleDateString()}</p>
              <p className="text-sm">Return by: {new Date(book.returnDate).toLocaleDateString()}</p>
              <button
                onClick={() => handleReturn(book._id)}
                className="mt-3 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Return
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBorrowed;
