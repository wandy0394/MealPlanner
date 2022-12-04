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
    async removeSearchQuery(id) {
        try {
            const resp = await instance.delete(`searchHistory/${id}`)
            console.log(resp.data)
            return resp.data
        }
        catch (e) {
            return {error:'Could not get history'}
        }
        
    }
    async getIngredients() {
        try {
            const resp = await instance.get(`/ingredient/all`)
            return resp.data
        }
        catch (e) {
            return {error:'error'}
        }
        
    }

    async getRecipes() {
        try {
            const resp = await instance.get(`/recipe/all`)
            return resp.data
        }
        catch (e) {
            return {error:'error'}
        }
    }
    async addRecipe(data) {
        try {
            console.log(data)
            const resp = await instance.post('/recipe/add', data)
            let retval = resp.data
            return retval
        }
        catch(e) {
            return {error:'Error'}
        }
    }
    async getRecipe(recipeId) {
        const resp = await instance.get(`/recipe/${recipeId}`)
        return resp.data
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
            const resp =  await instance.post('/ingredient', params)
            return resp
        }
        catch (e) {
            return {error:'Could not add ingredient'}
        }
    }
    async updateIngredient(params) {
        try {
            const resp =  await instance.put(`/ingredient/${params.id}`, params)
            return resp
        }
        catch (e) {
            return {error:'Could not update ingredient'}
        }
    }
    async removeIngredient(id) {
        try {
            const resp =  await instance.delete(`/ingredient/${id}`)
            return resp
        }
        catch (e) {
            return {error:'Could not delete ingredient'}
        }
    }
}

export default new DataService