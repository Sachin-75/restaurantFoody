import React from 'react'
import Navbar from '../components/Navbar';
import Menu from '../components/Menu';
import Footer from '../components/Footer';

function Menus() {
  return (
    <>
        <Navbar />
        <div className="min-h-screen">
          <Menu />
        </div>
        <Footer />
    </>
  )
}

export default Menus
