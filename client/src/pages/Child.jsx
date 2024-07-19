import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLocation } from 'react-router-dom';
import { fetchData } from '../postDb';
import logo from '../assets/civil.jpg';
import NavPost from '../components/NavPost';
import { fetchTracker } from '../postDb';
import { apiUrl, imgLoad } from '../config';
import axios from 'axios';

function Child() {
  const [posts, setPosts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);


  // Define and initialize thirdParam
  const location = useLocation();
  const thirdProcess = location.pathname.split('/')[4];
  const fourthParam = thirdProcess.split('&&')[0];
  // Fetching data from the API.
  useEffect(() => {
    async function handleFetchData() {
      try {
        const data = await fetchData();
        setPosts(data);
        setLoaded(true);
        const pageTitle = data.find(
          (item) =>
            (item.link[0] === fourthParam && item.cat === 'grandChild') ||
            item.cat === 'board'
        );
        if (pageTitle) {
          document.title = pageTitle.title;
        }
      } catch (error) {
      }
    }
    handleFetchData();
  }, [fourthParam]);

 
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
      const foundPage = trackData.find((i) => i.page === 'child');
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

   const available = posts.filter((item) => (item.link[0] === fourthParam && item.cat === 'grandChild') || (item.cat === 'board' && item.link[0] === fourthParam))
   if(!available){
    window.location.href = "/";
       }


  }, []);


  return (
    <div className="subLink-wrap">
      <Header />
      <div className="subMain">
        <br />

        {posts
          .filter(
            (item) =>
              (item.link[0] === fourthParam && item.cat === 'grandChild') ||
              (item.cat === 'board' && item.link[0] === fourthParam)
          )
          .slice(0, 1)
          .map((a) => (
            <div className="sub" key={a._id}>
               <div className="headerImg">
                <img src={a.img ? a.img : imgLoad} alt="" /> 
            <span className="coverImg"></span>
           <div className="coverAll">
            <h1 dangerouslySetInnerHTML={{ __html: a.title }}></h1>
            <button className="line"></button>
           </div>
          </div>
          <div className="subText">
                <p dangerouslySetInnerHTML={{ __html: a.content }} />
              </div>
            </div>
          ))}

        <NavPost />
      </div>
      <Footer />
    </div>
  );
}

export default Child;
