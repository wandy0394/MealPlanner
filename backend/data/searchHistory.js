let db=undefined
const RECIPE='recipe'
const INGREDIENT = 'ingred'

export default class SearchHistory {

    static injectConn(conn) {
        if (db === undefined) {
            db = conn;
        } else {
            console.error('db already assigned');
        }   
    }
    static isValidInteger(input) {
        if (input === '' || input === null || input === undefined || input === NaN) return false
        return Number.isInteger(Number(input))
    }
    static storeRecipeSearchQuery(params, userEmail) {
        // expects
        // params: {
        //     minCarb: integer,
        //     maxCarb: integer,
        //     minFat: integer,
        //     maxFat: integer,
        //     minProtein: integer,
        //     maxProtein: integer,
        //     minCal: integer,
        //     maxCal: integer,
        //     searchText: string
        // }
        // userEmail: string

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
                                (
                                    search_text, search_type, search_time, 
                                    min_carb, max_carb, 
                                    min_fat, max_fat, 
                                    min_protein, max_protein, 
                                    min_cal, max_cal, 
                                    user_id)
                                VALUES 
                                (
                                    '${params.searchText}', '${RECIPE}','${searchTime}',
                                    ${minCarb}, ${maxCarb},
                                    ${minFat}, ${maxFat},
                                    ${minProtein}, ${maxProtein},
                                    ${minCal}, ${maxCal},
                                    '${userEmail}')    
                            `
            db.query(sqlQuery, (err, results, fields) => {
                if (err) {
                    console.error(err)
                    return reject('Could not insert search history');
                }
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
                    return reject('Could not insert search history');
                }
            }) 
        }
        else {
            console.error('db undefined')
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
                    resolve(results);
                }) 
            })
            return promise
        }     
    }
    static getRecipeSearchHistoryByType(userEmail, type) {
        // type: 'recipe' | 'ingred'
        
        if (db !== undefined) {
            const promise = new Promise((resolve, reject)=> {
                if ((type !== 'ingred') && (type !== 'recipe')) return reject('Improper input type')

                const sqlQuery = `SELECT * from search_history where user_id='${userEmail}' and search_type='${type}' order by search_time desc`
                db.query(sqlQuery, (err, results, fields) => {
                    if (err) {
                        console.error(err)
                        return reject('Could not make SQL SELECT from search_history');
                    }
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
                    resolve(results);
                }) 
            })
            return promise
        }          
    }


}