import React from 'react'
import Nav from './Pages/Navbar/Nav'
import { Outlet } from 'react-router-dom'

const Pagebound = () => {
  return (
      <>
          <Nav />
          <Outlet/>
      </>
  )
}

export default Pagebound