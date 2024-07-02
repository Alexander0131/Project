import React, {useEffect, useState} from 'react'
import { fetchData } from '../postDb';
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'
import { apiUrl, imgLoad } from '../config';


function NavPost() {
  
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
    <div>
        
            <div className='wrap-cont'>

            {posts.sort(() => Math.random() - 0.5).filter(item => item.cat === "child" || item.cat === "sublink" || item.cat === "grandChild").slice(0,3).map((a) => (
                    <div  key={a._id} className="post-container">
                <Link to={`/sub/${a.link[1]}/${a.link[0]}`}>
              <img src={a.img ? a.img : imgLoad} alt="" />
              <div className='inner'>
                <h2 dangerouslySetInnerHTML={{__html: a.title}}/>
                <p dangerouslySetInnerHTML={{__html: a.content}}/>
              </div>
                </Link>
            </div>
            ))}


                </div>


    </div>
  )
}

export default NavPost