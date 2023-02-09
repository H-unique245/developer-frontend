import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import UserDetails from '../Pages/UserDetails'

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/userDetails" element={<UserDetails />} />
    </Routes>
  )
}

export default AllRoutes
