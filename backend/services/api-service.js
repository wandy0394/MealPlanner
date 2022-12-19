import TokenHandler from './token-handler.js'
import fetch from 'node-fetch'
import DatabaseService from '../services/database-service.js'

let db=undefined

const OPTION_MAP = {
    maxCal:"calories.to",
    minCal:"calories.from",
    maxCarb: "carb_precentage.to",
    minCarb:"carb_precentage.from",
    maxProtein: "protein_precentage.to",
    minProtein: "protein_precentage.from",
    maxFat: "fat_precentage.to",
    minFat: "fat_precentage.from",
    searchText: 'search_expression',
    page: 'page_number'
}


const DUMMY_EMAIL = 'dev@email.com'
const STORE_KEY = 'doStoreSearch'

//interface with database and FoodAPI
export default class ApiService {

    static #isValidInput(input) {
        if (input === '' || input == undefined || input === null) return false
        return true
    }

    // static async fetchAllIngredients() {
    //     if (db !== undefined) {
    //         let sqlQuery = `SELECT * from Ingredient`;
    //         db.query(sqlQuery, (err, results, fields) => {
    //             if (err) {
    //                 return console.error('Could not get all ingredients');
    //             }
    //             console.log(results);
    //             console.log(fields);
    //             return results;
    //         }) 
    //     }
    // }



    static async fetchIngredientByID(id) {

        try {
            const token = await TokenHandler.getToken();
            const params = new URLSearchParams();
            params.append('method', "food.get.v2")
            params.append('food_id', id.toString())
            params.append('format', "json")

            const option = {
                method: 'POST',
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'Authorization': `Bearer ${token}`
                },
                body: params
            }
            try {
                const res = await fetch('https://platform.fatsecret.com/rest/server.api', option);
                const resJSON = await res.json();
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

    static async searchIngredients(searchText, page, query) {
        try {
            const token = await TokenHandler.getToken();
            const params = new URLSearchParams();
            console.log(page)
            params.append('method', "foods.search")
            params.append('search_expression', searchText.toString())
            params.append('format', "json")
            params.append('max_results', 10)
            params.append('page_number', page)


            if (query[STORE_KEY] == 'true') {
                DatabaseService.storeIngredientSearchQuery(searchText, DUMMY_EMAIL)
            }
            

            const options = {
                method: 'POST',
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'Authorization': `Bearer ${token}`
                },
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
    static async searchRecipesWithOptions(searchData) {
        try {
            const token = await TokenHandler.getToken();
            const params = new URLSearchParams();

            params.append('method', "recipes.search.v2")
            params.append('format', "json")
            params.append('max_results', 10)
            //console.log('params')
            for (const key in searchData) {
                if (this.#isValidInput(searchData[key]) && (key in OPTION_MAP) ) {
                    params.append(OPTION_MAP[key], searchData[key])
                }
            }
            const options = {
                method: 'POST',
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'Authorization': `Bearer ${token}`
                },
                body: params
            }
            try {
                const res = await fetch('https://platform.fatsecret.com/rest/server.api', options);
                const resJSON = await res.json();
                console.log(resJSON)

                if (STORE_KEY in searchData) {
                    if (searchData[STORE_KEY] == 'true') {            
                        DatabaseService.storeRecipeSearchQuery(searchData, DUMMY_EMAIL)
                    }
                }
                return resJSON
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




