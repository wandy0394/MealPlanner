let ingr = []

export default class Ingredient {
    //interface with database and FoodAPI

    static async GetAllIngredients(conn) {
        let sqlQuery = `SELECT * from Ingredient`;
        conn.query(sqlQuery, (err, results, fields) => {
            if (err) {
                return console.error('Could not get all ingredients')
            }
            ingr = results;
            console.log(ingr)
        })
    }
}