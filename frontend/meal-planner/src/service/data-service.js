//import request from "request"
//import fetch from "node-fetch"
import axios from 'axios'



const instance=axios.create({
    baseURL: 'localhost:5000/api/v1/',
    headers: {
        "Content-Type":"application/json",
    }
})

class DataService {
    async searchIngredients(text) {
        let options = {
            searchText: text
        }
        const retval = instance.get(`/ingredient/search/${text}`)
        return 
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