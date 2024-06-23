import { useEffect } from "react"
import Navbar from "./Navbar"
import SearchComp from "./Search";
   function Menu({sState, setsState}){

    function handleResize(){
        if(window.innerWidth >= 767){
           document.body.style.overflow = "auto";
           setsState(false)

        }else{
            if(sState){
                document.body.style.overflow = "hidden";
            }

        }
    }

    if(sState == false){
        document.body.style.overflow = "auto";

    }
    else{
        document.body.style.overflow = "hidden";

    }

    useEffect(() =>{
        window.addEventListener('resize', handleResize);
        return () => {
        window.removeEventListener('resize', handleResize);

        };

    },[sState])

    return(
        <nav>
            {sState ? <div onClick={() => setsState(false)}
            className="coverMenu"></div> : null}
            <div>
                <div className={sState ? "navbar active" : "navbar"}>
                   
                    <SearchComp  setsState={setsState}/>
            <Navbar  setsState={setsState}/>
                    </div>
            </div>
            
        </nav>
        )
}
export default Menu