import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import SideBar from '../components/SideBar'
import '../admin.scss';
import Menu from '../components/Menu';
import Dashboard from '../dashboard';
import axios from 'axios';
import { fetchStatic } from '../../postDb';
import { apiUrl } from '../../config';

function Admin() {
  const [idQuery, setIdQuery] = useState("");

  
  // const idPath = location.pathname.split("/");
  // const idExtract = idPath[idPath.length -1];

  // scan the static to see 

  useEffect(() => {
  async function handleFetch() {
    try {
      // const data = await fetchStatic();
     
      function findAcc() {
        const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        auth(user.username, user.password, user.userId);
        setIdQuery(user.userId);
    
  
        async function auth( username, password, userId) {
         
            try {
             const response = await axios.post(`${apiUrl}/api/auth0/login`, {
                  username: username.toLowerCase(),
                  password: password,
                  purpose: "login"
              });
             
        
          } catch (error) {
            
            window.location.href = "/admin/defex/login";

          } 
        
        }

      }
      else{
        window.location.href = "/admin/defex/login";
      }
    }
    findAcc();
    } catch (error) {
      window.location.href = "/admin/defex/login";
    }
  }
  handleFetch();
}, [])

 
  return (
    <div className='admin-wrapper dark'>
      
     <Menu/>

    
      <div className='flexHead'>
        <SideBar/>
        <div className="sideWrapper">

       <Dashboard/> 
      </div>
      </div>




    </div>
  )
}

export default Admin