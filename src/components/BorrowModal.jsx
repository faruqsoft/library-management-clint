import { useState } from 'react'

const BorrowModal = ({ book, user, closeModal, onSuccess }) => {
  const [returnDate, setReturnDate] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const borrowData = {
      bookId: book._id,
      title: book.name,
      email: user.email,
      image: book.photo,
      category: book.category,
      borrowDate: new Date().toISOString().split('T')[0],
      returnDate
    }

    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/borrowedBooks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(borrowData)
    })

    if (res.ok) {
      await fetch(`${import.meta.env.VITE_BASE_URL}/books/borrow/${book._id}`, {
        method: 'PATCH'
      })
      onSuccess()
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Borrow "{book.name}"</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label>Name:</label>
            <input type="text" value={user.displayName} readOnly className="w-full border px-3 py-2" />
          </div>
          <div className="mb-2">
            <label>Email:</label>
            <input type="email" value={user.email} readOnly className="w-full border px-3 py-2" />
          </div>
          <div className="mb-4">
            <label>Return Date:</label>
            <input
              type="date"
              required
              className="w-full border px-3 py-2"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-4">
            <button type="button" onClick={closeModal} className="px-4 py-2 border rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Confirm</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default BorrowModal
