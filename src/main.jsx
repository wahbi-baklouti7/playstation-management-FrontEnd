import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import SessionsProvider from './context/SessionsContext.jsx'
import DevicesProvider from './context/DevicesContext.jsx'
import GamesProvider from './context/GamesContext.jsx'
import UsersProvider from './context/UsersContext.jsx'
// import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SessionsProvider>
      <DevicesProvider>
        <GamesProvider>
          <UsersProvider>
            <App />
            </UsersProvider>
          </GamesProvider>
      </DevicesProvider>
      
    </SessionsProvider>
   
  </React.StrictMode>,
)
