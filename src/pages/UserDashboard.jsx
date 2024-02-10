// Dashboard.js

import React, { useState } from 'react';

const Dashboard = () => {
  const [activeItem, setActiveItem] = useState('profile');

  const handleMenuItemClick = (target) => {
    setActiveItem(target);
  };

  return (
    <div className="md:flex w-[90%] mx-auto py-5">
      <ul className="flex-column space-y space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
        <li>
          <a
            href="#"
            className={`inline-flex items-center px-4 py-3 text-white rounded-lg w-full dark:bg-blue-600 ${
              activeItem === 'profile' ? 'bg-blue-700' : ''
            }`}
            onClick={() => handleMenuItemClick('profile')}
          >
            <svg
              className="w-4 h-4 me-2 text-white"
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
            className={`inline-flex items-center px-4 py-3 rounded-lg hover:text-gray-900 w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white ${
              activeItem === 'dashboard' ? 'bg-gray-50 hover:bg-gray-100' : ''
            } ${activeItem === 'dashboard' ? 'bg-blue-700' : ''}`}
            onClick={() => handleMenuItemClick('dashboard')}
          >
            <svg
              className="w-4 h-4 me-2 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 18"
            >
              <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
            </svg>
            Dashboard
          </a>
        </li>
        <li>
          <a
            href="#"
            className={`inline-flex items-center px-4 py-3 rounded-lg hover:text-gray-900 w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white ${
              activeItem === 'appointment' ? 'bg-gray-50 hover:bg-gray-100' : ''
            } ${activeItem === 'appointment' ? 'bg-blue-700' : ''}`}
            onClick={() => handleMenuItemClick('appointment')}
          >
            <svg
              className="w-4 h-4 me-2 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path fill="currentColor" d="M6 1a1 1 0 0 0-2 0h2ZM4 4a1 1 0 0 0 2 0H4Zm7-3a1 1 0 1 0-2 0h2ZM9 4a1 1 0 1 0 2 0H9Zm7-3a1 1 0 1 0-2 0h2Zm-2 3a1 1 0 1 0 2 0h-2ZM1 6a1 1 0 0 0 0 2V6Zm18 2a1 1 0 1 0 0-2v2ZM5 11v-1H4v1h1Zm0 .01H4v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM10 11v-1H9v1h1Zm0 .01H9v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM15 15v-1h-1v1h1Zm0 .01h-1v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM15 11v-1h-1v1h1Zm0 .01h-1v1h1v-1Zm.01 0v1h1v-1h-1ZM10 15v-1H9v1h1Zm0 .01H9v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM15 15v-1h-1v1h1Zm0 .01h-1v1h1v-1Zm.01 0v1h1v-1h-1ZM14 11v.01h1V11h-1Zm1 1.01h.01v-2H15v2Zm-1-1.01H15v2h-.99v-2ZM9 11v.01h1V11H9Zm1 1.01h.01v-2H10v2Zm1.01-1V11h-2v.01h2Zm-1-1.01H10v2h1.01v-2ZM9 15v.01h1V15H9Zm1 1.01h.01v-2H10v2Zm1.01-1V15h-2v.01h2Zm-1-1.01H10v2h1.01v-2ZM14 15v.01h1V15h-1Zm1 1.01h.01v-2H15v2Zm1.01-1V15h-2v.01h2Zm-1-1.01H15v2h1.01v-2ZM14 11v.01h1V11h-1Zm1 1.01h.01v-2H15v2Zm1.01-1V11h-2v.01h2Zm-1-1.01H15v2h1.01v-2ZM4 15v.01h2V15H4Zm1 1.01h.01v-2H5v2Zm1.01-1V15H8v-.99H6.01Z" />
            </svg>
            Appointment
          </a>
        </li>
        <li>
          <a
            href="#"
            className="inline-flex items-center px-4 py-3 rounded-lg hover:text-gray-900 w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <svg
              className="w-4 h-4 me-2 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M7.824 5.937a1 1 0 0 0 .726-.312 2.042 2.042 0 0 1 2.835-.065 1 1 0 0 0 1.388-1.441 3.994 3.994 0 0 0-5.674.13 1 1 0 0 0 .725 1.688Z" />
              <path d="M17 7A7 7 0 1 0 3 7a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h1a1 1 0 0 0 1-1V7a5 5 0 1 1 10 0v7.083A2.92 2.92 0 0 1 12.083 17H12a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h1a1.993 1.993 0 0 0 1.722-1h.361a4.92 4.92 0 0 0 4.824-4H17a3 3 0 0 0 3-3v-2a3 3 0 0 0-3-3Z" />
            </svg>
            Contact
          </a>
        </li>
      </ul>

      <div className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
        {activeItem === 'profile' && (
          <div>
            {/* Profile Content */}
            <h2>Profile Content</h2>
          </div>
        )}
        {activeItem === 'dashboard' && (
          <div>
            {/* Dashboard Content */}
            <h2>Dashboard Content</h2>
          </div>
        )}
        {activeItem === 'appointment' && (
          <div>
            {/* Appointment Content */}
            <h2>Appointment Content</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
