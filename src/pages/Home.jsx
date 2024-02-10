import React from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import Card from '../components/Card'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <>
   <Navbar/>
   <HeroSection/>
   <div class='w-[1200px] mx-auto px-12'>
    <p class='font-[400] text-[24px] mb-2.5 text-[#F05423;]'>Library</p>
    <p class='text-[#6A6969] font-[400] text-[16px] mb-8'>Read the latest journals</p>
    <div class='grid grid-cols-4 gap-10'>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
    </div>
   </div>
   <Footer/>
   </>
  )
}

export default Home