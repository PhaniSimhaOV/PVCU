import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Layout/Header';
import Home from './components/Home';
import ProductDetails from './components/ProductDetails';
import Footer from './components/Layout/Footer';
import Carousel from '../src/components/Carousel';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import Wishlist from './components/Wishlist';
import NotFound from './components/NotFound';


function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/details/:id" element={<ProductDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />

      </div>
    </Router>
  );
}

export default App;
