import React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'

const JournalWriteCard = () => {
    const [journal, setJournal] = useState({
        title: '',
        content: '',
        thumbnail: null,
        is_anonymous: false,
        post_type: null
    });

    const handleChange = (e) => {
        if (e.target.name === 'thumbnail') {
            setJournal({
                ...journal,
                [e.target.name]: e.target.files[0],
            });
        } else {
            setJournal({
                ...journal,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const apiUrl = `${import.meta.env.VITE_AUTH_BASE_URL}/posts/`;

        const formData = new FormData();
        formData.append('title', journal.title);
        formData.append('content', journal.content);
        formData.append('thumbnail', journal.thumbnail);
        formData.append('is_anonymous', journal.is_anonymous);
        formData.append('post_type', journal.post_type);

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
                toast.success('Journal posted successfully!', {
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
            console.error('Error occurred while submitting journal:', error);
        }
    };

    return (
        <>
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-5">Journal</h3>
            <p class="text-gray-900 mb-8">Your voice matters! Share your thoughts, experiences, and ideas with us. Your input is a crucial part of making Zenithzone even better. Whether it's a suggestion, a success story, or a unique use case, we want to hear from you.  Take a moment to write to us.
            </p>
            <form class="mx-auto" method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
                <div class="mb-5">
                    <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                    <input type="text" id="title" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Title" required name="title" onChange={handleChange} />
                </div>
                <div class="mb-5">
                    <label for="content" class="block mb-2 text-sm font-medium text-gray-900 ">Content</label>
                    <textarea id="content" name="content" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write your content here..." onChange={handleChange}></textarea>
                </div>

                <div class="mb-5">
                    <label class="block mb-2 text-sm font-medium text-gray-900" for="thumbnail">Upload Thumnnail</label>
                    <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 " id="thumbnail" type="file" name="thumbnail" onChange={handleChange} />
                </div>

                <div class="mb-5">
                    <label for="post-type" class="block mb-2 text-sm font-medium text-gray-900">Type</label>
                    <select id="post-type" class="bg-gray-50 border border-gray-300 text-gray-90 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        name="post_type" onChange={handleChange}>
                        <option selected >Select post types</option>
                        <option value="DAILY_UPDATES">Daily Updates</option>
                        <option value="INSPIRATIONAL">Inspirational</option>
                        <option value="EXPERT_ADVICE">Expert Advice</option>
                        <option value="NEWS">News</option>
                        <option value="OTHERS">Others</option>
                    </select>
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


                <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
            </form>

        </>
    )
}

export default JournalWriteCard