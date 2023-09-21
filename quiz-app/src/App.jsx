import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import AdminLogin from './components/AdminLogin';
import Home from './components/Home';
//AIzaSyA8WOTo3nKlAjPEsUrDo5Rs1vXqpC7PdgE
const App = () => {

  const [admin, setAdmin] = useState(null);
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path='/admin/auth' element={<AdminLogin admin={admin} setAdmin={setAdmin} />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App