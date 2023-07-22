import React from 'react';
  
 import {  BrowserRouter, Routes, Route } from "react-router-dom";
 import Login from "./pages/login.jsx"
 import Dashboard from "./pages/dashboard.jsx"
import About from './pages/about.jsx';
import Contact from './pages/contact.jsx';
import ForgotPassword from './pages/forgot-password.jsx';
 
 const App=()=> { 
  return (
    
<BrowserRouter> 

<Routes> 
<Route path='/' element={<Login />}></Route>
<Route path='/dashboard' element={<Dashboard />}></Route> 
<Route path='/about' element={<About />}></Route> 
<Route path='/contact' element={<Contact />}></Route> 
<Route path='/forgot-password' element={<ForgotPassword />}></Route> 
<Route path='/forgot-password/:id' element={<ForgotPassword />}></Route> 
 
</Routes>
</BrowserRouter>


  );
}

export default App;
