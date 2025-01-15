import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Sessions from '../pages/Sessions'
import Devices from '../pages/Devices'
import Games from '../pages/Games'
import Users from '../pages/Users'
import Dashboard from '../pages/Dashboard'
import PrivateRoute from './PrivateRoute'

const AppRoutes = () => {
  return (
      <Routes>
      <Route element={<PrivateRoute allowedRoles={['admin', 'user']} />} >
      <Route path="/" exact element={<Home />} />
      </Route>
    
      <Route element={<PrivateRoute allowedRoles={['admin']} />} >
        <Route path="sessions" element={<Sessions />} />
          <Route path="/devices" element={<Devices />} />
          <Route path="/games" element={<Games />} />
          <Route path="/users" element={<Users />} />
          <Route path="/dashboard" element={<Dashboard />} />
      </Route>
        
    </Routes>
  )
}

export default AppRoutes