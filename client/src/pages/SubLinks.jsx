import React, {useState, useEffect} from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useLocation } from 'react-router-dom'
import { fetchData } from '../postDb';
import  logo from '../assets/civil.jpg'
import { fetchTracker } from '../postDb';
import { apiUrl, imgLoad } from '../config';
import { Link } from 'react-router-dom';
import axios from 'axios';

function SubLinks() {
  const [posts, setPosts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);

    // Collating the random feed data
    const postRand = posts.sort(() => Math.random() - 0.5);

    
//Fetching data from api.
useEffect(() => {
  const handleFetchData = async () => {
      try {
          const data = await fetchData();
          setPosts(data);
          setLoaded(true);
          data.filter(item => item.link[0] === thirdParam && item.cat === "child").slice(0,1).map((a) => {
            document.title = a.title;
          });
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
      const foundPage = trackData.find((i) => i.page === 'sublink');
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


    const location = useLocation();
    const thirdProcess = location.pathname.split("/")[3];
    const thirdParam =  thirdProcess.split("&&")[0];



  return (
    <div className='subLink-wrap'>
        <Header/>
        <div className="subMain">
         
            <br/>

           {posts.filter(item => item.link[0] === thirdParam && item.cat === "child").slice(0,1).map((a) => (
            <div className='sub' key={a.id}>
             
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

            <div className='wrap-cont'>

            {posts.sort(() => Math.random() - 0.5).filter(item => item.link === "child").slice(0,3).map((a) => (
              <div className="post-container">
              <img src={a.img ? a.img : imgLoad} alt="" />
              <div className='inner'>
                <h2 dangerouslySetInnerHTML={{__html: a.title}}/>
                <p dangerouslySetInnerHTML={{__html: a.content}}/>
              </div>
            </div>
            ))}


                </div>
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
        </div>
        <Footer/>
    </div>
  )
}

export default SubLinks