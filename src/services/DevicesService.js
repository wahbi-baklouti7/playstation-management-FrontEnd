import { axiosClient } from "../api/axios";

const API_URL = 'http://127.0.0.1:8000/api/v1/devices';


export const getAllDevices = async () => {
    // await fetch(`http://127.0.0.1:8000/sanctum/csrf-cookie`, {
    //     method: 'GET',
    //     credentials : 'include',
    // })
    // const token = localStorage.getItem('token')
    const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            // 'Authorization': `Bearer ${token}`
        },
        credentials: 'include'
    });
    const data = await response.json();
    return data.data;
    // axiosClient.get('/devices').then((res) => {
    //     return res.data
    // }).catch((err) => {
    //     console.log(err)
    // })
}


export const createDevice = async (data) => {


    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const res = await response.json();
        return res
    }catch(e){
        console.log(e)
    }
    
}

export const deleteDevice = async (id) => {

    const response = await fetch(API_URL+`/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    });
    const data = await response.json();
    return data
}

export const updateDevice = async (id, data) => {

    const response = await fetch(API_URL+`/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            
        },
        body: JSON.stringify(data)
    });
    const data2 = await response.json();
    return data2
}

export const changeDeviceStatus = async (id) => {
    const response = await fetch(API_URL + `/change-status/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    });
    const data = await response.json();
    return data
    }
        

