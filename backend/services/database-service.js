let db=undefined

const RECIPE='recipe'
const INGREDIENT = 'ingred'
class DatabaseService {

    static injectConn(conn) {
        if (db === undefined) {
            db = conn;
        } else {
            console.log('db already assigned');
        }   
    }

    static isValidInteger(input) {
        if (input === '' || input === null || input === undefined || input === NaN) return false
        return Number.isInteger(Number(input))
    }

    static storeRecipeSearchQuery(params, userEmail) {
        if (db !== undefined) {
            const minCarb = (this.isValidInteger(params.minCarb) ? params.minCarb : null)
            const maxCarb = (this.isValidInteger(params.maxCarb) ? params.maxCarb : null)
            const minFat = (this.isValidInteger(params.minFat) ? params.minFat : null)
            const maxFat = (this.isValidInteger(params.maxFat) ? params.maxFat : null)
            const minProtein = (this.isValidInteger(params.minProtein) ? params.minProtein : null)
            const maxProtein = (this.isValidInteger(params.maxProtein) ? params.maxProtein : null)
            const minCal = (this.isValidInteger(params.minCal) ? params.minCal : null)
            const maxCal = (this.isValidInteger(params.maxCal) ? params.maxCal : null)
            const searchTime = new Date().toISOString().slice(0,19).replace('T', ' ')
            
            const sqlQuery = `INSERT INTO search_history 
                                (search_text, search_type, search_time, 
                                    min_carb, max_carb, 
                                    min_fat, max_fat, 
                                    min_protein, max_protein, 
                                    min_cal, max_cal, 
                                    user_id)
                                VALUES ('${params.searchText}', '${RECIPE}','${searchTime}',
                                    ${minCarb}, ${maxCarb},
                                    ${minFat}, ${maxFat},
                                    ${minProtein}, ${maxProtein},
                                    ${minCal}, ${maxCal},
                                    '${userEmail}')    
                            `
            db.query(sqlQuery, (err, results, fields) => {
                if (err) {
                    console.error(err)
                    return console.error('Could not insert search history');
                }
                console.log(results);
                //console.log(fields);
                //return results;
            }) 
        }        
    }

    static storeIngredientSearchQuery(searchText, userEmail) {
        if (db !== undefined) {
            const searchTime = new Date().toISOString().slice(0,19).replace('T', ' ')
            const sqlQuery = `INSERT INTO search_history 
                                (search_text, search_type, search_time, user_id)
                                VALUES ('${searchText}', '${INGREDIENT}','${searchTime}','${userEmail}')    
                            `
            db.query(sqlQuery, (err, results, fields) => {
                if (err) {
                    console.error(err)
                    return console.error('Could not insert search history');
                }
                console.log(results);
                //console.log(fields);
                //return results;
            }) 
        }        
    }    

    static  getRecipeSearchHistory(userEmail) {
        if (db !== undefined) {
            const promise = new Promise((resolve, reject)=> {
                const sqlQuery = `SELECT * from search_history where user_id='${userEmail}' order by search_time desc`
                console.log(sqlQuery)
                db.query(sqlQuery, (err, results, fields) => {
                    if (err) {
                        console.error(err)
                        return reject('Could not make SQL SELECT from search_history');
                    }
                    //console.log(results);
                    //console.log(fields);
                    resolve(results);
                }) 
            })
            return promise
        }        
    }

    static removeSearchQuery(id) {
        if (db !== undefined) {
            const promise = new Promise((resolve, reject)=> {
                const sqlQuery = `DELETE FROM search_history WHERE id=${id}
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
    static insertRecipe(userEmail, params) {
        if (db !== undefined) {
            const promiseRecipe = new Promise((resolve, reject)=> {
                const sqlQuery = `INSERT INTO recipe 
                                    (title, 
                                        servings,
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
                                            ${params.servings},
                                            ${params.cookTime},
                                            ${params.prepTime},
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
                    console.log(results.insertId);
                    //console.log(fields);
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
                    //console.log(results);
                    //console.log(fields);
                    resolve(results);
                }) 
            })            
            return promise
        }             
    }    
    // static insertRecipeUser(userEmail, recipeId) {
    //     if (db !== undefined) {
    //         const promise = new Promise((resolve, reject)=> {
                
    //             const sqlQuery = `INSERT INTO recipe_user (recipe_id, user_id) VALUES (${recipeId}, '${userEmail}');`
    //             db.query(sqlQuery, (err, results, fields) => {
    //                 if (err) {
    //                     console.error(err)
    //                     return reject('Could not make SQL INSERT');
    //                 }
    //                 //console.log(results);
    //                 //console.log(fields);
    //                 resolve(results);
    //             }) 
    //         })            
    //         return promise
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

    static apiGetAllRecipes(userEmail) {
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
                    console.log(results);
                    //console.log(fields);
                    resolve(results);
                }) 
            })
            return promise
        }          
    }

    static dummyCommand() {
        if (db !== undefined) {
            let sqlQuery = `SELECT * from user`;
            db.query(sqlQuery, (err, results, fields) => {
                if (err) {
                    return console.error('Could not get all users');
                }
                console.log(results);
                //console.log(fields);
                return results;
            }) 
        }        
    }

}

export default DatabaseService