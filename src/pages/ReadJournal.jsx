import React from 'react'
import Navbar from '../components/Navbar'

const ReadJournal = () => {
    return (
        <>
            <Navbar></Navbar>
            <div class="flex justify-between max-w-[1200px] mx-auto gap-4 h-full">
                <div class="w-[70%]">
                    <article class="mb-5">
                        <div class="flex items-center mb-4">
                            <img class="w-10 h-10 me-4 rounded-full" src="/images/avatar.jpg" alt="" />
                            <div class="font-medium dark:text-white">
                                <p>Jese Leos <time datetime="2014-08-16 19:00" class="block text-sm text-gray-700 dark:text-gray-400">posted on January 2024</time></p>
                            </div>
                        </div>
                        <p class="mb-2 text-gray-700 dark:text-gray-400 text-justify">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto, quia saepe ipsam sapiente, commodi illum molestiae odio, tempora nesciunt soluta illo. Iusto temporibus iste voluptates exercitationem, laboriosam sed similique error, quidem quod necessitatibus alias architecto quasi sint pariatur hic laudantium atque autem at ipsa distinctio deserunt, quos praesentium dolorem magni? Atque debitis eius doloremque sint sed itaque voluptatum autem voluptate expedita officia totam assumenda accusantium possimus excepturi repudiandae porro quaerat illo, magni repellendus culpa recusandae at corporis alias! Nulla error ipsum harum corrupti fugiat aliquam magnam. Deleniti provident</p>
                        <a href="#" class="block mb-5 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Read more</a>
                        <aside>
                            <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">19 people found this helpful</p>
                            <div class="flex items-center mt-3">
                                <a href="#" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-xs px-2 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Helpful</a>
                                <a href="#" class="ps-4 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500 border-gray-200 ms-4 border-s md:mb-0 dark:border-gray-600">Report abuse</a>
                            </div>
                        </aside>
                    </article>
                    <div class='my-3 font-bold text-2xl'> Comments</div>
                    <hr class='mb-5'></hr>


                    <div class="flex items-start gap-2.5 mb-3">
                        <img class="w-8 h-8 rounded-full" src="/images/avatar.jpg" alt="Jese image" />
                        <div class="flex flex-col gap-1 w-full max-w-[500px]">
                            <div class="flex items-center space-x-2 rtl:space-x-reverse">
                                <span class="text-sm font-semibold text-gray-900 dark:text-white">Sangam Bharati</span>
                                <span class="text-sm font-normal text-gray-500 dark:text-gray-400">11:46</span>
                            </div>
                            <div class="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                                <p class="text-sm font-normal text-gray-900 dark:text-white"> That's awesome. I think our users will really appreciate the improvements.</p>
                            </div>
                        </div>


                    </div>

                    <div class="flex items-start gap-2.5 mb-3">
                        <img class="w-8 h-8 rounded-full" src="/images/avatar.jpg" alt="Jese image" />
                        <div class="flex flex-col gap-1 w-full max-w-[500px]">
                            <div class="flex items-center space-x-2 rtl:space-x-reverse">
                                <span class="text-sm font-semibold text-gray-900 dark:text-white">Sangam Bharati</span>
                                <span class="text-sm font-normal text-gray-500 dark:text-gray-400">11:46</span>
                            </div>
                            <div class="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                                <p class="text-sm font-normal text-gray-900 dark:text-white"> That's awesome. I think our users will really appreciate the improvements.</p>
                            </div>
                        </div>
                    </div>


                    <form>
                        <div class="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                            <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                                <label for="comment" class="sr-only">Your comment</label>
                                <textarea id="comment" rows="4" class="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write a comment..." required></textarea>
                            </div>
                            <div class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                                <button type="submit" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#121F49] rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Post comment
                                </button>


                            </div>
                        </div>
                    </form>
                    <p class="ms-auto text-xs text-gray-500 dark:text-gray-400">Remember, contributions to this topic should follow our <a href="#" class="text-blue-600 dark:text-blue-500 hover:underline">Community Guidelines</a>.</p>



                </div>

                <div class='w-[30%] px-3 border-l-2 '>
                    <h2 class='text-center font-bold mb-2 text-2xl'>Related Journals</h2>


                    <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-2">
                        <a href="#">
                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Healthcare technology in 2024</h5>
                        </a>
                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam quaerat tenetur laborum repellendus iusto doloremque aut mollitia quasi placeat ipsam!</p>
                        <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#121F49] rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Read more
                            <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </a>
                    </div>

                    <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <a href="#">
                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Healthcare technology in 2024</h5>
                        </a>
                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam quaerat tenetur laborum repellendus iusto doloremque aut mollitia quasi placeat ipsam!</p>
                        <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#121F49] rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Read more
                            <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReadJournal