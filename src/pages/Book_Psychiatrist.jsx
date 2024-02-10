import React from 'react'
import Navbar from '../components/Navbar'
import DoctorCard from '../components/DoctorCard'
import { FaSearch } from 'react-icons/fa'

const Book_Psychiatrist = () => {
  return (
    <>
      <Navbar />
      <div class='w-[1200px] mx-auto px-12'>

        <div class='w-[50%] border-2 border-slate-900] rounded-xl mx-auto my-4 relative py-2 px-2 flex items-center'>
          <FaSearch class='mr-4 text-xl'></FaSearch>
          <input type='text' placeholder='Search doctors' class='outline-none w-[80%]'></input>
          <button className="rounded-[30px] bg-[#121F49] text-white px-5 py-1">Search</button>
        </div>

        <div class='grid grid-cols-3 gap-10'>
          <DoctorCard></DoctorCard>
          <DoctorCard></DoctorCard>
          <DoctorCard></DoctorCard>
        </div>
      </div>
    </>

  )
}

export default Book_Psychiatrist