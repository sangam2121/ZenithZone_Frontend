import React, { useState } from 'react';
import Navbar from './Navbar';

const MyTabs = () => {
    const [activeTab, setActiveTab] = useState('first');

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

    return (
        <>
           <Navbar/>
            {/* <div href="#" class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row  hover:bg-gray-100 ">
                <img class="object-cover w-full rounded-t-lg  md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src="/images/doctor.jpeg" alt="" />
                <div class="flex flex-col justify-between p-4 leading-normal">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                </div>
            </div> */}
            
            

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
                                    <cite class="pe-3 font-medium text-gray-900 dark:text-white">Michael Gough</cite>
                                    <cite class="ps-3 text-sm text-gray-500 dark:text-gray-400">CEO at Google</cite>
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
                                    <cite class="pe-3 font-medium text-gray-900 dark:text-white">Michael Gough</cite>
                                    <cite class="ps-3 text-sm text-gray-500 dark:text-gray-400">CEO at Google</cite>
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
        </>
    );
};

export default MyTabs;
