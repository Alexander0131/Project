import React, { useEffect, useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { Link, redirect, useLocation } from 'react-router-dom';
import "../components/account.scss"
import axios from 'axios';
import bgBack from '../../assets/staff.jpg'
import Loading from '../components/Loading';
import { fetchStatic, fetchUser } from '../../postDb';
import { apiUrl } from '../../config';

function LoginPage({setLogin, login, loading, setLoading}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("password");
    const [userDefexData, setUserDefexData] = useState([]);
    const [passState, setPassState] = useState("password");
    const [accState, setAccState] = useState("")
    const [eyeState, setEyeState] = useState(<AiFillEyeInvisible className='icon' onClick={() => eyeFunc("password")}/>);



    
    const location = useLocation();
    const idQuery = new URLSearchParams(location.search).get('q');
  
     // Check for saved user information in local storage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUsername(user.username);
    }
  }, []);
    
    useEffect(() => {
      async function handleFetch() {
        try {
          const data = await fetchUser();
          function findAcc() {
          const findAccount = data.find(item => item._id === idQuery);
          setUsername(findAccount.username)
          }
          findAcc();
        } catch (error) {

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

    

       async function auth(e) {
        e.preventDefault();
        setLoading({
          load: true, loadState: "", loadText: "Authenticating..."
      });
          try {
           const response = await axios.post(`${apiUrl}/api/auth0/login`, {
                username: username.toLowerCase(),
                password: password,
                purpose: "login"
            });
            setLoading({
              load: true, loadState: "good", loadText: "please wait..."
            });

            localStorage.setItem("user", JSON.stringify({ username: username, password: password, userId: response.data.userId }));
      
            redir(response.data.userId);

          setLogin(true)
      
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
        
        
    function redir(userId) {
      window.location.href = `/admin/defex?q=${userId}`;
    }
        
      
      return (
    <div className='login-page'>
      <img className='bgimgin' src={bgBack} alt="" />
        <div className='logform'>

        <div>
            <h2>Welcome to Defex Admin dashboard</h2>
        </div>
        <div className='cont-wrap'>
            
            <form  onSubmit={e => auth(e)}>
                Username
                <div className='input'>
                <input type="text" name="username" id="username" value={username} placeholder='Please input your username here' onChange={e => setUsername(e.target.value)}/>
                </div>
                Password
                <div className='input'>
                <input type={passState} name="username"
                  id="username" placeholder='Please input your password here' onChange={e => setPassword(e.target.value)}/>{eyeState}
                </div>
                {accState}
                <div className='logFlex'>
                <Link to={"/admin/defex/restore-account"}>Forget password?</Link>
                <input type="submit" value={"Login"} className='submit'/>
                </div>
            </form>
        </div>
        </div>
        {loading.load &&
        <Loading loading={loading}/>
        }
    </div>
  )
}
 
export default LoginPage