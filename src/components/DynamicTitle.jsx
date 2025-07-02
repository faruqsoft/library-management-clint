// components/DynamicTitle.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const DynamicTitle = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    let title = 'Library App 📚';

    if (path === '/') title = 'Home | Library App';
    else if (path === '/addBook') title = 'Add Book | Library App';
    else if (path === '/allBooks') title = 'All Books | Library App';
    else if (path === '/myBorrowed') title = 'My Borrowed Books | Library App';
    else if (path.startsWith('/category/')) title = `Category | Library App`;
    else if (path.startsWith('/book/')) title = 'Book Details | Library App';
    else title = 'Library App 📚';

    document.title = title;
  }, [location]);

  return null; // This component renders nothing
};

export default DynamicTitle;
