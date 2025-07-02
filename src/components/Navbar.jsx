import { useContext, useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Menu, X, Sun, Moon } from 'lucide-react';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  // Toggle dark/light mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <nav className="sticky top-0 z-50 bg-blue-400 text-white px-6 py-6 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap">
        {/* Logo + Mobile Toggle */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <Link to="/" className="font-bold text-xl">📚 LMS</Link>
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
          <button onClick={() => setDarkMode(!darkMode)} className="text-white ml-2 hover:text-yellow-400" title="Toggle Theme">
          {darkMode ? <Sun size={25} /> : <Moon size={25} />}
        </button>

            {/* Mobile Toggle */}
            <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Responsive Menu */}
        <div className={`w-full md:flex md:items-center md:justify-between md:w-auto ${isOpen ? 'block' : 'hidden'}`}>
          
          {/*  Centered Middle Nav */}
          <div className="w-full md:w-auto md:mx-auto flex flex-col md:flex-row md:items-center gap-4 mt-4 md:mt-0 lg:mr-72 text-center">
            <NavLink to="/" className={({ isActive }) => isActive ? "underline font-bold" : "hover:underline"}>Home</NavLink>
            {user && (
              <>
                <NavLink to="/allBooks" className={({ isActive }) => isActive ? "underline font-bold" : "hover:underline"}>All Books</NavLink>
                <NavLink to="/addBook" className={({ isActive }) => isActive ? "underline font-bold" : "hover:underline"}>Add Book</NavLink>
                <NavLink to="/myBorrowed" className={({ isActive }) => isActive ? "underline font-bold" : "hover:underline"}>My Borrowed</NavLink>
              </>
            )}
          </div>

          {/* Right Side Auth Buttons */}
          <div className="flex flex-col md:flex-row items-center gap-4 mt-4 md:mt-0">
            {!user ? (
              <>
                <NavLink to="/login" className={({ isActive }) => isActive ? "underline font-bold" : "hover:underline"}>Login</NavLink>
                <NavLink to="/register" className={({ isActive }) => isActive ? "underline font-bold" : "hover:underline"}>Register</NavLink>
              </>
            ) : (
              <>
                <img
                  src={user.photoURL}
                  alt="User"
                  title={user.displayName}
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
                <button
                  onClick={logOut}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
