import React, { useEffect, useState } from 'react'
import {toast} from 'react-toastify'


const ReviewWrite = () => {
    const [appointment, setAppointment] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [review, setReview] = useState({});

    const handleModalClose = () => {
        setIsModalOpen(false);
    };
    const handleModalOpen = (doctorId) => {
        setIsModalOpen(true);
        setReview({
            ...review,
            doctor: doctorId,
        })

    }

    const handleChange = (e) => {
        setReview({
            ...review,
            [e.target.name]: e.target.value
        })
        console.log(review)

    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_AUTH_BASE_URL}/doctor/reviews/`, {
                method: "POST",
                body: JSON.stringify(review),
                headers: {
                    "Content-type": "application/json",
                    'Authorization': `Bearer ${localStorage.getItem("access")}`
                }
            });
            const data = await response.json();
            if (response.ok) {
                toast.success('Doctor Reviewed successfully!', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
                setReview(null)

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
        } catch (error) {

            console.error("An error occurred:", error);
        }
    };



    const fetchAppointment = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_AUTH_BASE_URL}/appointment/lists/?patient_id=${localStorage.getItem('userId')}`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (response.ok) {
                const data = await response.json();

                if (data.results && data.results.length > 0) {
                    const appointments = data.results.map(appointment => ({
                        doctor: `${appointment.doctor.user.first_name} ${appointment.doctor.user.last_name}`,
                        dateTime: `${appointment.date} At ${appointment.time_at}`,
                        status: appointment.status,
                        price: appointment.payment.amount,
                        doctorId: appointment.doctor.id
                    }));

                    setAppointment(appointments);
                    console.log(appointment)
                } else {
                    console.log("No appointments found.");

                }
            } else {
                console.error("Failed to fetch appointment data.");

            }
        } catch (error) {
            console.error("Error fetching appointment data:", error);
        }
    };

    useEffect(() => {
        fetchAppointment();
    }, [])
    return (
        <>
            <div className='grid grid-cols-2 gap-4'>
                {
                    appointment.map((item) => {
                        return (
                            <>
                                <div className="mt-6 w-96 border border-gray-200 rounded-lg shadow-md">
                                    <div className="p-6">
                                        <svg width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9.44231 2.76923V5.33333C9.44231 5.53735 9.36126 5.733 9.21701 5.87726C9.07275 6.02152 8.87709 6.10256 8.67308 6.10256C8.46906 6.10256 8.27341 6.02152 8.12915 5.87726C7.98489 5.733 7.90385 5.53735 7.90385 5.33333V2.76923C7.90385 2.56522 7.98489 2.36956 8.12915 2.2253C8.27341 2.08104 8.46906 2 8.67308 2C8.87709 2 9.07275 2.08104 9.21701 2.2253C9.36126 2.36956 9.44231 2.56522 9.44231 2.76923Z" fill="#2563EB" />
                                            <path d="M21.4013 5.89744C21.3534 5.23694 21.0687 4.61593 20.5995 4.14861C20.1303 3.68128 19.5081 3.39906 18.8474 3.35385C18.1808 3.30256 17.4218 3.25128 16.6218 3.21026V5.33333C16.6218 5.80936 16.4327 6.2659 16.0961 6.6025C15.7595 6.9391 15.303 7.12821 14.8269 7.12821C14.3509 7.12821 13.8944 6.9391 13.5578 6.6025C13.2212 6.2659 13.0321 5.80936 13.0321 5.33333V3.02564H10.4679V5.33333C10.4679 5.80936 10.2788 6.2659 9.94224 6.6025C9.60564 6.9391 9.14911 7.12821 8.67308 7.12821C8.19705 7.12821 7.74051 6.9391 7.40391 6.6025C7.06731 6.2659 6.87821 5.80936 6.87821 5.33333V3.21026C6.07821 3.21026 5.31923 3.30256 4.64231 3.35385C3.98236 3.40115 3.36139 3.68404 2.8926 4.15095C2.42381 4.61786 2.13842 5.23769 2.08846 5.89744C1.93462 7.79487 1.75 10.4821 1.75 12.5128C1.75 14.5436 1.93462 17.241 2.08846 19.1385C2.13869 19.7971 2.42445 20.4157 2.89344 20.8809C3.36242 21.3461 3.98325 21.6269 4.64231 21.6718C6.69359 21.8256 9.5859 22 11.75 22C13.9141 22 16.7962 21.8256 18.8474 21.6718C19.5072 21.629 20.1292 21.3489 20.5987 20.8833C21.0681 20.4176 21.3531 19.7979 21.4013 19.1385C21.5654 17.241 21.75 14.5538 21.75 12.5128C21.75 10.4718 21.5654 7.79487 21.4013 5.89744ZM7.64744 16.1538C7.37542 16.1538 7.11454 16.0458 6.9222 15.8534C6.72985 15.6611 6.6218 15.4002 6.6218 15.1282C6.6218 14.8562 6.72985 14.5953 6.9222 14.403C7.11454 14.2106 7.37542 14.1026 7.64744 14.1026C7.91945 14.1026 8.18033 14.2106 8.37267 14.403C8.56502 14.5953 8.67308 14.8562 8.67308 15.1282C8.67308 15.4002 8.56502 15.6611 8.37267 15.8534C8.18033 16.0458 7.91945 16.1538 7.64744 16.1538ZM7.64744 12.0513C7.37542 12.0513 7.11454 11.9432 6.9222 11.7509C6.72985 11.5585 6.6218 11.2977 6.6218 11.0256C6.6218 10.7536 6.72985 10.4927 6.9222 10.3004C7.11454 10.1081 7.37542 10 7.64744 10C7.91945 10 8.18033 10.1081 8.37267 10.3004C8.56502 10.4927 8.67308 10.7536 8.67308 11.0256C8.67308 11.2977 8.56502 11.5585 8.37267 11.7509C8.18033 11.9432 7.91945 12.0513 7.64744 12.0513ZM11.75 16.1538C11.478 16.1538 11.2171 16.0458 11.0248 15.8534C10.8324 15.6611 10.7244 15.4002 10.7244 15.1282C10.7244 14.8562 10.8324 14.5953 11.0248 14.403C11.2171 14.2106 11.478 14.1026 11.75 14.1026C12.022 14.1026 12.2829 14.2106 12.4752 14.403C12.6676 14.5953 12.7756 14.8562 12.7756 15.1282C12.7756 15.4002 12.6676 15.6611 12.4752 15.8534C12.2829 16.0458 12.022 16.1538 11.75 16.1538ZM11.75 12.0513C11.478 12.0513 11.2171 11.9432 11.0248 11.7509C10.8324 11.5585 10.7244 11.2977 10.7244 11.0256C10.7244 10.7536 10.8324 10.4927 11.0248 10.3004C11.2171 10.1081 11.478 10 11.75 10C12.022 10 12.2829 10.1081 12.4752 10.3004C12.6676 10.4927 12.7756 10.7536 12.7756 11.0256C12.7756 11.2977 12.6676 11.5585 12.4752 11.7509C12.2829 11.9432 12.022 12.0513 11.75 12.0513ZM15.8526 12.0513C15.5805 12.0513 15.3197 11.9432 15.1273 11.7509C14.935 11.5585 14.8269 11.2977 14.8269 11.0256C14.8269 10.7536 14.935 10.4927 15.1273 10.3004C15.3197 10.1081 15.5805 10 15.8526 10C16.1246 10 16.3855 10.1081 16.5778 10.3004C16.7701 10.4927 16.8782 10.7536 16.8782 11.0256C16.8782 11.2977 16.7701 11.5585 16.5778 11.7509C16.3855 11.9432 16.1246 12.0513 15.8526 12.0513Z" fill="#2563EB" />
                                            <path d="M15.5962 2.76923V5.33333C15.5962 5.53735 15.5151 5.733 15.3709 5.87726C15.2266 6.02152 15.0309 6.10256 14.8269 6.10256C14.6229 6.10256 14.4273 6.02152 14.283 5.87726C14.1387 5.733 14.0577 5.53735 14.0577 5.33333V2.76923C14.0577 2.56522 14.1387 2.36956 14.283 2.2253C14.4273 2.08104 14.6229 2 14.8269 2C15.0309 2 15.2266 2.08104 15.3709 2.2253C15.5151 2.36956 15.5962 2.56522 15.5962 2.76923Z" fill="#2563EB" />
                                        </svg>
                                        <h5 className="text-xl font-semibold text-gray-600 mb-2">
                                            Appointment With {item.doctor}
                                        </h5>
                                        <ul class="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
                                            <li class="flex items-center">
                                                <svg class="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                                </svg>
                                                <p>Amount : {item.price}</p>
                                            </li>
                                            <li class="flex items-center">
                                                <svg class="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                                </svg>
                                                <p>Date: {item.dateTime}</p>
                                            </li>

                                            <li class="flex items-center">
                                                <svg class="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                                </svg>
                                                <p>Status:<span class="bg-blue-100 ms-2 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">{item.status}</span></p>
                                            </li>

                                        </ul>
                                        <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mt-5" onClick={() => { handleModalOpen(item.doctorId) }}>Review Doctor</button>
                                    </div>

                                </div>
                            </>
                        )

                    })
                }
            </div>
            <div>
                {/* Backdrop Overlay */}
                <div className={`fixed inset-0 z-40 bg-black opacity-50 ${isModalOpen ? 'block' : 'hidden'}`} onClick={handleModalClose}></div>

                {/* booking Modal */}
                <div id="modal" className={`fixed inset-0 z-50 flex items-center justify-center ${isModalOpen ? 'block' : 'hidden'}`}>

                    <div className="relative p-4 w-full max-w-md max-h-full">

                        <div className="relative bg-white rounded-lg shadow">

                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Give Review
                                </h3>
                                <button type="button" onClick={handleModalClose} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-toggle="crud-modal">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>

                            <form method="post" className="p-4 md:p-5" onSubmit={handleSubmit}>

                                <div class="mb-5">
                                    <label for="star" class="block mb-2 text-sm font-medium text-gray-900">Service Standard</label>
                                    <select id="star" class="bg-gray-50 border border-gray-300 text-gray-90 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        name="rating" onChange={handleChange}>
                                        <option selected >Select </option>
                                        <option value="5">Excellent</option>
                                        <option value="4">Good</option>
                                        <option value="3">Satisfactory</option>
                                        <option value="2">Bad</option>
                                        <option value="1">Worst</option>
                                    </select>
                                </div>

                                <div class="mb-5">
                                    <label for="review" class="block mb-2 text-sm font-medium text-gray-900 ">Review</label>
                                    <textarea id="review" name="comment" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write your review here..." onChange={handleChange}></textarea>
                                </div>


                                <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ReviewWrite