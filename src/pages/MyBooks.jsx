import { useContext, useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AuthContext } from '../context/AuthContext'

const MyBooks = () => {
  const { user } = useContext(AuthContext)
  const [books, setBooks] = useState([])

  const fetchBooks = () => {
    fetch(`${import.meta.env.VITE_BASE_URL}/books/user?email=${user?.email}`)
      .then(res => res.json())
      .then(data => setBooks(data))
  }

  useEffect(() => {
    if (user?.email) fetchBooks()
  }, [user])

  const handleDelete = async id => {
    const confirm = window.confirm('Are you sure you want to delete this book?')
    if (!confirm) return

    await fetch(`${import.meta.env.VITE_BASE_URL}/books/${id}`, {
      method: 'DELETE'
    })

    toast.success('Book deleted successfully')
    fetchBooks()
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">My Books</h2>
      {books.length === 0 ? (
        <p>You haven’t added any books yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map(book => (
            <div key={book._id} className="border rounded p-4 shadow">
              <img src={book.image} alt={book.title} className="h-40 w-full object-cover mb-2 rounded" />
              <h3 className="text-lg font-semibold">{book.title}</h3>
              <p className="text-sm text-gray-600">{book.category}</p>
              <div className="flex justify-between mt-4">
                <Link
                  to={`/update/${book._id}`}
                  className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                >
                  Update
                </Link>
                <button
                  onClick={() => handleDelete(book._id)}
                  className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyBooks
