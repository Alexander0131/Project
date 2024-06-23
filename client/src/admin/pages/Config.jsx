import React, { useEffect, useState } from 'react'
import Menu from '../components/Menu'
import SideBar from '../components/SideBar'
import "../components/config.scss"
import {  fetchStatic } from '../../postDb'
import Loading from '../components/Loading'
import Noti from '../components/Noti'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import { apiUrl } from '../../config'

function Config({ not, setNot, loading, setLoading }) {
 
  
  
  const [pop, setPop] = useState(false);
  const [idStore, setIdStore] = useState('');
  const [idQuery, setIdQuery] = useState('');
  const [cate, setCat] = useState('');
  const [itemCat, setItemCat] = useState('');
  const [liLink, setLiLink] = useState('');
  const [space, setSpace] = useState('');
  const [docSec, setDocSec] = useState(0);
  const [posts, setPosts] = useState([]);
    const [imgFile, setImgFile] = useState([]) 
    const [inpOne, setInpOne] = useState("0123456789");
    const [inpTwo, setInpTwo] = useState("0123456789")
    const [inpThree, setInpThree] = useState("0123456789")
    const [inpLoc, setLoc] = useState("location");
    const [email, setEmail] = useState("defexexample@gmail.com");
    const [hotline, setHotline] = useState(true);
    const [locati, setLocati] = useState(true);
    const [emailState, setEmailState] = useState(true);
    const [wlctiState, setWlctistate] = useState(true);
    const [wlcteState, setWlctestate] = useState(true);
    const [socId, setSocId] = useState("");
    const [locId, setLocId] = useState("");
    const [emailId, setEmailId] = useState("");
    const [wlcId, setWlcId] = useState("");
    const [numId, setNumId] = useState("");
    const [wlcTe, setWlcTe] = useState("");
    const [wlcTi, setWlcTi] = useState("");
    const [inpsoc, setSoc] = useState({
      fb:"http://www.sample.com",
      wa:"0123456789",
      ln:"http://www.sample.com"
    });
    const [Socstate, setSocstate] = useState({
      fb: true,
      wa: true,
      ln: true
    })

    
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
      document.title = "Defex - Configure";
      setLoading(loading => ({...loading, load: true, loadText: "Loading..."}));
     async function handleFetch() {
      
      try {
     
        const data = await fetchStatic();
        setPosts(data);
        data.filter(item => item.cat === "static" && item.title === "numbers").map((a) => {
          setInpOne(a.link[0])
          setInpTwo(a.link[1])
          setInpThree(a.link[2]);
          setNumId(a._id)
        });
        data.filter(item => item.cat === "static" && item.title === "locat").map((a) => {
          setLoc(a.link[0]);
          setLocId(a._id);
        });
        data.filter(item => item.cat === "static" && item.title === "email").map((a) => {
          setEmail(a.link[0]);
          setEmailId(a._id);
        });
        data.filter(item => item.cat === "static" && item.title === "welcomeText").map((a) => {
          setWlcTi(a.link[0]);
          setWlcTe(a.link[1]);
          setWlcId(a._id)
        });
        data.filter(item => item.cat === "static" && item.title === "social").map((a) => {
          setSoc({
            fb: a.link[0],
            wa: a.link[1],
            ln:a.link[2]
          });
          setSocId(a._id)
        })
        
        setLoading({loadState: "good", load: true, loadText: "Successful"});

        setTimeout(() => {
          setLoading({loadState: "", load: false, loadText: "Loading"});
        }, 2000)
           
      } catch (error) {
        setLoading({loadState: "bad", load: true, loadText: "Failed"});

        setTimeout(() => {
          setLoading({loadState: "", load: false, loadText: "Loading"});
        }, 3000)
      }
      }
      handleFetch()
    }, [])


    // Update item 
    function handleUpdate() {
      // check required
       ("update clicked")
      if((inpOne == "" || inpOne.length !== 10) || (inpTwo == "" || inpTwo.length !== 10) || (inpThree == "" || inpThree.length !== 10) ||(inpLoc == "") || (inpsoc.fb == " ") || (inpsoc.wa.length !== 10) || (inpsoc.ln == " ") || (wlcTe == "" && wlcTi == "") || (email == "")){

        if(inpOne == "" || inpOne.length !== 10){
        setNot({
          notState: true,
          notify: "Please note that  hotline can't be empty or more or less than 10 digits."
        });
        setHotline(false);
        setTimeout(() => {
          setHotline(true);
        }, 5000)
      }
      if(inpTwo.length !== 10){
        setNot({
          notState: true,
          notify: "Please note that the Second number can't be more or less than 10 digits."
        });
      }
      if(inpThree.length !== 10){
        setNot({
          notState: true,
          notify: "Please note that the Third number can't be more or less than 10 digits."
        });
      }
      if(inpLoc == ""){
        setNot({
          notState: true,
          notify: "Please note that the location can't be empty."
        });
        setLocati(false);
        setTimeout(() => {
          setLocati(true);
        }, 5000)
      }
      if(email == ""){
        setNot({
          notState: true,
          notify: "Please note that the email address must be provided."
        });
        setEmailState(false);
        setTimeout(() => {
          setEmailState(true);
        }, 5000)
      }
     
      if(inpsoc.fb == ""){
        setNot({
          notState: true,
          notify: "Please note that facebook link can't be empty."
        });
        setSocstate(Socstate => ({...Socstate, fb: false}));
        setTimeout(() => {
          setSocstate(Socstate => ({...Socstate, fb: true}));
        }, 5000)
      }
      if(inpsoc.wa.length !== 10){
        setNot({
          notState: true,
          notify: "Please note that whatsapp line can't be less more than 10 digits."
        });
        setSocstate(Socstate => ({...Socstate, wa: false}));
        setTimeout(() => {
          setSocstate(Socstate => ({...Socstate, wa: true}));
        }, 5000)
      }
      if(inpsoc.ln == ""){
        setNot({
          notState: true,
          notify: "Please note that linkedn link can't be empty."
        });
        setSocstate(Socstate => ({...Socstate, ln: false}));
        setTimeout(() => {
          setSocstate(Socstate => ({...Socstate, ln: true}));
        }, 5000)
      }
      if(wlcTe == ""){
        setNot({
          notState: true,
          notify: "Please note that welcome text can't be empty."
        });
        setWlctestate(false);
        setTimeout(() => {
          setWlctestate(true);
        }, 5000)
      }
      if(wlcTi == ""){
        setNot({
          notState: true,
          notify: "Please note that welcome title can't be empty."
        });
        setWlctistate(false);
        setTimeout(() => {
          setWlctistate(true);
        }, 5000)
      }
    }
      else{
        proceed();
      }
  
      async function proceed() {
        setLoading({load: true, loadState: "", loadText: "Saving"});
        try {
          // Update numbers
          await axios.put(`${apiUrl}/api/static/edit/${numId}`, {
            link: [inpOne, inpTwo, inpThree],
          });
      
          // Update location
          await axios.put(`${apiUrl}/api/static/edit/${locId}`, {
            link: [inpLoc],
          });
          // Update the email
          await axios.put(`${apiUrl}/api/static/edit/${emailId}`, {
            link: [email],
          });
          // Update social links
          await axios.put(`${apiUrl}/api/static/edit/${socId}`, {
            link: [inpsoc.fb, inpsoc.wa, inpsoc.ln],
          });
      
      
          await axios.put(`${apiUrl}/api/static/edit/${wlcId}`, {
            link: [wlcTi, wlcTe],
          });
      
          
          setLoading({load: true, loadState: "good", loadText: "Saved"});
     
setTimeout(() => {
    setLoading({load:false, loadState: "", loadText: "Loading..."});
    
            }, 2000)
        } catch (error) {

          setLoading({load: true, loadState: "bad", loadText: "failed"});
     
setTimeout(() => {
    setLoading({load:false, loadState: "", loadText: "Loading..."});
    
            }, 2000)
        }
      }
        }

  return (
    <div className='config-page'>
      
     <Menu/>

    
      <div className='flexHead'>
        <SideBar/>
        <div className="sideWrapper">

        <div className='config'>

        <div className={pop ? 'popup' : 'popup hide'}>
          <div className="main-pop" align="center">
            Please note that deleting this item can't be undone. {space}
            <div>
              <button onClick={() => setPop(false)}>Cancel</button>
              <button>Continue</button>
            </div>
          </div>
        </div>
  
           <div>
             <h3>Defex Static settings</h3>
             <div>
             
          <div className='wrap-All'>

          <div >
    <b>

          <label>Hotline</label>
            <input type="text" className={hotline ? "" : "red" } name="numberOne" onChange={e => setInpOne(e.target.value) } id="num" value={inpOne} />
    </b>
    <b>
            <label>Second cell line</label>
            <input type="text" name="numberTwo" onChange={e => setInpTwo(e.target.value) } id="num" value={inpTwo} />
    </b>
    <b>

            <label>Third Cell Line</label>
            <input type="text" name="numberThree" onChange={e => setInpThree(e.target.value) } id="num" value={inpThree} />
    </b>

          </div>
<b className='loc'>

            <label>Location:</label>
            <input type="text" className={locati ? "" : "red" } maxLength={40} name="loc" onChange={e => setLoc(e.target.value) } id="num" value={inpLoc} />
</b>

<b className='loc'>

            <label>Welcome title:</label>
            <input type="text" className={wlctiState ? "" : "red" } maxLength={40} name="wlcTi" onChange={e => setWlcTi(e.target.value) } id="num" value={wlcTi} />
</b>

<b className='loc'>

            <label>Welcome Text:</label>
            <input type="text" className={wlcteState ? "" : "red" } maxLength={400} name="wlcTe" onChange={e => setWlcTe(e.target.value) } id="num" value={wlcTe} />
</b>

<b className='loc'>

            <label>Email:</label>
            <input type="text" className={emailState ? "" : "red" } maxLength={40} name="email" onChange={e => setEmail(e.target.value) } id="num" value={email} />
</b>

<div className='social'>



      <b>
          
             <label>Facebook: </label>
            <input type="text" className={Socstate.fb ? "" : "red" } name="soc" onChange={e => setSoc(inpsoc => ({...inpsoc, fb:e.target.value})) } id="soc" value={inpsoc.fb} />
           
            </b>
            <b>
            <label>Whatsapp: </label>
            <input type="text" className={Socstate.wa ? "" : "red" } name="soc" onChange={e => setSoc(inpsoc => ({...inpsoc, wa:e.target.value})) } id="soc" value={inpsoc.wa} />
           
            </b>
            <b>

            <label>Linkedn: </label>
            <input type="text" className={Socstate.ln ? "" : "red" } name="soc" onChange={e => setSoc(inpsoc => ({...inpsoc, ln:e.target.value}))} id="soc" value={inpsoc.ln} />
            
            </b>
             <br/>
          
</div>
<button onClick={handleUpdate}>Update Changes</button>
             </div>
          </div>
           </div>

           <Noti not={not} setNot={setNot}/>

           {loading.load ? 
        <>
        <Loading loading={loading}/>
        </>  
        : null  
        }
        </div>


        </div>
        </div>
        </div>
  )
}

export default Config