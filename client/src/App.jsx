import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Contact from './pages/Contact'
import About from './pages/About'
import Service from './pages/Service'
import Feed from './pages/Feed'
import Single from './pages/Single'
import Search from './pages/Search'
import Gallery from './pages/Gallery'
import SubLinks from './pages/SubLinks'
import Child from './pages/Child'
import PriLink from './pages/PriLink'
import Admin from './admin/pages/Admin'
import Edit from './admin/pages/Edit'
import ListPage from './admin/pages/ListPage'
import New from './admin/pages/New'
import { useState } from 'react'
import Config from './admin/pages/Config'
import LoginPage from './admin/pages/LoginPage'
import Account from './admin/pages/Account'
import AddAcc from './admin/pages/AddAcc'
import SiteHealth from './admin/pages/SiteHealth'
import Forgot from './admin/pages/Forgot'


function App() {
  const [login, setLogin] = useState(false);
  const [loading, setLoading] = useState({
    load: false,
    loadText: "Loading...",
    loadState: ""
  });
  const [not, setNot] = useState({
    notState: false,
    notify: "Hello Defex"
  });
  //   const [loadText, setLoadText] = useState("Loading...");
  //  const [loadState, setLoadState] = useState("");
  //   const [notify, setNotify] = useState("Hello Defex");


  // tracking pages


  return (

    
   <BrowserRouter>
   <Routes>
   <Route path="/" element={<Home/>}/>
   <Route path="/*" element={<Home/>}/>
   <Route path='/contact' element={<Contact not={not} setNot={setNot} loading={loading} setLoading={setLoading}/>}/>
   <Route path='/about' element={<About/>}/>
   <Route path='/feed' element={<Feed/>}/>
   <Route path='/feed/:id' element={<Single/>}/>
   <Route path='/service' element={<Service/>}/>
   <Route path='/search' element={<Search/>}/>
   <Route path='/gallery' element={<Gallery/>}/>
   <Route path='/sub/:id/:id' element={<SubLinks/>}/>
   <Route path='/sub/:id/:id/:id' element={<Child/>}/>
   <Route path='/sub/:id' element={<PriLink/>}/>
   <Route path='/admin/defex' element={<Admin  login={login}/>}/> 
   <Route path='/admin/defex/list' element={<ListPage not={not} setNot={setNot} loading={loading} setLoading={setLoading} login={login}/>}/>
   <Route path='/admin/defex/new' element={<New not={not} setNot={setNot} loading={loading} setLoading={setLoading} login={login}/>}/>

   <Route path='/admin/defex/configure'  login={login} element={<Config not={not} setNot={setNot} loading={loading} setLoading={setLoading} login={login}/>}/>

   <Route path='/admin/defex/site-health' element={<SiteHealth/>}/>

   <Route path='/admin/defex/login' element={<LoginPage not={not} setNot={setNot} loading={loading} setLoading={setLoading} login={login} setLogin={setLogin}/>}/>
    <Route path='/admin/defex/account' element={<Account loading={loading} setLoading={setLoading} login={login} setLogin={setLogin}/>}/>
    <Route path='/admin/defex/restore-account' element={<Forgot loading={loading} setLoading={setLoading}/>}/>
    <Route path='/admin/defex/add-account' element={<AddAcc loading={loading} setLoading={setLoading}/>}/>
   <Route path='/admin/defex/edit/:id' element={<Edit login={login}  loading={loading} setLoading={setLoading} />}/>
    
   </Routes>  
   </BrowserRouter>
  )
}

export default App
