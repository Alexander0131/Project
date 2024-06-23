import { useState, useEffect } from 'react';
import { fetchData } from '../postDb';
import { Link } from 'react-router-dom'
import NavPost from './NavPost';
import  MiniLoading from '../admin/components/MiniLoad'
import { apiUrl } from '../config';


function Post({firstParam, secParam}) {

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


    const sortPost = posts.sort(() => Math.random() - 0.5);
    const postParam = posts.filter(item => item.title === firstParam && item._id == secParam).slice(0,1);
   
  return (
    <div className='feed-wrap'>
        {loaded ? 
        <div className='feed-container'>
{/* First Poster */}
{firstParam ? null : posts.filter(item => item.cat === "pinned").slice(0,1).map((a) => (
    <div  className='pinned-container'>
      <img src={a.img} alt="" /><div dangerouslySetInnerHTML={{__html: a.title}}/>
    </div>
))
  
}

            {firstParam ? postParam.map((a) => (
                <div key={a._id}>
                <div className='single-wrapA'>
                   <div    className='title'>
                        <h3  dangerouslySetInnerHTML={{__html: a.title}}/>
                    </div>
                    <div className='content-wrap'>
                        <img src={a.img} alt="" /> 
                        <p dangerouslySetInnerHTML={{__html: a.content}}/>
                    </div>
                </div>
               


                </div>


            )) : (sortPost.filter(item => item.cat === "feed").slice(0,7).map((a) => (
                <div key={a._id} className='poster-container'>
                    
                    <div className='wrap'>
                      <img src={a.img} alt="" />
                   
                   <div className='title'>
                    <div className="text"><h3 dangerouslySetInnerHTML={{__html: a.title}}></h3><p dangerouslySetInnerHTML={{__html: a.content}}></p>
                    </div> 
                        </div> 
                    <button><Link to={`/feed/${a.title}&&${a._id}`}>See more</Link></button>
                    </div>
                </div>
            ))
            )}
            
            {firstParam ? sortPost.filter(items => items.cat === "feed").slice(0,3).map((a) => (
                <div key={a._id} className='poster-container'>
                    
                    <div className='wrap'>
                    <img src={`${apiUrl}/${a.img}` || ""} alt="" />
                   
                   <div className='title'>
                    <div className="text"><h3 dangerouslySetInnerHTML={{__html: a.title}}></h3><p dangerouslySetInnerHTML={{__html: a.content}}></p>
                    </div> 
                        </div> 
                    <button><Link to={`/feed/${a.title}&&${a._id}`}>See more </Link></button>
                    </div>
                </div>
                ))
           : null    
        }
        <NavPost/>
        </div>
        : <MiniLoading /> }
        </div>

  )
}

export default Post