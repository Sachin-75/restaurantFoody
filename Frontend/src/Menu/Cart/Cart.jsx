import React from 'react'
import Navbar from '../../components/Navbar'
import Cartpage from '../../components/Cartpage'
import Footer from '../../components/Footer'

const Cart = () => {
  return (
    <>
        <Navbar />
        <div className="min-h-screen">
            <Cartpage />
        </div>
        <Footer />
    </>
  )
}

export default Cart
