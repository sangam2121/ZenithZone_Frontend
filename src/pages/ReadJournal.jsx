import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useParams, useNavigate } from 'react-router-dom';
import { authenticate } from '../utils/auth';
import {toast} from 'react-toastify'

const ReadJournal = () => {
    const navigate = useNavigate();
    const author = localStorage.getItem("userId");
    const { journalId } = useParams();
    const [commentList, setCommentList] = useState();
    const [journal, setJournal] = useState(null);
    const [comment, setComment] = useState({
        'post': journalId,
        'author': author,
        'content': null,
    })

    useEffect(() => {
        fetchJournal();
        fetchData();

    }, [])

    const fetchData = async () => {
        try {
            const isAuthenticated = await authenticate();
            if (!isAuthenticated) {
                navigate('/login', { state: { isNotAuauthenticated: true } });
            }
        } catch (error) {
            console.error('Error in useEffect:', error);
        }
    };


    const fetchJournal = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_AUTH_BASE_URL}/posts/update/${journalId}/`, {
                method: "get"
            })
            const data = await response.json();
            console.log(data)
            setCommentList(data.comments)
            setJournal(data)

        } catch (error) {
            console.log("Error while fetching journal", error);
        }
    }


    const handleChange = (e) => {
        setComment({
            ...comment,
            'content': e.target.value
        })
    }
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const response = await fetch(`${import.meta.env.VITE_AUTH_BASE_URL}/posts/comments/`, {
                method: 'post',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("access")}`
                },
                body: JSON.stringify(comment)
            });

            const data = await response.json();
            if (response.ok) {
                toast.success('Comment posted successful.', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
                setTimeout(()=>{
                    window.location.reload();
                },1000)

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

        } catch (error) {
            console.log("Error", error)
        }

    }
    return (
        <>
            <Navbar></Navbar>
            {journal ? (<div class="flex justify-between max-w-[1200px] mx-auto gap-4 h-full">
                <div class="w-[70%]">
                    <article class="mb-5">
                        <div class="flex items-center mb-4">
                            <img class="w-10 h-10 me-4 rounded-full" src={journal.author.image} alt="" />
                            <div class="font-medium">
                                <p>{`${journal.author.first_name} ${journal.author.last_name}`}<time datetime="2014-08-16 19:00" class="block text-sm text-gray-700 ">{`posted on ${new Date(journal.created_at).toDateString()}`} </time></p>
                            </div>
                        </div>
                        <p class="mb-2 text-gray-700  text-justify">{journal.content}</p>
                        <a href="#" class="block mb-5 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Read more</a>
                        <aside>
                            <p class="mt-1 text-xs text-gray-500 ">19 people found this helpful</p>
                            <div class="flex items-center mt-3">
                                <a href="#" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-xs px-2 py-1.5 ">Helpful</a>
                                <a href="#" class="ps-4 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500 border-gray-200 ms-4 border-s md:mb-0">Report abuse</a>
                            </div>
                        </aside>
                    </article>
                    <div class='my-3 font-bold text-2xl'> Comments</div>
                    <hr class='mb-5'></hr>

                    {
                        commentList.map((comment) => {
                            return (
                                <div class="flex items-start gap-2.5 mb-3">
                                    <img class="w-8 h-8 rounded-full" src={`${comment.author.image}`} alt="image" />
                                    <div class="flex flex-col gap-1 w-full max-w-[500px]">
                                        <div class="flex items-center space-x-2 rtl:space-x-reverse">
                                            <span class="text-sm font-semibold text-gray-900 dark:text-white">{`${comment.author.first_name} ${comment.author.last_name}`}</span>
                                            <span class="text-sm font-normal text-gray-500 dark:text-gray-400">{`${new Date(comment.updated_at).toLocaleDateString()} (${new Date(comment.updated_at).toLocaleTimeString()}) `}</span>
                                        </div>
                                        <div class="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl">
                                            <p class="text-sm font-normal text-gray-900 ">{comment.content}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }

                    <form method='post' onSubmit={handleSubmit}>
                        <div class="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 ">
                            <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                                <label for="comment" class="sr-only">Your comment</label>
                                <textarea id="comment" rows="4" class="w-full px-0 text-sm text-gray-900 bg-white border-0 focus:ring-0 dark:text-white " placeholder="Write a comment..." required name="comment" onChange={handleChange}></textarea>
                            </div>
                            <div class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                                <button type="submit" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#121F49] rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
                                    Post comment
                                </button>


                            </div>
                        </div>
                    </form>
                    <p class="ms-auto text-xs text-gray-500 dark:text-gray-400">Remember, contributions to this topic should follow our <a href="#" class="text-blue-600  hover:underline">Community Guidelines</a>.</p>

                </div>

                <div class='w-[30%] px-3 border-l-2 '>
                    <h2 class='text-center font-bold mb-2 text-2xl'>Related Journals</h2>


                    <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow ">
                        <a href="#">
                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">Healthcare technology in 2024</h5>
                        </a>
                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam quaerat tenetur laborum repellendus iusto doloremque aut mollitia quasi placeat ipsam!</p>
                        <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#121F49] rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                            Read more
                            <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </a>
                    </div>

                    <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow ">
                        <a href="#">
                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Healthcare technology in 2024</h5>
                        </a>
                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam quaerat tenetur laborum repellendus iusto doloremque aut mollitia quasi placeat ipsam!</p>
                        <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#121F49] rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                            Read more
                            <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>)
                : (
                    <div class="flex items-center justify-center">
                        <div role="status">
                            <svg aria-hidden="true" class="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                )
            }

        </>
    )
}

export default ReadJournal