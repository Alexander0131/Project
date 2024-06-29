import { useEffect, useState } from 'react'
import { RiDashboardLine } from 'react-icons/ri'
import { FiActivity } from 'react-icons/fi'
import { IoIosHome, IoIosNotifications } from 'react-icons/io'
import { BiHealth, BiChevronRight } from 'react-icons/bi'
import { FaInfoCircle } from 'react-icons/fa'
import { CgProfile } from 'react-icons/cg'
import {AiFillSetting, AiOutlineUsergroupAdd } from 'react-icons/ai'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { fetchStatic, fetchUser } from '../../postDb'

function SideBar() {
    const [closed, setClosed] = useState(true);
    const [profieImg, setProfileImg] = useState(""); 
  const [pop, setPop] = useState(false);
  const [profieName, setProfileName] = useState(""); 
    const [isAdmin, setIsAdmin] = useState(false);

    const location = useLocation();
    const idQuery = new URLSearchParams(location.search).get('q');
    
    useEffect(() => {
     async function handleFetch() {
      try {
        const data = await fetchUser();
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const user = JSON.parse(storedUser);
             function getAcc() {
            const findAcc = data.find(item => item._id === user.userId);
            if(findAcc){
              setProfileName(findAcc.username);
              setIsAdmin(findAcc.isAdmin);
            }
            
          }
          getAcc()
        }
      } catch (error) {
        
      }
      }
      handleFetch();
    }, [])


  return (
    <div className='sider'>
            
        <nav>
            <div className='nav-wrap'>

            <div onClick={() => setPop(false)} className={pop ? 'popup' : 'popup hide'}>
          <div className="main-pop" align="center">
                Hey defex, this software was built by CEACID softwares and here are few guildlines to know as an moderator of this site.

                <ul>
                  <li>Please every post or upload that you must do on this site must contain an image.</li>
                  <li>Please if you are adding a title of a sublink your text must not be up to 10 letters, else your post may disapear umder three days, or modified</li>
                  <li>Please don't open an image library without selecting or reselecting and image.</li>
                  <li>Please do not share your account details to external bodies, or people who don't have anything to do with this company.</li>
                  <li>Every activity been done by any user is being record for future reference, be it "Deleting". "Creatin post", or "editing post".</li>

                  <li>Please note that every email being sent to this site goes to the company email address and not personal email addresses</li>
                </ul>
          <small>V1.0</small>
          <div>Visit us:</div>
          <Link>CEACID </Link>
        </div>
        </div>


                <div className='icons'>

                <NavLink to="/" className={closed ? 'sub on' : 'sub'}><button ><IoIosHome className='icon'/></button> <b>Home</b></NavLink>

                <NavLink to={`/admin/defex`} className={closed ? 'sub on' : 'sub'}><button><RiDashboardLine className='icon'/></button> <b>Dashboard</b></NavLink>

                
 
                <NavLink to={`/admin/defex/site-health`} className={closed ? 'sub on' : 'sub'}><button><BiHealth className='icon'/></button> <b>Site Health</b></NavLink>

                <NavLink to={`/admin/defex/configure`} className={closed ? 'sub on' : 'sub'}><button><AiFillSetting className='icon'/></button> <b>Configure</b></NavLink>
                </div>


                <div className='poss'>
                  <span onClick={() => setPop(true)} className={closed ? 'sub on' : 'sub'}>

               <button><FaInfoCircle className='icon'/></button> <b>Info</b>

                  </span>



    {isAdmin && 
                <NavLink to="/admin/defex/add-account" className={closed ? 'sub on' : 'sub'}><button><AiOutlineUsergroupAdd className='icon'/></button> <b>Add Account</b></NavLink>
                }
                

                <NavLink to={`/admin/defex/account`} className={closed ? 'sub on' : 'sub'}><button>
              
                 
                  <CgProfile className='icon'/>
            
                </button> <b style={{textTransform: "capitalize"}}>{profieName}</b></NavLink>

                </div>
                <button className='closeBtn' onClick={() => setClosed(closed ? false : true)}><BiChevronRight className={closed ? 'icon' : 'icon on'}/></button>
            </div>
        </nav>
    </div>
  )
}

export default SideBar