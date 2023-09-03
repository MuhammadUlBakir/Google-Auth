import React, { useEffect } from 'react'
import Nav from '../Navbar/Nav'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

const Priv2 = () => {
  const navigate = useNavigate();
  const CheckToken = async () => {
    try {
      const token = Cookies.get("Usertoken");
      if (!token) {
        navigate("/")
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    CheckToken();
  },[])
  return (
    <>
      <Nav/>
      <div className='text-center'>
              <h1>This is Private Page 2</h1>
      </div>
      </>
  )
}

export default Priv2