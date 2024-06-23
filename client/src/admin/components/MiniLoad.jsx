

import React from 'react'
import "./loading.scss"
import { MdDone, MdClose } from 'react-icons/md'



function miniLoading({loading}) {
 


  return (
    <div className='miniload-wrapper'>

  <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
     
  </div>
  )
}

export default miniLoading

