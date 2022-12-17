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
                // console.log(results);
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
                // console.log(results);
                //console.log(fields);
                //return results;
            }) 
        }        
    }    

    static  getRecipeSearchHistory(userEmail) {
        if (db !== undefined) {
            const promise = new Promise((resolve, reject)=> {
                const sqlQuery = `SELECT * from search_history where user_id='${userEmail}' order by search_time desc`
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
    static getRecipeSearchHistoryByType(userEmail, type) {
        
        if (db !== undefined) {
            const promise = new Promise((resolve, reject)=> {
                if ((type !== 'ingred') && (type !== 'recipe')) return reject('Improper input type')

                const sqlQuery = `SELECT * from search_history where user_id='${userEmail}' and search_type='${type}' order by search_time desc`
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
                    // console.log(results.insertId);
                    //console.log(fields);
                    resolve(results);
                }) 
            })            
            return promiseRecipe
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
                    // console.log(results.insertId);
                    //console.log(fields);
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
                    // console.log(results.insertId);
                    //console.log(fields);
                    resolve(results);
                }) 
            })            
            return promiseRecipe
        }               
    }
    static updateRecipe(userEmail, params, recipeId) {
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
                    // console.log(results.insertId);
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
                    resolve(results);
                }) 
            })            
            return promise
        }             
    }    

    static updateRecipeIngredients(ingredients, recipeId) {
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
                console.log(sqlQuery)
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
    static apiGetRecipe(userEmail, id) {
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
                    // console.log(results);
                    //console.log(fields);
                    resolve(results);
                }) 
            })
            return promise
        }          
    }
    static insertMeal(userEmail, params) {
        if (db !== undefined) {
            const promise = new Promise((resolve, reject)=> {
                const uniqueID = Date.now() + Math.random().toString(16)
                const sqlQuery = params.days.reduce((result, item)=>{
                    return (result + `INSERT INTO daily_meal
                                        (
                                            datestamp,
                                            user_id,
                                            target_calories,
                                            target_carbs,
                                            target_fat,
                                            target_protein,
                                            bulkId,
                                            total_calories,    
                                            total_carbs,
                                            total_fat,
                                            total_protein
                                        )
                                        VALUES
                                        (
                                            '${item}',
                                            '${userEmail}',
                                            ${params.targetCalories},
                                            ${params.targetCarbs},
                                            ${params.targetFat},
                                            ${params.targetProtein},
                                            '${uniqueID}',
                                            ${params.totalCalories},
                                            ${params.totalCarbs},
                                            ${params.totalFat},
                                            ${params.totalProtein}
                                        );`
                                    
                    )
                },'')                                    
                                    
                db.query(sqlQuery, (err, results, fields)=>{
                    if (err) {
                        console.error(err)
                        return reject('Could not insert into meal')
                    }
                    db.query(`SELECT id from daily_meal where user_id='${userEmail}' and bulkId='${uniqueID}'`, 
                        (err, results, fields)=>{
                            if (err) {
                                console.error(err)
                                return reject('Could not select meal ids')
                            }
                            resolve(results)
                    })
                })
            })
            return promise
        }
    }

    static insertMealRecipe(userEmail, mealIds, meals) {
        if (db !== undefined) {
            const promise = new Promise((resolve, reject)=>{
                const sqlQuery = mealIds.reduce((result,  [index, {id}])=>{
                    const output = meals.reduce((result, [index, meal])=>{
                        let table='meal_recipe'
                        if (meal.type === 'static') table='meal_static_recipe' 
                        return result + `INSERT INTO ${table} (meal_id, recipe_id, qty) VALUES (${id}, ${meal.recipe_id}, ${meal.qty});`
                    }, '')

                     return result + output
                },'')
                db.query(sqlQuery, (err, results, fields)=>{
                    if (err) {
                        console.error(err)
                        return reject('Could not insert into meal_recipe')
                    }
                    resolve(results)
                })
            })
            return promise
        }
    }

    static getAllMeals(userEmail) {
        if (db !== undefined) {
            const promise = new Promise((resolve, reject)=>{
                const sqlQuery = `select 
                                    daily_meal.*, 
                                    meal_recipe.recipe_id, 
                                    meal_recipe.qty as recipe_qty,
                                    meal_static_recipe.recipe_id as static_recipe_id,
                                    meal_static_recipe.qty as static_recipe_qty 
                                    from daily_meal 
                                    left join meal_recipe on daily_meal.id=meal_recipe.meal_id 
                                    left join meal_static_recipe on daily_meal.id=meal_static_recipe.meal_id 
                                    where daily_meal.user_id='${userEmail}' 
                                    order by datestamp asc;`
                db.query(sqlQuery, (err, results, fields)=>{
                    if (err) {
                        console.error(err)
                        return reject('Could not get meals')
                    }
                    // console.log(results)
                    let output = {}
                    results.forEach((item)=>{
                        const key = item.datestamp.getFullYear() + '-' + (item.datestamp.getMonth()+1) + '-' + item.datestamp.getDate()
                        if (!(key in output)) {
                            output[key] = {
                                meal_id:item.id,
                                recipes: {},
                                staticRecipes:{},
                                targetCalories: item.target_calories,
                                targetCarbs: item.target_carbs,
                                targetFat: item.target_fat,
                                targetProtein: item.target_protein,
                                totalCalories: item.total_calories,
                                totalCarbs: item.total_carbs,
                                totalFat: item.total_fat,
                                totalProtein: item.total_protein,
                            }
                        }
                        else {
                            output[key] = {
                                ...output[key],
                                targetCalories: output[key].targetCalories + item.target_calories,
                                targetCarbs: output[key].targetCarbs + item.target_carbs,
                                targetFat: output[key].targetFat + item.target_fat,
                                targetProtein: output[key].targetProtein + item.target_protein,
                                totalCalories: output[key].totalCalories + item.total_calories,
                                totalCarbs: output[key].totalCarbs + item.total_carbs,
                                totalFat: output[key].totalFat + item.total_fat,
                                totalProtein: output[key].totalProtein+item.total_protein,
                            }
                        }
                        if (item.recipe_id) {
                            if (!(item?.recipe_id in output[key]['recipes'])) {
                                output[key]['recipes'][item.recipe_id] = {recipe_id:item.recipe_id, qty:item.recipe_qty} 
                            }

                        }
                        if (item.static_recipe_id) {
                            if (!(item?.static_recipe_id in output[key]['staticRecipes'])) {
                                output[key]['staticRecipes'][item.static_recipe_id] = {recipe_id: item.static_recipe_id, qty:item.static_recipe_qty} 
                            }

                        }
                    })
                    resolve(output)
                })
            })
            return promise
        }
    }

    static updateMeal(userEmail, meals, mealId) {
        if (db !== undefined) {
            const promise = new Promise((resolve, reject)=>{
                let sqlQuery = `UPDATE daily_meal 
                                SET
                                    target_carbs=${meals.targetCarbs},
                                    target_calories=${meals.targetCalories},
                                    target_protein=${meals.targetProtein},
                                    target_fat=${meals.targetFat},
                                    total_carbs=${meals.totalCarbs},
                                    total_calories=${meals.totalCalories},
                                    total_fat=${meals.totalFat},
                                    total_protein=${meals.totalProtein}
                                WHERE
                                    user_id='${userEmail}' AND id=${mealId};
                `
                
                const output = Object.values(meals.meals).reduce((result, meal)=>{
                    let table='meal_recipe'
                    if (meal.type === 'static') table='meal_static_recipe' 
                    if (meal.operation === 'insert') {
                        return result + `INSERT INTO ${table} (meal_id, recipe_id, qty) VALUES (${mealId}, ${meal.recipe_id}, ${meal.qty});`
                    }
                    else if (meal.operation === 'update') {
                        return result + `UPDATE  ${table} SET qty=${meal.qty} where meal_id=${mealId} and recipe_id=${meal.recipe_id};`
                    }
                    else if (meal.operation === 'delete') {
                        return result + `DELETE FROM ${table} where meal_id=${mealId} AND recipe_id=${meal.recipe_id};`
                    }
                    else {
                        return result
                    }
                    
                }, '')

      
                //console.log(sqlQuery+output)
                db.query(sqlQuery+output, (err, results, fields)=>{
                    if (err) {
                        console.error(err)
                        reject('Could not update meal')
                    }
                    resolve(results)
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