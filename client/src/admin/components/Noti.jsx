import React, { useEffect } from 'react'
import './noti.scss'

function Noti({not, setNot}) {


    if(not.notState === true){

        setTimeout(() => {
            setNot({
              notState: false,
              notify: ""
            })
        },  4000)
    }
    



  return (
  <>
  
    <div className={not.notState ? 'notiWrap out' : 'notiWrap'}>
        <p>{not.notify}</p>
    </div>
  </>
  )
}

export default Noti