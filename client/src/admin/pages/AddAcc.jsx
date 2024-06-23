import React, { useEffect, useState } from 'react'
import SideBar from '../components/SideBar'
import Menu from '../components/Menu'
import { AiFillDelete, AiFillPlusCircle, AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import Loading from '../components/Loading';
import { IoArrowBackCircle } from 'react-icons/io5';
import axios from 'axios';
import { fetchData, fetchStatic, fetchUser } from '../../postDb';
import { Link } from 'react-router-dom';
import { apiUrl } from '../../config';


function AddAcc({loading, setLoading}) {
  // const apiUrl = "http://apiUrl:5000";
    const [viewAccs, setViewAccs] = useState(true);
    const [idQuery, setIdQuery] = useState("");
    const [showLog, setShowLog] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [password, setPassword] = useState("");
    const [errFNTxt, setErrFNTxt] = useState("");
    const [errSNTxt, setErrSNTxt] = useState("");
    const [errPLTxt, setErrPLTxt] = useState("");
    const [errPSTxt, setErrPSTxt] = useState("");
    const [accData, setAccData] = useState([]);
    const [posts, setPosts] = useState([]);
    const [stat, setStat] = useState([]);
    const [username, setUsername] = useState("Defex Manager");
    const [conPassword, setConPassword] = useState("password");
    const [userDefexData, setUserDefexData] = useState([]);
    const [passState, setPassState] = useState("password");
    const [accState, setAccState] = useState("");
    const [accDelName, setAccDelName] = useState("");
    const [storeId, setStoreId] = useState("");
    const [eyeState, setEyeState] = useState(<AiFillEyeInvisible className='icon' onClick={() => eyeFunc("password")}/>);
  
    

    
        // setSigningname(user.username);
        
    useEffect(() => {
      async function handleFetch() {
        try {
          const data = await fetchUser();
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
  

    function reqDel(itemId, itemTitle) {
      setStoreId(itemId);
      setAccDelName(itemTitle);

      setShowLog(true);
    }


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

    


       async function auth(e) {
        e.preventDefault();
        setLoading({
          load: true, loadState: "", loadText: "Authenticating..."
      });
          try {
           const response = await axios.post(`${apiUrl}/api/auth0/login`, {
                username: username.toLowerCase(),
                password: conPassword,
                purpose: "delete"
            });
            
            setLoading({
              load: true, loadState: "good", loadText: "please wait..."
            });
            deleteNow(response.data.userId);

    
      
        } catch (error) {
          setLoading({
            load: true, loadState: "bad", loadText: "failed"
        });
        setTimeout(() => {
          setLoading({
            load: false, loadState: "", loadText: "Loading"
        });
        }, 2000)
        }  
        }



      async  function deleteNow(params) {
          try {
            const response = await axios.delete(`${apiUrl}/api/auth0/delete/${storeId}`);

          window.location.href = `/admin/defex/add-account?=${idQuery}`;

          } catch (error) {
            
          }
        }
    

    useEffect(() => {
      async function handleFetch() {
        const data = await fetchUser();
        const postData = await fetchData();
        setPosts(postData);
        
        setAccData(data.filter(item => item.isAdmin === false));
      }
      handleFetch()
    }, [])

    
     function createAcc(e) {
      e.preventDefault();

    const pattern = /[\/)+_$;#@!]/;
    if(firstName.length < 3 || secondName.length < 3 || password.length < 8 || !pattern.test(password)){

      if(firstName.length < 3){
        setErrFNTxt("First name is too short")
    }
    else{
      setErrFNTxt("")

    }
    if(secondName.length < 3){
      setErrSNTxt("Second name is too short")
    }
    else{
      setErrSNTxt("")

    }
    // Password


    
      if(password.length < 8){
        setErrPLTxt("Password should be up to 8 digits");
      }
      else{
        setErrPLTxt("")
  
      }
      if(!pattern.test(password)){
        setErrPSTxt("Password is not strong.")
      }
      else{
        setErrPSTxt("")
  
      }

  }
else{
  setErrFNTxt("");
  setErrSNTxt("");
  setErrPLTxt("");
  setErrPSTxt("");

  async function create() {
    setLoading({
      load: true, loadState: "", loadText: "Creating Account..."
  });
    try {
      const response = await axios.post(`${apiUrl}/api/auth0/register`, {
        username: firstName.toLowerCase() + " " + secondName.toLowerCase(),
        password
      });
      setLoading({
        load: true, loadState: "good", loadText: "Created..."
      });
      setTimeout(() => {
        window.location.href = `/admin/defex/add-account?q=${idQuery}`;
      }, 500)
    } catch (error) {
      setLoading({
        load: true, loadState: "bad", loadText: "failed"
    });
    setTimeout(() => {
      setLoading({
        load: false, loadState: "", loadText: "Loading"
    });
    }, 2000)
    }

  }
  create();
}
  
}

  return (
    <div className='admin-wrapper dark'>
      
    <Menu/>

   
     <div className='flexHead'>
       <SideBar/>
       <div className="sideWrapper">

       {viewAccs ? 
      <div className='addAccPage'>
      <div className="list">
        <div className="titles">

          <b>Username</b><b>Added date</b><b>Delete</b>
        </div>
        <div className="row">
{accData.map((a) => (
  <div key={a._id} className='innerList'>
 
      <div className='caps'><i>{a.username}</i></div>
      <div><i>{a.createdAt.split("T")[0]}</i></div>
      <div><AiFillDelete onClick={() => reqDel(a._id, a.username)} className='delicon'/></div>
        
        
      </div>
      ))}
      
      </div>
      </div>

{stat.length < 4 && 
      <div className="addMain" onClick={() => setViewAccs(false)}>
        <button><AiFillPlusCircle className='icon'/><b>Add new Account</b></button>
      </div>
}


<div className={showLog ? 'cont-wrap show' : 'cont-wrap'}>
          <i>Please note than deleting this is account "{accDelName}" is going to cause a permanent disappearance of this account. Input the admin account information to proceed.</i> 
<form onSubmit={e => auth(e)}>
    Username
    <div className='input'>
    <input type="text" name="username" id="username" placeholder='Please input your username here' onChange={e => setUsername(e.target.value)}/>
    </div>
    Password
    <div className='input'>
    <input type={passState} name="username" id="username" placeholder='Please input your password here' onChange={e => setConPassword(e.target.value)}/>{eyeState}
    </div>
    <Link to={"/admin/defex/forget-password"}>Forget password?</Link><br/>
    {accState}
    <br/>
    <input type="submit" value={"Login"} className='submit'/>
</form>
</div>
</div>
:

<div className="createForm">
        <h3>Create a new Defex Manager</h3>
<form onSubmit={e => createAcc(e)}>
<div onClick={() => setViewAccs(true)}><IoArrowBackCircle style={{color: '#123456', fontSize: '25px', cursor: 'pointer'}}/></div>

    <label><small><i>First Name:</i><br/></small></label>
    <div className='div'>
    <input type="text" placeholder='First Name' value={firstName} onChange={e => setFirstName(e.target.value)}/></div><br/>
    {errFNTxt && 
    <i className="red">*{errFNTxt}</i>
  }
  <br/>
    <label><small><i>Second Name:</i><br/></small></label>
    <div className='div'>
    <input type="text" value={secondName} onChange={e => setSecondName(e.target.value)} placeholder='Second Name'/></div><br/>
    {errSNTxt && 
    <i className="red">*{errSNTxt}</i>
  }
  <br/>
    <label><small><i>Password:</i><br/></small></label>
    <div className='div'>
    <input type={passState} value={password} onChange={e => setPassword(e.target.value)} placeholder='Password'/>{eyeState}
    </div>
    <br/>
    {errPLTxt && 
    <i className="red">*{errPLTxt}</i>
    }
    <br/>
    {errPSTxt && 
    <i className="red">*{errPSTxt}</i>
    }
              
    <br/>
    <input type="submit" className='submit' value="Submit" />

</form>
</div>

}
{loading.load &&
        <Loading loading={loading}/>
        }
    </div>
    </div>
    </div>
  
  )
}

export default AddAcc