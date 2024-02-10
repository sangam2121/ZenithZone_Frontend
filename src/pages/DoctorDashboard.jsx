import React from 'react'
import { useState } from 'react';

import AppointmentTable from '../components/AppointmentTable';
import ClientList from '../components/ClientList';
import ReviewsCard from '../components/ReviewsCard';
import Navbar from '../components/Navbar';

const DoctorDashboard = () => {
    const [activeItem, setActiveItem] = useState('profile');
    const handleMenuItemClick = (target) => {
        setActiveItem(target);
    };


    return (
        
        <>
            <Navbar></Navbar>
            <div class="md:flex w-[90%] mx-auto py-5">
                <ul class="flex-column space-y space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0 ">
                    <li>
                        <a
                            href="#"
                            class={`inline-flex items-center px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100 w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white${activeItem === 'profile' ? ' bg-blue-700 text-white' : ' bg-gray-50'}`}
                            onClick={() => handleMenuItemClick('profile')}
                        >
                            <svg
                                class={`w-4 h-4 me-2 ${activeItem === 'profile' ? 'text-white ' : ' text-gray-500'}`}
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                            </svg>
                            Profile
                        </a>
                    </li>



                    <li>
                        <a
                            href="#"
                            class={`inline-flex items-center px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100 w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white${activeItem === 'appointment' ? ' bg-blue-700 text-white' : ' bg-gray-50'}`}
                            onClick={() => handleMenuItemClick('appointment')}
                        >
                            <svg
                                class={`w-4 h-4 me-2  ${activeItem === 'appointment' ? 'text-white ' : ' text-gray-500'}`}
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                            </svg>
                            Appoinment
                        </a>
                    </li>

                    <li>
                        <a
                            href="#"
                            class={`inline-flex items-center px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100 w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white${activeItem === 'clients' ? ' bg-blue-700 text-white' : ' bg-gray-50'}`}
                            onClick={() => handleMenuItemClick('clients')}
                        >
                            <svg
                                class={`w-4 h-4 me-2  ${activeItem === 'clients' ? 'text-white ' : ' text-gray-500'}`}
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                            </svg>
                            Clients
                        </a>
                    </li>

                    <li>
                        <a
                            href="#"
                            class={`inline-flex items-center px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100 w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white${activeItem === 'reviews' ? ' bg-blue-700 text-white' : ' bg-gray-50'}`}
                            onClick={() => handleMenuItemClick('reviews')}
                        >
                            <svg
                                class={`w-4 h-4 me-2  ${activeItem === 'reviews' ? 'text-white ' : ' text-gray-500'}`}
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                            </svg>
                            Reviews
                        </a>
                    </li>


                    <li>
                        <a href="#" class="inline-flex items-center px-4 py-3 rounded-lg hover:text-gray-900 bg-gray-50 hover:bg-gray-100 w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white">
                            <svg class="w-4 h-4 me-2 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M7.824 5.937a1 1 0 0 0 .726-.312 2.042 2.042 0 0 1 2.835-.065 1 1 0 0 0 1.388-1.441 3.994 3.994 0 0 0-5.674.13 1 1 0 0 0 .725 1.688Z" />
                                <path d="M17 7A7 7 0 1 0 3 7a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h1a1 1 0 0 0 1-1V7a5 5 0 1 1 10 0v7.083A2.92 2.92 0 0 1 12.083 17H12a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h1a1.993 1.993 0 0 0 1.722-1h.361a4.92 4.92 0 0 0 4.824-4H17a3 3 0 0 0 3-3v-2a3 3 0 0 0-3-3Z" />
                            </svg>
                            Contact
                        </a>
                    </li>
                </ul>

                <div class="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
                    {activeItem === 'profile' && (
                        <div>
                            <h2>Profile Content</h2>
                        </div>
                    )}

                    {activeItem === 'appointment' && (
                        <div>
                            <AppointmentTable></AppointmentTable>
                        </div>
                    )}

                    {activeItem === 'clients' && (
                        <div>
                            <ClientList />
                        </div>
                    )}

                    {activeItem === 'reviews' && (
                        <div>
                            <ReviewsCard />
                        </div>
                    )}



                </div>
            </div>
        </>
    )
}

export default DoctorDashboard