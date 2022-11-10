import TokenHandler from './token-handler.js'
import fetch from 'node-fetch'
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

    static async GetAllIngredients() {
        if (db !== undefined) {
            let sqlQuery = `SELECT * from Ingredient`;
/*             try {
                const result = await db.query(sqlQuery)
                return result;
            }
            catch (e) {
                return {error:e.message}
            } */
            db.query(sqlQuery, (err, results, fields) => {
                if (err) {
                    return console.error('Could not get all ingredients');
                }
                console.log(results);
                console.log(fields);
                return results;
            }) 
        }
    }



    static async FetchIngredientByID(id) {

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
}