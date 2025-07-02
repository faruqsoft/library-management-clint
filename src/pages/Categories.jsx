import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const categories = [
  { name: 'Programming', image: '/images/programming.jpg' },
  { name: 'History', image: '/images/history.jpg' },
  { name: 'Science', image: '/images/science.jpg' },
  { name: 'Drama', image: '/images/drama.jpg' },
];

const Categories = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8">Book Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat, index) => (
          <motion.div
            key={cat.name}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            onClick={() => navigate(`/category/${cat.name.toLowerCase()}`)}
            className="cursor-pointer rounded overflow-hidden shadow-lg"
          >
            <img src={cat.image} alt={cat.name} className="h-40 w-full object-cover" />
            <div className="bg-black p-4 text-center font-semibold">{cat.name}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
