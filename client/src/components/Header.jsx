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
import HeadSlider from './HeaderSlide'

//Please note that this page is in charge of all the heading aspect of this site. and the styling of this page is located at the components.scss in the components folder.



function Header({slideData}) {
  const [sState, setsState] = useState(false);
  const [sStateB, setsStateB] = useState(false);
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
  } else{
    setsState(true)
    }
  }

  
  const ctrlMenuB = () => {
    if(sStateB === true){
   setsStateB(false)
  } else{
    setsStateB(true)
    }
  } 
   
  return (
    <div className='overall-wrap'>
    <div className='overall'>
      <div className='inner-content'> 
          <div className='mobile'>
            <span className='wrap'>

           <span >
            {sState ? <MdClose style={{color: 'white', fontSize: '20px', border: '2px solid white', borderRadius: '3px'}} onClick={ctrlMenu}/> : <MdMenu style={{fontSize: '20px', color: 'white'}} onClick={ctrlMenu}/>}
            </span>   
          <Menu place={"outer"} sState={sState} setsState={setsState}/>
            </span>
              <span className='span'><SearchComp search={search} setSearch={setSearch}/></span>


      </div>

      
          {/* <Navbar handOver={handOver} setsState={setsState} sState={sState}/>  */}
        <div className="pcHeader">
          <span>
            <Navbar/>
          </span>
          <span>
            <SearchComp/>
          </span>

         

         
          
        </div>
</div>
          
{/* Begin of second face */}

    <div className='wrapTwoNav'>
      <img src={logo} alt="" />

      <div className="pcHeader">
          <span>
            <Navbar place={'inner'}/>
          </span>
        </div>

        <div className="mobile naver">
        <span>
            {sStateB ? <MdClose style={{color: '#555', fontSize: '20px', border: '2px solid white', borderRadius: '3px'}} onClick={ctrlMenuB}/> : <MdMenu style={{fontSize: '20px', color: '#555'}} onClick={ctrlMenuB}/>}
            </span>  

{sStateB && 
            <Menu place={"inner"} sStateB={sStateB} setsStateB={setsStateB}/>
}


        </div>

      <div className='contactBtn'>
      <NavLink className={({isActive}) => isActive ? 'activehref' : ''} to={`/contact`}>
          Contact Us  
      </NavLink>
      </div>

    </div>
       

       </div>
  {slideData && 
        <HeadSlider />
  }
       </div>
      )
}

export default Header