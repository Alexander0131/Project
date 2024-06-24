import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import civil from '../assets/civil.jpg';
import HeadSlider from '../components/HeaderSlide';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import NavPost from '../components/NavPost';
import { fetchData, fetchStatic, fetchTracker } from '../postDb';
import { apiUrl, imgLoad } from '../config';
import axios from 'axios';

function Home() {
  // Alpha testing
  const [posts, setPosts] = useState([]);
  const [postStatic, setPostStatic] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);

  document.title = "Defex Ltd";
  // Fetching data from API
  useEffect(() => {
    async function handleFetchData() {
      try {
        const data = await fetchData();
        const dataStatic = await fetchStatic();
        setPosts(data);
        setPostStatic(dataStatic);
        setLoaded(true);
      } catch (error) {
        setError("Error fetching data: " + error.message);
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
      const foundPage = trackData.find((i) => i.page === 'home');
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

  // Collating the random feed data
  const postRand = posts.sort(() => Math.random() - 0.5);

  return (
    <div className='wrapHome'>
      <div className="head-container">
        <Header />
        <HeadSlider />
        </div>

        {/* Activities  */}
        {postStatic.filter(i => i.cat === "static" && i.title === "welcomeText").map((a) => (
          <div key={a._id} className='hometext'>
            <h1>{a.link[0]}</h1>
            <div>
              <p>{a.link[1]}</p>
            </div>
          </div>
        ))}

        <div className='feed-wrap'>
          <div className='feed-container'>
            {/* First Poster */}
            {posts.filter(item => item.cat === "pinned").slice(0, 1).map((a) => (
                <div key={a._id}  className='pinned-container'>
                  <img src={a.img} alt="" /><div dangerouslySetInnerHTML={{ __html: a.title }} />
                </div>
            ))
            }
          </div>
        </div>
        <div className="homeware">
          

          <div className="feedHome">
          {posts.filter(item => item.cat == "feed").length >= 1 &&
          <>
            <h1>Feed</h1>
            <div className="feedMap">
              {postRand.filter(item => item.cat === "feed").slice(0, 3).map((a) => (
                <div className='feedWrapper' key={a._id}>
                  <div className='feedWrap'>
                    <h3 dangerouslySetInnerHTML={{ __html: a.title }} />
                    <p dangerouslySetInnerHTML={{ __html: a.content }} />
                  </div>
                  <Link to={`/feed/${a.title}&&${a._id}`}>
                    <button>See More</button>
                  </Link>
                </div>
              ))}
            </div>
            </>
}
          <div className="allpost">
            <NavPost />
          </div>
            {posts.filter(item => item.cat == "patner").length >= 1 &&
            <>
            <h1>Partners</h1>
            <div align="center">
              <div className="marquee-container">
                <div className="marquee-text">
                <div className='pathome'>
                    {posts.filter(item => item.cat == "patner").map((item) => (
                      <img key={item._id} src={item.img ? item.img : imgLoad} alt="" srcSet="" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            </>
}
          </div>
        </div>
      <Footer />
    </div>
  )
}

export default Home;
