import React from 'react'
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Category from "../components/Category";
import Dishes from "../components/Dishes";
import Services from "../components/Services";
import Footer from '../components/Footer';

function Home() {
  return (
    <>
      <Navbar/>
      <Banner/>
      <Category/>
      <Dishes/>
      <Services />
      <Footer />
    </>
  )
}

export default Home
