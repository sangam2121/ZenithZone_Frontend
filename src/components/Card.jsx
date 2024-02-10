import React from 'react'
import { FaArrowRightLong } from "react-icons/fa6";

const Card = () => {
    return (
        <div class='w-[275px] h-[345px] p-5 bg-[rgb(254,238,233)]'>
            <div class='w-[235px] h-[160px] bg-white mb-2.5'></div>
            <div class='flex flex-row justify-between mb-2.5'>
                <div class='text-black text-[16px] font-[400]'>Book Title</div>
                <div class='text-[#F05423] text-[16px] font-[400]'>Author</div>
            </div>
            <p class='font-[400] text-[12px] text-[#6A6969] mb-2.5'>Inspirational designs, illustrations, and graphic elements from the world’s best designers.Want more inspiration</p>
            <div class='flex justify-start items-center gap-1'>
                <button class='font-[400] text-[#121F49] text-xl'>Read Book </button>
                <FaArrowRightLong  class='font-[400] text-[#121F49] text-xl'/>
            </div>

        </div>
    )
}

export default Card