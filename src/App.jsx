import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './pages/Auth/Login'
import AuthProvider from './context/AuthProvider'
import LayoutA from './components/Layout'
import AppRoutes from './router/AppRoutes'
import NotFound from './components/NotFound'

function App() {

  return (
    <Router>
      <AuthProvider>
        <Routes>
           <Route path="/login" element={<Login />} /> 
            <Route  element={<LayoutA />}>
            <Route path="/*" element={<AppRoutes />} />            
          </Route>
          <Route path="/404" element={<NotFound />} />
          <Route path="*"  element={<NotFound />} />
          {/* </Route> */}
        </Routes>
      </AuthProvider>
    </Router>

  )
}

export default App
