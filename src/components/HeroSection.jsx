import React from 'react'
import { useNavigate } from 'react-router-dom'
const HeroSection = () => {
    const navigate=useNavigate();
    return (
        <div class='w-[1200px] mx-auto flex justify-between h-[90vh] px-12'>
            <div class='w-[1/2] flex flex-col justify-center text-left '>
                <p class='font-[400] text-4xl mb-5'>Welcome to <span class='text-[#F05423] font-[400]'>Zenith</span>Zone</p>
                <p class='text-[#6A6969] text-3xl font-[400]'>Your path to mental well-being</p>
                <p class='text-[#6A6969] text-3xl font-[400] mb-5'>starts here</p>
                <div class='flex gap-5'>
                    <button className="rounded-[30px] bg-[#FEEEE9] text-[#F05423] md:px-5 md:py-2 px-3 py-1" onClick={()=>navigate('/journal')}>Read more</button>
                    <button className="rounded-[30px] bg-[#121F49] text-[white] md:px-5 md:py-2 px-3 py-1" onClick={()=>navigate('/book-psychiatrist')}>Book a Psychiatrist</button>
                </div>
            </div>
            <div class='w-[1/2]'>
                <img src='/images/hero-img.png' alt='hero image'></img>
            </div>

        </div>
    )
}

export default HeroSection