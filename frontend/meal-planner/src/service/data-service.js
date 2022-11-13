//import request from "request"

const baseUrl='localhost:5000/api/v1/'
const options = {
    method: 'GET',
    headers: {
        "Content-Type":"application/json",
    },
    body:''
}

class DataService {
    async searchIngredients(searchText) {
        //options['body'] = searchText
        //const retval = await fetch(baseUrl+'search', options)
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