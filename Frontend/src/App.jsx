import React, { useEffect } from 'react';
import Home from './Home/Home';
import { Routes, Route, Navigate } from "react-router-dom";
import Menus from './Menu/Menus';
import Signup from './components/Signup';
import Cart from './Menu/Cart/Cart';
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from './context/AuthProvider';
import Contact from './components/Contact';
import ForgetPass from './components/ForgetPass';
import ResetPass from './components/ResetPass';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function App() {
  const [authUser, setAuthUser] = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!authUser) {
      navigate('/');
    }
  }, [authUser]);
  

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
          <Route path="/forgetpass" element={<ForgetPass />} />
          <Route path="/resetPass/:token" element={<ResetPass />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
