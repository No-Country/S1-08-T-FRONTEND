//Se divide entre rutas publicas y las privadas

import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import TestAuth from "../app/slices/users/TestAuth";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import Home from "../components/Home/Home";
import Detail from "../components/DetailPost/Detail";
import { UserProfile } from "../components/UserProfile/UserProfile";
import FollowersScreen from "../components/Follow/FollowersScreen";
import FollowingScreen from "../components/Follow/FollowingScreen";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import Category from "../components/CategoryList/Category"
import Searcher from "../components/Searcher/Searcher";
import OtherUsersAll from "../components/OtherUsers/OtherUsersAll/OtherUsersAll";



export const AppRouter = () => {
  return (
      <div className='body-container'>
        <Navbar />
        <div className='intersetion'></div>
        <main>
          <Routes>
            <Route path='/signin' element={<TestAuth />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/' element={<Home />} />
            <Route path='/post/:id' element={<Detail />} />
            <Route path='/followers/:userId' element={<FollowersScreen />} />
            <Route path='/following/:userId' element={<FollowingScreen />} />
            <Route path='/profile/:userId' element={<UserProfile />} />
            <Route path='/category/:id' element={<Category />} />
            <Route path="/suggestions" element={<OtherUsersAll/>} />         
            <Route path="/search" element={<Searcher/>} />         
            <Route path="*" element={<ErrorPage />} />       
          </Routes>
        </main>
      </div>
  )
}
