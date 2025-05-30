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
import Privacy from './components/Privacy';
import Terms from './components/Terms';
import CancellationAndRefunds from './components/CancellationAndRefunds';
import ShippingPolicy from './components/ShippingPolicy';
import Tracking from './components/Tracking';

function App() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="App flex flex-col min-h-screen">
      <ScrollToTop />
      <Header />
      <main className="flex-grow">
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
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/termsofuse" element={<Terms />} />
          <Route path="/shippingpolicy" element={<ShippingPolicy />} />
          <Route path="/cancellation&refunds" element={<CancellationAndRefunds />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/checkout" element={<CheckoutForm />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/details/:id" element={<ProductDetails />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/track-order/:id" element={<Tracking />} />

        </Routes>
      </main>
      <Footer />
    </div>

  );
}

export default App;
