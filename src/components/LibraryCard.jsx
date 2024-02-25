import React from 'react'

const LibraryCard = () => {
    return (
        <>
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-5">Library</h3>
            <p class="text-gray-900 mb-8">Enhance your Zenithzone experience! Did you know you can contribute more than just words? Share your journey visually by adding images, attach helpful PDFs, or even upload insightful videos. Your multimedia contributions can make the Zenithzone community more engaging and dynamic. Whether it's a visual representation of your success or sharing helpful resources, the possibilities are endless. Start adding depth to your Zenithzone interactions by incorporating images, PDFs, and videos today!</p>



            <div class="flex items-center justify-center w-full mb-5">
                <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100">
                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                        </svg>
                        <p class="mb-2 text-sm text-gray-500 "><span class="font-semibold">Click to upload</span> or drag and drop</p>
                        <p class="text-xs text-gray-500 ">Images, PDF, Videos</p>
                    </div>
                    <input id="dropzone-file" type="file" class="hidden" />
                </label>
            </div>
            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
        </>
    )
}

export default LibraryCard