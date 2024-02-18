import React, { useState } from 'react';
import Navbar from './Navbar';



function StarIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5 text-yellow-700"
        >
            <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const MyTabs = () => {
    const [activeTab, setActiveTab] = useState('first');

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

    return (
        <>
            <Navbar />

            <div className="bg-white rounded-lg p-4 w-[95%] mx-auto">
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
                                <StarIcon />
                                <StarIcon />
                                <StarIcon />
                                <StarIcon />
                                <StarIcon />
                            </div>
                        </div>
                        <p className="text-blue-gray">Frontend Lead @ Google</p>
                    </div>
                </div>
                <div className="mb-6 p-0">
                    <p>

                    </p>
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
