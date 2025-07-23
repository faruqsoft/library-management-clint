import React from "react";
import {
  FaFacebookF,
  FaYoutube,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-blue-800 text-white pt-12 mt-24">
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Column 1 */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-white">LibraryZone</h3>
          <ul className="space-y-2 text-gray-100">
            <li><a href="#" className="hover:text-white transition">About Us</a></li>
            <li><a href="#" className="hover:text-white transition">Our Vision</a></li>
            <li><a href="#" className="hover:text-white transition">Library Policies</a></li>
            <li><a href="#" className="hover:text-white transition">Contact</a></li>
          </ul>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-white">Explore</h3>
          <ul className="space-y-2 text-gray-100">
            <li><a href="/allBooks" className="hover:text-white transition">All Books</a></li>
            <li><a href="/categories" className="hover:text-white transition">Book Categories</a></li>
            <li><a href="/addBook" className="hover:text-white transition">Add a Book</a></li>
            <li><a href="/faq" className="hover:text-white transition">FAQs</a></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-white">Support</h3>
          <ul className="space-y-2 text-gray-100">
            <li><a href="#" className="hover:text-white transition">Help Center</a></li>
            <li><a href="#" className="hover:text-white transition">Borrowing Guide</a></li>
            <li><a href="#" className="hover:text-white transition">Terms of Use</a></li>
            <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Column 4 - Social Media */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-white">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/omar.faruq.399"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-100 hover:text-white text-xl transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.youtube.com/@omarfaruq1905"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-100 hover:text-white text-xl transition"
            >
              <FaYoutube />
            </a>
            <a
              href="https://www.linkedin.com/in/omar-faruq-5a771a267/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-100 hover:text-white text-xl transition"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://www.instagram.com/omar.sau/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-100 hover:text-white text-xl transition"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-10 border-t border-gray-200">
        <div className="text-center py-6 text-sm text-gray-100">
          © 2025 <span className="text-white font-medium">LibraryZone</span> by Omar Developer. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
