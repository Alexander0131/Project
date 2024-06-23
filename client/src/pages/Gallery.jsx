
import { useState, useEffect } from 'react'
import { fetchData } from '../postDb';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../components/styles3.scss';
import { MdClose } from 'react-icons/md';
import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa'
import { fetchTracker } from '../postDb';
import { apiUrl } from '../config';
import axios from 'axios';


const Gallery = () => {



  const [posts, setPosts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);

    
//Fetching data from api.
useEffect(() => {

  document.title = "Gallery";
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
      const foundPage = trackData.find((i) => i.page === 'gallery');
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


const galPost = posts;
  const [slideNumber, setSlideNumber] = useState(0)
  const [openModal, setOpenModal] = useState(false)

  const handleOpenModal = (index) => {
    setSlideNumber(index)
    setOpenModal(true)
  }

  // Close Modal
  const handleCloseModal = () => {
    setOpenModal(false)
  }

  // Previous Image
  const prevSlide = () => {
    slideNumber === 0 
    ? setSlideNumber( galPost.length -1 ) 
    : setSlideNumber( slideNumber - 1 )
  }

  // Next Image  
  const nextSlide = () => {
    slideNumber + 1 === galPost.length 
    ? setSlideNumber(0) 
    : setSlideNumber(slideNumber + 1)
  }

  return (
    <div className='galPage'>
        <Header />
        <div className="gal-wrapper">
          <div className="gal-container">
           {galPost && posts.map((a, index) => {
            return(
              <div 
                className='galimg-wrap' 
                key={index}
                onClick={ () => handleOpenModal(index) }
              >
                <img src={a.img} alt='' />
              </div>
            )
          })
        }

{openModal && 
        <div className='sliderWrap'>

          



        <MdClose onClick={handleCloseModal} className="closeGalBtn"/> 

          <div className='fullScreenImage'>
            <img src={galPost[slideNumber].img} alt='' />
         </div> 
         <div className="btns">

          <FaChevronCircleLeft className='icon' onClick={prevSlide}/>
          
      
          <FaChevronCircleRight className='icon' onClick={nextSlide}/>
     
         </div>
         <button className="range">

 {slideNumber}/
     {galPost.length}
         </button>
          </div>
      }

     

      </div>
      </div>
<Footer/>

    </div>
  )
}

export default Gallery