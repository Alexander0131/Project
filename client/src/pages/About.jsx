import React, { useState, useEffect } from "react";
import '../components/components2.scss';
import Header from "../components/Header";
import Footer from "../components/Footer";
import { fetchData } from "../postDb";
import { useLocation } from "react-router-dom";
import aboutImg from '../assets/staff.jpg'
import { fetchTracker } from '../postDb'; // Import using a named import
 // Import without the file extension
import { apiUrl } from '../config';
import axios from 'axios';

function About() {
    const [posts, setPosts] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(null); // State variable for error message
    const [page, setPage] = useState([])
    const location = useLocation();


    function form(params) {
      const path = location.search.split("?q=")[1].replace(/%20/g, ' ');
      console.log(path);
      if (params === "title") {
        return path.split("&&&")[0]
      }
      if (params === "text") {
        return path.split("&&&")[1]
      }
    }

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
      const foundPage = trackData.find((i) => i.page === 'about');
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


    // ending of fetchTracker

    // Fetching data from the API.
    useEffect(() => {
        document.title = "About Us";
        const handleFetchData = async () => {
            try {
                const data = await fetchData();
                setPosts(data);
                setLoaded(true);
            } catch (error) {
                setError("Error fetching data: " + error.message); // Set error message
            }
        }
        handleFetchData();
    }, []);
{/* <b>Best: </b>We have top the list for over ten years  */}
    return (
        <div className="aboutPage">
            <Header />
          <div className="headerImg">
            <img src={aboutImg} alt="" />
            <span className="coverImg"></span>
           <div className="coverAll">
            <h1>{form('title')}</h1>
            <button className="line"></button>
            <small>{form('text')}</small>
           </div>
          </div>
            <div className="coverAbt">
                <div className="About">
                  {/* {form('title') === "leadership" && */}

                    <div className="container">
                        {error ? ( // Check if an error occurred
                            <div className="error-message">{error}</div>
                        ) : (
                            posts
                                .filter(item => item.cat === "about")
                                .map((item) => (
                                    <div className="about" key={item.id}>
                                        <img alt="" src={item.img} />

                                        <div className="about-content">
                                            <h2 dangerouslySetInnerHTML={{__html: item.title}} />
                                            <p dangerouslySetInnerHTML={{__html: item.content}} />
                                        </div>
                                    </div>
                                ))
                              )}
                    </div>
                            {/* } */}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default About;
