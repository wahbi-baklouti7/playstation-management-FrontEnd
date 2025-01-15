import { Select } from 'antd';
import React from 'react'

const GameSelect = ({games,device,selectedGame,handleSelectGame,isStartSession}) => {
 const isDisabled = (isStartSession || device?.is_active )? true : false
  return (
    <div className="d-flex gap-2 mt-3 ">
        <p className="fs-6 m-0 p-0 align-bottom">Game:</p>
      <Select
        allowClear
        value={selectedGame?.id}
        // disabled={isStartSession}
        disabled={isDisabled}
        onChange={handleSelectGame}
        placeholder="-- Select A Game --"
        className="w-75"

        options={games.map((game) => {
          return {
            value: game.id,
            label: game.name,
          };
        })}
      />
    </div>
  )
}

export default GameSelect