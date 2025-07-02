import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';

const AddBook = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    quantity: '',
    image: '',
    description: '',
    rating:1
  });

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: ['quantity', 'rating'].includes(name) ? Number(value) : value,
  }));
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await user.getIdToken();
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/books`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        toast.success('Book added successfully!');
        setFormData({
          title: '',
          author: '',
          category: '',
          quantity: '',
          image: '',
          description: '',
          rating: 1
        });
      } else {
        toast.error('Failed to add book.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error adding book.');
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center text-blue-700">📚 Add a New Book</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" name="title" placeholder="Book Title" value={formData.title} onChange={handleChange} className="input input-bordered w-full" required />
        <input type="text" name="author" placeholder="Author Name" value={formData.author} onChange={handleChange} className="input input-bordered w-full" required />
        <select name="category" value={formData.category} onChange={handleChange} className="select select-bordered w-full" required>
          <option value="">Select Category</option>
          <option value="programming">programming</option>
          <option value="Science">Science</option>
          <option value="History">History</option>
          <option value="Drama">Drama</option>
          <option value="Sci-Fi">Sci-Fi</option>
        </select>
        <input type="number" name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleChange} className="input input-bordered text-gray-600 w-full" min="1" required />
        <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} className="input input-bordered w-full col-span-1 md:col-span-2" />
        <textarea name="description" placeholder="Short Description" value={formData.description} onChange={handleChange} className="textarea textarea-bordered w-full col-span-1 md:col-span-2" rows="3"></textarea>
        <input type="number" name="rating" placeholder="Rating (1–5)" value={formData.rating} onChange={handleChange} className="input input-bordered w-full" min="1" max="5" required />
        <button type="submit" className="btn btn-primary w-full col-span-1 md:col-span-2">Add Book</button>
      </form>

      <div className="mt-8 bg-gray-100 rounded p-4 text-gray-700">
        <h2 className="text-lg font-semibold mb-2">📖 Book Content:</h2>
        <p>
          After adding the book, it will be listed in the library system and available to borrow by users. Please ensure the details are accurate, including the image, rating, and description. This helps readers better understand and choose the book.
        </p>
      </div>
    </div>
  );
};

export default AddBook;