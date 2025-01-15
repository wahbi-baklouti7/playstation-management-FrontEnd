import { Button } from 'antd'
import React from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

const CounterController = ({label,value,onIncrease,onDecrease}) => {
  return (
    
          <div className="mt-2">
            <p className="m-0 p-0">{label}:</p>
            <div className=" text-center ">
              <Button
                onClick={onDecrease}
                type="primary"
                shape="circle"
                size="small"
                icon={<AiOutlineMinus />}
              ></Button>
              <span className="mx-4 fs-4 fw-bold ">{value}</span>
              <Button
                onClick={onIncrease}
                type="primary"
                shape="circle"
                size="small"
                icon={<AiOutlinePlus />}
              ></Button>
            </div>
          </div>
  )
}

export default CounterController