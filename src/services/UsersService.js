

const API_URL = 'http://127.0.0.1:8000/api/v1/users';


export const getAllUsers = async () => {
    const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },

    });
    const data = await response.json();
    return data.data
}

export const createUser = async (data) => {

    try {
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
    } catch (error) {
        console.log("erros: "+error)
    }
    
}


export const deleteUser = async (id) => {

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

export const updateUser = async (id, data) => {

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

