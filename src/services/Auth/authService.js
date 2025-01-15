import { json } from "react-router-dom";
import axios from "axios";
import { axiosClient } from "../../api/axios";



const apiUrl = 'http://127.0.0.1:8000/api/v1';


export const login = async (email, password) => {

    
    // await axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie', { withCredentials: true });
    // const response = await axiosClient.post('/login', {
    //     email,
    //     password
    // })

    // console.log("login response !!!!!!!!!!!!!!!!!!"+response)
    // return response
    


    await fetch(`http://127.0.0.1:8000/sanctum/csrf-cookie`, {
        method: 'GET',
        credentials : 'include',
    })
    const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        credentials : 'include',
        body: JSON.stringify({
            email,
            password
        })
    });
    const data = await response.json();
    return data;
}

export const logout = async () => {
    const response = await fetch(`${apiUrl}/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    })


    const data = response.json();
    // return data;
}
        