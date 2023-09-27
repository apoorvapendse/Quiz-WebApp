import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import AdminLogin from './components/AdminLogin';
import Home from './components/Home';
import UserLogin from './components/UserLogin';
const App = () => {

  const [admin, setAdmin] = useState(null);
  const [user, setUser] = useState(null);
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path='/admin/auth' element={<AdminLogin admin={admin} setAdmin={setAdmin} />} />
          <Route path='/user/auth' element={<UserLogin user={user} setUser={setUser} />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App