import React, { useContext, useEffect,} from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from "js-cookie"
import Ct from './Ct'

const Logout = () => {
  let obj=useContext(Ct)
  let navigate=useNavigate()
  useEffect(()=>{
    Cookies.remove("lgc")
    obj.updstate({"token":"","uid":"","name":"","role":""})
    navigate("/")
  },[])
  return (
    <div>Logout</div>
  )
}

export default Logout