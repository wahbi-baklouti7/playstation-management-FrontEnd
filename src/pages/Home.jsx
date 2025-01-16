import { useEffect, useState } from 'react'
import SessionCard from '../components/home/SessionCard'
import { getGames } from '../services/GamesServices'
import { getAllDevices } from '../services/DevicesService'
import { useGames } from '../context/GamesContext'
import { useDevices } from '../context/DevicesContext'
import { Spin } from 'antd'
import echo from '../echo'

const Home = () => {



  const {devices,isLoading , handleUpdateDeviceStatus2}= useDevices()

  useEffect(() => {
    echo
      .channel("devices")
      .listen("UpdateDeviceStatusEvent", (e) => {
        handleUpdateDeviceStatus2(e.device)
        console.log("websockets" + JSON.stringify(e));
      })

    return () => {
      echo.leaveChannel("devices");
    };
  }, []);

  if (isLoading) {
    return <Spin fullscreen />
  }
  return (
    <div className='p-0 m-0 d-flex gap-3 flex-wrap '>
      {devices.map(device => <SessionCard key={device.id} device={device} />)}
    </div>
      
    
  )
}

export default Home