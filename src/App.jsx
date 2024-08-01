import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './pages/Auth/Login'
import Home from './pages/Home'
import AuthProvider from './context/AuthProvider'
import PrivateRoute from './router/PrivateRoute'
import LayoutA from './components/Layout'

function App() {

  return (
    <Router>
      <AuthProvider>
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />} >
            <Route path="/" element={<Home />} />
          </Route>
          <Route path ="/layout" element={<LayoutA/>} />

      </Routes>
      </AuthProvider>
     
    </Router>
  )
}

export default App
