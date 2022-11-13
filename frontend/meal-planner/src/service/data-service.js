//import request from "request"
//import fetch from "node-fetch"
import axios from 'axios'



const instance=axios.create({
    baseURL: 'http://192.168.0.128:5000/api/v1/meal-planner/',
    headers: {
        "Accept" : "*",
        "Content-Type": "application/json",
    }
})

class DataService {
    async searchIngredients(text) {
        try {
            const resp = await instance.get(`ingredient/search/${text}`)
            let retval = resp.data
            return retval
        }
        catch(e) {

        }
        return {error:'Error'}
    }
    searchRecipes() {
        return
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
}

export default new DataService