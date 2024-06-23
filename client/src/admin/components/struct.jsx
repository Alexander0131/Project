import { useState } from 'react'
import SideBar from '../components/SideBar'
import '../admin.scss';
import Menu from '../components/Menu';
import logo from  '../../assets/logo.png';
import List from '../components/List';
// import Aft from './socialMedia'

function Struct() {
  const [dark, setDark] = useState(false)

  return (
    <>
    <div className={dark ? 'admin-wrapper dark' : 'admin-wrapper'}>
      
     <Menu dark={dark} setDark={setDark} />

           
      </div>
      <div className='flexHead'>
        <SideBar/>
     
      </div>




  </>
  )
}

export default Struct