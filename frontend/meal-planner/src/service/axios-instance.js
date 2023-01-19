import axios from 'axios'


//use common axios instance across all api calls
export const instance=axios.create({
    baseURL: 'http://192.168.0.128:5000/api/v1/meal-planner/',
    // timeout:3000,
    headers: {
        "Accept" : "*",
        "Content-Type": "application/json",
    }
})
