import { useState, useEffect } from "react"
import Footer from "../components/Footer"
import Header from "../components/Header"
import logo from '../assets/logo.png'
import { MdLocationOn, MdMail } from 'react-icons/md'
import {doc} from '../doc'
import { fetchData, fetchStatic } from "../postDb"
import { BsHeadset } from 'react-icons/bs'
import Loading from '../admin/components/Loading'
import { fetchTracker } from '../postDb';
import { apiUrl } from '../config';
import axios from 'axios';
import ContactPath from "../components/Contact"

function Contact({ not, setNot, loading, setLoading }) {

  const [posts, setPosts] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [inpVal, setInpVal] = useState("")
    const [error, setError] = useState(null); 

    
//Fetching data from api.
useEffect(() => {
  document.title = "Contact Us";
    const handleFetchData = async () => {
        try { 
            const data = await fetchStatic();
            setPosts(data);
            setLoaded(true)
          setLoading({load:false, loadState: "", loadText: "Loading..."});

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
      const foundPage = trackData.find((i) => i.page === 'contact');
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
    <div className="contAll">
      <div className="coverCont"> </div>
        <Header/>
    <div className="contact-container">

        
        <div className="wrap-container">

      <div className="wrapLogo">
       <p> Defex Ltd </p>
        <img src={logo} alt="" />

      </div>
        </div>
      <div className="main-contact">
        <span>
        <MdLocationOn className="icon"/><br/>
       {posts.filter(item => item.cat === "static" && item.title === "locat").map((a) => (
        <div key={a._id}>
         {a.link[0]}
        </div>
       ))}
        </span>
        <span>
        <BsHeadset className="icon"/><br/>
        {posts.filter(item => item.cat === "static" && item.title === "numbers").map((a) => (
  <div key={a._id}>
        {a.link[0]}<br/>
        {a.link[1]}<br/>
        {a.link[2]}
        </div>
        ))}
        </span>
        <span>
        <MdMail className="icon"/><br/>
        {posts.filter(item => item.cat === "static" && item.title === "email").map((a) => (
        <div key={a._id}>
        {a.link[0]}
        </div>
        ))}
        </span>
      </div>
       
   





<ContactPath not={not} setNot loading setLoading/>







    </div>
        <Footer />

        {loading.load ? 
        <>
        <Loading loading={loading}/>
        </>  
        : null  
        }
    </div>
  )
}

export default Contact