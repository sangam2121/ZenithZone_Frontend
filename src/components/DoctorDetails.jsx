import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { FaStar } from "react-icons/fa6";
import { useParams, useNavigate } from 'react-router-dom';
import { authenticate } from '../utils/auth';
import DisplayMap from './DisplayMap';



const MyTabs = () => {
    const navigate = useNavigate();
    useEffect(() => {
        fetchDoctorDetail();
        fetchReviews();
    }, [])


    const { doctorUserId } = useParams();
    const [doctorDetail, setDoctorDetail] = useState();
    const [activeTab, setActiveTab] = useState('first');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [paymentId, setPaymentId] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [appointment, setAppointment] = useState({
        'doctor': null
    });

    const fetchReviews = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_AUTH_BASE_URL}/doctor/reviews/lists?doctor_id=${localStorage.getItem('userId')}`);
            if (!response.ok) {
                throw new Error('Failed to fetch reviews');
            }
            const data = await response.json();
            setReviews(data.results);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };


    const fetchDoctorDetail = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_AUTH_BASE_URL}/doctor/update/${doctorUserId}`, {
                method: "GET",
            })

            const data = await response.json();

            if (response.ok) {
                setDoctorDetail(data);
            }
            else {
                console.log("Error occured while fetching doctor detail");
            }

        } catch (error) {
            console.log("Error occured!!!");
        }
    }

    const fetchData = async () => {
        try {
            const isAuthenticated = await authenticate();
            if (!isAuthenticated) {
                navigate('/login', { state: { isNotAuauthenticated: true } });
            }
            else {
                handleBookAppointmentClick();
            }
        } catch (error) {
            console.error('Error in useEffect:', error);
        }
    };

    const fetchLocation = async () => {
        try {
            // Fetch latitude and longitude coordinates for the doctor's location (replace with your API endpoint)
            const response = await fetch('YOUR_API_ENDPOINT');
            if (!response.ok) {
                throw new Error('Failed to fetch location');
            }
            const { latitude, longitude } = await response.json();
            setLatitude(latitude);
            setLongitude(longitude);
        } catch (error) {
            console.error('Error fetching location:', error);
        }
    };

    const handlePaymentModalClose = () => {
        setIsPaymentModalOpen(false)
    }
    const handlePaymentModalOpen = () => {
        setIsPaymentModalOpen(true)
    }

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
            [e.target.name]: e.target.value,
            'doctor': doctorDetail.id
        })

    }
    const handelSubmit = async (e) => {
        //console.log(appointment)
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
                setPaymentId(data.payment);
                handleCloseModal()
                handlePaymentModalOpen();
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

    const handleChat=()=>{
        navigate('/contact', { state: { otherUserId: doctorUserId } });
    }

    const handlePayment = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_AUTH_BASE_URL}/appointment/pay/`, {
                method: 'post',
                body: JSON.stringify({
                    "payment_id": `${paymentId}`,
                    "redirect_url": "http://localhost:5173/doctor-detail"
                }),

                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("access")}`
                }
            })
            const data = await response.json();

            if (response.ok) {
                // console.log("Successful", data);
                const redirect_url = data?.payment_url;
                handlePaymentModalClose();
                window.open(redirect_url, '_blank').focus();
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
            console.log(error);
        }

    }

    const cancelPayment = () => {

    }
    console.log(doctorDetail)

    return (
        <>
            <Navbar />
            {doctorDetail ? (
                <div>
                    <div className="bg-white rounded-lg p-4 w-[98%]  mx-auto border-2">
                        <div className="flex items-center gap-4 pt-0 pb-8">
                            <img
                                className="w-12 h-12 rounded-full"
                                src={doctorDetail.image}
                                alt="doctor image"
                            />
                            <div className="flex flex-col w-full gap-0.5">
                                <div className="flex items-center justify-between">
                                    <h5 className="text-blue-gray text-lg">{`${doctorDetail.user.first_name} ${doctorDetail.user.last_name}`}</h5>
                                    <div className="flex items-center gap-0">
                                        <FaStar className='text-[orange]' />
                                        <FaStar className='text-[orange]' />
                                        <FaStar className='text-[orange]' />
                                        <FaStar className='text-[orange]' />
                                        <FaStar className='text-[orange]' />

                                    </div>
                                </div>
                                <p className="text-blue-gray">{doctorDetail.speciality}</p>
                            </div>
                        </div>
                        <div className=" p-0">
                            <div className="flex items-center gap-0">

                                <button
                                    type="button"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
                                    onClick={fetchData}
                                >
                                    Book Appointment
                                </button>

                                <button  onClick={handleChat} type="button" class="text-white font-medium text-sm px-5 py-2.5 me-2 mb-2  inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    <svg class="w-3.5 h-3.5 text-white me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                        <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                                        <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                                    </svg>
                                    Chat
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
                            <div className="container mx-auto p-6">
                                <p className="text-lg text-gray-700 leading-7">
                                    {doctorDetail.bio}
                                </p>

                                <p className="my-3 text-2xl font-bold tracking-tight text-gray-900">Education</p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                                    <div className="flowbite-card bg-gray-100 border border-gray-200 rounded-lg shadow-md hover:bg-gray-200 p-6">
                                        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">Master in Doctor (MD)</h5>
                                        <p className="font-normal text-gray-700">Tribhuvan University | Institute of Medical Science | 2015-2020</p>
                                    </div>

                                    <div className="flowbite-card bg-gray-100 border border-gray-200 rounded-lg shadow-md hover:bg-gray-200 p-6">
                                        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">Master in Doctor (MD)</h5>
                                        <p className="font-normal text-gray-700">Tribhuvan University | Institute of Medical Science | 2015-2020</p>
                                    </div>
                                </div>

                                <p className="my-3 text-2xl font-bold tracking-tight text-gray-900">Experience</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                                    <div className="flowbite-card bg-gray-100 border border-gray-200 rounded-lg shadow-md hover:bg-gray-200 p-6">
                                        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">General Physician</h5>
                                        <p className="font-normal text-gray-700">Norvic Hospital | 2023-present</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div
                            className={`p-4 rounded-lg ${activeTab === 'second' ? 'block' : 'hidden'
                                }`}
                            id="second"
                            role="tabpanel"
                            aria-labelledby="second-tab"

                        >
                            <div className='grid grid-cols-2 gap-3'>
                                {reviews.map((review, index) => (
                                    <figure key={index} className="max-w-screen-md border rounded-xl p-3 border-gray-300">
                                        <div className="flex items-center mb-4 text-yellow-300">
                                            {[...Array(review.rating)].map((_, i) => (
                                                <svg key={i} className="w-5 h-5 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                </svg>
                                            ))}
                                        </div>
                                        <blockquote>
                                            <p className="text-2xl font-semibold text-gray-900 dark:text-white">{review.comment}</p>
                                        </blockquote>
                                        <figcaption className="flex items-center mt-6 space-x-3 rtl:space-x-reverse">
                                            <img className="w-6 h-6 rounded-full" src={review.patient.image} alt="profile picture" />
                                            <div className="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-300 dark:divide-gray-700">
                                                <cite className="pe-3 font-medium text-gray-900 dark:text-white">{`${review.patient.user.first_name} ${review.patient.user.last_name}`}</cite>
                                                <cite className="ps-3 text-sm text-gray-500 dark:text-gray-400">Patient</cite>
                                            </div>
                                        </figcaption>
                                    </figure>
                                ))}
                            </div>

                        </div>
                        <div
                            className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${activeTab === 'third' ? 'block' : 'hidden'
                                }`}
                            id="third"
                            role="tabpanel"
                            aria-labelledby="third-tab"
                        >
                            <div style={{ position: 'relative' }}>
                                <DisplayMap latitude={5.8987} longitude={6.78979} />
                            </div>
                        </div>
                    </div>
                    <div>
                        {/* Backdrop Overlay */}
                        <div className={`fixed inset-0 z-40 bg-black opacity-50 ${isModalOpen ? 'block' : 'hidden'}`} onClick={handleCloseModal}></div>

                        {/* booking Modal */}
                        <div id="modal" className={`fixed inset-0 z-50 flex items-center justify-center ${isModalOpen ? 'block' : 'hidden'}`}>

                            <div className="relative p-4 w-full max-w-md max-h-full">

                                <div className="relative bg-white rounded-lg shadow">

                                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            Book Doctor
                                        </h3>
                                        <button type="button" onClick={handleCloseModal} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-toggle="crud-modal">
                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                            </svg>
                                            <span className="sr-only">Close modal</span>
                                        </button>
                                    </div>

                                    <form method="post" className="p-4 md:p-5" onSubmit={handelSubmit}>
                                        <div className="grid gap-4 mb-4 grid-cols-2">
                                            <div className="col-span-2">
                                                <label for="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
                                                <input type="date" name="date" id="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required="" onChange={handelChange} />
                                            </div>
                                        </div>

                                        <div className="grid gap-4 mb-4 grid-cols-2">
                                            <div className="col-span-2">

                                                <label for="time_at" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Time</label>
                                                <select id="time_at" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " onChange={handelChange} name="time_at">
                                                    <option defaultValue={null}>Choose your appropriate time</option>
                                                    <option value="09:00">09:00 AM</option>
                                                    <option value="11:00">11:00 AM</option>
                                                    <option value="13:00">01:00 PM</option>
                                                    <option value="15:00">03:00 PM</option>
                                                    <option value="17:00">05:00 PM</option>
                                                </select>


                                            </div>
                                        </div>


                                        <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                            <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                            Book
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
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



            {/* Backdrop Overlay */}
            <div className={`fixed inset-0 z-40 bg-black opacity-50 ${isPaymentModalOpen ? 'block' : 'hidden'}`}></div>


            <div id="popup-modal" tabindex="-1" className={`fixed inset-0 z-50 flex items-center justify-center ${isPaymentModalOpen ? 'block' : 'hidden'}`}>
                <div class="relative p-4 w-full max-w-md max-h-full">
                    <div class="relative bg-white rounded-lg shadow">
                        <button type="button" class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="popup-modal" onClick={handlePaymentModalClose}>
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                        <div class="p-4 md:p-5 text-center">
                            <svg class="mx-auto mb-4 text-green-500 w-12 h-12 dark:text-green-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <circle cx="12" cy="12" r="10" stroke-width="2" fill="none" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2l4-4" />
                            </svg>


                            <h3 class="mb-5 text-lg font-normal text-gray-500">Thank you for booking. Proceed to payment?</h3>
                            <button type="button" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={handlePayment}>
                                Yes, I'm sure

                            </button>

                            <button type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={cancelPayment}>No, cancel</button>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
};

export default MyTabs;
