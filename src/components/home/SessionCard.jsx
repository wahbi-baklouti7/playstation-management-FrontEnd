import { Button, Card } from "antd";
import React, { useEffect, useState } from "react";

import { useAuth } from "../../context/AuthProvider";
import { formateDateAndTime } from "../../lib/formateDate";
import SessionSummary from "./SessionSummary";
import GameSelect from "./GameSelect";
import ActiveSession from "./ActiveSession";
import { useGames } from "../../context/GamesContext";
import { useDevices } from "../../context/DevicesContext";
import Badge from "react-bootstrap/Badge";
import { useSessions } from "../../context/SessionsContext";

const SessionCard = ({ device }) => {
  const { user } = useAuth();
  const { games } = useGames();
  const { handleUpdateDeviceStatus } = useDevices();
  const {  handleAddSession } = useSessions();

  const [isStartSession, setIsStartSession] = useState(false);
  const [isEndSession, setIsEndSession] = useState(false);
  const [gamesCounter, setGamesCounter] = useState(0);
  const [extraTimeCounter, setExtraTimeCounter] = useState(0);
  const [selectedGame, setSelectedGame] = useState(null);
  const [sessionGame, setSessionGame] = useState(null);

  const [session, setSession] = useState({
    device_id: device.id,
    game_id: null,
    user_id: user?.id,
    start_time: null,
    end_time: null,
    amount: 0,
  });
  // =========================================================================



  useEffect(() => {
    console.log("selectedGame3: " + selectedGame);
    console.log("sessionGame: " + sessionGame);
    console.log("device: " + device);
    console.log("is start session: " + isStartSession);
    console.log("is end session: " + isEndSession);
  }, []);


  const resetSession = () => {
    setGamesCounter(0);
    setExtraTimeCounter(0);

    // setSession({
    //   device_id: null,
    //   game_id: null,
    //   user_id: null,
    //   start_time: null,
    //   end_time: null,
    //   amount: 0,
    // });
  };

  const handleSelectGame = (value) => {
    const t = games.find((game) => game.id === value);
    setSelectedGame(t);
    setSession((prev) => ({ ...prev, game_id: t?.id }));
  };

  const calculateSessionTotal = () => {
    console.log("selectedGame1: "+ selectedGame);
    if (selectedGame) {
      return (
        (selectedGame.price * gamesCounter) +
        (extraTimeCounter * selectedGame.extra_time_price)
      );
    } else {
      return 0;
    }
  };

  const handleEndSession = () => {

    const total = calculateSessionTotal();
    setSession((prev) => {
      const updatedSession = {
        ...prev,
        amount: total,
        end_time: formateDateAndTime(Date.now()),
      };
      handleAddSession(updatedSession)
      return updatedSession;
    });
    setSessionGame(selectedGame);
    setSelectedGame(null)
    setIsStartSession(false);
    handleUpdateDeviceStatus(device.id);
    // setIsStartSession(!isStartSession);
    setIsEndSession(!isEndSession);
   
  };
  const toggleStartSession = async () => {
    handleUpdateDeviceStatus(device.id);
    resetSession();
    // setSelectedGame(null)
    setIsEndSession(false);
    setIsStartSession(!isStartSession);
    setSession((prev) => ({
      ...prev,
      start_time: formateDateAndTime(Date.now()),
    }));
  };

  const handleCloseBtn = () => {
    setIsEndSession(false);
  };

  const handleCancelSessionBtn = () => {
    handleUpdateDeviceStatus(device.id);
    setIsStartSession(false);
    resetSession();
    setSelectedGame(null);
  };

  return (
    <Card
      hoverable
      bordered
      className="position-relative"
      style={{ width: 400 }}
    >
      <Badge bg={device.is_active ? "danger" : "success"}>
        <span className="fs-6">{device.is_active ? "Busy" : "Free"}</span>
      </Badge>

      <h4 className=" text-center">{device.name}</h4>

      {/* Begin Select Section */}

      <GameSelect
        games={games}
        device={device}
        selectedGame={selectedGame}
        handleSelectGame={handleSelectGame}
        isStartSession={isStartSession}
      />

      {/* End Select Section */}

      {isEndSession ? (
       
        <SessionSummary
          totalAmount={session?.amount}
          gamesCounter={gamesCounter}
          extraTimeCounter={extraTimeCounter}
          game={sessionGame}
          onClose={handleCloseBtn}
        />
      ) : null}

      {!isStartSession  ? (
        <Button
          className="mt-4"
          type="primary"
          disabled={selectedGame ? false : true}
          onClick={toggleStartSession}
          block
        >
          Start New Session
        </Button>
      ) : (
        <ActiveSession
          gamesCounter={gamesCounter}
          extraTimeCounter={extraTimeCounter}
          setExtraTimeCounter={setExtraTimeCounter}
          setGamesCounter={setGamesCounter}
          handleEndSession={handleEndSession}
          handleCancelSessionBtn={handleCancelSessionBtn}
        />
      )}

      {/* End Active Session Section */}
    </Card>
  );
};

export default SessionCard;
