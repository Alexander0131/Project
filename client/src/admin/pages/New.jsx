import React, { useState, useEffect } from 'react';
import SideBar from '../components/SideBar';
import Menu from '../components/Menu';
import logo from "../../assets/logo.png"
import '../components/edit.scss';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios'; // Updated import statement
import '../components/new.scss'
import Noti from '../components/Noti';
import Loading from '../components/Loading'
import MiniLoading from '../components/MiniLoad'
import { fetchData, fetchStatic } from '../../postDb';
import { Link } from 'react-router-dom'
import { AiFillAppstore } from 'react-icons/ai';
import { apiUrl } from '../../config';

function New({ not, setNot, loading, setLoading, login}) {

  
  const [quilVal, setQuillVal] = useState('');
  const [idQuery, setIdQuery] = useState('');
  const [edImg, setEdImg] = useState(logo);
  const [imgFile, setImgFile] = useState([])
  const [posts, setPosts] = useState([])
  const [postStatic, setPostStatic] = useState([])
  const [edTitle, setEdTitle] = useState('');
    const [idSec, setidSec] = useState("");
    const [edCat, setEdCat] = useState(null);
    const [edLink, setEdLink] = useState([]);
    const [linkT, setLinkT] = useState("");
    const [quillState, setQuillState] = useState("")
    const [pop, setPop] = useState(true);
    const [loaded, setLoaded] = useState(false);
    const [mini, setMini] = useState(false);
    const [headTitle, setHeadTitle] = useState('Title');

    const [requ, setRequ] = useState({
        rqimg: false,
        rqcontent: false
    });
    
  useEffect(() => {
    async function handleFetch() {
      try {
        const data = await fetchStatic();
       
        function findAcc() {
            const storedUser = localStorage.getItem("user");
          if (storedUser) {
            const user = JSON.parse(storedUser);
            auth(user.username, user.password, user.userId);
            setIdQuery(user.userId);
        
      
            async function auth( username, password, userId) {
             
                try {
                 const response = await axios.post(`${apiUrl}/api/auth0/login`, {
                      username: username.toLowerCase(),
                      password: password,
                      purpose: "login"
                  });
                 
            
              } catch (error) {
                window.location.href = "/admin/defex/login";
    
              }
            
            }
    
          }
          else{
            window.location.href = "/admin/defex/login";
          }
        }
        findAcc();
  
      } catch (error) {
        window.location.href = "/admin/defex/login";
      }
    }
    handleFetch();
  }, [])
  
    const [check, setCheck] = useState({
        rqimg: false,
        rqtitle: false,
        rqcontent: false
    });
    var rand = "ahjvawhjguudguguygyubvUBVYVSBYUbsuyBUYVBYVShVCbcunudvfyuhfuzihbuizhnvudzgyuvgzujhuydbgbuhfiuoAUIpiufhhjnsPIBJLHIUVGUSFYUFA";

// Convert the string into an array of characters for shuffling
var randArray = rand.split('');

// Shuffle the array using Fisher-Yates algorithm
for (var i = randArray.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = randArray[i];
    randArray[i] = randArray[j];
    randArray[j] = temp;
}

// Take the first 6 characters from the shuffled array
var shuffledRand = randArray.slice(0, 6).join('');


//Fetching data from api.
useEffect(() => {
    const handleFetchData = async () => {
        try {
            const data = await fetchStatic();
            const dataPost = await fetchData();
            setPosts(dataPost);
            setPostStatic(data);
            setLoaded(true)
        } catch (error) {
            
        }
    }  
    handleFetchData();

    // getting the document
   
    document.title = "Defex - Add Page"
}, []);

// "Handling the title section"

const getTitle = (val) => {

    setEdTitle(val)
    setEdLink(val.toLowerCase().replace(/ /g, "%20"))
      // Assigning the title to edLink
      if(edCat === "sublink" || edCat === "board" || edCat === "child" || edCat === "grandChild"){
      
        // Assuming setEdLink is a function that does something with the edLinkArray

    }

}

// handling the new post here.
const handleChange = async (e) => {
    setImgFile(e.target.files[0]);
    const file = e.target.files[0];
     if (file) {
         const reader = new FileReader();
         reader.onload = (e) => {
             setEdImg(e.target.result);
         };
         reader.readAsDataURL(file);
        }
    }
    
    
    const handleSubmit = async (e, params) => {
        e.preventDefault();



        // Sending item to the document 
     
    
        
       const validChat = (input) => {
        const pattern = /^[A-Za-z0-9\s]+$/;
        return pattern.test(input);
       }
    
    // edit
      
        
       //Validate post details

       function checkTitle() {
        const findTitle = posts.find(item => item.title === edTitle);
        
       


        if(edTitle !== "" && imgFile && !findTitle && validChat(edTitle) && edImg !== logo && edTitle.length <= 8){
    
            //Approving the partner & gallery cat to db
            if(edCat === "patner" || edCat === "gallery" || edCat === "swiper" || edCat === "board" || edCat === "sublink" && edTitle.length >= 8){
                if(requ.rqimg === true && edImg === logo){
                    setCheck(check => ({ ...check, rqimg: true}));
                    setNot({
                        notState: true,
                        notify: "Please do well to change current image"
                    });
                    
                }  else{
                    sendPost();
                }
           
            }
            //sending the service, about, sublink and feed to db
            else if(edCat === "service" || edCat === "about" || edCat === "feed" || edCat === "board" || edCat === "sublink"  || edCat === "child" || edCat === "grandChild" ){
    
               
                if(requ.rqimg === true && edImg === logo){
                    setCheck(check => ({ ...check, rqimg: true}));
                   
    
                    setNot({
                        notState: true,
                        notify: "Please do well to change current image"
                    });
                }
                else{

                    if((edCat === "service" || edCat === "about" || edCat === "feed" || edCat === "sublink") && quilVal.length < 100){
                        
                        setNot({
                            notState: true,
                            notify: "Please your content text cannot be less than 100 letters"
                        });
                        setQuillState(true)
                        setTimeout(() =>{
                        setQuillState(false)
                        }, 5000)
                }
                else{
                    if(edCat === "service" || edCat === "about" || edCat === "feed" || edCat === "sublink" || edCat === "child" || edCat === "grandChild"){

                        sendPost();
                    }
                }
            }
               
            }
    
            
          async  function sendPost(){
            setLoading({...loading, load: true, loadText: "Creating Post"});
                if(params === "image"){
     
     if (edImg) {
         const formData = new FormData();
         formData.append("title", edTitle);
         formData.append("content", quilVal);
         formData.append("img", imgFile);
         formData.append("cat", edCat);
         formData.append("linkT", linkT);
         formData.append("edLink", edLink);
         formData.append("mod", [idQuery]);
     try {
         await axios.post(`${apiUrl}/api/upload/post`, formData);
         setLoading({
            load: true,
            loadState: 'good',
            loadText: 'Created',
          });
          setTimeout(()=>{
            setLoading({
                ...loading, 
                load: false,
              });
              window.location.href = "/admin/defex/list";
          }, 3000)
          

     } catch (error) {
         setLoading({
            load: true,
            loadState: 'bad',
            loadText: 'Failed',
          });
          setTimeout(()=>{
            setLoading({
                ...loading, 
                load: false,
              });
          }, 3000)
     }
     } else {
    }
}

}

    
}
    else{
        setCheck(check => ({ ...check, rqtitle: true}))
        setTimeout(() =>{
            setCheck(check => ({ ...check, rqtitle: false}))
            
        }, 5000)
        if(edImg === logo){
            setCheck(check => ({ ...check, rqimg: true}));
            setNot({
                notState: true,
                notify: "Please, do well to change current image"
            });
        }
        if(!validChat(quilVal)){
            setNot({
                notState: true,
                notify: "Please, title can't contain  '/@#$%^&*()?~`' "
            });
            
        }
    }
    if(findTitle){
        setNot({
            notState: true,
            notify: "Please, title already exists"
        });
    }
    if(!imgFile){
        setNot({
            notState: true,
            notify: "Please, reselect an image"
        });
    }
}
checkTitle()

    
}


// Reseting sec number

const  cater = (cat) => {
        setPop(false);
        setEdCat(cat);
        setHeadTitle(`${cat} Title`)


       
        

        //partner and Gallery
        if (cat === "patner"|| cat === "swiper" || cat === "gallery"){
            setQuillVal(`Defex Company ltd.`);
            setRequ({...requ, rqimg: true});
            if(cat === "patner"){
                setHeadTitle("Partner Name");
                setEdTitle('')

            }
            else if(cat === "swiper"){
                setHeadTitle("Swiper Title");
                setEdTitle('')
            }
            else{
                setHeadTitle(`Image Title`);
                setEdTitle(shuffledRand)

            }
        }

        

        // preparing the feed.
        if(cat === "feed" || cat === "sublink"  || cat === "child" || cat === "grandChild" || cat === "board"){
            setRequ({rqContent: true,  rqimg: true});
            setMini(false);
            

            
        }
        if( cat === "about" || cat === "service"){
            setRequ(requ => ({...requ, rqContent: true}))
            setMini(false);
        }

        if(cat === "child" || cat === "grandChild"){
            setMini(true);
        }

    }
    useEffect(() => {
        cater('feed');
    }, [])


    // End of Cater
    function getParent(pLink, subId, curSec) {
        setMini(false);


        posts.filter(item => item.cat === "sublink" && item.link[0] === pLink).map(() => {
            setLinkT(pLink);
            return 0

        })
        
        posts.filter(item => item.cat === "child" && item.link[0] === pLink).map(() => {
            setLinkT(pLink);
            return 0
          
            })
        }
        function checkD(params) {
            const foundItems = posts.filter(item => item.link[1] === params);
          
            return foundItems.length < 5;
          }
    

    return (
        <div className='newPage'>

            <div className={pop || mini ? "popup" : "popup hide"} onClick={() => setPop(false)}>
                <div className='main-pop'>
                {mini  ? 
                    <>
                    {edCat === "child" ?
                    <>
                    <b>Please note that you can't have a sublink without a Parent Link</b>
             
                    <div>
                    <small>Available parent Links.</small><br/>
                    {posts.length !== 0 ? 
                    <>
                    {posts.filter(item => item.cat === "sublink" &&  checkD(item.link[0]) &&  posts.filter(i => i.cat == "child" && i.link[1] == item.link[0]).length <= 3).map((a) => (
                        <div key={a._id}>
                    
                        <button key={a._id} onClick={() => getParent(a.link[0])} >{a.title}({posts.filter(item => item.link[1] === a.link[0]).length})</button> 
                
                        
                        </div>
                        ))}
                        </>
                        : 
                        <>
                               <MiniLoading />

                        </>
}
                    <br/>
                {postStatic.filter(i => i.title === "sublink" && i.sec < 3).map(() => (
                    <button onClick={() => cater('sublink')} > Create Head Link</button> 
                ))}
                    </div>
                    </>
                        :
                        <>
                        
<b><small>Please note that you can't have a Child link without a sub Link</small></b>
                    <div>
                    <small>Available children Links</small><br/>
                    {posts.filter(item => item.cat === "child" && posts.filter(i => i.cat == "grandChild" && i.link[1] == item.link[0]).length <= 3).map((a) => (
                        <div key={a._id}>
                       <small>({a.link[1].replace(/%20/g, " ")})</small>  <button  onClick={() => getParent(a.link[0])} >{a.title}({posts.filter(item => item.cat == "grandChild" && item.link[1] == a.link[0]).length})</button> 
                        
                        </div> 
                        ))}
   </div>
                        </> 
                        }
                        </>
                    : 
                <>
                    <h3>Please select a category</h3>

{loaded ? 
                    <div>
                
                {posts.filter(i => i.cat === "sublink").length <= 2 &&
                <button onClick={() => cater('sublink')} >Head Link</button>   
               }   
                    
                    {posts.filter(i => i.cat === "child").length < 9 &&
                    <button onClick={() => cater('child')} >SubTitle Link</button> 
                }
                {posts.filter(i => i.cat === "grandChild").length < 12 &&

                 <b>
                   <button onClick={() => cater('grandChild')} >Child Link</button> <br/>
                 </b> 
               }


                {(posts.filter(i => i.cat === "feed")).length < 50 &&

                    <button onClick={() => cater('feed')} >Feed </button> 
                }


                {(posts.filter(i => i.cat === "about")).length < 5 &&

                    <button  onClick={() => cater('about')} >About</button> 
                }

                {(posts.filter(i => i.cat === "service")).length < 5 &&

                  <b>  <button onClick={() => cater('service')} >Service</button> <br/></b>
                }

                {(posts.filter(i => i.cat === "gallery")).length < 50 &&
                    
                    <button onClick={() => cater('gallery')} >Gallery</button> 
                }

                {(posts.filter(i => i.cat === "patner")).length < 12 &&

                    <button onClick={() => cater('patner')} >Patner</button> 
                }
                {(posts.filter(i => i.cat === "swiper")).length < 3 &&

<button onClick={() => cater('swiper')} >Swiper</button> 
                }
                {(posts.filter(i => i.cat === "board")).length < 3 &&

<button onClick={() => cater('board')} >On Board</button> 
                }

                    </div>
                    :
                               <MiniLoading />

                }
                    </>
                    
                    }
                </div>




            </div>
            <Menu />

            <div className='flexHead'>
                <SideBar />

           <div className="sideWrapper">
                    
                <div className="editor">
              <button className='iconCat'>
                 <AiFillAppstore className='icon blue' onClick={() => setPop(true)}/>
                <br/>Category
                </button>  <>

            
      {/* <button type="submit">Upload Image</button> */}
   
  <form onSubmit={(e) => handleSubmit(e, "image")} encType="multipart/form-data">
                <div className="imgEdit">
                           <img className= {check.rqimg ?  'imgFalse' : 'img' }src={edImg} alt="" /> 
      <label className="label">
        Upload Image
        <input
          hidden
          type="file"
          name="file_picker"
          id="file_picker"
          onChange={(e) => handleChange(e)}
          />
      </label>
          </div>

                          
                            <div className="edText">
                                <h2>{headTitle.toLowerCase()}</h2>
                                <sub style={{padding:0, margin: 0, fontSize: "9px"}}>*Please avoid using symbols like "/@#$%^&*()?~`" </sub><br/>
                                <input type="text" 
                                value={edTitle}  placeholder="Hi Defex, Title must be provided." 
                                onChange={e => getTitle(e.target.value)} 
                                className={check.rqtitle ? 'inputTitleErr' : 'inp'}
                                required
                                 />
                               

                            </div>
                            <div className="quil">
                                <h2>{edCat} Content</h2>
                            <ReactQuill className={quillState ? 'quillBody false' : 'quillBody'} theme="snow" value={quilVal} onChange={setQuillVal} required />
                            <button type='submit' to="/admin/defex/list"  className={'sub'}>Create Post</button>
                            </div>
                    </form>
 
</>
                    {edCat === "feed" || edCat === "service" || edCat === "about" ? 
                <div className="previewWrap">
                    
                    
                    {edCat === "feed" ? 
                    <>
                    <h2>Preview Minimized</h2>
                <div className='poster-container'>
                    
                    <div className='wrap'>
                    <img src={edImg} alt="" />
                   
                   <div className='title'>
                    <div className="text"><h3 dangerouslySetInnerHTML={{__html: edTitle}}></h3><p dangerouslySetInnerHTML={{__html: quilVal}}></p>
                    </div> 
                        </div> 
                    <button>See more</button>
                    </div>
                </div>
                    </>
                 : null }
                    <div className={edCat === "feed" ?'single-wrap' : 'double-wrap'}>
                    <h2>Preview Maximize</h2>
                   <div className='title'>
                        <h3  dangerouslySetInnerHTML={{__html: edTitle}}/><sup>Mon 16th, 08 2023</sup>
                    </div>
                    <div className='content-wrap'>
                        <img src={edImg} alt="" />
                        <p dangerouslySetInnerHTML={{__html: quilVal}}/>
                    </div>
                </div>
               </div>    
                    : null}
               
               
                </div>
                
            </div>
          
            <Noti not={not} setNot={setNot}/>

            {loading.load ? 
        <>
        <Loading loading={loading}/>
        </>  
        : null  
        }
        </div>
        </div>
    )

}

export default New;
