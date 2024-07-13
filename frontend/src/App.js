import React,{createContext,useState} from 'react';
import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from "./components/Home";
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Profile from './components/Profile';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Createpost from './components/Createpost';
import { LoginContext } from './context/LoginContext';
import Modal from './components/Modal';

import FullScreenMedia from './components/FullScreenMedia';
import UserProfile from './components/UserProfile';
import MyFollowingPost from './components/MyFollowingPost';
import ShopNow from './components/ShopNow';
import MyWardrobe from './components/MyWardrobe';
import WeeklyFeedback from './components/WeeklyFeedback';




function App() {

  const [userLogin,setUserLogin]=useState(false);
  const [modalOpen,setModalOpen]=useState(false);
  return (
    <BrowserRouter>
    <div className="App">

      <LoginContext.Provider value={{setUserLogin,setModalOpen}} >
      <Navbar login ={userLogin}/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
        <Route path="/signin" element={<SignIn/>}></Route>
        <Route exact path="/profile" element={<Profile/>}></Route>
        <Route path="/createPost" element={<Createpost/>}></Route>
        <Route path="/profile/:userid" element={<UserProfile/>}></Route>
        <Route path='/followingpost' element={<MyFollowingPost />} />
        <Route path="/fullscreen" element={<FullScreenMedia />} />
        <Route path="/ShopNow" element={<ShopNow />} />
        <Route path="/MyWardrobe" element={<MyWardrobe />} />
        <Route path="/weeklyfeedback" element={<WeeklyFeedback />} />
        

      </Routes>
      <ToastContainer theme='dark'/>
      {/* <Modal></Modal> */}
      {modalOpen && <Modal setModalOpen={setModalOpen} ></Modal>}
      </LoginContext.Provider>
      
    </div>
    </BrowserRouter>
    
  );
}

export default App;
