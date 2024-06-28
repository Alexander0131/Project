import { useEffect, useState } from 'react'
import { RiDashboardLine } from 'react-icons/ri'
import { FiActivity } from 'react-icons/fi'
import { IoIosHome, IoIosNotifications } from 'react-icons/io'
import { BiHealth, BiChevronRight } from 'react-icons/bi'
import { CgProfile } from 'react-icons/cg'
import {AiFillSetting, AiOutlineUsergroupAdd } from 'react-icons/ai'
import { NavLink, useLocation } from 'react-router-dom'
import { fetchStatic, fetchUser } from '../../postDb'

function SideBar() {
    const [closed, setClosed] = useState(true);
    const [profieImg, setProfileImg] = useState(""); 
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
    <div>
            
        <nav>
            <div className='nav-wrap'>
                <div className='icons'>

                <NavLink to="/" className={closed ? 'sub on' : 'sub'}><button ><IoIosHome className='icon'/></button> <b>Home</b></NavLink>

                <NavLink to={`/admin/defex`} className={closed ? 'sub on' : 'sub'}><button><RiDashboardLine className='icon'/></button> <b>Dashboard</b></NavLink>

                
 
                <NavLink to={`/admin/defex/site-health`} className={closed ? 'sub on' : 'sub'}><button><BiHealth className='icon'/></button> <b>Site Health</b></NavLink>

                <NavLink to={`/admin/defex/configure`} className={closed ? 'sub on' : 'sub'}><button><AiFillSetting className='icon'/></button> <b>Configure</b></NavLink>
                </div>


                <div className='poss'>
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