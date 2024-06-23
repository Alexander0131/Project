import React, { useState, useEffect } from 'react';
import { MdLightMode, MdDarkMode } from 'react-icons/md';

function Theme() {
  const [dark, setDark] = useState(() => {
    // Check local storage for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  // Update body class and save theme preference to local storage
  useEffect(() => {
    document.body.classList.toggle('dark', dark);
    localStorage.setItem('theme', JSON.stringify(dark));
  }, [dark]);

  return (
    <div className='theme'>
      <button onClick={() => setDark((prevDark) => !prevDark)}>
        {dark ? <MdLightMode color="orangered" className='icon' style={{fontSize: "25px"}}/> : <MdDarkMode className='icon' style={{fontSize: "25px"}}/>}
      </button>
    </div>
  );
}

export default Theme;
