import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react'
import Navbar from './Navbar';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const registrationSuccess = location.state?.registrationSuccess;
    const isNotAuauthenticated = location.state?.isNotAuauthenticated;

    useEffect(() => {
        if (registrationSuccess) {
            toast.success('Welcome! Registration successful.', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            });
        }

        if (isNotAuauthenticated) {
            toast.error('You are unauthenticated. Login here to continue.', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            });
        }
    }, []);


    const [form, setform] = useState({});

    const handleChange = (e) => {
        setform({
            ...form,
            [e.target.name]: e.target.value,
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${import.meta.env.VITE_AUTH_BASE_URL}/auth/login/`, {
                method: 'POST',
                body: JSON.stringify(form),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (response.ok) {
                const refresh = Object(data).refresh;
                const access = Object(data).access;
                localStorage.setItem("refresh", refresh);
                localStorage.setItem("access", access);
                const decodedData = jwtDecode(access);
                console.log("decoded data",decodedData);
                localStorage.setItem("userId",decodedData.user_id);
                localStorage.setItem("userName",decodedData.user_name);
                localStorage.setItem("userType",decodedData.user_type);

                if(decodedData.user_type ==="patient"){
                    navigate('/user-dashboard', { state: { isLoggedIn: true } })
                }else{
                    navigate('/doctor-dashboard', { state: { isLoggedIn: true } })
                }            
                
            } else {
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
        } catch (error) {
            console.log(error);
            if (error instanceof SyntaxError) {
                console.log('Invalid JSON in response');
            }
        }
    };

    return (
        <>
            <Navbar />
            <div class='flex items-center justify-center w-[100%]'>
                <div class='bg-[rgb(254,238,233)] w-[60%] h-[80%] rounded-2xl flex justify-between shadow-lg'>

                    <div class='w-1/2  rounded overflow-hidden p-3 flex items-center justify-center'>
                        <img src='/images/login-img.png' alt='login' class='w-[750%] h-[80%] rounded-lg'></img>
                    </div>
                    <div class='w-1/2 p-5 flex flex-col items-center'>
                        <p class='text-left text-2xl font-bold mb-5'>Login</p>
                        <p class='mb-8 text-sm'>If you are already a user easy login here</p>
                        <form class='flex flex-col items-center gap-6 w-[100%] mb-8' onSubmit={handleSubmit}>
                            <input type='email' name='email' placeholder='Email' onChange={handleChange} class='h-10 w-[80%] rounded-lg px-3'></input>
                            <input type='password' name='password' placeholder='Password' onChange={handleChange} class='h-10 w-[80%] rounded-lg px-3'></input>
                            <button type='submit' class='h-10 w-[80%] rounded-lg px-3 bg-[#121F49] text-white font-semibold'>Login</button>
                        </form>
                        <div class='grid grid-cols-3 items-center w-[80%] text-gray-800'>
                            <hr class='border-stone-500' />
                            <p class='text-center'>or</p>
                            <hr class='border-stone-500' />
                        </div>
                        <div class='w-[80%] relative mt-5'>
                            <svg class='absolute top-[5px] left-2' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
                                <path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                            </svg>
                            <button class=' w-[100%] h-10 bg-white rounded-lg font-semibold'>Login With Google</button>
                        </div>

                        <p class='mt-5'>Not have an account? <Link to="/register">register</Link></p>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Login