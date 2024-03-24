import React from 'react'
import { useState,useEffect} from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import { authenticate } from '../utils/auth';
import {toast} from "react-toastify"
import AppointmentTable from '../components/AppointmentTable';
import ClientList from '../components/ClientList';
import ReviewsCard from '../components/ReviewsCard';
import Navbar from '../components/Navbar';
import DoctorProfileCard from "../components/DoctorProfileCard"
import LibraryCard from '../components/LibraryCard';
import JournalWriteCard from "../components/JournalWriteCard"
import Logout from "../components/Logout"


const DoctorDashboard = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const isLoggedIn = location.state?.isLoggedIn;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const isAuthenticated = await authenticate();
                if (!isAuthenticated) {
                    navigate('/login', { state: { isNotAuauthenticated: true } });
                }
            } catch (error) {
                console.error('Error in useEffect:', error);
            }
        };

        fetchData();
        if (isLoggedIn) {
            toast.success('Login successful!', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
                onClose: () => {
                    isLoggedIn: false
                }
            });
        }

    }, [navigate]);

    const [activeItem, setActiveItem] = useState('profile');
    const handleMenuItemClick = (target) => {
        setActiveItem(target);
    };

    return (

        <>
            <Navbar></Navbar>
            <div class="md:flex w-[90%] mx-auto py-5 ">
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
                        <a
                            href="#"
                            class={`inline-flex items-center px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100 w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white${activeItem === 'journal' ? ' bg-blue-700 text-white' : ' bg-gray-50'}`}
                            onClick={() => handleMenuItemClick('journal')}
                        >
                            <svg
                                class={`w-4 h-4 me-2  ${activeItem === 'journal' ? 'text-white ' : ' text-gray-500'}`}
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                            </svg>
                            Journal
                        </a>
                    </li>

                    <li>
                        <a
                            href="#"
                            class={`inline-flex items-center px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100 w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white${activeItem === 'library' ? ' bg-blue-700 text-white' : ' bg-gray-50'}`}
                            onClick={() => handleMenuItemClick('library')}
                        >
                            <svg
                                class={`w-4 h-4 me-2  ${activeItem === 'library' ? 'text-white ' : ' text-gray-500'}`}
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                            </svg>
                            Library
                        </a>
                    </li>

                    <li>
                        <a
                            href="#"
                            class={`inline-flex items-center px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100 w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white${activeItem === 'logout' ? ' bg-blue-700 text-white' : ' bg-gray-50'}`}
                            onClick={() => handleMenuItemClick('logout')}
                        >
                            <svg
                                class={`w-4 h-4 me-2  ${activeItem === 'logout' ? 'text-white ' : ' text-gray-500'}`}
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                            </svg>
                            Logout
                        </a>
                    </li>
                </ul>

                <div class="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full h-[100vh]">
                    {activeItem === 'profile' && (
                        <div>
                            <DoctorProfileCard />
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

                    {activeItem === 'journal' && (
                        <div>
                            <JournalWriteCard />
                        </div>
                    )}

                    {activeItem === 'library' && (
                        <div>
                            <LibraryCard />
                        </div>
                    )}

                    {activeItem === 'logout' && (
                        <div>
                            <Logout />
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