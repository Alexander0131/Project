import logo from '../assets/logo.png'
import { MdLocationOn } from 'react-icons/md'
import { BsHeadset, BsFacebook, BsTwitter, BsWhatsapp, BsLinkedin } from 'react-icons/bs'
import {doc} from '../doc'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import  MiniLoading from '../admin/components/MiniLoad'
import { fetchStatic } from '../postDb'

function Footer() {
    const d = new Date();
    const year = d.getFullYear();

    const [posts, setPosts] = useState();
    const [loc, setLoc] = useState("");
    const [loaded, setLoaded] = useState(false);

      const [soc, setSoc] = useState({
      fb: "",
      wa: "",
      ln: ""
    })

    useEffect(() => {
      async function handleFetchData() {
        const data = await fetchStatic();
        setPosts(data)
        data.filter(item => item.cat === "static" && item.title === "social").map((a) => {
                  setSoc({
          fb: a.link[0],
          wa: a.link[1],
          ln: a.link[2]
        });
        data.filter(item => item.cat === "static" && item.title === "locat").map((a) => {
          setLoc(a.link[0])
        });

        })
      }
      handleFetchData();
    }, []);
  return (
    <div>
      <div className="loaderdiv">
        {posts ? null : <MiniLoading/>}
      </div>
        <footer>
       <div className="footer">
        <div className='company'>
            <img src={logo} alt="defex"/>
        </div>

        <div className="contAbt">

        <div>
            <h4>Contact Us</h4>
            <div className='contact-footer'>
            <span>
              <MdLocationOn className='icon'/>
              <p>Address <br/>{loc}</p>
            </span>
            <span>
              <BsHeadset className='icon'/>
              <p>Call us <br/>{posts ?<b> {soc.wa.slice(0,3)} {soc.wa.slice(3,6)} {soc.wa.slice(6,10)} </b> : <b>024 409 2667</b>}</p>
            </span>
        </div> 

        </div>

        <div className='abtus'> 
            <Link to="/about">
            <h3>About us</h3>
            De-fex is a privately owned engineering and construction company which serves heavy mining, industrial and petrochemical construction industries both locally and internationally.
            </Link>
            <div>
                
                <Link to={soc.fb} ><BsFacebook className='icon'/></Link>
                <Link to={`https://api.whatsapp.com/send?phone=+233${soc.wa}&text= Hey defex,`} ><BsWhatsapp className='icon' /></Link>
                <Link to={soc.ln} ><BsLinkedin className='icon'/></Link>
            </div>

        </div>
        </div>

        


       </div>
            <div className='allright'><i>
               AllRight Reserved {year} </i></div>

        </footer>
    </div>
  )
}

export default Footer