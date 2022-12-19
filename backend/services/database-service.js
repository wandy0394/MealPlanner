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


   

}

export default DatabaseService