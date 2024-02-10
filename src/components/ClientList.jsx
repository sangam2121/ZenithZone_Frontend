import React from 'react'

const ClientList = () => {
    return (
        <>
            <div class='grid grid-cols-3  gap-3 mb-3'>
                <div class="flex flex-col items-center justify-center  max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <dt class="mb-2 text-3xl font-extrabold">40+</dt>
                    <dd class="text-gray-500 dark:text-gray-400">Active Clients</dd>
                </div>

                <div class="flex flex-col items-center justify-center  max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <dt class="mb-2 text-3xl font-extrabold">100+</dt>
                    <dd class="text-gray-500 dark:text-gray-400">Successfully Cured</dd>
                </div>

                <div class="flex flex-col items-center justify-center  max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <dt class="mb-2 text-3xl font-extrabold">20+</dt>
                    <dd class="text-gray-500 dark:text-gray-400">Feedback</dd>
                </div>

            </div>
            <div class="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div class="flex items-center justify-between mb-4">
                    <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">Latest Customers</h5>
                    <a href="#" class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                        View all
                    </a>
                </div>
                <div class="flow-root">
                    <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">

                        <li class="py-3 sm:py-4">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <img class="w-8 h-8 rounded-full" src="/images/avatar.jpg" alt="Neil image" />
                                </div>
                                <div class="flex-1 min-w-0 ms-4">
                                    <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                        John Doe
                                    </p>
                                    <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                        email@john.com
                                    </p>
                                </div>
                                <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                    $320
                                </div>
                            </div>
                        </li>

                        <li class="py-3 sm:py-4">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <img class="w-8 h-8 rounded-full" src="/images/avatar.jpg" alt="Neil image" />
                                </div>
                                <div class="flex-1 min-w-0 ms-4">
                                    <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                        John Doe
                                    </p>
                                    <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                        email@john.com
                                    </p>
                                </div>
                                <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                    $320
                                </div>
                            </div>
                        </li>

                        <li class="py-3 sm:py-4">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <img class="w-8 h-8 rounded-full" src="/images/avatar.jpg" alt="Neil image" />
                                </div>
                                <div class="flex-1 min-w-0 ms-4">
                                    <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                        John Doe
                                    </p>
                                    <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                        email@john.com
                                    </p>
                                </div>
                                <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                    $320
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

        </>
    )
}

export default ClientList