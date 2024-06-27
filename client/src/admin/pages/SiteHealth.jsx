import React, { useEffect, useState } from 'react'
import SideBar from '../components/SideBar'
import Menu from '../components/Menu'
import axios from 'axios'
import { fetchData, fetchStatic } from '../../postDb';
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css"
import { useLocation } from 'react-router-dom';
import { apiUrl } from '../../config';

function SiteHealth() {
    const [widthVal, setWidthVal] = useState('20%');
    const [idQuery, setIdQuery] = useState('');
    const [statics, setStatics] = useState([]);
    const [feedVal, setFeedVal] = useState(0)
    const [boardVal, setBoardVal] = useState(0)
    const [sublinkVal, setSublinkVal] = useState(0)
    const [childVal, setChildVal] = useState(0);
    const [abtVal, setAbtVal] = useState(0);
    const [partVal, setPartVal] = useState(0);
    const [swipeVal, setSwipeVal] = useState(0);
    
    const [grandchildVal, setGrandChildVal] = useState("");

   
  
    
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
        async function handleFetch() {
            try {
                
           
            const data = await fetchData();
            // feed
            
            // const max = 100;
                setFeedVal(data.filter(i => i.cat === "feed").length);

          
             // service
              const max = 3;
           
                setBoardVal(data.filter(i => i.cat === "board").length);
             
            // Sublink
            
           //  const max = 4;
 
               setSublinkVal(data.filter(i => i.cat === "sublink").length);
          
        //    child 
           
           //  const max = 16;
               setChildVal(data.filter(i => i.title === "child").length);
           //    child 
           
           //  const max = 81;
               setGrandChildVal(data.filter(i => i.cat === "grandChild").length);
            
// About
           
           //  const max = 5;
               setAbtVal(data.filter(i => i.cat === "about").length);
             
// partner

//  const max = 5;
    setPartVal(data.filter(i => i.cat === "patner").length);
   
// swiper

//  const max = 3;

    setSwipeVal(data.filter(i => i.cat === "swiper").length);
  
        } catch (error) {
                
        }
        }
        handleFetch()
    }, [])


  return (
    <div className='admin-wrapper dark'>
      
    <Menu/>

   
     <div className='flexHead'>
       <SideBar/>
       <div className="sideWrapper">

       <div className="siteHealth">
        <h2>Storage</h2>

        <div className="row">
            <b>Feed</b> <div className='wrapper'> <div className={feedVal > 75 ? "inner red" : "inner"} style={{width: feedVal + "%"}}></div></div>
        </div>
         <div className="row">
            <b>Sublink</b> <div className='wrapper'> <div className={sublinkVal * 33.3 > 75 ? "inner red" : "inner"} style={{width: sublinkVal * 33.333 + "%"}}></div></div>
        </div>
        <div className="row">
            <b>Child</b> <div className='wrapper'> <div className={childVal * 11.1 > 75 ? "inner red" : "inner"} style={{width: childVal * 11.1 + "%"}}></div></div>
        </div>
        <div className="row">
            <b>Grand-Child</b> <div className='wrapper'> <div className={grandchildVal * 3.703 > 75 ? "inner red" : "inner"} style={{width: grandchildVal  * 3.703 + "%"}}></div></div>
        </div>
        <div className="row">
            <b>On Board</b> <div className='wrapper'> <div className={boardVal * 20 > 75 ? "inner red" : "inner"} style={{width: boardVal  * 20 + "%"}}></div></div>
        </div>
        <div className="row">
            <b>About</b> <div className='wrapper'> <div className={abtVal * 20  > 75 ? "inner red" : "inner"} style={{width: abtVal  * 20 + "%"}}></div></div>
        </div>
        <div className="row">
            <b>Partner</b> <div className='wrapper'> <div className={partVal * 20 > 75 ? "inner red" : "inner"} style={{width: partVal  * 20 + "%"}}></div></div>
        </div>
        <div className="row">
            <b>Swiper</b> <div className='wrapper'> <div className={swipeVal * (100/3) > 75 ? "inner red" : "inner"} style={{width: swipeVal * (100/3) + "%"}}></div></div>
        </div>

<div className="circle">

<div className="circleChild">

<CircularProgressbar value={((feedVal + sublinkVal + childVal + grandchildVal) / 107) * 100} text={(((feedVal + sublinkVal + childVal + grandchildVal) / 107) * 100).toString().slice(0,3) + "%"}/>
</div>

</div>
<h2>Total Posts: {(feedVal + sublinkVal + childVal + grandchildVal)} out of 107</h2>


       </div>
    </div>
    </div>
    </div>
  )
}

export default SiteHealth