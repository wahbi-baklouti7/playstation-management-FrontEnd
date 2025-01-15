import { Button, Checkbox } from 'antd'
import React, { useState } from 'react'
import CounterController from './CounterController'
import ConfirmDialog from './ConfirmDialog'

const ActiveSession = ({
    gamesCounter,
    extraTimeCounter,
    setGamesCounter,
    setExtraTimeCounter,
    handleEndSession,
    handleCancelSessionBtn,

}) => {

  const [isExtraTime,setIsExtraTime] = useState(false)
    const increaseGamesCounter = () => {
        setGamesCounter((prev) => prev + 1)
    }

    const decreaseGamesCounter = () => {
        setGamesCounter(prev => (prev > 0 ? prev - 1 : 0))
    }

    const increaseExtraTimeCounter = () => {
        setExtraTimeCounter((prev) => prev + 1)
    }

    const decreaseExtraTimeCounter = () => {
        setExtraTimeCounter(prev => (prev > 0 ? prev - 1 : 0))
    }
    
  
  const handleOncahge = (e) => {
    console.log('e:' + e.target.checked)
    setIsExtraTime(e.target.checked)
  }
  return (
    <div>
            <CounterController label="Games played" value={gamesCounter} onIncrease={increaseGamesCounter} onDecrease={decreaseGamesCounter} />
          {/* <div className="mt-2">
            <p className="m-0 p-0">Number of games played:</p>
            <div className=" text-center ">
              <Button
                onClick={decreaseGamesCounter}
                type="primary"
                shape="circle"
                size="small"
                icon={<AiOutlineMinus />}
              ></Button>
              <span className="mx-4 fs-4 fw-bold ">{gamesCounter}</span>
              <Button
                onClick={increaseGamesCounter}
                type="primary"
                shape="circle"
                size="small"
                icon={<AiOutlinePlus />}
              ></Button>
            </div>
            </div> */}
      {/* TODO: handle checkbox to display of hide extra time  */}
      <Checkbox    
      onChange={handleOncahge}  
      >
        Extra Times
      </Checkbox>
      {isExtraTime ? (<CounterController label="Extra time" value={extraTimeCounter} onIncrease={increaseExtraTimeCounter} onDecrease={decreaseExtraTimeCounter} />):null}
            
          {/* <div className="mt-2">
            <p className="m-0 p-0">Extra time:</p>
            <div className=" text-center ">
              <Button
                onClick={decreaseExtraTimeCounter}
                type="primary"
                shape="circle"
                size="small"
                icon={<AiOutlineMinus />}
              ></Button>
              <span className="mx-4 fs-4 fw-bold ">{extraTimeCounter}</span>
              <Button
                onClick={increaseExtraTimeCounter}
                type="primary"
                shape="circle"
                size="small"
                icon={<AiOutlinePlus />}
              ></Button>
            </div>
          </div> */}

          <div className="mt-2">
        <Button
          disabled = {gamesCounter === 0}
              onClick={() => ConfirmDialog('End Session','Are you sure you want to end this session', 'warning',handleEndSession )  }
              className="end-session-btn"
              type="primary"
              block
            >
              End Session
        </Button>
        

            <Button
              onClick={() => ConfirmDialog('Cancel Session','Are you sure you want to cancel this session', 'danger',handleCancelSessionBtn )  }
              // onClick={handleCancelSessionBtn}
              className="mt-2"
              danger
              type="primary"
              block
            >
              Cancel Session
            </Button>
          </div>
        </div>
  )
}

export default ActiveSession