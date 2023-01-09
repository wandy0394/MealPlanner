import TokenHandler from './token-handler.js'
import fetch from 'node-fetch'
import DatabaseService from '../services/database-service.js'
import SearchHistory from './searchHistory.js'

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

export default class Recipe {
    //interface with database and FoodAPI
    static injectConn(conn) {
        if (db === undefined) {
            db = conn;
        } else {
            console.error('db already assigned');
        }   
    }

    static #isValidInput(input) {
        if (input === '' || input == undefined || input === null) return false
        return true
    }

    static insertCustomRecipe(userEmail, params) {
        if (db !== undefined) {
            const promiseRecipe = new Promise((resolve, reject)=> {
                const sqlQuery = `INSERT INTO recipe 
                                    (title, 
                                        recipe_description,
                                        servings,
                                        serving_size,
                                        prep_time,
                                        cook_time,
                                        carbs, 
                                        protein, 
                                        fat, 
                                        calories, 
                                        instructions, 
                                        user_id
                                    )
                                    VALUES ('${params.title}', 
                                            '${params.recipe_description}',
                                            ${params.servings},
                                            '${params.serving_size}',
                                            ${params.prepTime},
                                            ${params.cookTime},
                                            ${params.macros.carbs}, 
                                            ${params.macros.protein}, 
                                            ${params.macros.fat}, 
                                            ${params.macros.calories}, 
                                            '${params.instructions}', 
                                            '${userEmail}'
                                            );
                                `
                db.query(sqlQuery, (err, results, fields) => {
                    if (err) {
                        console.error(err)
                        return reject('Could not make SQL INSERT');
                    }
                    resolve(results);
                }) 
            })            
            return promiseRecipe
        }             
    }
    static insertRecipeIngredient(ingredients, recipeId) {
        if (db !== undefined) {
            const promise = new Promise((resolve, reject)=> {
                const sqlQuery =  Object.entries(ingredients).reduce((query, [key, value]) => {
                    return (query + `INSERT INTO recipe_ingredient (recipe_id, ingredient_id, qty, units) VALUES (${recipeId}, ${value.food_id}, ${value.qty}, '${value.unit}');`)
                }, '')
                db.query(sqlQuery, (err, results, fields) => {
                    if (err) {
                        console.error(err)
                        return reject('Could not make SQL INSERT');
                    }
                    resolve(results);
                }) 
            })            
            return promise
        }             
    }    

    static apiGetAllCustomRecipes(userEmail) {
        if (db !== undefined) {
            const promise = new Promise((resolve, reject)=> {
                const sqlQuery = `SELECT recipe.id, recipe.title, name, 
                                    ingredient.carbs, 
                                    ingredient.protein, 
                                    ingredient.fat, 
                                    ingredient.calories, 
                                    ingredient_id,
                                    qty, 
                                    units,
                                    recipe.carbs as total_carbs, 
                                    recipe.protein as total_protein, 
                                    recipe.fat as total_fat, 
                                    recipe.calories as total_calories,
                                    recipe.servings as servings,
                                    recipe.serving_size as serving_size,
                                    recipe.recipe_description as recipe_description,
                                    recipe.cook_time as cookTime,
                                    recipe.prep_time as prepTime, 
                                    instructions
                                    FROM recipe 
                                    INNER JOIN recipe_ingredient on recipe.id=recipe_ingredient.recipe_id 
                                    INNER JOIN ingredient 
                                    WHERE 
                                    recipe.user_id='${userEmail}'
                                    AND ingredient.id=recipe_ingredient.ingredient_id;`
                db.query(sqlQuery, (err, results, fields) => {
                    if (err) {
                        console.error(err)
                        return reject('Could not make SQL SELECT for ingredients');
                    }
                    resolve(results);
                }) 
            })
            return promise
        }          
    }
    static apiGetCustomRecipe(userEmail, id) {
        if (db !== undefined) {
            const promise = new Promise((resolve, reject)=> {
                const sqlQuery = `SELECT recipe.id, recipe.title, name, 
                                    ingredient.carbs, 
                                    ingredient.protein, 
                                    ingredient.fat, 
                                    ingredient.calories, 
                                    ingredient_id,
                                    qty, 
                                    units,
                                    recipe.carbs as total_carbs, 
                                    recipe.protein as total_protein, 
                                    recipe.fat as total_fat, 
                                    recipe.calories as total_calories,
                                    recipe.servings as servings,
                                    recipe.recipe_description as recipe_description,
                                    recipe.serving_size as serving_size,
                                    recipe.cook_time as cookTime,
                                    recipe.prep_time as prepTime, 
                                    recipe_ingredient.id as recipeIngredientId,
                                    instructions
                                    FROM recipe 
                                    INNER JOIN recipe_ingredient on recipe.id=recipe_ingredient.recipe_id 
                                    INNER JOIN ingredient on ingredient.id=recipe_ingredient.ingredient_id
                                    WHERE 
                                    recipe.user_id='${userEmail}'
                                    AND recipe.id=${id};`
                db.query(sqlQuery, (err, results, fields) => {
                    if (err) {
                        console.error(err)
                        return reject('Could not make SQL SELECT for recipe');
                    }
                    resolve(results);
                }) 
            })
            return promise
        }             
    }
  
    static updateCustomRecipe(userEmail, params, recipeId) {
        if (db !== undefined) {
            const promiseRecipe = new Promise((resolve, reject)=> {
                const sqlQuery = `UPDATE recipe 
                                    SET
                                        title='${params.title}', 
                                        recipe_description='${params.recipe_description}', 
                                        servings=${params.servings},
                                        serving_size='${params.serving_size}',
                                        prep_time=${params.prepTime},
                                        cook_time=${params.cookTime},
                                        carbs=${params.macros.carbs},  
                                        protein=${params.macros.protein}, 
                                        fat=${params.macros.fat}, 
                                        calories=${params.macros.calories}, 
                                        instructions='${params.instructions}'
                                    WHERE
                                        id=${recipeId} AND user_id='${userEmail}'
                                `
                db.query(sqlQuery, (err, results, fields) => {
                    if (err) {
                        console.error(err)
                        return reject('Could not make SQL UPDATE');
                    }
                    resolve(results);
                }) 
            })            
            return promiseRecipe
        }                     
    }
    static updateCustomRecipeIngredients(ingredients, recipeId) {
        if (db !== undefined) {
            const promise = new Promise((resolve, reject)=> {
                const sqlQuery =  Object.entries(ingredients).reduce((query, [key, value]) => {
                    let command = ''
                    
                    if (value.operation === 'insert') {
                        command = `INSERT INTO recipe_ingredient (recipe_id, ingredient_id, qty, units) VALUES (${recipeId}, ${value.food_id}, ${value.qty}, '${value.unit}');`
                    }
                    else {
                        if (value.recipeIngredientId) {
                            if (value.operation === 'update') {
                                command = `UPDATE recipe_ingredient SET ingredient_id=${value.food_id}, qty=${value.qty}, units='${value.unit}' WHERE id=${value.recipeIngredientId};`
                            }
                            else if (value.operation === 'delete') {
                                command = `DELETE FROM recipe_ingredient WHERE id=${value.recipeIngredientId};`
                            }
                        }
                    }
                     
                    return (query + command)
                }, '')
                db.query(sqlQuery, (err, results, fields) => {
                    if (err) {
                        console.error(err)
                        return reject('Could not make SQL Operations');
                    }
                    resolve(results);
                }) 
            })            
            return promise
        }          
    }

    static deleteCustomRecipe(userEmail, recipeId) {
        if (db !== undefined) {
            const promise = new Promise((resolve, reject)=>{
                const sqlQuery = `DELETE FROM recipe where user_id='${userEmail}' and id=${recipeId}`
                db.query(sqlQuery, (err, results, fields)=>{
                    if (err) {
                        console.error(err)
                        reject('Could not delete')
                    }
                    resolve(results)
                })
            })
            return promise
        }
    }

    static insertStaticRecipe(userEmail, params) {
        if (db !== undefined) {
            const promiseRecipe = new Promise((resolve, reject)=> {
                const sqlQuery = `INSERT INTO static_recipe 
                                    (   recipe_id,
                                        recipe_name,
                                        user_id
                                    )
                                    VALUES (
                                            ${params.recipe_id},
                                            '${params.recipe_name}',
                                            '${userEmail}'
                                    );
                                `
                db.query(sqlQuery, (err, results, fields) => {
                    if (err) {
                        console.error(err)
                        return reject('Could not make SQL INSERT');
                    }
                    resolve(results);
                }) 
            })            
            return promiseRecipe
        }             
    }

    static deleteStaticRecipe(userEmail, recipeId) {
        if (db !== undefined) {
            const promiseRecipe = new Promise((resolve, reject)=> {
                const sqlQuery = `DELETE from static_recipe where user_id='${userEmail}' and id=${recipeId}`
                db.query(sqlQuery, (err, results, fields) => {
                    if (err) {
                        console.error(err)
                        return reject('Could not delete');
                    }
                    resolve(results);
                }) 
            })            
            return promiseRecipe
        }           
    }

    static getStaticRecipes(userEmail) {
        if (db !== undefined) {
            const promiseRecipe = new Promise((resolve, reject)=> {
                const sqlQuery = `SELECT * from static_recipe where user_id='${userEmail}'`
                db.query(sqlQuery, (err, results, fields) => {
                    if (err) {
                        console.error(err)
                        return reject('Could not make SQL SELECT');
                    }
                    resolve(results);
                }) 
            })            
            return promiseRecipe
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
                return resJSON;
            }
            catch (e) {
                console.error(e)
                return {error:`error fetching from api: ${e.message}`}
            }
        }
        catch {
            return {error: 'could not get authentication token'}
        }
    }
    static async searchRecipesWithData(searchData) {
        try {
            const token = await TokenHandler.getToken();
            const params = new URLSearchParams();

            params.append('method', "recipes.search.v2")
            params.append('format', "json")
            params.append('max_results', 10)
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

                if (STORE_KEY in searchData) {
                    if (searchData[STORE_KEY] == 'true') {            
                        SearchHistory.storeRecipeSearchQuery(searchData, DUMMY_EMAIL)
                    }
                }
                return resJSON
            }
            catch (e) {
                console.error(e)
                return {error:`error fetching from api: ${e.message}`}
            }
        }
        catch {
            return {error: 'could not get authentication token'}
        }
    }
}