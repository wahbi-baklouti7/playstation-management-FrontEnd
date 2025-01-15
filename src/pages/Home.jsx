import { useEffect, useState } from 'react'
import SessionCard from '../components/home/SessionCard'
import { getGames } from '../services/GamesServices'
import { getAllDevices } from '../services/DevicesService'
import { useGames } from '../context/GamesContext'
import { useDevices } from '../context/DevicesContext'
import { Spin } from 'antd'

const Home = () => {



  const {devices,isLoading}= useDevices()


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