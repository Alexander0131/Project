import { Swiper, SwiperSlide } from 'swiper/react';
import { fetchData } from '../postDb';
import { useState, useEffect } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { imgLoad } from '../config';




export default function HeadSlider() {

  
  const [posts, setPosts] = useState([]);
  const [loaded, setLoaded] = useState(false);

  
//Fetching data from api.
useEffect(() => {
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

 
  return (
    <div className="swiperWrap">
      <div className='swiperContainer'>
        <div className="swiperHead">

      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper" 
        
      >
        {posts.filter(item => item.cat === "swiper").map((a) => (
          <SwiperSlide key={a._id}>
          <img className='swiperSlide' src={a.img ? a.img : imgLoad} alt="" />
          <div className="info">
            <h1 dangerouslySetInnerHTML={{__html: a.title}}/>
          </div>
        </SwiperSlide>
        ))}
        <div className="centLink">
        {posts.filter(item => item.cat === "board").map((a) => (

          <Link to={`/sub/${a.link[0]}`} key={a._id} className="firstCh">{a.title}</Link>
        ))}
         
        </div> 
       
     </Swiper>
       

        </div>

        </div>
    </div>
  );
}
