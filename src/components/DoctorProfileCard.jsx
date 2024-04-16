import React from 'react'
import { useState, useEffect } from 'react'
import DoctorProfileUpdate from './DoctorProfileUpdate';
import EducationUpdate from './EducationUpdate';
import ExperienceUpdate from './ExperienceUpdate';
import ContactUpdate from './ContactUpdate';

const DoctorProfileCard = () => {
    const [profileData, setProfileData] = useState({});
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [isEducationModalOpen, setIsEducationModalOpen] = useState(false);
    const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);


    const handleEducationModalOpen = () => {
        setIsEducationModalOpen(true);
    }

    const handleEducationModalClose = () => {
        setIsEducationModalOpen(false);
    }

    const handleExperienceModalOpen = () => {
        setIsExperienceModalOpen(true);
    }

    const handleExperienceModalClose = () => {
        setIsExperienceModalOpen(false);
    }


    const handleProfileModalOpen = () => {
        setIsProfileModalOpen(true);
    }

    const handleProfileModalClose = () => {
        setIsProfileModalOpen(false);
    }


    const handleContactModalOpen = () => {
        setIsContactModalOpen(true);
    }

    const handleContactModalClose = () => {
        setIsContactModalOpen(false);
    }



    const fetchProfileData = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_AUTH_BASE_URL}/doctor/update/${localStorage.getItem("userId")}`, {
                method: "get",
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("access")}`
                }
            });

            const data = await response.json();
            if (response.ok) {
                // console.log(data)
                setProfileData(data);
                
            } else {
                console.log("Error Occurred");
            }

        } catch (error) {
            console.log("Error !!", error);
        }

    };

    useEffect(() => {
        fetchProfileData();
    }, []);


    return (
        <>
            {profileData && profileData.user ? (
                <div className="container mx-auto">
                    <div className="md:flex no-wrap md:-mx-2 ">
                        {/* Left Side */}
                        <div className="w-full md:w-3/12 md:mx-2">
                            {/* Profile Card */}
                            <div className="bg-white p-3">
                                <div className="image overflow-hidden">
                                    <img className="h-auto w-full mx-auto rounded-[50%]"
                                        src={profileData.image}
                                        alt="" />
                                </div>
                                <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">{`${profileData.user.first_name} ${profileData.user.last_name}`}</h1>


                                <ul
                                    className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                                    <li className="flex items-center py-2">
                                        <span>Status</span>
                                        <span className="ml-auto"><span
                                            className="bg-green-500 py-1 px-2 rounded text-white text-sm">Verified</span></span>
                                    </li>
                                    <li className="flex items-center py-2 cursor-pointer" onClick={handleEducationModalOpen}>
                                        <span className='me-2'>Add Education</span>
                                        <svg class="w-4 h-4 ms-auto me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M18 2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2ZM2 18V7h6.7l.4-.409A4.309 4.309 0 0 1 15.753 7H18v11H2Z" />
                                            <path d="M8.139 10.411 5.289 13.3A1 1 0 0 0 5 14v2a1 1 0 0 0 1 1h2a1 1 0 0 0 .7-.288l2.886-2.851-3.447-3.45ZM14 8a2.463 2.463 0 0 0-3.484 0l-.971.983 3.468 3.468.987-.971A2.463 2.463 0 0 0 14 8Z" />
                                        </svg>

                                    </li>
                                    <li className="flex items-center py-2 cursor-pointer" onClick={handleExperienceModalOpen}>
                                        <span className='me-2'>Add Experience</span>
                                        <svg class="w-4 h-4 ms-auto me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M18 2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2ZM2 18V7h6.7l.4-.409A4.309 4.309 0 0 1 15.753 7H18v11H2Z" />
                                            <path d="M8.139 10.411 5.289 13.3A1 1 0 0 0 5 14v2a1 1 0 0 0 1 1h2a1 1 0 0 0 .7-.288l2.886-2.851-3.447-3.45ZM14 8a2.463 2.463 0 0 0-3.484 0l-.971.983 3.468 3.468.987-.971A2.463 2.463 0 0 0 14 8Z" />
                                        </svg>
                                    </li>

                                    <li className="flex items-center py-2 cursor-pointer" onClick={handleContactModalOpen}>
                                        <span className='me-2'>Contact Details</span>
                                        <svg class="w-4 h-4 ms-auto me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M18 2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2ZM2 18V7h6.7l.4-.409A4.309 4.309 0 0 1 15.753 7H18v11H2Z" />
                                            <path d="M8.139 10.411 5.289 13.3A1 1 0 0 0 5 14v2a1 1 0 0 0 1 1h2a1 1 0 0 0 .7-.288l2.886-2.851-3.447-3.45ZM14 8a2.463 2.463 0 0 0-3.484 0l-.971.983 3.468 3.468.987-.971A2.463 2.463 0 0 0 14 8Z" />
                                        </svg>
                                    </li>

                                </ul>
                            </div>
                            {/* End of profile card */}

                        </div>
                        {/* Right Side */}
                        <div className="w-full md:w-9/12 mx-2 h-64">
                            {/* Profile tab */}
                            {/* About Section */}
                            <div className="bg-white p-3 shadow-sm rounded-sm">
                                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                                    <span clas="text-green-500">
                                        <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </span>
                                    <span className="tracking-wide">About</span>
                                </div>
                                <div className="text-gray-700">
                                    <div className="grid md:grid-cols-2 text-sm">
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">First Name</div>
                                            <div className="px-4 py-2">{profileData.user.first_name}</div>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">Last Name</div>
                                            <div className="px-4 py-2">{profileData.user.last_name}</div>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">Type</div>
                                            <div className="px-4 py-2">{profileData.user.user_type}</div>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">Contact No.</div>
                                            <div className="px-4 py-2">{profileData.user.phone}</div>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">Address</div>
                                            <div className="px-4 py-2">{profileData.user.address}</div>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">Email.</div>
                                            <div className="px-4 py-2">
                                                <a className="text-blue-800" href={`mailto:${profileData.user.email}`}>{profileData.user.email}</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4" onClick={handleProfileModalOpen}>Update Profile</button>
                            </div>
                            {/* End of about section*/}

                            <div className="my-4"></div>

                            {/* Experience and education*/}
                            <div className="bg-white p-3 shadow-sm rounded-sm">

                                <div className="grid grid-cols-2">
                                    <div>
                                        <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                                            <span clas="text-green-500">
                                                <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                            </span>
                                            <span className="tracking-wide">Experience</span>

                                        </div>
                                        <ul className="list-inside space-y-2">
                                            {profileData.experience.map((experienceItem) => {
                                                return (<>
                                                    <li>
                                                        <div className="text-teal-600">{experienceItem.title.charAt(0).toUpperCase() + experienceItem.title.slice(1)} at    {experienceItem.hospital.charAt(0).toUpperCase() + experienceItem.hospital.slice(1)}</div>
                                                        <div className="text-gray-500 text-xs">{`${experienceItem.start_date} - ${experienceItem.end_date}`}</div>
                                                    </li>
                                                </>)
                                            })
                                            }
                                        </ul>
                                    </div>
                                    <div>
                                        <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                                            <span clas="text-green-500">
                                                <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    stroke="currentColor">
                                                    <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                                                    <path fill="#fff"
                                                        d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                        d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                                                </svg>
                                            </span>
                                            <span className="tracking-wide">Education</span>
                                        </div>
                                        <ul className="list-inside space-y-2">
                                            {profileData.education.map((educationItem) => {
                                                return (<>
                                                    <li>
                                                        <div className="text-teal-600">{educationItem.level.charAt(0).toUpperCase() + educationItem.level.slice(1)} Degree in {educationItem.school.charAt(0).toUpperCase() + educationItem.school.slice(1)}</div>
                                                        <div className="text-gray-500 text-xs">{`${educationItem.start_date} - ${educationItem.end_date}`}</div>
                                                    </li>
                                                </>)
                                            })
                                            }
                                        </ul>
                                    </div>
                                </div>
                                {/* End of Experience and education grid  */}
                            </div>
                            {/*  End of profile tab */}
                        </div>
                    </div>
                    {isProfileModalOpen && (
                        <DoctorProfileUpdate
                            onClose={handleProfileModalClose}
                        />
                    )}
                    {isEducationModalOpen && (
                        <EducationUpdate
                            onClose={handleEducationModalClose}
                        />
                    )}

                    {isExperienceModalOpen && (
                        <ExperienceUpdate
                            onClose={handleExperienceModalClose}
                        />
                    )}

                    {isContactModalOpen && (
                        <ContactUpdate
                            onClose={handleContactModalClose}
                        />
                    )}
                </div>
            ) : (
                <div class="flex items-center justify-center">
                    <div role="status">
                        <svg aria-hidden="true" class="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
            )
            }

        </>
    )
}

export default DoctorProfileCard