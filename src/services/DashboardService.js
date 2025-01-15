
const API_URL = "http://127.0.0.1:8000/api/v1/dashboard";

export const getGameSessionsCount = async () => {
    const response = await fetch(API_URL + "/game-counts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data = await response.json();
    return data.data;
  };
  
  export const getTotalAmountByDevice = async () => {
    const response = await fetch(API_URL + "/device-total-amount", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data = await response.json();
    return data.data;
  };
  
  export const getTotalAmountByGame = async () => {
    const response = await fetch(API_URL + "/game-total-amount", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data = await response.json();
    return data.data;
  };