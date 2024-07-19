import Navbar from "./Navbar"
   function Menu({sState, sStateB, setsState, setsStateB, place}){


    return(
        <nav>
                <div className={sState || sStateB ? "navbar active" : "navbar"}>
                   
            <Navbar place={place}  setsState={setsState} sStateB={sStateB}/>
                    </div>
            
        </nav>
        )
}
export default Menu