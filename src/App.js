import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Header from './components/Layout/Header';
import Home from './components/Home';
import ProductDetails from './components/ProductDetails';
import Footer from './components/Layout/Footer';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import Wishlist from './components/Wishlist';
import NotFound from './components/NotFound';
import Cart from './components/cart/Cart';
import { AuthContext } from './context/AuthContext';
import Contact from './components/contact/Contact';
import AboutUs from './components/About';
import AllProductsPage from './AllProductsPage';
import CheckoutForm from './components/CheckoutForm';
import Orders from './components/Orders';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Router>
      <div className="App">
      <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={isAuthenticated ? <Navigate to="/" /> : <SignUp />}
          />

          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/checkout" element={<CheckoutForm />} />
          <Route path="/products" element={<AllProductsPage />} />

          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />

          <Route path="/details/:id" element={<ProductDetails />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
