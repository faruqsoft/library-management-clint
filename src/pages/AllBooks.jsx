import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ReactStars from "react-rating-stars-component";
import Spinner from "../components/Spinner";

const AllBooks = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [viewMode, setViewMode] = useState('card');
  const navigate = useNavigate();

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/books?title=${search}&category=${category}`);
      const data = await res.json();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [search, category]);

  const filteredBooks = onlyAvailable
    ? books.filter(book => book.quantity > 0)
    : books;

  return (
    <div className="px-4 py-6 max-w-7xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl md:text-4xl font-bold mb-8 text-center"
      >
        📚 All Books
      </motion.h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center flex-wrap gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full md:w-[230px] bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="select select-bordered w-full md:w-[200px] bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
        >
          <option value="">All Categories</option>
          <option value="Programming">Programming</option>
          <option value="History">History</option>
          <option value="Science">Science</option>
          <option value="Drama">Drama</option>
          <option value="Sci-Fi">Sci-Fi</option>
        </select>
        <button
          onClick={() => setOnlyAvailable(!onlyAvailable)}
          className={`btn w-full md:w-auto ${onlyAvailable ? 'btn-success' : 'btn-outline'}`}
        >
          {onlyAvailable ? 'Available Only' : 'Show Available'}
        </button>
        <select
          value={viewMode}
          onChange={(e) => setViewMode(e.target.value)}
          className="select select-bordered w-full md:w-auto bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
        >
          <option value="card">📦 Card View</option>
          <option value="table">📋 Table View</option>
        </select>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <>
          {viewMode === 'card' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBooks.map(book => (
                <motion.div
                  key={book._id}
                  className="bg-white dark:bg-gray-800 shadow-md rounded-xl overflow-hidden hover:shadow-xl transition-all flex flex-col"
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={book.image}
                    alt={book.title}
                    className="h-48 object-cover w-full"
                  />
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div className="grid grid-cols-2 gap-3 text-sm text-gray-700 dark:text-gray-200">
                      <div>
                        <p className="font-semibold">Title: <span>{book.title}</span></p>
                     
                      </div>
                      <div>
                        <p className="font-semibold">Author: <span>{book.author}</span></p>
                    
                      </div>
                      <div>
                        <p className="font-semibold">Category: <span>{book.category}</span></p>
                       
                      </div>
                      <div>
                        <p className="font-semibold"> Quantity: <span>{book.quantity}</span></p>
                       
                      </div>
                      <div className="col-span-2">
                        <p className="font-semibold">Rating:</p>
                        <ReactStars
                          value={book.rating || 0}
                          edit={false}
                          size={22}
                          isHalf={true}
                          activeColor="yellow"
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => navigate(`/updateBook/${book._id}`)}
                      className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition"
                    >
                      Update
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            // Table View
            <div className="overflow-x-auto bg-white dark:bg-gray-900 dark:text-gray-50 rounded shadow">
              <table className="table w-full text-sm">
                <thead className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white">
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Category</th>
                    <th>Quantity</th>
                    <th>Rating</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBooks.map(book => (
                    <tr key={book._id}>
                      <td>
                        <img src={book.image} alt={book.title} className="h-16 w-12 object-cover rounded" />
                      </td>
                      <td>{book.title}</td>
                      <td>{book.author}</td>
                      <td>{book.category}</td>
                      <td>{book.quantity}</td>
                      <td>
                        <ReactStars
                          value={book.rating || 0}
                          edit={false}
                          size={20}
                          isHalf={true}
                          activeColor="#ef4444"
                        />
                      </td>
                      <td>
                        <button
                          onClick={() => navigate(`/updateBook/${book._id}`)}
                          className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
                        >
                          Update
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {!loading && filteredBooks.length === 0 && (
            <p className="text-center mt-10 text-gray-500 text-lg">No books found.</p>
          )}
        </>
      )}
    </div>
  );
};

export default AllBooks;
