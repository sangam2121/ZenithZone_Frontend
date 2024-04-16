import React,{useState} from 'react'
import {toast} from 'react-toastify'

const EducationUpdate = ({onClose}) => {
    const [education, setEducation] = useState({
        level: "",
        school: "",
        major_subject: "",
        education_start_date: "",
        education_end_date: ""
    });

    const handleEducationChange = (e) => {
        setEducation({
            ...education,
            [e.target.name]: e.target.value
        })

        // console.log(education)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const educationData = new FormData();
        try {
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
            const data=await educationResponse.json();

            if (educationResponse.ok) {
              onClose();
              toast.success('Education Added successfully!', {
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
            console.log(error)
        }

    }

    return (
        <>
            <div className={`fixed inset-0 z-40 bg-black opacity-50  block`}></div>

            <div id="popup-modal" tabindex="-1" className={`fixed inset-0 z-50 flex items-center justify-center`}>
                <div class="relative p-4 w-full max-w-md max-h-full">

                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">

                        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                Add Education
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


                                <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default EducationUpdate