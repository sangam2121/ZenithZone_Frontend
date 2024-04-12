import React from 'react'
import { useState, useEffect } from 'react'
import { authenticate } from '../utils/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify'
import { jwtDecode } from 'jwt-decode';
import Map from "./Map"


const MultiStepForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const doctorCreated = location.state?.doctorCreated;
  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };
  const handleAutoLogin = async () => {
    try {
      if (doctorCreated) {
        const response = await fetch(`${import.meta.env.VITE_AUTH_BASE_URL}/auth/login/`, {
          method: 'POST',
          body: JSON.stringify(location.state.details),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (response.ok) {
          const refresh = Object(data).refresh;
          const access = Object(data).access;
          localStorage.setItem("refresh", refresh);
          localStorage.setItem("access", access);
          const decodedData = jwtDecode(access);
          console.log("decoded data", decodedData);
          localStorage.setItem("userId", decodedData.user_id);
          localStorage.setItem("userName", decodedData.user_name);
          localStorage.setItem("userType", decodedData.user_type);

        } else {
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
      }
    } catch (error) {
      console.log(error);
      if (error instanceof SyntaxError) {
        console.log('Invalid JSON in response');
      }
    }
  }

  const [profile, setProfile] = useState({
    email: "",
    first_name: "",
    last_name: "",
    phone: "",
    address: "",
    bio: "",
    image: "",
    speciality: ""
  });

  const [education, setEducation] = useState({
    level: "",
    school: "",
    major_subject: "",
    education_start_date: "",
    education_end_date: ""
  });
  const [experience, setExperience] = useState({
    hospital: "",
    title: "",
    experience_start_date: "",
    experience_end_date: ""
  });
  const [clinic, setClinic] = useState({
    appointment_fee: "",
    clinic_name: "",
    lat: "",
    lon: ""
  });
  const handleMapData = (data) => {
    setClinic({
      ...clinic,
      lat:data.lat,
      lon:data.lng
    })
  
  }

  const handleClinicChange = (e) => {
    setClinic({
      ...clinic,
      [e.target.name]: e.target.value
    })
    console.log(clinic)
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
    console.log(profile)
  }

  const handleEducationChange = (e) => {
    setEducation({
      ...education,
      [e.target.name]: e.target.value
    })

    // console.log(education)
  }

  const handleExperienceChange = (e) => {
    setExperience({
      ...experience,
      [e.target.name]: e.target.value
    })
    // console.log(experience);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const profileData = new FormData();
      const educationData = new FormData();
      const experienceData = new FormData();
      const errors = [];

      // Add check for education data
      if (education.level && education.major_subject && education.education_start_date && education.education_end_date && education.school) {
        educationData.append('level', education.level);
        educationData.append('major', education.major_subject);
        educationData.append('start_date', education.education_start_date);
        educationData.append('end_date', education.education_end_date);
        educationData.append('school', education.school);

        // Send education data
        const educationResponse = await fetch(`${import.meta.env.VITE_AUTH_BASE_URL}/doctor/education/`, {
          method: 'POST',
          body: educationData,
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("access")}`
          }
        });
        if (!educationResponse.ok) {
          errors.push('Failed to create education record');
        }
      }

      // Add check for experience data
      if (experience.hospital && experience.title && experience.experience_start_date && experience.experience_end_date) {
        experienceData.append('hospital', experience.hospital);
        experienceData.append('title', experience.title);
        experienceData.append('start_date', experience.experience_start_date);
        experienceData.append('end_date', experience.experience_end_date);

        // Send experience data
        const experienceResponse = await fetch(`${import.meta.env.VITE_AUTH_BASE_URL}/doctor/experience/`, {
          method: 'POST',
          body: experienceData,
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("access")}`
          }
        });
        if (!experienceResponse.ok) {
          errors.push('Failed to create experience record');
        }
      }

      // Send profile data
      profileData.append('first_name', profile.first_name);
      profileData.append('last_name', profile.last_name);
      profileData.append('email', profile.email);
      profileData.append('phone', profile.phone);
      profileData.append('address', profile.address);
      profileData.append('bio', profile.bio);
      profileData.append('image', profile.image);
      profileData.append('speciality', profile.speciality);
      profileData.append('appointment_fee', clinic.appointment_fee)

      const profileResponse = await fetch(`${import.meta.env.VITE_AUTH_BASE_URL}/doctor/update/${localStorage.getItem("userId")}/`, {
        method: 'PUT',
        body: profileData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("access")}`
        }
      });

      if (!profileResponse.ok) {
        errors.push('Failed to update profile');
      }

      // Handle errors
      if (errors.length > 0) {
        errors.forEach(error => {
          toast.error(error);
        });
      } else {
        toast.success('Profile Updated Successfully', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
        navigate('/doctor-dashboard');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  }


  const fetchData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_AUTH_BASE_URL}/doctor/update/${localStorage.getItem("userId")}/`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      console.log(data);
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

  useEffect(() => {
    handleAutoLogin();
    fetchData();
  }, [])

  return (
    <>

      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Update Your Profile
          </h3>
        </div>

        {
          doctorCreated ? (<div class="flex items-center p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
            <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span class="sr-only">Info</span>
            <div>
              <span class="font-medium">Warning!</span>Update your profile otherwise you can't recieve appointment request
            </div>
          </div>) : null
        }


        <div className="p-4 md:p-5">
          <form method='post' encType='multipart/form-data' onSubmit={handleSubmit}>

            {step === 1 && (
              <>
                <h3 className='mb-4 text-lg font-medium leading-none text-gray-900 dark:text-white'>
                  Personal Details
                </h3>
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
                    <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="phone" id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required
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
                  <input type="email" name="speciality" id="floating_speciality" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-nonefocus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required value={profile.speciality} onChange={handleProfileChange} />

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

                <div className='flex justify-end'>

                  <button
                    type='button'
                    onClick={nextStep}
                    className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                  >
                    Next Step: Education Details
                  </button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h3 className='mb-4 text-lg font-medium leading-none text-gray-900 dark:text-white'>
                  Education Details
                </h3>
                <div className="relative z-0 w-full mb-5 group">
                  <label htmlFor="education_level" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Level</label>
                  <select id="education_level" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" name="level" onChange={handleEducationChange}>
                    <option selected>Select Level</option>
                    <option value="bachelor" >Bachelor</option>
                    <option value="master" >Master</option>
                    <option value="phd" >Phd</option>
                  </select>
                </div>


                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-5 group">
                    <input type="text" name="school" id="floating_school_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={handleEducationChange} />

                    <label htmlFor="floating_school_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name of Institute</label>
                  </div>
                  <div className="relative z-0 w-full mb-5 group">
                    <input type="text" name="major_subject" id="floating_major" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required
                      onChange={handleEducationChange} />

                    <label htmlFor="floating_major" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Major Subject</label>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-5 group">
                    <input type="date" name="education_start_date" id="floating_education_start" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required
                      onChange={handleEducationChange} />

                    <label htmlFor="floating_education_start" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Start Date</label>
                  </div>
                  <div className="relative z-0 w-full mb-5 group">
                    <input type="date" name="education_end_date" id="floating_education_end" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required
                      onChange={handleEducationChange} />

                    <label htmlFor="floating_education__end" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">End Date</label>
                  </div>
                </div>


                <div className='flex justify-between'>

                  <button
                    type='button'
                    onClick={prevStep}
                    className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                  >
                    Previous
                  </button>
                  <button
                    type='button'
                    onClick={nextStep}
                    className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                  >
                    Next Step: Experience Details
                  </button>
                </div>
              </>
            )}


            {step === 3 && (
              <>
                <h3 className='mb-4 text-lg font-medium leading-none text-gray-900 dark:text-white'>
                  Experience Details
                </h3>
                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-5 group">
                    <input type="text" name="hospital" id="floating_organization_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={handleExperienceChange} />

                    <label htmlFor="floating_organization_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name of Organization</label>
                  </div>
                  <div className="relative z-0 w-full mb-5 group">
                    <input type="text" name="title" id="floating_role" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required
                      onChange={handleExperienceChange} />

                    <label htmlFor="floating_role" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Role</label>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-5 group">
                    <input type="date" name="experience_start_date" id="floating_experience_start" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={handleExperienceChange}
                    />

                    <label htmlFor="floating_experience_start" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Start Date</label>
                  </div>
                  <div className="relative z-0 w-full mb-5 group">
                    <input type="date" name="experience_end_date" id="floating_experience_end" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required
                      onChange={handleExperienceChange} />

                    <label htmlFor="floating_experience_end" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">End Date</label>
                  </div>
                </div>

                <div className='flex justify-between'>
                  <button
                    type='button'
                    onClick={prevStep}
                    className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                  >
                    Previous
                  </button>
                  <button
                    type='button'
                    onClick={nextStep}
                    className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                  >
                    Next Step: Clinic Details
                  </button>

                </div>
              </>
            )}

            {step === 4 && (
              <>
                <h3 className='mb-4 text-lg font-medium leading-none text-gray-900 dark:text-white'>
                  Contact Details
                </h3>

                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-5 group">
                    <input type="text" name="clinic_name" id="floating_clinic_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " onChange={handleClinicChange} />

                    <label htmlFor="floating_clinic_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name of Clinic</label>
                  </div>
                  <div className="relative z-0 w-full mb-5 group">
                    <input type="text" name="appointment_fee" id="floating_fee" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                      onChange={handleClinicChange} />

                    <label htmlFor="floating_fee" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Appointment Charge</label>
                  </div>
                </div>

                <div className='mb-3'>
                  <Map onLocationSelect={handleMapData}></Map>
                </div>

                <div className='flex justify-between'>
                  <button
                    type='button'
                    onClick={prevStep}
                    className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                  >
                    Previous
                  </button>
                  <button
                    type='submit'
                    className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                  >
                    Submit
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>

    </>
  )
}

export default MultiStepForm