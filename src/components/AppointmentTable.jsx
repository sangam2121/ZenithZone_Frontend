import React from 'react'

const AppointmentTable = () => {
    return (
        <>
        <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">Appointment List</h3>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr class="bg-blue-700 text-white">
                        <th scope="col" class="px-6 py-3">
                            ID
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Date
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Time
                        </th>
                        <th scope="col" class="px-6 py-3 text-center">
                            Status
                        </th>
                        <th scope="col" class="px-6 py-3  text-center">
                            Action
                        </th>

                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-white border-b hover:bg-gray-50">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            1
                        </th>
                        <td class="px-6 py-4">
                            John Doe
                        </td>
                        <td class="px-6 py-4">
                            10 Jan 2024
                        </td>
                        <td class="px-6 py-4">
                            1 PM
                        </td>
                        <td class="px-6 py-4 text-center">
                            Pending
                        </td>

                        <td class="px-6 py-4 text-center">
                            <button type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">Approve</button>

                            <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">Reject</button>


                        </td>
                    </tr>
                    <tr class="bg-white border-b hover:bg-gray-50">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            1
                        </th>
                        <td class="px-6 py-4">
                            John Doe
                        </td>
                        <td class="px-6 py-4">
                            10 Jan 2024
                        </td>
                        <td class="px-6 py-4">
                            1 PM
                        </td>
                        <td class="px-6 py-4 text-center">
                            Pending
                        </td>

                        <td class="px-6 py-4 text-center">
                            <button type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">Approve</button>

                            <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">Reject</button>


                        </td>
                    </tr>

                    <tr class="bg-white border-b hover:bg-gray-50">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            1
                        </th>
                        <td class="px-6 py-4">
                            John Doe
                        </td>
                        <td class="px-6 py-4">
                            10 Jan 2024
                        </td>
                        <td class="px-6 py-4">
                            1 PM
                        </td>
                        <td class="px-6 py-4 text-center">
                            Pending
                        </td>

                        <td class="px-6 py-4 text-center">
                            <button type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">Approve</button>

                            <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">Reject</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        </>
    )
}

export default AppointmentTable