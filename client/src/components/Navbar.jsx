import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { BiChevronsRight } from 'react-icons/bi';
import { fetchData } from '../postDb';

function Navbar({ setsState, sState, handOver }) {

  
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
  const [hoveredAttain, setHoveredAttain] = useState(null); 

  const handleNav = (parentId) => {
    if (expandedParent === parentId) {
      setExpandedParent(null);
    } else {
      setExpandedParent(parentId);
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



  return (
    <div className='nav-container'>
      <div className='nav'>
        <NavLink onClick={handOver} className={({isActive}) => isActive ? 'activehref' : ''} to='/'>
          Home
        </NavLink>
       
        {window.innerWidth <= 767
         && <NavLink onClick={handOver} className={({isActive}) => isActive ? 'activehref' : ''} to='/feed'>
          Feed
        </NavLink>
        }

       
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
                      {a.title}
                    </NavLink>
                    {checkC(a.link[0]) && (
                      <b className={expandedParent === a._id ? 'icon trans' : 'icon'}>
                      <BiChevronsRight
                        onClick={() => handleNav(a._id)}
                        
                        />
                        </b>
                    )}
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

                             <NavLink onClick={handOver} className={({isActive}) => isActive ? 'activehref' : ''} to={`/sub/${a.link[0]}/${b.link[0]}`}>
                              <h3>{b.title}</h3>
                            </NavLink>
                            <div className='grandChild'>
                            {poster.filter(item => item.cat === "grandChild" && item.link[1] === b.link[0]).map((c) => (
                              <div  key={c._id}>
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
       
<NavLink onClick={handOver} className={({isActive}) => isActive ? 'activehref' : ''} to='/gallery'>
          Gallery
        </NavLink>
        <NavLink onClick={handOver} className={({isActive}) => isActive ? 'activehref' : ''} to='/about'>
          About
        </NavLink>
        {window.innerWidth <= "767px" &&
        <NavLink onClick={handOver} className={({isActive}) => isActive ? 'activehref' : ''} to='/contact'>
          Contact Us
        </NavLink>}
      </div>
    </div>
  );
}

export default Navbar;
