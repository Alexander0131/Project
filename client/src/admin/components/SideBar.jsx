To add the active state to all the links, you can use the `isActive` prop provided by `NavLink` from `react-router-dom`. Here's how you can modify your code to include the active state:

```jsx
import { useEffect, useState } from 'react'
import { RiDashboardLine } from 'react-icons/ri'
import { FiActivity } from 'react-icons/fi'
import { IoIosHome, IoIosNotifications } from 'react-icons/io'
import { BiHealth, BiChevronRight } from 'react-icons/bi'
import { CgProfile } from 'react-icons/cg'
import { AiFillSetting, AiOutlineUsergroupAdd } from 'react-icons/ai'
import { NavLink, useLocation } from 'react-router-dom'
import { fetchStatic, fetchUser } from '../../postDb'
import { FaCircleInfo } from "react-icons/fa6";

function SideBar() {
    const [closed, setClosed] = useState(true);
    const [profieImg, setProfileImg] = useState(""); 
    const [profieName, setProfileName] = useState(""); 
    const [isAdmin, setIsAdmin] = useState(false);
    const [pop, setPop] = useState(false);
    const [mini, setMini] = useState(false);
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
                        if (findAcc) {
                            setProfileName(findAcc.username);
                            setIsAdmin(findAcc.isAdmin);
                        }
                    }
                    getAcc()
                }
            } catch (error) {
                // Handle error
            }
        }
        handleFetch();
    }, []);

    return (
        <div className='sider'>
            <div className={pop || mini ? "popup" : "popup hide"} onClick={() => setPop(false)}>  
                <div className='main-pop'> Hello</div> 
            </div>
            <nav>
                <div className='nav-wrap'>
                    <div className='icons'>

                        <NavLink to="/" className={({ isActive }) => (isActive ? 'sub on active' : 'sub on')}>
                            <button><IoIosHome className='icon'/></button> 
                            <b>Home</b>
                        </NavLink>

                        <NavLink to={`/admin/defex`} className={({ isActive }) => (isActive ? 'sub on active' : 'sub on')}>
                            <button><RiDashboardLine className='icon'/></button> 
                            <b>Dashboard</b>
                        </NavLink>

                        <NavLink to={`/admin/defex/site-health`} className={({ isActive }) => (isActive ? 'sub on active' : 'sub on')}>
                            <button><BiHealth className='icon'/></button> 
                            <b>Site Health</b>
                        </NavLink>

                        <NavLink to={`/admin/defex/configure`} className={({ isActive }) => (isActive ? 'sub on active' : 'sub on')}>
                            <button><AiFillSetting className='icon'/></button> 
                            <b>Configure</b>
                        </NavLink>
                    </div>

                    <div className='poss'>
                        <div className={closed ? 'sub on' : 'sub'}>
                            <button>
                                <FaCircleInfo onClick={() => setPop(true)} className='icon'/>
                            </button> 
                            <b style={{ textTransform: "capitalize" }}>Info</b>
                        </div>

                        {isAdmin && 
                            <NavLink to="/admin/defex/add-account" className={({ isActive }) => (isActive ? 'sub on active' : 'sub on')}>
                                <button><AiOutlineUsergroupAdd className='icon'/></button> 
                                <b>Add Account</b>
                            </NavLink>
                        }

                        <NavLink to={`/admin/defex/account`} className={({ isActive }) => (isActive ? 'sub on active' : 'sub on')}>
                            <button>
                                <CgProfile className='icon'/>
                            </button> 
                            <b style={{ textTransform: "capitalize" }}>{profieName}</b>
                        </NavLink>
                    </div>
                    <button className='closeBtn' onClick={() => setClosed(closed ? false : true)}>
                        <BiChevronRight className={closed ? 'icon' : 'icon on'}/>
                    </button>
                </div>
            </nav>
        </div>
    )
}

export default SideBar
```

In this code, the `className` for each `NavLink` is set based on whether the link is active or not using the `isActive` prop. The `active` class is added when the link is active. You can adjust the styles in your CSS to reflect the active state appropriately.