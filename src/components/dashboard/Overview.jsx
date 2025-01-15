import React, { useEffect, useState } from 'react'
import Session from '../../assets/icons/session.png'
import PlayStation from '../../assets/icons/ps4.png'
import People from '../../assets/icons/group.png'
import Scoccer from '../../assets/icons/ea-sports.png'
import OverviewCard from './OverviewCard'
import { getAllDevices } from '../../services/DevicesService'
import { getAllSessions } from '../../services/SessionsService'
import { getGames } from '../../services/GamesServices'
import { getAllUsers } from '../../services/UsersService'
import { useDevices } from '../../context/DevicesContext'
import { useSessions } from '../../context/SessionsContext'
import { useUsers } from '../../context/UsersContext'
import { useGames } from '../../context/GamesContext'
import { Spinner } from 'react-bootstrap'
import { Spin } from 'antd'

const Overview = () => {

    const [gamesCount, setGamesCount] = useState(0)
    const [usersCount, setUsersCount] = useState(0)
    const [sessionsCount, setSessionsCount] = useState(0)
  const [devicesCount, setDevicesCount] = useState(0)
  
  const { games  } = useGames()
  const { users } = useUsers()
  const { sessionTotal } = useSessions()
  const { devices } = useDevices()

  // console.log("games: "+games)
    
    useEffect(() => {
      //  TODO: check performance issues with getting all form the database, Use global context
        // getAllDevices().then((data) => {
        //   setDevicesCount(data.length)
        // })
        // getAllSessions().then((data) => {
        //   setSessionsCount(data.total)
        // })
        // getGames().then((data) => {
        //   setGamesCount(data.length)
        // })
        // getAllUsers().then((data) => {
        //   setUsersCount(data.length)
        // })
        },[])

  return (
    <>
     {/* Begin Overview Section  */ }

      <h1>Overview</h1>
      <div className='row d-flex justify-content-md-between justify-content-center gap-3 ' >

        {/* <OverviewCard title="Sessions" value={sessionsCount} icon={Session} />
        <OverviewCard title="Games" value={gamesCount} icon={Scoccer} />
        <OverviewCard title="Devices" value={devicesCount} icon={PlayStation} />
        <OverviewCard title="Users" value={usersCount} icon={People} /> */}

        <OverviewCard title="Sessions" value={sessionTotal} icon={Session} />
        <OverviewCard title="Games" value={games.length} icon={Scoccer} />
        <OverviewCard title="Devices" value={devices.length} icon={PlayStation} />
        <OverviewCard title="Users" value={users.length} icon={People} />
        

        {/* <Card className='col-md-3 p-0  bg-dangerr '>
          <div className='row '>

          
            <div className='col-4  bg-warningg   d-flex justify-content-center align-items-center' 
            >
              <img src={Session} width={60}  alt="" />
            
            </div>
            <div className='col-6 bg-success p-0 '>
              <p className='p-0 m-0  fs-5 text-muted'>Sessions</p>
              <p className='p-0 m-0 fs-4 fw-bold'>10</p>
            </div>
          </div>
        </Card>
        <Card className='col-md-3 p-0  bg-danger '>
          <div className='row '>
          <div className='col-6 bg-warning '><img src={Scoccer} width={70} alt="" /></div>
          <div className='col-6 bg-success'><p>Games</p></div>
          </div>
        </Card>
        <Card className='col-md-3 p-0  bg-danger '>
          <div className='row '>

          
          <div className='col-6 bg-warning'><img src={PlayStation} width={70} alt="" /></div>
          <div className='col-6 bg-success'><p>Devices</p></div>
          </div>
        </Card>
        <Card className='col-md-3 p-0  bg-danger '>
          <div className='row '>

          
          <div className='col-6 bg-warning'><img src={People} width={70} alt="" /></div>
          <div className='col-6 bg-success'><p>User</p></div>
          </div>
        </Card> */}
       

        
    </div>

    {/* End Overview Section  */ }
    </>
  )
}

export default Overview