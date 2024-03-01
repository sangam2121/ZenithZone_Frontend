import React, { useState } from 'react';
import Navbar from './Navbar';
import { FaStar } from "react-icons/fa6";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';

//'doctor': '6c79933d-0df6-4993-9568-746c65612fd7',
//'patient': '4b4569aa-62f1-4a72-90a7-99bd405db717',

const MyTabs = () => {
    
    const [activeTab, setActiveTab] = useState('first');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [appointment, setAppointment] = useState({
        'doctor': '1',
        'patient': '5122bc06-13a6-490d-8bf9-078fe236cb82',
    });

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

    const handleBookAppointmentClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };


    const handelChange = (e) => {
        setAppointment({
            ...appointment,
            [e.target.name]: e.target.value
        })

    }
    const handelSubmit = async (e) => {
        console.log(appointment)
        try {
            e.preventDefault();

            const response = await fetch(`${import.meta.env.VITE_AUTH_BASE_URL}/appointment/create/`, {
                method: 'post',
                body: JSON.stringify(appointment),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("access")}`
                }
            })

            const data = await response.json();
            if (response.ok) {
               
                console.log("Successful", data);
                var appointmentId = data.id;
                // console.log(appointmentId);
                handleCloseModal()
                toast.success('Thank you for booking. Pay for continue..', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
                // handlePayment(appointmentId);
            }
            else {
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
            console.log("Error on booking", data)
        }
    }

    const handlePayment = async (appointmentId) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_AUTH_BASE_URL}/appointment/pay/`, {
                method: 'post',
                body: JSON.stringify({
                    "payment_id": `${appointmentId}`,
                    "redirect_url": "http://localhost:5173/doctor-detail"
                }),

                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("access")}`
                }
            })
            const data = await response.json();

            if (response.ok) {
                console.log("Successful", data);
            }
            else {
                console.log("Failled", data);
            }


        } catch (error) {
            console.log(error);
        }

    }


    return (
        <>
            <Navbar />
            <ToastContainer />
            <div className="bg-white rounded-lg p-4 w-[98%]  mx-auto border-2">
                <div className="flex items-center gap-4 pt-0 pb-8">
                    <img
                        className="w-12 h-12 rounded-full"
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                        alt="tania andrew"
                    />
                    <div className="flex flex-col w-full gap-0.5">
                        <div className="flex items-center justify-between">
                            <h5 className="text-blue-gray text-lg">Tania Andrew</h5>
                            <div className="flex items-center gap-0">
                                <FaStar class='text-[orange]' />
                                <FaStar class='text-[orange]' />
                                <FaStar class='text-[orange]' />
                                <FaStar class='text-[orange]' />
                                <FaStar class='text-[orange]' />

                            </div>
                        </div>
                        <p className="text-blue-gray">Frontend Lead @ Google</p>
                    </div>
                </div>
                <div className=" p-0">
                    <div className="flex items-center gap-0">

                        <button
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
                            onClick={handleBookAppointmentClick}
                        >
                            Book Appointment
                        </button>

                    </div>
                </div>
            </div>


            <div className="mb-4 border-b border-gray-200 dark:border-gray-700 ml-12">
                <ul
                    className="flex flex-wrap -mb-px text-sm font-medium text-center"
                    id="default-tab"
                    data-tabs-toggle="#default-tab-content"
                    role="tablist"
                >
                    <li className="me-2" role="presentation">
                        <button
                            className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'first' ? 'border-blue-500' : ''
                                }`}
                            id="first-tab"
                            onClick={() => handleTabClick('first')}
                            role="tab"
                            aria-controls="first"
                            aria-selected={activeTab === 'first'}
                        >
                            About
                        </button>
                    </li>
                    <li className="me-2" role="presentation">
                        <button
                            className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'second' ? 'border-blue-500' : ''
                                }`}
                            id="second-tab"
                            onClick={() => handleTabClick('second')}
                            role="tab"
                            aria-controls="second"
                            aria-selected={activeTab === 'second'}
                        >
                            Review
                        </button>
                    </li>
                    <li role="presentation">
                        <button
                            className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'third' ? 'border-blue-500' : ''
                                }`}
                            id="third-tab"
                            onClick={() => handleTabClick('third')}
                            role="tab"
                            aria-controls="third"
                            aria-selected={activeTab === 'third'}
                        >
                            Location
                        </button>
                    </li>
                </ul>
            </div>
            <div id="default-tab-content">
                <div
                    className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${activeTab === 'first' ? 'block' : 'hidden'
                        }`}
                    id="first"
                    role="tabpanel"
                    aria-labelledby="first-tab"
                >
                    <div class="container mx-auto p-6">
                        <p class="text-lg text-gray-700 leading-7">
                            Welcome to my profile! I am Dr. Stone, a dedicated and compassionate healthcare professional with a commitment to providing excellent medical care. With years of experience in brain, I strive to offer personalized and comprehensive healthcare services to my patients.

                            My approach to patient care is rooted in empathy and a patient-centric philosophy. I believe in fostering open communication, listening to patients' concerns, and working collaboratively to achieve the best possible health outcomes. Whether you are seeking preventive care, managing chronic conditions, or addressing acute medical issues, I am here to support you on your health journey.

                            My ongoing commitment to staying current with medical advancements ensures that my patients receive the latest and most effective treatments. I prioritize building strong doctor-patient relationships based on trust and mutual respect.

                            Thank you for considering me as your healthcare provider. I look forward to partnering with you to achieve and maintain your optimal health.
                        </p>

                        <p class="my-3 text-2xl font-bold tracking-tight text-gray-900">Education</p>

                        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                            <div class="flowbite-card bg-gray-100 border border-gray-200 rounded-lg shadow-md hover:bg-gray-200 p-6">
                                <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900">Master in Doctor (MD)</h5>
                                <p class="font-normal text-gray-700">Tribhuvan University | Institute of Medical Science | 2015-2020</p>
                            </div>

                            <div class="flowbite-card bg-gray-100 border border-gray-200 rounded-lg shadow-md hover:bg-gray-200 p-6">
                                <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900">Master in Doctor (MD)</h5>
                                <p class="font-normal text-gray-700">Tribhuvan University | Institute of Medical Science | 2015-2020</p>
                            </div>
                        </div>

                        <p class="my-3 text-2xl font-bold tracking-tight text-gray-900">Experience</p>
                        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                            <div class="flowbite-card bg-gray-100 border border-gray-200 rounded-lg shadow-md hover:bg-gray-200 p-6">
                                <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900">General Physician</h5>
                                <p class="font-normal text-gray-700">Norvic Hospital | 2023-present</p>
                            </div>
                        </div>
                    </div>

                </div>
                <div
                    className={`p-4 rounded-lg dark:bg-gray-800 ${activeTab === 'second' ? 'block' : 'hidden'
                        }`}
                    id="second"
                    role="tabpanel"
                    aria-labelledby="second-tab"
                >
                    <div class='w-100% grid grid-cols-2 gap-5'>

                        <figure class="max-w-screen-md mx-auto text-center border rounded-xl p-4">
                            <svg class="w-10 h-10 mx-auto mb-3 text-gray-400 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
                                <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
                            </svg>
                            <blockquote>
                                <p class="text-2xl italic font-medium text-gray-900 dark:text-white">I want to express my sincere appreciation for the excellent service I received. From start to finish, my experience was positive and exceeded my expectations.
                                </p>
                            </blockquote>
                            <figcaption class="flex items-center justify-center mt-6 space-x-3 rtl:space-x-reverse">
                                <img class="w-6 h-6 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png" alt="profile picture" />
                                <div class="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-500 dark:divide-gray-700">
                                    <cite class="pe-3 font-medium text-gray-900 dark:text-white">Sangam Bharati</cite>
                                    <cite class="ps-3 text-sm text-gray-500 dark:text-gray-400">CEO at ZetithZone</cite>
                                </div>
                            </figcaption>
                        </figure>


                        <figure class="max-w-screen-md mx-auto text-center border rounded-xl p-4">
                            <svg class="w-10 h-10 mx-auto mb-3 text-gray-400 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
                                <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
                            </svg>
                            <blockquote>
                                <p class="text-2xl italic font-medium text-gray-900 dark:text-white">The team's professionalism and attention to detail were remarkable. They were responsive, addressed my concerns promptly, and went above and beyond to ensure my satisfaction.
                                </p>
                            </blockquote>
                            <figcaption class="flex items-center justify-center mt-6 space-x-3 rtl:space-x-reverse">
                                <img class="w-6 h-6 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png" alt="profile picture" />
                                <div class="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-500 dark:divide-gray-700">
                                    <cite class="pe-3 font-medium text-gray-900 dark:text-white">Sangam Bharati</cite>
                                    <cite class="ps-3 text-sm text-gray-500 dark:text-gray-400">CEO at ZenithZone</cite>
                                </div>
                            </figcaption>
                        </figure>


                    </div>

                </div>
                <div
                    className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${activeTab === 'third' ? 'block' : 'hidden'
                        }`}
                    id="third"
                    role="tabpanel"
                    aria-labelledby="third-tab"
                >
                    <div class='w-[1200px] mx-auto'>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3553.9738132950447!2d84.8776681!3d27.0309934!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb188d9b82c8ad%3A0xae31bde410797bf7!2sSwoyambhu%20Mahachaitya!5e0!3m2!1sen!2snp!4v1707903982278!5m2!1sen!2snp" width="1200" height="450" allowFullsSreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>

                    </div>

                </div>
            </div>


            <div>
                {/* Backdrop Overlay */}
                <div className={`fixed inset-0 z-40 bg-black opacity-50 ${isModalOpen ? 'block' : 'hidden'}`} onClick={handleCloseModal}></div>

                {/* Modal */}
                <div id="modal" className={`fixed inset-0 z-50 flex items-center justify-center ${isModalOpen ? 'block' : 'hidden'}`}>

                    <div class="relative p-4 w-full max-w-md max-h-full">

                        <div class="relative bg-white rounded-lg shadow">

                            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                                <h3 class="text-lg font-semibold text-gray-900">
                                    Book Doctor
                                </h3>
                                <button type="button" onClick={handleCloseModal} class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-toggle="crud-modal">
                                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span class="sr-only">Close modal</span>
                                </button>
                            </div>

                            <form method="post" class="p-4 md:p-5" onSubmit={handelSubmit}>
                                <div class="grid gap-4 mb-4 grid-cols-2">
                                    <div class="col-span-2">
                                        <label for="date" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
                                        <input type="date" name="date" id="date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required="" onChange={handelChange} />
                                    </div>
                                </div>

                                <div class="grid gap-4 mb-4 grid-cols-2">
                                    <div class="col-span-2">

                                        <label for="time_at" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Time</label>
                                        <select id="time_at" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " onChange={handelChange} name="time_at">
                                            <option selected>Choose your appropriate time</option>
                                            <option value="09:00">09:00 AM</option>
                                            <option value="11:00">11:00 AM</option>
                                            <option value="13:00">01:00 PM</option>
                                            <option value="15:00">03:00 PM</option>
                                            <option value="17:00">05:00 PM</option>
                                        </select>


                                    </div>
                                </div>


                                <button type="submit" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                    <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                    Book
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default MyTabs;
