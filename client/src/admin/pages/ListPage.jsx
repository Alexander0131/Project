import SideBar from '../components/SideBar'
import { useState } from 'react';
import axios from 'axios'
import '../admin.scss';
import Menu from '../components/Menu';
import List from '../components/List';
import { useEffect } from 'react';
import { fetchStatic } from '../../postDb';
import { useLocation } from 'react-router-dom';
import { apiUrl } from '../../config';

function ListPage({not, setNot, loading, setLoading}) {
const [idQuery, setIdQuery] = useState('')


  
  useEffect(() => {
    async function handleFetch() {
      try {
        const data = await fetchStatic();
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
  
  useEffect(() => {
    document.title = "Defex - Post list";

  }, [])

  return (
    <div className='admin-wrapper dark'>
      
     <Menu/>

    
      <div className='flexHead'>
        <SideBar/>
        <div className="sideWrapper">
        
       <List loading={loading} setLoading={setLoading} not={not} setNot={setNot} idQuery={idQuery}/>
      </div>


</div>

    </div>
  )
}

export default ListPage