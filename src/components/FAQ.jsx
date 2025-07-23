import React from "react";
import { Fade } from "react-awesome-reveal";
import { Typewriter } from "react-simple-typewriter";

const faqs = [
  {
    question: "How do I borrow a book?",
    answer:
      "Browse our collection, go to the book details page, and click the 'Borrow' button. The system will automatically reduce the available quantity.",
  },
  {
    question: "Is there a limit to how many books I can borrow?",
    answer:
      "Yes, each user can borrow up to a certain number of books at a time, depending on the library’s policy.",
  },
  {
    question: "How do I return a borrowed book?",
    answer:
      "Go to the 'Borrowed Books' page and click the 'Return' button next to the book you’ve finished reading.",
  },
  {
    question: "What happens if a book is out of stock?",
    answer:
      "If the quantity is zero, you won’t be able to borrow the book. You can check back later once it’s returned by someone else.",
  },
  {
    question: "Can I view my borrowing history?",
    answer:
      "Yes, your borrowing history is available on your dashboard under the 'Borrowed Books' section.",
  },
  {
    question: "Is the library system free to use?",
    answer:
      "Absolutely. Our Library Management System is free for all users to browse, borrow, and return books digitally.",
  },
];

const FAQ = () => {
  return (
    <div className="px-4 md:px-8 py-12 bg-gray-50 dark:bg-gray-900 rounded-lg mt-12">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-blue-600 dark:text-white">
        <Typewriter
          words={[
            "Frequently Asked Questions",
            "Need Help With Borrowing?",
            "We’ve Got You Covered!",
          ]}
          loop={true}
          cursor
          cursorStyle="|"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1500}
        />
      </h2>

      <p className="text-center text-lg md:text-xl text-gray-100 dark:text-gray-100 mb-10">
        Everything you need to know about using our digital library system.
      </p>

      <div className="max-w-4xl mx-auto space-y-6">
        <Fade direction="up" triggerOnce>
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-md transition"
            >
              <h3 className="text-lg md:text-xl font-semibold text-blue-600 dark:text-yellow-300 mb-2">
                {faq.question}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-base">
                {faq.answer}
              </p>
            </div>
          ))}
        </Fade>
      </div>
    </div>
  );
};

export default FAQ;
