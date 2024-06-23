import { AiFillMessage, AiOutlinePlus } from 'react-icons/ai'
import { NavLink, useLocation } from 'react-router-dom'
import { BsSearch } from 'react-icons/bs'
import { FaListUl } from 'react-icons/fa'
import logo from  '../../assets/logo.png';
import { useState } from 'react'
import Theme from '../../components/theme';

function Menu() {
  const location = useLocation();

  const idQuery = new URLSearchParams(location.search).get('q');


  return (

    <div className="header">


     <img className='logoDash' src={logo} alt=""/> 
        <div className="wrap">
         <div></div>
         <div id="flex">

                               <div className="wrap-tool">
                <button>

                <NavLink to={`/admin/defex/new`}>
                        <AiOutlinePlus className='icon'/><br/>
                     <small>Add</small>
                    </NavLink>
                    </button>

                    <button >                    <NavLink to={`/admin/defex/list`}>
                        <FaListUl className='icon'/><br/>
                     <small>List</small>
                    </NavLink>
                    </button>

                </div>
<Theme/>
                    
         </div>



        </div>
                     </div>
  )
}

export default Menu