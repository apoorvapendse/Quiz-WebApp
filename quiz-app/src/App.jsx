import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import AdminLogin from './components/AdminLogin';
import Home from './components/Home';

const App = () => {
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path='/admin/auth' element={<AdminLogin />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App