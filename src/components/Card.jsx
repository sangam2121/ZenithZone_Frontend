import React from 'react'
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Card = (props) => {
    console.log(props)
    return (
        <div class='w-[350px] max-h-[345px] p-2 bg-[rgb(254,238,233)]'>
            <div class='w-[100%] h-[160px] mb-4'>
                <img src={props.image} alt="thumbnail" class="h-[100%] w-[100%] rounded-md"></img>
            </div>
            <div class='flex flex-row justify-between mb-2.5'>
                <div class='text-black text-[16px] font-[400]'>{props.type}</div>
                <div class='text-[#F05423] text-[16px] font-[400]'>{(!props.is_anonymous)?props.author:"Anonymous"}</div>
            </div>
            <p class='font-[400] text-[12px] text-[#6A6969] mb-2.5'>{props.title}</p>
            <div class='flex justify-start items-center gap-1'>
                <button class='font-[400] text-[#121F49] text-xl cursor-pointer'><Link to='/read-journal'>Read Now</Link></button>
                <FaArrowRightLong  class='font-[400] text-[#121F49] text-xl'/>
            </div>

        </div>
    )
}

export default Card