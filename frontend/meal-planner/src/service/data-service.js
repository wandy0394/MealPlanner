//import request from "request"
//import fetch from "node-fetch"
import axios from 'axios'



const instance=axios.create({
    baseURL: 'http://192.168.0.128:5000/api/v1/meal-planner/',
    // timeout:3000,
    headers: {
        "Accept" : "*",
        "Content-Type": "application/json",
    }
})

class DataService {
    async searchIngredients(text, page, doStoreSearch) {
        try {
            const resp = await instance.get(`ingredient/search/${text}/${page}`, {params:{doStoreSearch:doStoreSearch}})
            let retval = resp.data
            return retval
        }
        catch(e) {
            return {error:'Error'}
        }
        
    }
    async searchRecipes(data) {
        try {
            const text = data.searchText
            //console.log(data)
            const resp = await instance.get(`recipe/search/${text}`, { params:{...data}})
            let retval = resp.data
            return retval
        }
        catch(e) {
            return {error:'Error'}
        }
    }
    async getSearchHistory() {
        try {
            const resp = await instance.get(`searchHistory`)
            console.log(resp.data)
            return resp.data
        }
        catch (e) {
            return {error:'Could not get history'}
        }
        
    }
    getIngredients() {
        return
    }
    getRecipes() {
        return
    }
    getMeals() {
        return
    }
    getMealPlans() {
        return
    }
    getRecipeBooks() {
        return
    }
    getShoppingList() {
        return
    }
    async addIngredient(params) {
        try {
            console.log(params)
            const resp =  await instance.post('/ingredient/add', params)
            console.log(resp)
            return resp
        }
        catch (e) {
            return {error:'Could not add ingredient'}
        }
    }
}

export default new DataService