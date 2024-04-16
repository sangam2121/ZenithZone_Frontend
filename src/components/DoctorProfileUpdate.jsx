import React, { useState, useEffect } from 'react';
import {toast} from 'react-toastify'

const DoctorProfileUpdate = ({ onClose }) => {
  const [profile, setProfile] = useState({
    email: "",
    first_name: "",
    last_name: "",
    phone: "",
    address: "",
    bio: "",
    image: "",
    speciality: "",
  });

  const fetchData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_AUTH_BASE_URL}/doctor/update/${localStorage.getItem("userId")}/`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setProfile({
        ...profile,
        email: data.user.email || "",
        first_name: data.user.first_name || "",
        last_name: data.user.last_name || "",
        phone: data.user.phone || "",
        address: data.user.address || "",
        bio: data.user.bio || "",
        speciality: data.speciality || ""
      });
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  }

  const handleProfileChange = (e) => {
    if (e.target.name === "image") {
      setProfile({
        ...profile,
        'image': e.target.files[0]
      })

    }
    else {
      setProfile({
        ...profile,
        [e.target.name]: e.target.value
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const profileData = new FormData();
      profileData.append('first_name', profile.first_name);
      profileData.append('last_name', profile.last_name);
      profileData.append('email', profile.email);
      profileData.append('phone', profile.phone);
      profileData.append('address', profile.address);
      profileData.append('bio', profile.bio);
      profileData.append('image', profile.image);
      profileData.append('speciality', profile.speciality);

      const profileResponse = await fetch(`${import.meta.env.VITE_AUTH_BASE_URL}/doctor/update/${localStorage.getItem("userId")}/`, {
        method: 'PUT',
        body: profileData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("access")}`
        }
      });

      const data=await profileResponse.json();

      if (profileResponse.ok) {
        onClose();
        toast.success('Profile Updated successfully!', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
      });
  
      }
      else{
        Object.values(data).forEach((value) => {
          if (Array.isArray(value)) {
              value.forEach((error) => {
                  toast.error(error, {
                      position: toast.POSITION.TOP_RIGHT,
                      autoClose: 3000,
                  });
              });
          } else {
              toast.error(value, {
                  position: toast.POSITION.TOP_RIGHT,
                  autoClose: 3000,
              });
          }
      });
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  }

  useEffect(() => {
    fetchData();
  }, []); 

  return (
    <>
      <div className={`fixed inset-0 z-40 bg-black opacity-50  block`}></div>

      <div id="popup-modal" tabindex="-1" className={`fixed inset-0 z-50 flex items-center justify-center`}>
        <div class="relative p-4 w-full max-w-md max-h-full">

          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">

            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                Update Your Profile
              </h3>
              <button type="button" class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal" onClick={onClose}>
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
            </div>

            <div class="p-4 md:p-5">

              <form class="max-w-md mx-auto" method='post' encType='multipart/form-data' onSubmit={handleSubmit}>

                <div className="relative z-0 w-full mb-5 group">
                  <input type="email" name="email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-nonefocus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required value={profile.email} onChange={handleProfileChange} />

                  <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                </div>


                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-5 group">
                    <input type="text" name="first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required value={profile.first_name} onChange={handleProfileChange} />

                    <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
                  </div>
                  <div className="relative z-0 w-full mb-5 group">
                    <input type="text" name="last_name" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required
                      value={profile.last_name} onChange={handleProfileChange} />

                    <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-5 group">
                    <input type="text"  name="phone" id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required
                      onChange={handleProfileChange} value={profile.phone} />

                    <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number</label>
                  </div>
                  <div className="relative z-0 w-full mb-5 group">
                    <input type="text" name="address" id="floating_address" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required
                      value={profile.address} onChange={handleProfileChange} />

                    <label htmlFor="floating_address" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Address</label>
                  </div>
                </div>

                <div className="relative z-0 w-full mb-5 group">
                  <input type="text" name="speciality" id="floating_speciality" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-nonefocus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required value={profile.speciality} onChange={handleProfileChange} />

                  <label htmlFor="floating_speciality" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Speciality</label>
                </div>

                <div className="relative z-0 w-full mb-5 group">

                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload Profile Picture </label>
                  <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" onChange={handleProfileChange} name="image" />

                </div>
                <div className="relative z-0 w-full mb-5 group">

                  <label htmlFor="Bio" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Bio</label>
                  <textarea id="Bio" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your bio here..." onChange={handleProfileChange} value={profile.bio} name='bio'></textarea>

                </div>

                <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
              </form>

            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default DoctorProfileUpdate