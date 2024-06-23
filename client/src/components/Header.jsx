import logo from '../assets/logo.png'
import './components.scss'
import { MdMenu, MdClose } from 'react-icons/md'
// import {doc} from '../doc.js'
import { useEffect, useState } from 'react'
import Menu from './Menu'
import Navbar from './Navbar' 
import { Link, NavLink } from 'react-router-dom'
import SearchComp from './Search'
import { fetchStatic } from '../postDb'
import Theme from './theme'

//Please note that this page is in charge of all the heading aspect of this site. and the styling of this page is located at the components.scss in the components folder.



function Header() {
  const [sState, setsState] = useState(false);
  const [search, setSearch] = useState(false);
  const [doc, setDoc] = useState([]);

  useEffect(() => {
    async function handleFetch() {
      try {
        const data = await fetchStatic();
        data.filter(item => item.cat === "static" && item.title === "numbers").map((a) => {
          setDoc(a.link[0]);        
        })
      } catch (error) {
        
      }
    }
    handleFetch();
  }, []);

  const handOver = () => {
    document.body.style.overflow = 'auto';
    setsState(false);
  };


  const ctrlMenu = () => {
    if(sState === true){
   setsState(false)
   document.body.style.overflow = "auto";
  } else{
    setsState(true)
    document.body.style.overflow = "hidden";
    }
  }
   
  return (
    <div className='overall-wrap'>
    <div className='overall'>
      <div className='inner-content'>
       <Link to={"/"} className='logoA'>
        <img src={logo} className='logo' alt="" />
       </Link>  
          <div className='mobile' onClick={ctrlMenu}>
              {sState ? <MdClose/> : <MdMenu/>}
          </div>

      </div>
          <Navbar handOver={handOver} setsState={setsState} sState={sState}/> 
        <div className="address">
          <div className='contact'>
            <p><b>Call us {doc.slice(0,3)} {doc.slice(3,6)} {doc.slice(6,10)}</b></p>
            <Theme/>
          </div>
          {search === false ? (

            <div className='sideOut'>
            <div>

           <NavLink  onClick={handOver} className={({isActive}) => isActive ? 'activehref' : ''}
           to="/feed"
           >Feed</NavLink>
           <NavLink
           onClick={handOver} className={({isActive}) => isActive ? 'activehref' : ''}
           to="/contact"
           >Contact Us</NavLink>
           </div>
           <SearchComp search={search} setSearch={setSearch}/>
          </div>
          ) :
          <div className='sideOut active'>
          <SearchComp search={search} setSearch={setSearch}/>
          </div>
          }
          
        </div>
          
       <Menu sState={sState} setsState={setsState}/>

       

       </div>
       </div>
      )
}

export default Header