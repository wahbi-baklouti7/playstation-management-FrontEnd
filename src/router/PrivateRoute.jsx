import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'
import NotFound from '../components/NotFound'
const PrivateRoute = ({ allowedRoles }) => {
  const auth = useAuth()


  if (!auth?.token) {
    return <Navigate to="/login" />
  }
  if (allowedRoles.includes(auth?.user?.is_admin)) {

    return <Outlet />
  } else {
    return <NotFound />
  }
}

export default PrivateRoute