import React from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import Card from '../components/Card'
import Footer from '../components/Footer'





const Home = () => {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const isAuthenticated = await authenticate();
  //       if (!isAuthenticated) {
  //         navigate('/login',{state:{isNotAuauthenticated:true}});
  //       } else {
  //         console.log('User is authenticated.');
  //       }
  //     } catch (error) {
  //       console.error('Error in useEffect:', error);
  //     }
  //   };

  //   fetchData();
  // }, [navigate]);

  return (
    <>
      <Navbar />
      <HeroSection />
      <div className='w-[1200px] mx-auto px-12'>
        <p className='font-[400] text-[24px] mb-2.5 text-[#F05423;]'>Library</p>
        <p className='text-[#6A6969] font-[400] text-[16px] mb-8'>Read the latest journals</p>
        <div className='grid grid-cols-4 gap-10'>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Home