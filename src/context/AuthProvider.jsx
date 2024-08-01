import Password from 'antd/es/input/Password'
import { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../services/Auth/authService'


const AuthContext = createContext()
const AuthProvider = ({ children }) => {
    
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(localStorage.getItem('token') || null)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    

    const LoginAction = async (email,Password) => {
        
        try {
            setLoading(true)
            const response = await login(email, Password)
            console.log("auth provider response " + response)
            if (!response.status) {
                setLoading(false)
                setError(true)
                setErrorMessage(response.message)
            } else {
                setLoading(false)
                localStorage.setItem("token", response.data.access_token)
                // setUser(response.data.user)
                setToken(response.data.access_token)
                navigate("/")
            }
        } catch (error) {
            console.log(error)
        }
    }

  return (
      <AuthContext.Provider value={{ user, setUser, token, setToken, LoginAction , error, setError, errorMessage ,loading}} > 
          {children}
   </AuthContext.Provider>
  )
}

export default AuthProvider


export const useAuth = () => useContext(AuthContext)