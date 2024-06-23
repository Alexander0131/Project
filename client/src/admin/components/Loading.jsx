import React from 'react'
import "./loading.scss"
import { MdDone, MdClose } from 'react-icons/md'



function Loading({loading}) {
 


  return (
    <div className='load-wrapper'>
          <div className='loading'>
      {loading.loadState === "good" || loading.loadState === "bad" ?
      <>
<span className={loading.loadState}>
{loading.loadState === "good" ? <MdDone color='green'/> : <MdClose/>}</span>
</>
      :
      <>
  <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
      </>
  }
  <b><i>{loading.loadText}</i> </b>
  </div>
  </div>
  )
}

export default Loading;










