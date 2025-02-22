import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Reg from './Reg'
import Logout from './Logout'
import Ct from './Ct'
import Dashboard from './Dashboard'
import Category from './Cata Comp/Category'
import EditCategory from './Cata Comp/EditCategory'
import AddCategory from './Cata Comp/AddCategory'
import './App.css'
import SubCategory from './SubCategory/Subcategory'
import AddSubCategory from './SubCategory/AddSubCategory'

const App = () => {
  let [cobj,setCont]=useState({"f":false})
  let updfun=(obj)=>{
    setCont({...cobj,...obj})
  }
  let obj={"cobj":cobj,"updfun":updfun}
  return (
    <BrowserRouter>
    <Ct.Provider value={obj}>
    <Routes>
    <Route path='/login' element={<Login/>}/> 
    <Route path='/' element={<Home/>}>
    <Route path='/dashboard' element={<Dashboard/>}/>
    <Route path='/category' element={<Category/>}/>
    <Route path='/editcategory' element={<EditCategory />} />
    <Route path="/edit-category/:id" element={<EditCategory />} />
    <Route path='/addcategory' element={<AddCategory />} />
    <Route path='/subcategory' element={<SubCategory />} />
    <Route path='/addsubcategory' element={<AddSubCategory/>} />
    </Route>
    <Route path='/reg' element={<Reg/>}/>
    <Route path='/logout' element={<Logout/>}/>
  
   

    </Routes>
    </Ct.Provider>
    </BrowserRouter>
  )
}

export default App