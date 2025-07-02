import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import AllBooks from '../pages/AllBooks';
import AddBook from '../pages/AddBook';
import BorrowedBooks from '../pages/MyBorrowed';
import BookDetails from '../pages/BookDetails';
import UpdateBook from '../pages/UpdateBook';
import Login from '../pages/Login';
import Register from '../pages/Register';
import NotFound from '../pages/NotFound';
import PrivateRoute from './PrivateRoute';
import MyBooks from '../pages/MyBooks';
import CategoryBooks from '../pages/CategoryBooks';
import MyBorrowed from '../pages/MyBorrowed';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {/* Public */}
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* Private */}
        <Route path="allBooks" element={
          <PrivateRoute><AllBooks /></PrivateRoute>
        } />
        <Route path="addBook" element={
          <PrivateRoute><AddBook /></PrivateRoute>
        } />
        <Route path="borrowedBooks" element={
          <PrivateRoute><BorrowedBooks /></PrivateRoute>
        } />
        <Route path="book/:id" element={
          <PrivateRoute><BookDetails /></PrivateRoute>
        } />
        <Route path="update/:id" element={
          <PrivateRoute><UpdateBook /></PrivateRoute>
        } />
        <Route path="updateBook/:id" element={
          <PrivateRoute><UpdateBook /></PrivateRoute>
        } />
        <Route path="myBooks" element={
          <PrivateRoute><MyBooks /></PrivateRoute>
        } />
        <Route path="category/:category" element={
          <PrivateRoute><CategoryBooks /></PrivateRoute>
        } />
        <Route path="myBorrowed" element={
          <PrivateRoute><MyBorrowed /></PrivateRoute>
        } />

        {/* Not Found - fallback route inside layout */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
