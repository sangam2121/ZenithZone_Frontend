import React, { useEffect, useState } from 'react';
import Navbar from "../components/Navbar"
import Card from "../components/Card"


const Journal = () => {
  const [journalList, setJournalList] = useState([]);

  const fetchJournal = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_AUTH_BASE_URL}/posts/`, {
        method: 'GET',
      });

      if (response.ok) {
        const data = await response.json();
        setJournalList(data);
      } else {
        console.log("Error occurred");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchJournal();
  }, []);
  // console.log(journalList)
  return (
    <>
      <Navbar></Navbar>
      <div className='w-[1200px] mx-auto px-12'>
        <p className='font-[400] text-[24px] mb-2.5 text-[#F05423;]'>Journal</p>
        <p className='text-[#6A6969] font-[400] text-[16px] mb-8'>Read the latest journals</p>
        <div className='grid grid-cols-3 gap-10'>
          {journalList.length > 0 ? (
            journalList.map((item) => (
              <Card key={item.id}
                id={item.id}
                image={item.thumbnail}
                title={item.title}
                author={`${item.author.first_name} ${item.author.last_name}`}
                type={item.post_type}
                is_anonymous={item.is_anonymous}
              />
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Journal;
