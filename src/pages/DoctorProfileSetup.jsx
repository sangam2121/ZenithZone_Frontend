import React from 'react'
import Navbar from '../components/Navbar'
import MultiStepForm from '../components/MultiStepForm'

const DoctorProfileSetup = () => {
    return (
        <>
            <Navbar />
            <div className='w-[80%] mx-auto flex items-center justify-center'>
                <MultiStepForm />
            </div>
        </>
    )
}

export default DoctorProfileSetup