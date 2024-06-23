import { useState, useEffect } from "react"
import Header from '../components/Header'
import Footer from '../components/Footer'
import Post from "../components/Post"
import { fetchTracker } from '../postDb';
import { apiUrl } from '../config';
import axios from 'axios';


function Feed() {

  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "Feed";
  },[])

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
      const foundPage = trackData.find((i) => i.page === 'feed');
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
    <div className='feedPage'>
        <Header/>
        <Post/>
        <Footer/>

    </div>
  )
}

export default Feed