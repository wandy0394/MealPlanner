let db=undefined

export default class Meal {
    //interface with database
    static injectConn(conn) {
        if (db === undefined) {
            db = conn;
        } else {
            console.log('db already assigned');
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
}