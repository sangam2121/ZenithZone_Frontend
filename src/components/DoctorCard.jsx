import React from 'react'
import { FaStar, FaPlus, FaRegCircleRight} from "react-icons/fa6";


const DoctorCard = () => {
    return (
        <div class='flex flex-col p-3 w-[300px] bg-white shadow-2xl border-1 border-slate-600 pb-6'>
            <img src='images/doctor.jpeg' alt='doctor image' class='mb-2.5 rounded-lg'></img>
            <div class='text-black font-bold mb-2.5'>Dr.Toshima Karki</div>
            <div class='flex items-center justify-between mb-2.5'>
                <div class='bg-[#FEEEE9] text-center text-[#F05423] rounded-lg px-4 py-2 '>Cardiologist</div>
                <div class='flex items-center gap-1'>
                    <FaStar class='text-[orange]'></FaStar >
                    <FaStar class='text-[orange]'></FaStar >
                    <FaStar class='text-[orange]'></FaStar >
                    <FaStar class='text-[orange]'></FaStar >
                    <FaStar class='text-[orange]'></FaStar >
                </div>
            </div>
            <div class='flex items-center gap-4 justify-between'>
                <div>
                    <div class='flex items-center gap-1'>  <FaPlus class='font-semibold'></FaPlus><span class='font-semibold'>1500 Patients</span></div>
                    <p class='text-sm'>Norvic Hospital, Thapathali</p>
                </div>
                <FaRegCircleRight class='text-2xl font-[200] cursor-pointer'></FaRegCircleRight>
            </div>
        </div>
    )
}

export default DoctorCard