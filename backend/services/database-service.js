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
            
            
            const sqlQuery = `INSERT INTO search_history 
                                (search_text, search_type, 
                                    min_carb, max_carb, 
                                    min_fat, max_fat, 
                                    min_protein, max_protein, 
                                    min_cal, max_cal, 
                                    user_id)
                                VALUES ('${params.searchText}', '${RECIPE}',
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
                return results;
            }) 
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