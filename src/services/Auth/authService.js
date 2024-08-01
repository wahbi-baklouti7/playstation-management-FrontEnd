import { json } from "react-router-dom";



const apiUrl = 'http://127.0.0.1:8000/api';


export const login = async (email, password) => {

    const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    });
    const data = await response.json();
    console.log("login service: "+JSON.stringify(data))
    return data;
    // console.log(response.json())
    // return response.json();
}