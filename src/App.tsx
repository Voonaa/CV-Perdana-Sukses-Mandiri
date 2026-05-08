import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Admin from './pages/Admin';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="produk" element={<Products />} />
          <Route path="tentang" element={<About />} />
          <Route path="kontak" element={<Contact />} />
          {/* Fallback to home for any other route */}
          <Route path="*" element={<Home />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}
