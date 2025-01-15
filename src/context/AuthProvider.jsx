import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login, logout } from '../services/Auth/authService'


const AuthContext = createContext()
const AuthProvider = ({ children }) => {
    
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null)
    const [token, setToken] = useState(JSON.parse(localStorage.getItem('token')) || null)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    

    useEffect(() => {
        if (token) {
            navigate("/", { replace: true })
        }
    },[])

    const LoginAction = async (email,Password) => {
        
        try {
            setLoading(true)
            const response = await login(email, Password)
            if (!response.status) {
                setLoading(false)
                setError(true)
                setErrorMessage(response.message)
            } else {
                setLoading(false)
                localStorage.setItem("token", JSON.stringify(response.data.access_token))
                localStorage.setItem("user", JSON.stringify(response.data.user))
                setUser(response.data.user)
                setToken(response.data.access_token)
                navigate("/", { replace: true })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const logoutAction = async () => {
        await logout()
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setUser(null)
        setToken(null)
        navigate("/login", { replace: true })
    }

  return (
      <AuthContext.Provider value={{ user, setUser, token, setToken, LoginAction , error, setError, errorMessage ,loading,logoutAction}} > 
          {children}
   </AuthContext.Provider>
  )
}

export default AuthProvider


export const useAuth = () => useContext(AuthContext)