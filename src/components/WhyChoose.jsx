import React from "react";
import { FaBookOpen, FaUsers, FaLaptop } from "react-icons/fa";
import { MdLibraryBooks, MdSecurity, MdSpeed } from "react-icons/md";
import { Fade, Zoom } from "react-awesome-reveal";

const features = [
  {
    icon: <MdLibraryBooks className="text-3xl text-blue-600" />,
    title: "Extensive Book Collection",
    description: "Thousands of books across genres to satisfy every reader.",
  },
  {
    icon: <FaBookOpen className="text-3xl text-green-600" />,
    title: "Easy Borrow & Return",
    description: "Borrow books with just a click and track your return dates.",
  },
  {
    icon: <FaUsers className="text-3xl text-purple-500" />,
    title: "User-Friendly Interface",
    description: "Clean and intuitive design for effortless navigation.",
  },
  {
    icon: <MdSecurity className="text-3xl text-red-500" />,
    title: "Secure Account",
    description: "Your data and activity are protected with strong security.",
  },
  {
    icon: <MdSpeed className="text-3xl text-indigo-600" />,
    title: "Fast Performance",
    description: "Optimized backend ensures fast book searches and responses.",
  },
  {
    icon: <FaLaptop className="text-3xl text-pink-500" />,
    title: "Access Anywhere",
    description: "Manage your reading list from any device, anytime.",
  },
];

const WhyChoose = () => {
  return (
    <div className="max-w-7xl mx-auto mt-16 px-4 sm:px-6 lg:px-8">
      <Fade direction="down" triggerOnce>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3 text-blue-700">
          Why Choose Our Library?
        </h2>
        <p className="text-lg md:text-xl text-center text-amber-800 mb-10">
        A smarter way to manage your reading, borrowing, and exploration
        </p>

      </Fade>

      <Zoom cascade damping={0.1} triggerOnce>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 text-center hover:shadow-lg transition-all"
            >
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-base">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </Zoom>
    </div>
  );
};

export default WhyChoose;
