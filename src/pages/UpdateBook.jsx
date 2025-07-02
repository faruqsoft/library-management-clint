import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';

const UpdateBook = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/books/${id}`);
        const data = await res.json();
        setBook(data);
      } catch (err) {
        toast.error("Failed to fetch book data.");
      }
    };
    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseFloat(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await user.getIdToken();
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/books/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(book)
      });

      if (res.ok) {
        toast.success("Book updated successfully!");
        navigate('/allBooks');
      } else {
        toast.error("Failed to update book.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    }
  };

  if (!book) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  return (
    <div className="min-h-screen px-4 py-10 bg-base-200 flex items-center justify-center">
      <div className="bg-white dark:bg-base-100 shadow-xl rounded-xl p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-primary">Update Book Info</h1>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <div>
            <label className="label">
              <span className="label-text font-medium">Image URL</span>
            </label>
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={book.image}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text font-medium">Title</span>
            </label>
            <input
              type="text"
              name="title"
              placeholder="Book Title"
              value={book.title}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text font-medium">Author</span>
            </label>
            <input
              type="text"
              name="author"
              placeholder="Author Name"
              value={book.author}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text font-medium">Category</span>
            </label>
            <select
              name="category"
              value={book.category}
              onChange={handleChange}
              className="select select-bordered w-full"
              required
            >
              <option value="">Select Category</option>
              <option value="programming">Programming</option>
              <option value="history">History</option>
              <option value="science">Science</option>
              <option value="drama">Drama</option>
              <option value="sci-fi">Sci-Fi</option>
            </select>
          </div>

          <div>
            <label className="label">
              <span className="label-text font-medium">Rating (1-5)</span>
            </label>
            <input
              type="number"
              name="rating"
              placeholder="Rating"
              value={book.rating || ''}
              onChange={handleChange}
              className="input input-bordered w-full"
              min="1"
              max="5"
            />
          </div>

          <button type="submit" className="btn btn-primary w-full mt-2">
            Submit Updates
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBook;
