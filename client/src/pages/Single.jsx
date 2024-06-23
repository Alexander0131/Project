import { useState, useEffect } from "react"
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useLocation } from 'react-router-dom'
import Post from '../components/Post'
import { fetchTracker } from '../postDb';
import { apiUrl } from '../config';
import axios from 'axios';

function Single() {
  const location = useLocation();
  const genParam = location.pathname.split("/")[2];
  const firstParam = genParam.split("&&")[0].replace(/%20/g, " ");
  const secParam = genParam.split("&&")[1].replace(/%20/g, " ");
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = firstParam + " " + secParam;
  }, [])


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
      const foundPage = trackData.find((i) => i.page === 'single');
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
    <div>
        <Header/>
        <div>
          <Post firstParam={firstParam} secParam={secParam}/>
        </div>
        <Footer/>
    </div>
  )
}

export default Single