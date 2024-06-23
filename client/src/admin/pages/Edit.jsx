import React, { useState, useEffect } from 'react';
import SideBar from '../components/SideBar';
import Menu from '../components/Menu';
import { useLocation } from 'react-router-dom';
// import { posts } from '../../posts';
import { fetchData, fetchStatic } from '../../postDb';
import '../components/edit.scss';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios'
import Loading from '../components/Loading';
import { apiUrl } from '../../config';

function Edit({loading, setLoading}) {
    const [idQuery, setIdQuery] = useState('');
  
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
        //   window.location.href = "/admin/defex/login";
        }
      }
      handleFetch();
    }, [])
    
    const locationb = useLocation();
    const idParamb = locationb.pathname.split("/");
    const idParam = idParamb[idParamb.length -1];
    //  (idParam)
    const [edImg, setEdImg] = useState(null);
    const [edId, setEdId] = useState('');
    const [edTitle, setEdTitle] = useState(idParam);
    const [edLink, setEdLink] = useState([]);
    const [posts, setPosts] = useState([]);
    const [linkT, setLinkT] = useState("");
    const [edCat, setEdCat] = useState(null);
    const [quilVal, setQuillVal] = useState('');
    const [imgId, setImgId] = useState('');
    const [loaded, setLoaded] = useState('');
    const [imgState, setImgState] = useState(false);
    const [imgFile, setImgFile] = useState([]);
    const [edMod, setEdMod] = useState("")
    const [oldImg, setOldImg] = useState("")
    const [check, setCheck] = useState({
        rqimg: false,
        rqtitle: false,
        rqcontent: false
    });
   
useEffect(() => {
    document.title = "Defex - Edit page";
    async function handleFetchData(){
         ("Searching...")
        try {
            
            const response = await axios.get(`${apiUrl}/api/upload/get`);

            const data = await fetchData();
     setPosts(data);
     setLoaded(true);
    
      data.filter(item => item._id === idParam).map((a) => {
              setEdTitle(a.title);
              setQuillVal(a.content);
              setEdImg(a.img);
              setEdCat(a.cat);
              findImgId(a.img)
             const imgFile = a.img.split("/");
             const toDel = imgFile[imgFile.length -1]
              setOldImg(toDel);
              setEdMod(a.mod[0]);
        });

        function findImgId(dataImg) {
            const imgIdentity = response.data.find(i=> i.img === dataImg);
            setImgId(imgIdentity._id);
        }

       } catch (error) {
        
       }
    }

    handleFetchData();



        // const initialPost = posts.find(item => item.id == idParam);
        // if (initialPost) {
        //     setEdTitle(initialPost.title);
        //     setQuillVal(initialPost.content);
        // }
    
    }, [idParam]);

    const handleImg = (event) => {
        const file = event.target.files[0];
    setImgFile(event.target.files[0]);
        setImgState(true);
        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                setEdImg(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    }

    const getTitle = (val) => {

        setEdTitle(val)
          // Assigning the title to edLink
          if(edCat === "sublink" || edCat === "child" || edCat === "grandChild"){
            setEdLink([val.toLowerCase().replace(" ", "-"), linkT])
        }

    }
    // Working on the update post.
    function updatePost(params) {

         setLoading({load:true, loadState: "loading", loadText: "Updating..."});

        const validChat = (input) => {
            const pattern = /^[A-Za-z0-9\s]+$/;
            return pattern.test(input);
           }

        if(edTitle.length  >= 3 && quilVal.length > 8 && validChat(edTitle)){

if(imgState){

    async  function sendPost(){
                setLoading({...loading, load: true, loadText: "Creating Post"});
                    if(params === "image"){
     
             const formData = new FormData();
             formData.append("title", edTitle);
             formData.append("img", imgFile);
             formData.append("purpose", "edit");
             setLoading({...loading, load: true, loadText: "Uploading Image"});
         try {
             await axios.put(`${apiUrl}/api/upload/post/${idParam}`, formData);
             
             refetch();
            } catch (error) {
            }
            //   ('Uploading file:', edImg.name);
        
    }
}

sendPost();


// handling refetch
function refetch(){
    
    setTimeout(  async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/upload/get`);
            const foundItem = () => {
                
                const item = response.data.find(item => item.title === edTitle);
              
                // Check if the item was found
                if (item) {
                    
                    setEdImg(`${apiUrl}/${item.img}`);
                    update(`${item.img}`, `${item._id}`);
                } else {
                    
                }
            };
            
            foundItem();
            
            
            
            
        } catch (error) {
            }
            
        }, 5000)
    }
}
else{
    update(edImg.split("/")[edImg.length -1])
}

        

        async function update(imgLink) {
            setLoading({...loading, load: true, loadText: "Editing Post"});
            try {
                await axios.put(`${apiUrl}/api/posts/${idParam}`, {
                    title: edTitle,
                    content: quilVal,
                    img: imgLink,
                    mod: [edMod, idQuery]
                });

                setLoading({load: true, loadState: "good", loadText: "Edited"});
         
               setTimeout(() => {

                   window.location.href = `/admin/defex/list`;
                }, 1000)
            setTimeout(() => {
                setLoading({load:false, loadState: "", loadText: "Loading..."});

                }, 2000);

if(imgState){

    // try delete
    async function delImgErr() {
                  
                  
                    try {
                        await axios.delete(`${apiUrl}/api/upload/delete`, {
                        data: {
                          img: oldImg,
                          link: imgId

                        },
                      });
                    } catch (error) {
                    }
                }
                
                // delImgErr();
                
            }
                
            } catch (error) {
                async function delImgErr() {
                  
                    try {
                      await axios.delete(`${apiUrl}/api/upload/delete`, {
                        data: {
                          img: imgLink,
                          link: imgId
                        },
                      });
                    } catch (error) {
                    }
                  }
                  
                //   delImgErr();
                  
            }
        }
        // update();
        }
        else{
        }

    }



    return (
        <div className='edittingPage'>
            <Menu />

            <div className='flexHead'>
                <SideBar />
           <div className="sideWrapper">

                    {posts.filter(item => item._id == idParam).map((a) => (
                <div className="editor"  key={a._id}>
                        <div className='mainEditor'>
                            <div className="imgEdit">
                                <img src={edImg} alt="" />

                                <input className="inp" 
                                hidden
                                type="file" accept="image/*" onChange={handleImg} name="imgFile" id="imgFile" />
                                <label htmlFor="imgFile">Change Image</label>

                            </div>
                            <div className="edText">
                            <h2>Title</h2>
                                <sub style={{padding:0, margin: 0, fontSize: "9px"}}>*Please avoid using symbols like "/@#$%^&*()?~`" </sub><br/>
                                <input type="text" 
                                value={edTitle}  placeholder="Hi Defex, Title must be provided." 
                                onChange={e => getTitle(e.target.value)} 
                                className={check.rqtitle ? 'inputTitleErr' : 'inp'}
                                required
                                 />
                               
                            </div>
                            <div className="quil">
                            <ReactQuill className='quillBody' theme="snow" value={quilVal} onChange={setQuillVal} />
                            <button onClick={() => updatePost("image")} className={edTitle.length  >= 3 && quilVal.length > 12 ? 'sub' : 'sub dim'}>Update</button>
                            </div>
                        </div>

                <div className="previewWrap">
                    <h2>Preview Minimized</h2>
                <div className='poster-container'>
                    
                    <div className='wrap'>
                    <img src={edImg} alt="" />
                   
                   <div className='title'>
                    <div className="text"><h3 dangerouslySetInnerHTML={{__html: a.title}}></h3><sup>Mon 16th, 08 2023</sup><p dangerouslySetInnerHTML={{__html: quilVal}}></p>
                    </div> 
                        </div> 
                    <button>See more</button>
                    </div>
                </div>
                    <h2>Preview Maximize</h2>
                    <div className='single-wrapA'>
                   <div    className='title'>
                        <h3  dangerouslySetInnerHTML={{__html: a.title}}/><sup>Mon 16th, 08 2023</sup>
                    </div>
                    <div className='content-wrap'>
                        <img src={edImg} alt="" />
                        <p dangerouslySetInnerHTML={{__html: quilVal}}/>
                    </div>
                </div>
               



                </div>    


                </div>
                    ))}
            </div>

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

export default Edit;
