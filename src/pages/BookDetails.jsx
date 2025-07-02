import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ReactStars from "react-rating-stars-component";
import { toast } from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";

const BookDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [book, setBook] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [returnDate, setReturnDate] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/api/books/${id}`)
      .then(res => res.json())
      .then(data => setBook(data));
  }, [id]);

  const handleBorrow = async () => {
    if (!returnDate) return toast.error("Please select a return date");

    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/borrow`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bookId: book._id,
        userEmail: user.email,
        userName: user.displayName,
        returnDate
      }),
    });

    const data = await res.json();
    if (data.success) {
      toast.success("Book borrowed!");
      setBook({ ...book, quantity: book.quantity - 1 });
      setShowModal(false);
    } else {
      toast.error(data.message || "Failed to borrow book");
    }
  };

  if (!book) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row gap-8">
        <img src={book.image} alt={book.title} className="w-full md:w-1/2 rounded" />
        <div>
          <h2 className="text-3xl font-bold">{book.title}</h2>
          <p className="mt-2"><strong>Author:</strong> {book.author}</p>
          <p><strong>Category:</strong> {book.category}</p>
          <p><strong>Quantity:</strong> {book.quantity}</p>
          <ReactStars value={book.rating} edit={false} size={24} />
          <button
            className="btn btn-primary mt-4"
            disabled={book.quantity === 0}
            onClick={() => setShowModal(true)}
          >
            {book.quantity === 0 ? "Unavailable" : "Borrow"}
          </button>
        </div>
      </div>

      {/* Borrow Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-md">
            <h3 className="text-xl font-semibold mb-4">Borrow Book</h3>
            <p><strong>Name:</strong> {user.displayName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <label className="block mt-4">Return Date:</label>
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="input input-bordered w-full"
            />
            <div className="mt-4 flex justify-end gap-4">
              <button onClick={() => setShowModal(false)} className="btn">Cancel</button>
              <button onClick={handleBorrow} className="btn btn-primary">Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetails;
