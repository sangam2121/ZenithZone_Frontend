import React from 'react'
import { FaStar, FaPlus, FaRegCircleRight} from "react-icons/fa6";
import { Link } from 'react-router-dom';


const DoctorCard = (props) => {
    const stars = [];

  for (let i = 0; i < props.star; i++) {
    stars.push(<FaStar key={i} className='text-[orange]' />);
  }

    return (
        <div class='flex flex-col p-3 w-[300px] bg-white shadow-2xl border-1 border-slate-600 pb-6'>
            <img src={props.img} alt='doctor image' class='w-[100%] h-[250px] mb-2.5 rounded-lg'></img>
            <div class='text-black font-bold mb-2.5'>Dr. {props.firstName} {props.lastName}</div>
            <div class='flex items-center justify-between mb-2.5'>
                <div class='bg-[#FEEEE9] text-center text-[#F05423] rounded-lg px-4 py-2 '>{props.specialization}</div>
                <div class='flex items-center gap-1'>
                    {stars}
                </div>
            </div>
            <div class='flex items-center gap-4 justify-between'>
                <div>
                    <div class='flex items-center gap-1'>  <FaPlus class='font-semibold'></FaPlus><span class='font-semibold'>{props.patientCount} Patients</span></div>
                    <p class='text-sm'>{props.clinic}</p>
                </div>
                <Link to={`/doctor-detail/${props.doctorUserId}`}><FaRegCircleRight class='text-2xl font-[200] cursor-pointer'></FaRegCircleRight></Link>
            </div>
        </div>
    )
}

export default DoctorCard