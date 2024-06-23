import { useEffect, useRef, useState } from 'react'
import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { fetchData } from '../postDb'
import { fetchTracker } from '../postDb';
import { apiUrl } from '../config';
import axios from 'axios';

function Service() {

    const [posts, setPosts] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(null);
    
//Fetching data from api.
useEffect(() => {
    document.title = "Service Page"
    const handleFetchData = async () => {
        try {
            const data = await fetchData();
            setPosts(data);
            setLoaded(true)
        } catch (error) {
            
        }
    }  
    handleFetchData();

}, []);

  // Fetch tracking data
  useEffect(() => {
    async function fetchTrack() {
      try {
        const trackData = await fetchTracker();
        findPage(trackData);
      } catch (error) {
        setError("Error fetching tracking data: " + error.message);
      }
    }

    function findPage(trackData) {
      const foundPage = trackData.find((i) => i.page === 'service');
      if (foundPage) {
        newTrack(foundPage._id, foundPage.views);
      }
    }

    async function newTrack(id, curViews) {
      try {
        await axios.put(`${apiUrl}/api/track/mod/${id}`, {
          views: curViews + 1,
        });
      } catch (error) {
        // setError("Error updating views: ");
      }
    }

    fetchTrack();
  }, []);


  return (
    <div className='servicePage'>
        <Header/>
    <div className='serviceInner'>
        <div className="serviceCover"> </div>
        <div className="serv-container">
            {posts.filter(item => item.cat === "service").map((a) => (
                <div className='content-wrap' key={a.id}>
                <h1>{a.title}</h1>
                <div className='content'>
                    <img src={a.img} alt=""/>
                    {a.content} </div>
                <div>
                    </div>
                </div>

            ))}
        </div>
    </div>
        <Footer/>
    </div>
  )
}
 
export default Service