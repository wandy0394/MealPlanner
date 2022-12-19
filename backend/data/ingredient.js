import TokenHandler from './token-handler.js'
import fetch from 'node-fetch'
import DatabaseService from '../services/database-service.js'
import SearchHistory from './searchHistory.js'

const DUMMY_EMAIL = 'dev@email.com'
const STORE_KEY = 'doStoreSearch'
const RECIPE='recipe'
const INGREDIENT = 'ingred'

let db=undefined
export default class Ingredient {
    //interface with database and FoodAPI
    static injectConn(conn) {
        if (db === undefined) {
            db = conn;
        } else {
            console.log('db already assigned');
        }   
    }

    // static async getAllIngredients() {
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

    static getAllIngredients(userEmail) {
        if (db !== undefined) {
            const promise = new Promise((resolve, reject)=> {
                const sqlQuery = `SELECT * from ingredient where user_id='${userEmail}'`
                db.query(sqlQuery, (err, results, fields) => {
                    if (err) {
                        console.error(err)
                        return reject('Could not make SQL SELECT for ingredients');
                    }
                    //console.log(results);
                    //console.log(fields);
                    resolve(results);
                }) 
            })
            return promise
        }          
    }

    static insertIngredient(userEmail, params) {
        if (db !== undefined) {
            const promise = new Promise((resolve, reject)=> {
                const sqlQuery = `INSERT INTO ingredient 
                                    (name, food_id, carbs, fat, protein, calories, user_id)
                                    VALUES ('${params.name}', ${(params.food_id)},${params.carbs},${params.fat},${params.protein},${params.calories},'${userEmail}')   
                                `
                db.query(sqlQuery, (err, results, fields) => {
                    if (err) {
                        console.error(err)
                        return reject('Could not make SQL INSERT');
                    }
                    //console.log(results);
                    //console.log(fields);
                    resolve(results);
                }) 
            })
            return promise
        }             
    }

    static removeIngredient(id) {
        if (db !== undefined) {
            const promise = new Promise((resolve, reject)=> {
                const sqlQuery = `DELETE FROM ingredient WHERE id=${id}
                                `
                db.query(sqlQuery, (err, results, fields) => {
                    if (err) {
                        console.error(err)
                        return reject('Could not make SQL DELETE');
                    }
                    //console.log(results);
                    //console.log(fields);
                    resolve(results);
                }) 
            })
            return promise
        }           
    }
    static updateIngredient(userEmail, params, id) {
        if (db !== undefined) {
            const promise = new Promise((resolve, reject)=> {
                const sqlQuery = `UPDATE ingredient 
                                    SET
                                        name='${params.name}',
                                        food_id=${(params.food_id)}, 
                                        carbs=${params.carbs}, 
                                        fat=${params.fat}, 
                                        protein=${params.protein}, 
                                        calories=${params.calories}
                                    WHERE
                                        id=${id}
                                `
                db.query(sqlQuery, (err, results, fields) => {
                    if (err) {
                        console.error(err)
                        return reject('Could not make SQL UPDATE');
                    }
                    //console.log(results);
                    //console.log(fields);
                    resolve(results);
                }) 
            })
            return promise
        }          
    }

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
                console.log('hello')
                SearchHistory.storeIngredientSearchQuery(searchText, DUMMY_EMAIL)
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
}