import React from 'react'
import Navbar from '../components/Navbar'
import DoctorCard from '../components/DoctorCard'
import { useEffect, useState } from 'react'


const Book_Psychiatrist = () => {
  const [doctorList, setDoctorList] = useState([])
  useEffect(() => {

    const fetchDoctor = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_AUTH_BASE_URL}/doctor/lists`, {
          method: 'GET'
        })
        const data = await response.json()
        setDoctorList(data.results)
      //  console.log(data.results)
      }
      catch (error) {
        console.log(error)
      }
    }
    fetchDoctor()
  }, [])

  
  return (
    <>
      <Navbar />
      <div class='w-[1200px] mx-auto px-12'>
        <form class='w-[80%] mx-auto mb-4'>
          <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div class="relative ">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 " placeholder="Search ..." required />
            <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-[#121F49] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">Search</button>
          </div>
        </form>


        <div class='grid grid-cols-3 gap-10'>
          {
            doctorList.map((doctor) => {
              return(<DoctorCard
                doctorId={doctor.id}
                doctorUserId={doctor.user.id}
                firstName={doctor.user.first_name}
                lastName={doctor.user.last_name}
                img={doctor.image}
                clinic={doctor.clinic}
                specialization={doctor.speciality}
              ></DoctorCard>)
            })
          }
        </div>
      </div>
    </>

  )
}

export default Book_Psychiatrist