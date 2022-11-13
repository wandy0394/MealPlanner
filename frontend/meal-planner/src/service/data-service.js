//import request from "request"
//import fetch from "node-fetch"
import axios from 'axios'



const instance=axios.create({
    baseURL: 'http://localhost:5000/api/v1/meal-planner/',
    headers: {
        "Accept" : "*",
        "Content-Type": "application/json",
    }
})

class DataService {
    async searchIngredients(text) {
        try {
            const retval = await instance.get(`ingredient/search/${text}`)
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