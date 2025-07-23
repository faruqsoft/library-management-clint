import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const BookCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/books/categories/unique`);
        if (!res.ok) throw new Error('Failed to fetch categories');
        const data = await res.json();
        setCategories(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError('Failed to load categories. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleNavigate = (category) => {
    if (category) {
      navigate(`/category/${encodeURIComponent(category)}`);
    }
  };

  if (loading) return <p className="text-center text-blue-500 py-20 text-lg animate-pulse">Loading categories...</p>;

  if (error) return <p className="text-center text-red-600 font-semibold py-20">{error}</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 py-2 bg-gray-800 dark:text-white">📚 Explore Book Categories</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.slice(0, 4).map((cat, idx) => (
          <motion.div
            key={cat.name || idx}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer"
            onClick={() => handleNavigate(cat.name)}
          >
            <img
              src={cat.image || 'https://i.ibb.co/gFLhWVcp/actor-1807557-1280.jpg'}
              alt={cat.name}
              onError={(e) => e.currentTarget.src = 'https://i.ibb.co/sJszY615/book-2593398-1280.jpg'}
              className="h-48 w-full object-cover"
            />
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white capitalize">{cat.name}</h3>
              <p className="text-blue-600 text-sm mt-1 btn hover:underline">View Details</p>
            </div>
          </motion.div>
        ))}
      </div>

      {categories.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No categories available.</p>
      )}
    </div>
  );
};

export default BookCategories;
