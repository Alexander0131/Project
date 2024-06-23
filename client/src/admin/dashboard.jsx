import React from 'react'
import { NavLink } from 'react-router-dom'
import Chart from './components/Chart'
import { useState, useEffect } from 'react'
import { fetchData } from '../postDb'

function Dashboard() {
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
    <div className='dashboard'>
        <div className="firstRow">
            <NavLink>
                Pages
                <small>{posts.filter(item => item.cat === 'sublink' || item.cat === 'child' || item.cat === 'grandChild').length}</small>
            </NavLink>
            <NavLink>
                Feeds
                <small>{posts.filter(item => item.cat === 'feed').length}</small>
            </NavLink>

        </div>
       <Chart/>
    </div>
  )
}

export default Dashboard
