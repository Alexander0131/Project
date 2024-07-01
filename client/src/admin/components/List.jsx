
import React, { useEffect, useState } from 'react';
import { fetchData, fetchStatic } from '../../postDb';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loading from './Loading';
import Noti from './Noti';
import {MdSignalWifiConnectedNoInternet0 } from 'react-icons/md';
import { apiUrl } from '../../config';

// const apiUrl = "http://apiUrl:5000"; 

function List({ not, setNot, loading, setLoading, idQuery }) {
  const [posts, setPosts] = useState([]);
  const [pop, setPop] = useState(false);
  const [idStore, setIdStore] = useState('');
  const [idParent, setIdParent] = useState('');
  const [cate, setCat] = useState('');
  const [itemCat, setItemCat] = useState('');
  const [liLink, setLiLink] = useState(null);
  const [space, setSpace] = useState('');
  const [docSec, setDocSec] = useState(0)
  const [docId, setDocId] = useState('')
  const [outerId, setOuterId] = useState([]);
  const [outerIdSec, setOuterIdSec] = useState([]);
  const [postStatic, setPostStatic] = useState([]);
  const [innerIdSec, setInnerIdSec] = useState([]);
  const [innerId, setInnerId] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [fetchState, setFetchState] = useState(false);
  const uniqueCatValues = new Set(); // Track unique 'a.cat' values

  let remSec;
  useEffect(() => {
    const handleFetchData = async () => {
      if (idStore === ""){

      setLoading({ load: true, loadState: '', loadText: 'Loading...' });
      }
      try {
        
        const data = await fetchData();
        const dataStatic = await fetchStatic();
        setPostStatic(dataStatic);
        setPosts(data.reverse());
        setFetchState(true);
        if (idStore === ""){
        
        setLoading({ load: true, loadState: 'good', loadText: 'Loaded' });

        setTimeout(() => {
          setLoading({ load: false, loadState: '', loadText: 'Loading...' });
          setRefresh(false);
        }, 1500);
      }

      } catch (error) {
        // Handle error
        setFetchState(false);
        if (idStore === ""){

        setLoading({
          load: true,
          loadState: 'bad',
          loadText: 'Failed',
        });
      }

          
        setTimeout(() => {
          setLoading({ load: false, loadState: '', loadText: 'Loading...' });
          setRefresh(false);
        }, 1500);

      }
    };
    handleFetchData();
  }, [refresh]);


  function delet(delId, delCat, delLink, delExLink, delParent) {
    // e.preventDefault();
    if(delParent){

      console.log(delParent)
      setIdParent(delParent);
    }

   

    if(delCat === "sublink" || delCat === "child"){
      
      setSpace("Deleting this would be responsible for the disapearing of any other link under it.");
    }
    else{
      setSpace("")
      
    }
    
    
    if (delId !== 'delete') {
      setIdStore(delId);
      setCat(delCat)
      setLiLink(delLink)
      setPop(true);


      posts.filter(item => item.title === "child").map((a) =>{
        setOuterId(a._id);
        setOuterIdSec(a.sec);
      })

      posts.filter(item => item.title === "grandChild").map((a) =>{
        setInnerId(a._id);
        setInnerIdSec(a.sec -1);
      })
      

      postStatic.filter(item => item.title === delCat).map((a) =>{
        setDocId(a._id);
        setDocSec(a.sec);
      })
      
    }  else {


      if(delCat === "child" || delCat === "grandChild"){

        
        async function editParent() {
          try {
            await axios.put(`${apiUrl}/api/posts/${idParent}`, {
              sec: remSec -1
            })
            console.log("parent editted")
            console.log(remSec)
          } catch (error) {
            console.log(error)
          }
          
        }
        editParent();

}

      if (delCat === "sublink" || delCat === "child"){
        const subPost = posts.filter(item => item.link[1] === delLink);
          console.log({subPost})
  
          if(subPost == ""){
          deleteItem(idStore);

          }
          for(let i = 0; i < subPost.length; i++){
            const curPost = subPost[i];

            const miniPost = posts.filter(item => item.link[1] == curPost.link[0]);

        

          for(let j = 0; j < miniPost.length; j++){
            const innerPost = miniPost[j];


              deleteItem(innerPost._id);
          }


          
    
          
            deleteItem(curPost._id);
        }
        };
      
      
      
        
          deleteItem(idStore);
          setPop(false);
        
    }

    async function deleteItem(idParam) {
     
      const itemData = posts.find(item => item._id === idParam);
      console.log("item: " + itemData.title)
      console.log("itemImg: " + itemData.img)
      if(itemData) {
        
  
deleteImg(`${itemData.img}`, idParam);

      }
    
    }
    async function deleteImg(imgLink, toDel, secId){

      const path = imgLink.split("/");
      const imgParts = path[path.length -1]
      console.log(imgParts)
      try {
        await axios.delete(`${apiUrl}/api/upload/delete`, {
          data: {
            img: imgParts
          },
        });
        console.log("Image deleted successfully");
      } catch (error) {
        console.log("Image deletion failed");
      }
      deleteMain(toDel, secId);
      // console.log({id})
    }
    
    // delImgErr();
    

   
    async function deleteMain(itemGo) {

      function check() {
        return posts.filter(item => item._id === idStore).map((a) => {
          setItemCat(a.cat);
          })
      }
      
      check()
      setLoading({ load: true, loadState: '', loadText: 'Deleting' });
      if(itemCat !== "encap"){
      try {
        await axios.delete(`${apiUrl}/api/posts/${itemGo}`);

        setLoading({ load: true, loadState: 'good', loadText: 'Deleted' });

          setRefresh(true);
        

        setTimeout(() => {
          setLoading({ load: false, loadState: '', loadText: 'Loading...' });
          setRefresh(false);
        }, 1500);
      } catch (error) {
        setLoading({
          load: true,
          loadState: 'bad',
          loadText: 'Failed',
        });
        setTimeout(() => {
          setLoading({
            load: false,
            loadState: '',
            loadText: 'Loading...',
          });

          setNot({
            ...not,
            notState: true,
            notify: 'Item was not deleted due to a poor internet connection.',
          });
          setNot(true);
        }, 1500);
      }
    }
  }
  }

  

  const handleCat = (parentId) => {
    if (cate === parentId) {
      setCat(null);
    } else {
      setCat(parentId);
    }
  };

  return (
    <div className="ListPage">
      <div className="newPage">
        <div className={pop ? 'popup' : 'popup hide'}>
          <div className="main-pop" align="center">
            Please note that deleting this item can't be undone. {space}
            <div>
              <button onClick={() => setPop(false)}>Cancel</button>
              <button onClick={e => delet('delete', cate, liLink, e)}>Continue</button>
            </div>
          </div>
        </div>
      </div>
      
      
      {posts.filter(item =>  item.cat !== "encap").map((a) => {
        if (!uniqueCatValues.has(a.cat)) {
          uniqueCatValues.add(a.cat); 
          return (
            <div  key={a._id}>
              <h2>{a.cat}</h2>
              {posts
                .filter(item => item.cat === a.cat)
                .map((b) => (
                  <div className='contt' key={b._id}>
                   <img src={b.img} alt="" />
                    <div className='grea'>

                      <h3>{b.title} {a.cat === "child" || a.cat === "grandChild" ? <small> &gt;  {b.link[1].replace(/%20/g, ' ')} </small>: null} </h3>
                    <p>
                       <i dangerouslySetInnerHTML={{ __html: b.content }} />
                    </p>
                    </div>
                   
                    <button>
                      <Link to={`/admin/defex/edit/${a._id}?q=${idQuery}`}>
                        <BiEdit className="icon" />
                      </Link>
                      
                     
                      {a.cat === "feed" && posts.filter(item => item.cat === a.cat).length < 6 || a.cat === "swiper" && posts.filter(item => item.cat === a.cat).length < 4 || a.cat === "about" && posts.filter(item => item.cat === a.cat).length < 4 || a.cat === "pinned" || a.cat === "board" && posts.filter(item => item.cat === a.cat).length < 2 ?
                      
                        <AiFillDelete className="icon" color='grey' onClick={() => setNot({notState: true, notify: `Please items in the "${a.cat}" category can't be less than current items.`})}/>
                         : 
                           <AiFillDelete onClick={e => delet(b._id, b.cat, b.link[0], b.link[1], b.link[2], e)} className="icon delete" />

                      }

                    
                    </button>
                  </div>
                ))} 
            </div>
          );
        }
        return null; 
      })}
      {posts.length === 0 || !fetchState ?
      <div className='failingPage'>
        <MdSignalWifiConnectedNoInternet0 className='wideIcon'/>

        <button onClick={() => setRefresh(true)}>Retry</button>
      </div>
      : null

      }


      <Noti not={not} setNot={setNot}/>
      {loading.load ? (
        <Loading loading={loading} />
      ) : null}
    </div>
  );
}

export default List;
