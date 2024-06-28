import React, { useEffect, useState } from 'react'
import Menu from '../components/Menu'
import SideBar from '../components/SideBar'
import { Link } from 'react-router-dom';
import { fetchData, fetchStatic, fetchUser } from '../../postDb';
import axios from 'axios';
import { BiEdit } from 'react-icons/bi';
import Loading from '../components/Loading';
import { IoArrowBackCircle } from 'react-icons/io5';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { apiUrl } from '../../config';


function Account({ setLoading, loading}) {
    const [username, setUsername] = useState("");
    const [idQuery, setIdQuery] = useState("");
    const [newPass, setNewPass] = useState("");
    const [conPass, setConPass] = useState("");
    const [password, setPassword] = useState("");
    const [passMsg, setPassMsg] = useState("");
    const [post, setPost] = useState([]);
    const [passLMsg, setPassLMsg] = useState("");
    const [passDet, setPassDet] = useState("");
    const [passState, setPassState] = useState("password");
    const [conMsg, setConMsg] = useState("");
    const [editTxt, setEditTxt] = useState("");
    const [toEdit, setToEdit] = useState(true);
    const [editName, setEditName] = useState(false);
    const [allow, setAllow] = useState(true);
    const [editPass, setEditPass] = useState(false);
    const [editBoth, setEditBoth] = useState(false);
    const [posts, setPosts] = useState([]);
    const [eyeState, setEyeState] = useState(<AiFillEyeInvisible className='icon' onClick={() => eyeFunc("password")}/>);


    

    
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
  



  
  function eyeFunc(passType) {
    if(passType === "password"){
    setPassState("text");
    setEyeState(<AiFillEye className='icon' onClick={() => eyeFunc("text")}/>);
    }
    else{
    setPassState("password");
        setEyeState(<AiFillEyeInvisible className='icon' onClick={() => eyeFunc("password")}/>);
    }
}

  // scan the static to see 

  useEffect(() => {
  async function handleFetch(event) {
    try {
      const data = await fetchUser();
      const postData = await fetchData();
      setPost(postData);
      setPosts(data);
      function findAcc() {
          const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const user = JSON.parse(storedUser);
          auth(event, user.username, user.password, user.userId);
          setIdQuery(user.userId);
          setUsername(user.username);
      
      

      
          // setSigningname(user.username);
          
          async function auth(e, username, password, userId) {
            // e.preventDefault();
             
              try { 
               const response = await axios.post(`${apiUrl}/api/auth0/login`, {
                    username: username.toLowerCase(),
                    password: password,
                    purpose: "login"
                });
               
                // window.location.href = `/admin/defex/account?=${userId}`;
          
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


function newPassword(e) {
  e.preventDefault();
  setPassMsg("")
  setNewPass(e.target.value);
  
}
function conPassword(e) {
  setConPass(e.target.value);
  if(newPass !== e.target.value){
    setConMsg("Passwords don't match")
  }
  else if(e.target.value == ""){
    setConMsg("")

  }
  else{
    setConMsg("")
  }
}
function updateAcc(e) {
  e.preventDefault();
  setLoading({
    load: true,
    loadState: 'bad',
    loadText: 'Wrong Password',
  });
  
  
  setTimeout(() => {
    setLoading({ load: false, loadState: '', loadText: 'Loading...' });
  }, 1500);

  if(editBoth || editPass){



    const pattern = /[\/)+_$;#@!*(-1234567890=]/;
    if(newPass.length < 8 || !pattern.test(newPass) || newPass !== conPass || username.length < 5 || password === ""){
      if(newPass.length < 8){
        setPassLMsg("Password should be up to 8 digits");
      }
      else{
        setPassLMsg("")
      }
      if(!pattern.test(newPass)){
        setPassMsg("Password is not strong.")
      }
      else{
        setPassMsg("")
      }
      if(newPass !== conPass){
        setConMsg("Passowrds don't match");
    }
    else{
        setConMsg("")
    }
      if(password === ""){
        setPassDet("Password must be provided");
      }
      else{
        setPassDet("")  
      }
    }
    else{
      // setIsPassword(true);
      
      async function handleAccEdit(){
      setLoading({ load: true, loadState: '', loadText: 'Editing...' });

        try {
          
       
        const response = await axios.put(`${apiUrl}/api/auth0/account/edit/${idQuery}`, {
          username: username.toLowerCase(),
          conPass,
          allow: allow,
          password
        });

        setLoading({ load: true, loadState: 'good', loadText: 'Loaded' });

        setTimeout(() => {
          setLoading({ load: false, loadState: '', loadText: 'Loading...' });
          window.location.href = "/admin/defex/account";

        }, 1500);

      } catch (error) {

        setLoading({
          load: true,
          loadState: 'bad',
          loadText: 'Failed',
        });
        
        
        setTimeout(() => {
          setLoading({ load: false, loadState: '', loadText: 'Loading...' });
        }, 1500);
        
        setEditTxt(error.message)
        
      }
    }
    
    handleAccEdit()
  }
    
  }
  else{
    if(editName && username.length > 5 && password !== ""){
      setPassDet("")
      async function editNameAct() {
      setLoading({ load: true, loadState: '', loadText: 'Editing Name...' });
        
        try {
                  
          
          const response = await axios.put(`${apiUrl}/api/auth0/account/edit/${idQuery}`, {
            username: username.toLowerCase(),
            conPass: "",
            allow,
            password,
          });

          setLoading({ load: true, loadState: 'good', loadText: 'Loaded' });

        setTimeout(() => {
          window.location.href = "/admin/defex/account";
          setLoading({ load: false, loadState: '', loadText: 'Loading...' });
          
        }, 1500);

        } catch (error) {
      setPassDet("Wrong Password")


          setLoading({
            load: true,
            loadState: 'bad',
            loadText: 'Failed',
          });
          
          
          setTimeout(() => {
            setLoading({ load: false, loadState: '', loadText: 'Loading...' });

            

          }, 1500);
          setEditTxt(error.message)
        }
      }
      editNameAct();
    
  }
    else{
      if(username.length < 5){

        setEditTxt("Please user name can't be less than 5 digit.");
      }
      if(password === ""){
        setPassDet("Please a password must be provided")
      }
    }
  }
  
  

}

function editOnlyName() {
  setEditName(true);
  setToEdit(false)
}

function editOnlyPass() {
  setEditPass(true);
  setEditBoth(false)
  setToEdit(false)
}

function editAll() {
  setEditBoth(true);
  setEditName(false)
  setToEdit(false)
}
function returnToBase(){
  setToEdit(true);
  setEditBoth(false);
  setEditName(false);
  setEditPass(false);
}

return (
        <div className='admin-wrapper dark'>
      
        <Menu/>
   
       
         <div className='flexHead'>
           <SideBar/>
           <div className="sideWrapper">

          <div className='manAcc'>

            <div className="switch">
              Switch Accounts
              <div className='uni'>
                {/* This case only password will be required */}
                {posts.map((a) => (
                  <div key={a._id}>
                      <Link to={`/admin/defex/login?q=${a._id}`}>
              <span className='wrap'>{a.username.slice(0,2).toUpperCase()}</span><b className='caps'>{a.username}</b>

                
              </Link>
                  </div>
                ))}
            
           
                </div>
            </div>
            <h2>Manage Account</h2>
            <div>
          {toEdit ?
            <div className="toEdit">
              <div onClick={editOnlyName}>Manage Name: 
                <button>{username}</button><BiEdit className='icon'/>
              </div>
              <div onClick={editOnlyPass}>Manage Password 
                <BiEdit className='icon'/>
              </div>
              <div onClick={editAll}>Manage Both 
                <BiEdit className='icon'/>
              </div>
            </div>
:
<>
{editName && 
<form onSubmit={e => updateAcc(e)}>
  <div onClick={returnToBase}><IoArrowBackCircle style={{color: '#123456', fontSize: '25px', cursor: 'pointer'}}/></div>
<sub> <b>Edit user name:</b></sub><br/>
                <input value={username} type='text' placeholder='User name is loading...' required onChange={e => setUsername(e.target.value)} /><br/>
             
                 
                <sub> <b>Enter current password to make changes:</b></sub>
              <div  className="inputS">
                <input type={passState} placeholder='Enter current password' value={password} onChange={e => setPassword(e.target.value)}/>{eyeState}
              </div>
              {passDet &&
                <>
                <i className="red">*{passDet}</i>
                </>
              }
                <small><b><i>{editTxt}</i></b></small>
                <button type='submit'    className="submit">Update</button>
                </form>
}
{editPass &&

<form onSubmit={e => updateAcc(e)}>
<div onClick={returnToBase}><IoArrowBackCircle style={{color: '#123456', fontSize: '25px', cursor: 'pointer'}}/></div>

<sub> <b>Enter new password:</b>
                <div className="inputS">

                <input type={passState} value={newPass} onChange={e => newPassword(e)} placeholder="New password" />{eyeState}
                </div>
                {passLMsg &&
                <>
                <i className="red">*{passLMsg}</i>
                </>
              }
              {passMsg &&
                <>
                <br/>
                <i className="red">*{passMsg}</i>
                </>
              }
                </sub>
                
                <br/>
                <sub> <b>Confirm new password:</b>
                </sub>
              <div className="inputS">
              <input type={passState} onChange={e => conPassword(e)} placeholder="Confirm password" />{eyeState} 
              </div>
              {conMsg &&
                <>
                <i className="red">*{conMsg}</i>
                </>
              }  
                 
              <sub> <b>Enter current password to make changes:</b></sub>
              <div  className="inputS">
                <input type={passState} placeholder='Enter current password' value={password} onChange={e => setPassword(e.target.value)}/>{eyeState}
              </div>
              {passDet &&
                <>
                <i className="red">*{passDet}</i>
                </>
              }
<small><b><i>{editTxt}</i></b></small>
<button type='submit' className="submit">Update</button>
</form> 

}


{editBoth &&
<form onSubmit={e => updateAcc(e)}>
  <div onClick={returnToBase}><IoArrowBackCircle style={{color: '#123456', fontSize: '25px', cursor: 'pointer'}}/></div>

<sub> <b>Edit user name:</b></sub><br/>
                <input className='inputS' value={username} type='text' placeholder='User name is loading...' onChange={e => setUsername(e.target.value)} /><br/>
               
                <sub> <b>Enter new password:</b>
                <div className="inputS">

                <input type={passState} value={newPass} onChange={e => newPassword(e)} placeholder="New password" />{eyeState}
                </div>
                {passLMsg &&
                <>
                <i className="red">*{passLMsg}</i>
                </>
              }
              {passMsg &&
                <>
                <br/>
                <i className="red">*{passMsg}</i>
                </>
              }
                </sub>
                
                <br/>
                <sub> <b>Confirm new password:</b>
                </sub>
              <div className="inputS">
              <input type={passState} onChange={e => conPassword(e)} placeholder="Confirm password" />{eyeState} 
              </div>
              {conMsg &&
                <>
                <i className="red">*{conMsg}</i>
                </>
              }  
                 
              <sub> <b>Enter current password to make changes:</b></sub>
              <div  className="inputS">
                <input type={passState} placeholder='Enter current password' value={password} onChange={e => setPassword(e.target.value)}/>{eyeState}
              </div>
              {passDet &&
                <>
                <i className="red">*{passDet}</i>
                </>
              }

                <small><b><i>{editTxt}</i></b></small>
                <button type='submit' className="submit">Update</button>
                </form> }
                </>

            }
                <div className="info">
                  <ul>
                    <li>Posts created {post.filter(i=> i.mod[0] === idQuery).length},</li>
                    <li>Posts edited {post.filter(i=> i.mod[1] === idQuery).length}</li>
                  </ul>
                </div>
            </div>
          </div>
              </div>
         </div>
    
      {loading.load ? (
        <Loading loading={loading} />
      ) : null}
   
   
       </div>
  )
}

export default Account