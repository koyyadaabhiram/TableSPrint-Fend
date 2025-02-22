import React, { useContext, useEffect } from 'react'
import Cookies from 'js-cookie'
import Ct from './Ct'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    let navigate=useNavigate()
    let obj=useContext(Ct)
    useEffect(()=>{
        Cookies.remove("logincrd")
        obj.updfun({f:false})
        navigate("/")
        obj.updfun({f:obj.f})
    })
  return (
    <div>Logout</div>
  )
}

export default Logout