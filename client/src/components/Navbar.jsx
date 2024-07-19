import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';
import { fetchData } from '../postDb';

function Navbar({ place, handOver, sStatesB }) {

  
  const [posts, setPosts] = useState([]);
  const [loaded, setLoaded] = useState(false);

  
useEffect(() => {
  const handleFetchData = async () => {
      try {
          const data = await fetchData();
          setPosts(data);
          setLoaded(true)
      } catch (error) {
          
      }
  }  
  handleFetchData();

}, []);

  
  const poster = posts.sort((a,b) => a._id - b._id);
  const [expandedParent, setExpandedParent] = useState(null);
  const [expandMain, setExpandMain] = useState(false);
  const [expandMainQ, setExpandMainQ] = useState(false);
  const [expandedParentB, setExpandedParentB] = useState(null);
  const [hoveredAttain, setHoveredAttain] = useState(null); 
  const [hoveredAttainB, setHoveredAttainB] = useState(null); 

  const handleNav = (parentId) => {
    if (expandedParent === parentId) {
      setExpandedParent(null);
    } else {
      setExpandedParent(parentId);
    }
  };

  
  const handleNavZ = () => {
    if (expandMain) {
      setExpandMain(false);
    } else {
      setExpandMain(true);
    }
  };
  const handleNavB = (parentId) => {
    if (expandedParentB === parentId) {
      setExpandedParentB(null);
    } else {
      setExpandedParentB(parentId);
    }
  };

  const handleNavQ = () => {
    if (expandMainQ) {
      setExpandMainQ(false);
    } else {
      setExpandMainQ(true);
    }
  };

  function checkB(params) {
    const findSort = posts.find(item => item.link[1] === params)

    if (findSort) {
      return true

    }
    else{
      return false
    }
  }
  function checkC(params) {
    const findSortB = posts.find(item => item.link[1] === params)

    if (findSortB) {
      return true

    }
    else{
      return false
    }
  }
  
  function checkD(params) {
    const findSortB = posts.find(item => item.link[1] === params)

    if (findSortB) {
      return true

    }
    else{
      return false
    }
  }



  return (
    <div className='nav-container'>
      {place == "inner" ?
      <div className='nav'>
     
        <div className='navSet'>
          {poster
            .filter(item => item.cat === 'sublink')
            .map((a) => (
              <div className='navHover' key={a._id}>
                <div
                  className='linkParent'
                  key={a._id}
                  onMouseEnter={() => setHoveredAttain(a._id)} // Hovered over attain NavLink
                  onMouseLeave={() => setHoveredAttain(null)}
                >
                  <div className="attain">
                    <NavLink onClick={handOver} className={({isActive}) => isActive ? 'activehref' : ''} to={`/sub/${a.link[0]}`}>
                    <span>{a.title}</span>  
                      </NavLink>
                    <span className='btnA'>  
                    {checkC(a.link[0]) && ( 
                      <b className={expandedParent === a._id ? 'icon trans' : 'icon'}>
                      <FaChevronDown
                        onClick={() => handleNav(a._id)}
                        className='btnI'
                        />
                        </b>
                    )}
                    </span>
                  </div>
                  {checkB(a.link[0])  ?
                  <div className='child'>
       
                  {(expandedParent === a._id || (hoveredAttain === a._id && window.innerWidth >= 767)) && (
                    <div className='navSpread'>
                      <div className='refrain'>
                        {poster
                          .filter(item => item.link[1] === a.link[0] && item.cat === 'child')
                          .map((b) => (
                            <div  key={b._id} className='mainChild'>
                            <div className='inner'>
                              {/* within */}

                              <span className="span">

                            <NavLink onClick={handOver} className={({isActive}) => isActive ? 'activehref' : ''} to={`/sub/${b.link[0]}`}>
                    <span>{b.title}</span>  
                      </NavLink>
                    {checkD(b.link[0]) && (
                      <b className={expandedParentB === b._id ? 'iconb transb' : 'iconb'}>
                      <FaChevronDown 
                        onClick={() => handleNavB(b._id)}
                        style={{color: 'white'}}
                        className='btnK'
                        />
                        </b>
                    )}
                    </span>


                    {/* Within */}
                            <div className={expandedParentB === b._id ? 'grandChild active' : 'grandChild'}>
                            {poster.filter(item => item.cat === "grandChild" && item.link[1] === b.link[0]).map((c) => (
                              <div  key={c._id} className='grandClass'>
                              <NavLink  onClick={handOver} className={({isActive}) => isActive ? 'activehref' : ''} to={`/sub/${a.link[0]}/${b.link[0]}/${c.link[0]}&&${c._id}`}>
                              {c.title}
                              </NavLink>
                              </div>
                            ))}
                            </div>
                            </div>


                            </div>

))}
                    </div>
                  </div>
                  )}
                  </div>
                  : null }
                </div>
                </div>
            ))}
            </div>
       

      </div> : 
      
      <div className='nav'>
          <div className={expandMain ? 'wrapOuter true': 'wrapOuter'}>
            <span className='span'>

          <NavLink onClick={handOver} className={({isActive}) => isActive ? 'activehref mobileNav' : 'mobileNav'} to='/about?q=about us&&&Hello defex about page'>
             About Us
        </NavLink>
                      <FaChevronDown
                      className='btnZ'
                      onClick={() => handleNavZ()}
                      style={{color:'#fff'}}
                      />
                      </span>
                        <div className="navSpread">
                            <div className={expandMainQ ? "spreader in  active" : "spreader"}>


                              {/* within */}

<span className="spanWrap">

                               <span className='spanIn'  >

              <NavLink onClick={handOver} className={({isActive}) =>    isActive ? 'activehref mobileNav' : 'mobileNav'} to='/feed'>
                 Sustainabilty
            </NavLink>
                          <FaChevronDown
                          className='btnQ'
                          onClick={() => handleNavQ()}
                          style={{color:'#fff'}}
                          />
                          </span>
            <div className= "navSpread in">
                        <div className="spreader in">
                           <NavLink onClick={handOver} className={({isActive}) => isActive ? 'activehref mobileNav' : 'mobileNav'} to='/about?q=leadership&&&Hello defex about page'>
                              Leadership
                           </NavLink>
                            </div>
                            <div className="spreader in">
                           <NavLink onClick={handOver} className={({isActive}) => isActive ? 'activehref mobileNav' : 'mobileNav'} to='/feed'>
                              Leadership
                           </NavLink>
                            </div>
                            <div className="spreader in">
                           <NavLink onClick={handOver} className={({isActive}) => isActive ? 'activehref mobileNav' : 'mobileNav'} to='/feed'>
                              Leadership
                           </NavLink>
                            </div>

                        </div>
                          </span>
                      {/* within */}
                                   </div>
                            <div className="spreader">
                           <NavLink onClick={handOver} className={({isActive}) => isActive ? 'activehref mobileNav' : 'mobileNav'} to='/about?q=leadership&&&The great leaders of the defex company over the past years.'>
                              LeaderShip
                           </NavLink>
                            </div>
                            <div className="spreader">
                           <NavLink onClick={handOver} className={({isActive}) => isActive ? 'activehref mobileNav' : 'mobileNav'} to='/feed'>
                              News
                           </NavLink>
                            </div>
                        </div>
          </div>
          <div className='wrapOuter'>

          <NavLink onClick={handOver} className={({isActive}) => isActive ? 'activehref' : ''} to='/gallery'>
          Gallery
        </NavLink>
          </div>
          <div className='wrapOuter'>
        <NavLink onClick={handOver} className={({isActive}) => isActive ? 'activehref' : ''} to='/feed'>
          News
        </NavLink>
          </div>
          <div className='wrapOuter'>
        {window.innerWidth <= 767 &&
        <NavLink onClick={handOver} className={({isActive}) => isActive ? 'activehref mobileNav' : 'mobileNav'} to='/contact'>
          Contact Us
        </NavLink>
        }

        </div>

      </div>
      
      
      }
    </div>
  );
}

export default Navbar;
