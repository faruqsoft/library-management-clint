import React from "react";
import { Fade, Zoom } from "react-awesome-reveal";
import { FaStar, FaRegStar } from "react-icons/fa";

const feedbacks = [
  {
    name: "Ayesha Rahman",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    rating: 5,
    feedback:
      "This library system makes it so easy to find and borrow books. I use it every week!",
  },
  {
    name: "Tanvir Alam",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    rating: 4,
    feedback:
      "Clean interface and smooth borrowing process. Returning books is just a click away!",
  },
  {
    name: "Sadia Ahmed",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    rating: 5,
    feedback:
      "I love how I can see my borrowed books and return them instantly. Great work!",
  },
  {
    name: "Zahin Khan",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    rating: 5,
    feedback:
      "Very efficient platform for book lovers. It has everything I need in one place.",
  },
  {
    name: "Nadia Islam",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    rating: 5,
    feedback:
      "As a student, this system saves me a lot of time. I can find and borrow required books easily.",
  },
  {
    name: "Hasibul Hasan",
    image: "https://randomuser.me/api/portraits/men/6.jpg",
    rating: 4,
    feedback:
      "Well organized and easy to navigate. The book categories and search work great.",
  },
];

const renderStars = (rating) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<FaStar key={i} className="text-yellow-400 inline" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-gray-300 inline" />);
    }
  }

  return stars;
};

const CustomerFed = () => {
  return (
    <div className="mt-12 px-4 py-10 bg-gray-100 dark:bg-gray-900 rounded-lg">
      <Fade direction="down" triggerOnce>
        <h2 className="text-3xl font-bold mb-3 text-center text-gray-800 dark:text-white">
          What Our Readers Say
        </h2>
        <p className="text-center text-xl text-gray-600 dark:text-gray-300 mb-10">
          Real feedback from users who enjoy using our Library Management System
        </p>
      </Fade>

      <Zoom cascade damping={0.1} triggerOnce>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
          {feedbacks.map((feedback, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow hover:shadow-lg transition duration-300 text-center"
            >
              <img
                src={feedback.image}
                alt={feedback.name}
                className="w-16 h-16 rounded-full mx-auto mb-4 border-2 border-primary"
              />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                {feedback.name}
              </h3>
              <div className="flex justify-center items-center gap-1 mb-2 mt-1">
                {renderStars(feedback.rating)}
              </div>
              <p className="text-md text-gray-600 dark:text-gray-300">
                {feedback.feedback}
              </p>
            </div>
          ))}
        </div>
      </Zoom>
    </div>
  );
};

export default CustomerFed;
