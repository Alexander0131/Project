import React, { useEffect, useState } from 'react'
import { fetchUser } from '../../postDb';
import Loading from '../components/Loading';
import axios from 'axios';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import emailjs from 'emailjs-com';
import { apiUrl } from '../../config';



function Forgot({loading, setLoading}) {
    const [errMsg, setErrMsg] = useState("");
    const [username, setUsername] = useState("");
    const [resetedPass, setResetedPass] = useState("");
    const [conPass, setConPass] = useState("");
    const [conMsg, setConMsg] = useState("");
    const [codeReq, setCodeReq] = useState(false);
    const [coded, setCoded] = useState(false);
    const [det, setDet] = useState(true);
    const [passMsg, setPassMsg] = useState("");
    const [passLMsg, setPassLMsg] = useState("");
    const [con, setCon] = useState(0);
    const [resetPass, setResetPasss] = useState(false);
    const [allow, setAllow] = useState(true);
    const [passState, setPassState] = useState("password");
    const [fogIdr, setFogIdr] = useState("");
    const [eyeState, setEyeState] = useState(<AiFillEyeInvisible className='icon' onClick={() => eyeFunc("password")}/>);


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

    useEffect(() => {
        var shufled = "";
        const poss = "01352737282524389890804749337483";
        for(var i = 0; i < 6; i++){
            const shufle = poss[Math.floor(Math.random() * poss.length)];
            shufled += shufle;
        }
        setCoded(shufled);

      }, [])
        


   async function reqNewPass(e) {
    e.preventDefault();
        if(username){
            setLoading({
                load: true, loadState: "", loadText: "Searching..."
            });
            const data = await fetchUser();

            function findAccount() {  
                const findAcc = data.find(i => i.username === username.toLowerCase());

                if(findAcc){
                    setFogIdr(findAcc._id);
                    setLoading({
                        load: true, loadState: "good", loadText: "Successful"
                      });
                      setTimeout(() => {
                        setLoading({
                          load: false, loadState: "", loadText: "Loading"
                      });

                      async function forget(fogId, fogName) { 
                        try {
                            const response = await axios.put(`${apiUrl}/api/auth0/account/edit/${fogId}`,{
                                username: fogName,
                                conPass: coded,
                                purpose: "forgetPass",
                                allow: allow,
                                password: "" 
                            });
                            setDet(false);
                            setCodeReq(true) 
                            emailjs.sendForm('service_dozv0ck', 'template_7biytqf', e.target, 'Ba88mfEJE2By2jU1N');
  
                         
                        } catch (error) {
                        }
                      }
                      forget(findAcc._id, findAcc.title);



                      }, 2000);
                    
                }else{
                    setErrMsg("Account name was not found");
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
            findAccount()
        }else{
            setErrMsg("Please Username can't be empty")
        }
    }

    async function checkCode(e) {
        e.preventDefault()
       if(con){
        setLoading({
            load: true, loadState: "", loadText: "Comparing..."
        });
        try {
            const response = await axios.post(`${apiUrl}/api/auth0/login`,{
                username: username.toLowerCase(),
                purpose: "login",
                password: con 
            });  
            setResetPasss(true)
            setCodeReq(false);
            setLoading({
                load: true, loadState: "good", loadText: "Successful"
              });
              setTimeout(() => {
                setLoading({
                  load: false, loadState: "", loadText: "Loading"
              });
            }, 2000);
        } catch (error) {
            setLoading({
                load: true, loadState: "bad", loadText: "failed"
              });
              setTimeout(() => {
                setLoading({
                  load: false, loadState: "", loadText: "Loading"
              });
            }, 2000);
            }
       }
    }

   async function setNewPass(e) {
    e.preventDefault();
    const pattern = /[\/)+_$;#@!*(-1234567890=]/;
    if(resetedPass.length < 8 || !pattern.test(resetedPass) || resetedPass !== conPass){
        if(resetedPass.length < 8){
          setPassLMsg("Password should be up to 8 digits");
        }
       
        else{
          setPassLMsg("")
        }
        if(resetedPass !== conPass){
            setConMsg("Passowrds don't match");
        }
        else{
            setConMsg("")
        }
        if(!pattern.test(resetedPass)){
          setPassMsg("Password is not strong.")
        }
        else{
          setPassMsg("")
        }
      }
      else{
          setPassLMsg("")
          setConMsg("")
            setPassMsg("")
          // setIsPassword(true);
          setLoading({
            load: true, loadState: "", loadText: "Reseting"
        }); 
        try {
            const response = await axios.put(`${apiUrl}/api/auth0/account/edit/${fogIdr}`,{
                username: username.toLowerCase(),
                conPass: resetedPass,
                password: con,
                allow: allow  
            });
            setLoading({
                load: true, loadState: "good", loadText: "Reseted"
            });
            setTimeout(() => {
                window.location.href = "/admin/defex/login"
                setLoading({
                  load: false, loadState: "", loadText: "Loading"
                  
              });
            }, 2000);
            setAllow(false);
        } catch (error) {
            setLoading({
                load: true, loadState: "bad", loadText: "failed"
            });
            setTimeout(() => {
                setLoading({
                  load: false, loadState: "", loadText: "Loading"
              });
            }, 2000);

            }
        }
    }

  return (
    <div>
       
       <div className="forgot-page">
{det && 
<div>

        <form onSubmit={reqNewPass}>
            <input type="text" name='name' className='input' onChange={e => setUsername(e.target.value)} placeholder='Please enter your username'/>
    <input hidden type="number" onChange={setCoded} name="code" value={coded}/>
            {errMsg && <i className='red'>*{errMsg}</i>}

            <input type="submit" className='submit' value="Get a Code" />
        </form>
</div>
}
{codeReq &&

        <div>
            <small>
                Please a code have been sent to the site official email address def......@gmail.com<br/>
                Note that this code will no longer be availble after 3 minutes time.
            </small>
<form onSubmit={e => checkCode(e)}>
<small>Please enter the 6 digit code here:</small>
            <input type="number" className='input' placeholder='input the six digit code here.' value={con} onChange={e => setCon(e.target.value)}/>
<br/>
            {errMsg && <i className='red'>*{errMsg}</i>}
            <button className='submit'>Proceed</button>
</form>
        </div>
}
{resetPass && 
        <div>
            Reset Password
            <small>*Please note that leaving the recovery password is not wise.<br/> The recovery password will not longer be available after 3 minutes.</small>

            <form onSubmit={e => setNewPass(e)}>
                <small>Enter new password </small>
                <div className='input'>

            <input type={passState} onChange={e => setResetedPass(e.target.value)} placeholder='Please enter your new password'/>{eyeState}
                </div>
                <small>Confirm Password</small>
                <div className='input'>

            <input type={passState} onChange={e => setConPass(e.target.value)} placeholder='Please confirm your password'/>{eyeState}
                </div>
                {conMsg &&
                <i className="red">*{conMsg}</i>
              }
                {passLMsg &&
                <i className="red">*{passLMsg}</i>
              } 
              {passMsg &&
                <i className="red">*{passMsg}</i>
              } 
            {errMsg && <i className='red'>{errMsg}</i>}

            <input type="submit" className='submit' value="Save Changes" />
        </form>

        </div> 
}
       </div>
       
{loading.load &&
        <Loading loading={loading}/>
        }
      
       </div>
  )         
}

export default Forgot