import React from 'react'
import { useState } from 'react'
import {toast} from 'react-toastify'
const LibraryCard = () => {
    const [library, setLibrary] = useState({
        title: '',
        content: '',
        is_anonymous: false,
    });

    const handleChange = (e) => {
        if (e.target.name === 'file_upload') {
            setLibrary({
                ...library,
                "file_upload": e.target.files[0],
            });
        } else {
            setLibrary({
                ...library,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleSubmit = async (e) => {
        console.log(library);
        e.preventDefault();
        const apiUrl = `${import.meta.env.VITE_AUTH_BASE_URL}/posts/library/`;

        const formData = new FormData();
        formData.append('title', library.title);
        formData.append('content', library.content);
        formData.append('file_upload',library.file_upload)
        formData.append('is_anonymous', library.is_anonymous);
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("access")}`
                }
            });
            const data = await response.json();

            if (response.ok) {
                toast.success('Library posted successfully!', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
            } else {
            
                // Extract and display detailed error messages
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
            console.error('Error occurred while submitting Library:', error);
            toast.error('An error occurred. Please try again later.', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            });
        }
    };

  
    return (
        <>
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-5">Library</h3>
            <p class="text-gray-900 mb-8">Enhance your Zenithzone experience! Did you know you can contribute more than just words? Share your journey visually by adding images, attach helpful PDFs, or even upload insightful videos. Your multimedia contributions can make the Zenithzone community more engaging and dynamic. Whether it's a visual representation of your success or sharing helpful resources, the possibilities are endless. Start adding depth to your Zenithzone interactions by incorporating images, PDFs, and videos today!</p>


            <form method='post' encType='multipart/form-data' onSubmit={handleSubmit}>
            <div class="mb-5">
                    <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                    <input type="text" id="title" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Title" required name="title" onChange={handleChange} />
                </div>

                <div class="mb-5">
                    <label for="content" class="block mb-2 text-sm font-medium text-gray-900 ">Description</label>
                    <textarea id="content" name="content" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write your content here... (optional)" onChange={handleChange}></textarea>
                </div>


                <div class="mb-5 flex items-center">
                    <label class="mr-2 text-sm font-medium text-gray-900">Anonymous: </label>

                    <div class="flex items-center me-5">
                        <input id="is-anonymous-true" type="radio" value="true" name="is_anonymous" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" onChange={handleChange} />
                        <label for="is-anonymous-true" class="ms-2 text-sm font-medium text-gray-900">True</label>
                    </div>

                    <div class="flex items-center">
                        <input checked id="is-anonymous-false" type="radio" value="false" name="is_anonymous" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" onChange={handleChange} />
                        <label for="is-anonymous-false" class="ms-2 text-sm font-medium text-gray-900">False</label>
                    </div>
                </div>


                <div class="flex items-center justify-center w-full mb-5">
                    <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100">
                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                            </svg>
                            <p class="mb-2 text-sm text-gray-500 "><span class="font-semibold">Click to upload</span> or drag and drop</p>
                            <p class="text-xs text-gray-500 ">Images, PDF, Videos</p>
                        </div>
                        <input id="dropzone-file" type="file" class="hidden" name="file_upload" onChange={handleChange} />
                    </label>
                </div>
                
                <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
            </form>
        </>
    )
}

export default LibraryCard