







// SearchComponent.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs'

const SearchComp = ({setsState, search, setSearch}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [ShouldNavigate, setShouldNavigate] = useState(false);

  const handleKeyPress = (event) => {
    if(searchQuery !== ''){
      if(event.key === 'Enter'){
        setShouldNavigate(true);
      };
    }
  };

  if(ShouldNavigate){
    setShouldNavigate(false);
    window.location.href = `/search?q=${searchQuery}`;
  }

  function searchNow() {
    if(window.innerWidth >= 767){
      if(searchQuery === ''){
        setSearch(true);
      }
    }
  }


  return (
    <div className='searcherWrap'>
     <div className="search-bar">
      <input
        type="text"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        placeholder="Search..."
        onKeyDown={handleKeyPress}
        autoFocus
      />
      {(searchQuery !== '' && search) || (window.innerWidth  <= 767 && searchQuery !== "") ?
      (
        <Link className='linkSearch' onClick={() => setsState(false)} to={`/search?q=${searchQuery}`}>
      <BsSearch onClick={searchNow} className='icon'/>
      </Link>
        )
      :
      <BsSearch onClick={searchNow} className='icon'/>
      }
      </div>
    </div>
  );
};

export default SearchComp;