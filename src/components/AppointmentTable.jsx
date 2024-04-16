import React from 'react'
import { useState, useEffect } from 'react'
import {toast} from 'react-toastify'

const AppointmentTable = () => {
    const [appointmentList, setAppointmentList] = useState([]);

    const fetchAppointment = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_AUTH_BASE_URL}/appointment/lists?doctor_id=${localStorage.getItem("userId")}`, {
                method: "get",
            });
            const data = await response.json();

            if (response.ok) {
                // console.log(data.results);
                setAppointmentList(data.results);
            }
        } catch (error) {
            console.log("Error", error);
        }
    };

    const handleComplete=async(appointmentid)=>{
        const response = await fetch(`${import.meta.env.VITE_AUTH_BASE_URL}/appointment/complete/${appointmentid}/`, {
            method: "POST",
            body: JSON.stringify({ appointment_id: appointmentid }),
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("access")}`,
                'Content-Type': 'application/json'
            }
        });
        
        const data = await response.json();

            if (response.ok) {
                toast.success('Appointment Status Updated Successfully!', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });

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


    }


    useEffect(() => {
        fetchAppointment();
    }, [])
    
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
                            <th scope="col" class="px-6 py-3">
                                Fee
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
                        {
                            appointmentList.map((appointment, index) => {
                                console.log(appointment)
                                return (
                                    <tr class="bg-white border-b hover:bg-gray-50">
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {index + 1}
                                        </th>
                                        <td class="px-6 py-4">
                                            {`${appointment.patient.user.first_name} ${appointment.patient.user.last_name}`}
                                        </td>
                                        <td class="px-6 py-4">
                                            {new Date(appointment.date).toDateString()}
                                        </td>
                                        <td class="px-6 py-4">
                                            {appointment.time_at}
                                        </td>
                                        <td class="px-6 py-4">
                                            {`$ ${appointment.payment.amount}`}
                                        </td>
                                        <td class="px-6 py-4 text-center">
                                            {appointment.status}
                                        </td>

                                        <td class="px-6 py-4 text-center">
                                            <button type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 " onClick={()=>handleComplete(appointment.id)}>Completed</button>

                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default AppointmentTable