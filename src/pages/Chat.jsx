import React from 'react';
import Navbar from '../components/Navbar';


const Chat = () => {
   return (
      <>
         <Navbar />
         <div className='h-[88vh] overflow-y-auto flex'>
            {/* User List */}
            <div className='w-1/4 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700'>
               <div className='p-4'>
                  <form className='max-w-md mx-auto'>

                     <label htmlFor='default-search' className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'>
                        Search
                     </label>
                     <div className='relative'>
                        <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
                           <svg className='w-4 h-4 text-gray-500 dark:text-gray-400' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'>
                              <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z' />
                           </svg>
                        </div>
                        <input type='search' id='default-search' className='block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='Search Doctor' required />
                        <button type='submit' className='text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
                           Search
                        </button>
                     </div>
                  </form>
                  {/* User List Items */}
                  <ul className='my-4 space-y-3'>
                     <li>
                        <a href='#' className='flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white'>
                           <div className='flex items-center'>
                              <div className='relative'>
                                 <img className='w-12 h-12 rounded-full' src='images/avatar.jpg' alt='' />
                                 <span className='top-0 left-7 absolute w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full'></span>
                              </div>
                              <div className='flex-1 min-w-0 ms-4'>
                                 <p className='text-sm font-medium text-gray-900 truncate dark:text-white'>
                                    Neil Sims
                                 </p>
                                 <p className='text-sm text-gray-500 truncate dark:text-gray-400'>
                                    email@windster.com
                                 </p>
                              </div>
                           </div>
                        </a>
                     </li>


                     <li>
                        <a href='#' className='flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white'>
                           <div className='flex items-center'>
                              <div className='relative'>
                                 <img className='w-12 h-12 rounded-full' src='images/avatar.jpg' alt='' />
                                 <span className='top-0 left-7 absolute w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full'></span>
                              </div>
                              <div className='flex-1 min-w-0 ms-4'>
                                 <p className='text-sm font-medium text-gray-900 truncate dark:text-white'>
                                    Neil Sims
                                 </p>
                                 <p className='text-sm text-gray-500 truncate dark:text-gray-400'>
                                    email@windster.com
                                 </p>
                              </div>
                           </div>
                        </a>
                     </li>


                     <li>
                        <a href='#' className='flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white'>
                           <div className='flex items-center'>
                              <div className='relative'>
                                 <img className='w-12 h-12 rounded-full' src='images/avatar.jpg' alt='' />
                                 <span className='top-0 left-7 absolute w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full'></span>
                              </div>
                              <div className='flex-1 min-w-0 ms-4'>
                                 <p className='text-sm font-medium text-gray-900 truncate dark:text-white'>
                                    Neil Sims
                                 </p>
                                 <p className='text-sm text-gray-500 truncate dark:text-gray-400'>
                                    email@windster.com
                                 </p>
                              </div>
                           </div>
                        </a>
                     </li>

                  </ul>
               </div>
            </div>
            {/* Chat Section */}

            <div className="flex-1 bg-white">
               <div id="messages" className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch h-full bg-white border border-gray-200 rounded-lg shadow me-2">
                  <div class="">
                     <div class="flex items-center">
                        <div class="flex-shrink-0">
                           <div className='relative'>
                              <img className='w-12 h-12 rounded-full' src='images/avatar.jpg' alt='' />
                              <span className='top-0 left-7 absolute w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full'></span>
                           </div>
                        </div>
                        <div class="flex-1 min-w-0 ms-4">
                           <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                              Neil Sims
                           </p>
                           <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                              Active Now
                           </p>
                        </div>
                        <div className="flex items-center justify-center space-x-4 me-3">

                           <svg className="w-8 h-8 rounded-full text-blue-700" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M15.5562 14.5477L15.1007 15.0272C15.1007 15.0272 14.0181 16.167 11.0631 13.0559C8.10812 9.94484 9.1907 8.80507 9.1907 8.80507L9.47752 8.50311C10.1841 7.75924 10.2507 6.56497 9.63424 5.6931L8.37326 3.90961C7.61028 2.8305 6.13596 2.68795 5.26145 3.60864L3.69185 5.26114C3.25823 5.71766 2.96765 6.30945 3.00289 6.96594C3.09304 8.64546 3.81071 12.259 7.81536 16.4752C12.0621 20.9462 16.0468 21.1239 17.6763 20.9631C18.1917 20.9122 18.6399 20.6343 19.0011 20.254L20.4217 18.7584C21.3806 17.7489 21.1102 16.0182 19.8833 15.312L17.9728 14.2123C17.1672 13.7486 16.1858 13.8848 15.5562 14.5477Z" fill="#185ADB" />
                              <path d="M13.2595 1.87983C13.3257 1.47094 13.7122 1.19357 14.1211 1.25976C14.1464 1.26461 14.2279 1.27983 14.2705 1.28933C14.3559 1.30834 14.4749 1.33759 14.6233 1.38082C14.9201 1.46726 15.3347 1.60967 15.8323 1.8378C16.8286 2.29456 18.1544 3.09356 19.5302 4.46936C20.906 5.84516 21.705 7.17097 22.1617 8.16725C22.3899 8.66487 22.5323 9.07947 22.6187 9.37625C22.6619 9.52466 22.6912 9.64369 22.7102 9.72901C22.7197 9.77168 22.7267 9.80594 22.7315 9.83125L22.7373 9.86245C22.8034 10.2713 22.5286 10.6739 22.1197 10.7401C21.712 10.8061 21.3279 10.53 21.2601 10.1231C21.258 10.1121 21.2522 10.0828 21.2461 10.0551C21.2337 9.9997 21.2124 9.91188 21.1786 9.79572C21.1109 9.56339 20.9934 9.21806 20.7982 8.79238C20.4084 7.94207 19.7074 6.76789 18.4695 5.53002C17.2317 4.29216 16.0575 3.59117 15.2072 3.20134C14.7815 3.00618 14.4362 2.88865 14.2038 2.82097C14.0877 2.78714 13.9417 2.75363 13.8863 2.7413C13.4793 2.67347 13.1935 2.28755 13.2595 1.87983Z" fill="#185ADB" />
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M13.4857 5.3293C13.5995 4.93102 14.0146 4.7004 14.4129 4.81419L14.2069 5.53534C14.4129 4.81419 14.4129 4.81419 14.4129 4.81419L14.4144 4.81461L14.4159 4.81505L14.4192 4.81602L14.427 4.81834L14.4468 4.8245C14.4618 4.82932 14.4807 4.8356 14.5031 4.84357C14.548 4.85951 14.6074 4.88217 14.6802 4.91337C14.8259 4.97581 15.0249 5.07223 15.2695 5.21694C15.7589 5.50662 16.4271 5.9878 17.2121 6.77277C17.9971 7.55775 18.4782 8.22593 18.7679 8.7154C18.9126 8.95991 19.009 9.15897 19.0715 9.30466C19.1027 9.37746 19.1254 9.43682 19.1413 9.48173C19.1493 9.50418 19.1555 9.52301 19.1604 9.53809L19.1665 9.55788L19.1688 9.56563L19.1698 9.56896L19.1702 9.5705C19.1702 9.5705 19.1707 9.57194 18.4495 9.77798L19.1707 9.57194C19.2845 9.97021 19.0538 10.3853 18.6556 10.4991C18.2607 10.6119 17.8492 10.3862 17.7313 9.99413L17.7276 9.98335C17.7223 9.96832 17.7113 9.93874 17.6928 9.89554C17.6558 9.8092 17.5887 9.66797 17.4771 9.47938C17.2541 9.10264 16.8514 8.53339 16.1514 7.83343C15.4515 7.13348 14.8822 6.73078 14.5055 6.50781C14.3169 6.39619 14.1757 6.32909 14.0893 6.29209C14.0461 6.27358 14.0165 6.26254 14.0015 6.25721L13.9907 6.25352C13.5987 6.13564 13.3729 5.72419 13.4857 5.3293Z" fill="#185ADB" />
                           </svg>


                           <svg className="w-8 h-8 text-[#185ADB]" viewBox="0 0 32 32">
                              <g>
                                 <path className="stroke-current" d="M17,8H6c-1.7,0-3,1.3-3,3v10c0,1.7,1.3,3,3,3h11c1.7,0,3-1.3,3-3V11C20,9.3,18.7,8,17,8z" fill='#185ADB' />
                                 <path className="stroke-current" d="M28.5,8.1c-0.3-0.2-0.7-0.2-1,0l-5,3C22.2,11.3,22,11.6,22,12v8c0,0.4,0.2,0.7,0.5,0.9l5,3C27.6,24,27.8,24,28,24 c0.2,0,0.3,0,0.5-0.1c0.3-0.2,0.5-0.5,0.5-0.9V9C29,8.6,28.8,8.3,28.5,8.1z" fill='#185ADB' />
                              </g>
                           </svg>

                        </div>
                     </div>
                  </div>
                  <hr></hr>
                  {/* Existing message content */}
                  <div className="w-full h-full p-4 rounded-lg sm:p-6 relative">
                     {/* Sender's message */}
                     <div className="flex items-end gap-2.5 mb-4">
                        <div className="pb-1">
                           <img className="w-8 h-8 rounded-full" src="/images/avatar.jpg" alt="Jese image" />
                        </div>
                        <div className="flex flex-col w-full max-w-[60%] leading-1.5 p-2 border-gray-200 bg-gray-100 rounded-lg dark:bg-gray-700">
                           <p className="text-sm font-normal py-2.5 pt-0 text-gray-900 dark:text-white">That's awesome. I think our users will really appreciate the improvements.</p>
                           <div className="flex justify-between">
                              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span>
                              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">11:46</span>
                           </div>
                        </div>
                     </div>
                     {/* Receiver's message */}
                     <div className="flex items-end justify-end gap-2.5 mb-4">
                        <div className="flex flex-col w-full max-w-[60%] leading-1.5 p-2 border-gray-200 bg-blue-700  rounded-lg">
                           <p className="text-sm font-normal py-2.5 pt-0 text-white dark:text-white">That's awesome. I think our users will really appreciate the improvements.</p>
                           <div className="flex justify-between">
                              <span className="text-sm font-normal text-gray-50">Delivered</span>
                              <span className="text-sm font-normal text-gray-50">11:46</span>
                           </div>
                        </div>
                        <div className="pb-1">
                           <img className="w-8 h-8 rounded-full" src="/images/avatar.jpg" alt="Jese image" />
                        </div>
                     </div>
                  </div>
                  {/* Form */}
                  <form className="w-full  bg-gray-50 dark:bg-gray-700">
                     <label for="chat" class="sr-only">Your message</label>
                     <div class="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
                        <button type="button" class="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                           <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                              <path fill="currentColor" d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z" />
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 1H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z" />
                           </svg>
                           <span class="sr-only">Upload image</span>
                        </button>
                        <button type="button" class="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                           <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.408 7.5h.01m-6.876 0h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM4.6 11a5.5 5.5 0 0 0 10.81 0H4.6Z" />
                           </svg>
                           <span class="sr-only">Add emoji</span>
                        </button>
                        <input type='text' id="chat" rows="1" class="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..."></input>
                        <button type="submit" class="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
                           <svg class="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                              <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                           </svg>
                           <span class="sr-only">Send message</span>
                        </button>
                     </div>


                  </form>
               </div>
            </div>

         </div>
      </>
   );
};

export default Chat;
