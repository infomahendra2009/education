import React from 'react';
  
 import {  BrowserRouter, Routes, Route } from "react-router-dom";
 import Login from "./pages/login.jsx"
 import Dashboard from "./pages/dashboard.js"


 const App=()=> { 
  return (
    
<BrowserRouter>
<Routes> 
<Route path='/' element={Login}></Route>
<Route path='/dashboard' element={Dashboard}></Route>
</Routes>
</BrowserRouter>


  );
}

export default App;
