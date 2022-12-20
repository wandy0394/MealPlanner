import axios from 'axios'



export const instance=axios.create({
    baseURL: 'http://192.168.0.128:5000/api/v1/meal-planner/',
    // timeout:3000,
    headers: {
        "Accept" : "*",
        "Content-Type": "application/json",
    }
})
