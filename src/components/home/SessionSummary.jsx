import React from 'react'
import { BsCashCoin, BsClock, BsController } from 'react-icons/bs'
import { formatMoney } from '../../lib/formatMoney'

const SessionSummary = ({totalAmount,gamesCounter,game ,extraTimeCounter,onClose}) => {
  return (
    <div className="card bg-light shadow-sm mt-3 position-relative">
          <button
            className="btn-close position-absolute top-0 end-0 m-2"
            onClick={onClose}
          ></button>
          <div className="card-body">
            <h4 className="card-title text-primary text-center mb-4">
              Session Summary
            </h4>
            <div className="row">
              <div className="col-12">
                <p className="fs-6 m-0">
                  <BsCashCoin className="fs-6" /> Total:{" "}
                  <span className="text-success fs-4 fw-bold">
                    {formatMoney(totalAmount)}
                  </span>
                </p>
              </div>
                  
              <div className="col-12">
                <p className="fs-6 m-0 d-flex flex-wrap align-items-center ">
                  
              <BsController className="fs-6 me-1" /> Games Played:{" "}
              <span className="text-danger fs-5 ms-md-1 ">{ `${gamesCounter}x${game?.price} = ${formatMoney(gamesCounter * game?.price)}`}</span>

            </p>
            {/* <span className="text-danger fs-5 ">{ `${gamesCounter}x${game?.price} = ${formatMoney(gamesCounter * game?.price)}`}</span> */}
                  </div>
                  {extraTimeCounter > 0 && (<div className="col-12">
                <p className="fs-6">
                  
                  <BsClock className="fs-6" /> Extra Time:{" "}
                  <span className="text-danger fs-5 ">{`${extraTimeCounter}x${game?.extra_time_price} = ${formatMoney(extraTimeCounter * game?.extra_time_price)}`}</span>
                </p>
                  </div>)}
            </div>
          </div>
        </div>
  )
}

export default SessionSummary