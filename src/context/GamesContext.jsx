import { Children, createContext, useContext, useEffect, useState } from "react";
import { createGame, deleteGame, getGames, updateGame } from "../services/GamesServices";
import { Form } from "antd";



const gamesContext = createContext()



const GamesProvider = ({ children }) => {
    
    const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();


  useEffect(() => {
    fetchGames();
    // console.log("!!!!!!!!!!!!!!! useEffect games contest "+games)
  },[])
    const fetchGames = async () => {
        setIsLoading(true);
        const data = await getGames();
        setGames(data);
        setIsLoading(false);
    };


    const handleDelete = async (id) => {
    
        deleteGame(id).then((res) => {
    
          if (res.status) {
            const updatedGame = games.filter((game) => game.id !== id);
            setGames(updatedGame);
          }
        })
        
  }
  const handleAddGame = async (values) => {
   const res = await createGame(values)
    // createGame(values).then((res) => {
      if (res.status) {
        setGames((prev) => [...prev, res.data]);
        // onSuccess();
        form.resetFields();
        // setIsModalOpen(false);
      } else {
        form.setFields([
          {
            name: "name",
            errors: [res.message],
          },
        ]);
      }
    // });
  }

  const handleUpdateGame = (gameId,values,onSuccess) => {
    updateGame(gameId, values).then((res) => {
      if (res.status) {
        setGames((prev) =>
          prev.map((d) => (d.id === res.data.id ? res.data : d))
        );
        onSuccess();
        // setIsModalOpen(false);
      } else {
        form.setFields([
          {
            name: "name",
            errors: [res.message],
          },
        ]);
      }
    });
  }
  return  <gamesContext.Provider value={{
        games,
    isLoading,
        form,
        handleAddGame,
        fetchGames,
    handleDelete,
    handleUpdateGame
    }}>

        {children}
    </gamesContext.Provider>
}


export default GamesProvider 

export const useGames = () => {
    return useContext(gamesContext)
}