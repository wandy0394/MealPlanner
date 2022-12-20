import { instance } from "./axios-instance";

class RecipeService {

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
    async addStaticRecipe(data) {
        try {
            console.log(data)
            const resp = await instance.post('/recipe/static', data)
            let retval = resp.data
            return retval
        }
        catch(e) {
            return {error:'Error'}
        }        
    }
    async getStaticRecipes() {
        try {
            const resp = await instance.get(`/recipe/static/all`)
            return resp.data
        }
        catch (e) {
            return {error:'Error'}
        }        
    }
    async getRecipe(recipeId) {
        try {
            const resp = await instance.get(`/recipe/${recipeId}`)
            return resp.data
        }
        catch (e) {
            return {error:'Error'}
        }
    }
    async getStoredRecipe(recipeId) {
        try {
            const resp = await instance.get(`/recipe/internal/${recipeId}`)
            //console.log(resp.data)
            return resp.data
        }
        catch (e) {
            return {error:'Error'}
        }
    }


    async updateRecipe(params, recipeId) {
        try {
            const resp =  await instance.put(`/recipe/internal/${recipeId}`, params)
            return resp
        }
        catch (e) {
            return {error:'Error'}
        }
    }
}

export default new RecipeService