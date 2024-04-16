import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import DoctorCard from '../components/DoctorCard';

const Book_Psychiatrist = () => {
  const [doctorList, setDoctorList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDoctors(); // Initial fetch to load all doctors
  }, []);

  const fetchDoctors = async (searchQuery = '') => {
    setLoading(true);
    setError(null);

    try {
      let url = `${import.meta.env.VITE_AUTH_BASE_URL}/doctor/lists`;
      if (searchQuery.trim() !== '') {
        url += `?name=${searchQuery}`;
      }

      const response = await fetch(url, {
        method: 'GET'
      });

      if (!response.ok) {
        throw new Error('Failed to fetch doctors');
      }

      const data = await response.json();
      setDoctorList(data.results);
    } catch (error) {
      setError('Failed to fetch doctors. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const searchQuery = e.target.elements.search.value.trim();
    fetchDoctors(searchQuery);
  };
console.log(doctorList);
  return (
    <>
      <Navbar />
      <div className='w-[1200px] mx-auto px-12'>
        <form onSubmit={handleSearchSubmit} className='w-[80%] mx-auto mb-4'>
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input type="search" id="default-search" name="search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Search ..." required />
            <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-[#121F49] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">Search</button>
          </div>
        </form>

        {loading && (
          <div role="status" className="flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        )}

        {!loading && error && (
          <p className="text-red-500">{error}</p>
        )}

        {!loading && !error && (
          <div className='grid grid-cols-3 gap-10'>
            {doctorList.length > 0 ? (
              doctorList.map(doctor => (
                <DoctorCard
                  key={doctor.id}
                  doctorId={doctor.id}
                  doctorUserId={doctor.user.id}
                  firstName={doctor.user.first_name}
                  lastName={doctor.user.last_name}
                  img={(doctor.image)?doctor.image:"http://localhost:8000/media/default.png"}
                  clinic={doctor.clinic_name}
                  specialization={doctor.speciality?doctor.speciality:"Psychiatrist"}
                  patientCount={doctor.patient_checked?doctor.patient_checked:"No"}
                />
              ))
            ) : (
              <p>No doctors found.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Book_Psychiatrist;
