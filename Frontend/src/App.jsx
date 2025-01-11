import React from 'react';
import Home from './Home/Home';
import { Routes, Route, Navigate } from "react-router-dom";
import Menus from './Menu/Menus';
import Signup from './components/Signup';
import Cart from './Menu/Cart/Cart';
import { Toaster } from "react-hot-toast";
import { useAuth } from './context/AuthProvider';
import Contact from './components/Contact';

function App() {
  const [authUser, setAuthUser] = useAuth();
  console.log(authUser);

  return (
    <>
      <div className="dark:bg-slate-900 dark:text-white">

        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/menu"
            element={authUser ? <Menus /> : <Navigate to="/signup" />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
