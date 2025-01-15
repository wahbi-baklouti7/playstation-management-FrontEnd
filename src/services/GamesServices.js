

const API_URL = 'http://127.0.0.1:8000/api/v1/games';


export const getGames = async () => {
    

    

    const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
    const data = await response.json();
    return data.data;
}


export const createGame = async (data) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const data2 = await response.json();
    return data2
}

export const deleteGame = async (id) => {

    const response = await fetch(API_URL + `/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    });
    const data = await response.json();
    return data
}

export const updateGame = async (id, data) => {

    const response = await fetch(API_URL + `/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const data2 = await response.json();
    return data2

}
