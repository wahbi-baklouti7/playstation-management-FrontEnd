import { Card } from 'antd'
import React from 'react'

const OverviewCard = ({ title, value, icon }) => {
  return (
      <Card
          style={{ width: 300 }}
          bordered
          className='col-md-3 p-0  bg-dangerr '>
          <div className='row d-flex justify-content-between  '>

          
           
            <div className='col-5 bg-successs   d-flex justify-content-center align-items-center flex-column '>
              <p className='p-0 m-0  fs-5 text-muted'>{title}</p>
                  <p className='p-0 m-0 mt-2 fs-3 text-center fw-bold'>{value}</p>
              </div>
              <div className='col-4  bg-warningg  d-flex justify-content-center align-items-center' 
            >
              <img src={icon} width={90}  alt="" />
            
            </div>
          </div>
        </Card>
  )
}

export default OverviewCard