import TokenHandler from './token-handler.js'
import fetch from 'node-fetch'
let db=undefined

export default class Recipe {
    //interface with database and FoodAPI

    static async fetchRecipeByID(id) {

        try {
            const token = await TokenHandler.getToken();
            const params = new URLSearchParams();
            params.append('method', "recipe.get")
            params.append('recipe_id', id.toString())
            params.append('format', "json")

            const option = {
                method: 'POST',
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'Authorization': `Bearer ${token}`
                },
                //body: "method=food.get.v2&food_id=33691&format=json"
                body: params
            }
            try {
                const res = await fetch('https://platform.fatsecret.com/rest/server.api', option);
                const resJSON = await res.json();
                //console.log(resJSON)
                return resJSON;
            }
            catch (e) {
                console.log(e)
                return {error:`error fetching from api: ${e.message}`}
            }
        }
        catch {
            return {error: 'could not get authentication token'}
        }
    }

    static async searchRecipes(searchText) {
        try {
            const token = await TokenHandler.getToken();
            const params = new URLSearchParams();
            params.append('method', "recipes.search.v2")
            params.append('search_expression', searchText.toString())
            params.append('format', "json")
            params.append('max_results', 10)

            const options = {
                method: 'POST',
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'Authorization': `Bearer ${token}`
                },
                //body: "method=food.get.v2&food_id=33691&format=json"
                body: params
            }
            try {
                const res = await fetch('https://platform.fatsecret.com/rest/server.api', options);
                const resJSON = await res.json();
                console.log(resJSON)
                return resJSON;
            }
            catch (e) {
                console.log(e)
                return {error:`error fetching from api: ${e.message}`}
            }
        }
        catch {
            return {error: 'could not get authentication token'}
        }
    }
}