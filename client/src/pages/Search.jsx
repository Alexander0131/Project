import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchData } from '../postDb';
import  MiniLoading from '../admin/components/MiniLoad'
import { BiLogOut } from 'react-icons/bi';
import { fetchTracker } from '../postDb';
import { apiUrl } from '../config';
import axios from 'axios';



const Search = () => {

  const [posts, setPosts] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(null);
    
    useEffect(() => {
      document.title = searchQuery;
    }, [])

//Fetching data from api.
useEffect(() => {
    const handleFetchData = async () => {
        try {
            const data = await fetchData();
            setPosts(data);
            setLoaded(true);

            // running search here
            const serVal = searchQuery.toLowerCase();
  const matchedItem = data.filter(item => item.cat === 'feed' || item.cat === "child" || item.cat === "grandChild" || item.cat === "patner" || item.cat === "about").filter(item => item.title.toLowerCase().includes(serVal) || item.content.toLowerCase().includes(serVal));
  
  setMatchingItem(matchedItem)
 
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
      const foundPage = trackData.find((i) => i.page === 'search');
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

  const [matchingItem, setMatchingItem] = useState([]);
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('q');



// Sorting post for related items.

const relSearch = posts.sort(() => Math.random() - 0.5);


  return (
        <div className='searchPage'>
      <Header />
      <div className='feed-wrap'>
        <div className='feed-container'>
          {loaded ? 
          <>
          {matchingItem.length >= 1 ? (
            <div>
              <p style={{textAlign: 'center'}}>Search Results for <b style={{textTransform: 'capitalize'}}>"{searchQuery}"</b>:</p>
              {matchingItem.map((a) => (
                <div key={a._id} className='poster-container'>
                <div className="wrap">

                <img src={a.img} alt="" />
                <div className='title'>
                <div className="text">
                <h3 dangerouslySetInnerHTML={{__html: a.title}} />
                <p dangerouslySetInnerHTML={{__html: a.content}} />
                </div>
                </div>
                <button><Link to={`/feed/${a.title}&&${a._id}`}>See more</Link></button>
                </div>
              </div>
            ))}
            </div>
           
           ) : (
             
             <div style={{textAlign: 'center'}}> No result found for <b style={{textTransform: 'capitalize'}}>"{searchQuery}"</b>
            
            
            </div>
          )}
          </>
          :  
          <>

          <MiniLoading />
          </>
          }
               <h1> Somethings you may like: </h1>
               {loaded ? 
          <>
               <div className='wrap-rel'>
            {relSearch.filter(item => item.cat === "feed").slice(0,5).map((a) => (
              <Link key={a.id} to={`/feed/${a.title}&&${a._id}`}>

              <div className='relDiv' key={a._id}>
                <img src={a.img} alt="" />
                <div className='text-rel'>
              <h2 dangerouslySetInnerHTML={{__html: a.title}}/>
              <p dangerouslySetInnerHTML={{__html: a.content}}/>
                  </div>
              </div>
              </Link>
            ))}

            </div> 
            </>:  
            <>
            <MiniLoading/>
            </>
}
        </div>

      </div>
      <Footer />
    </div>

  );
};

export default Search;