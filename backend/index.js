import app from "./server.js"
import dotenv from "dotenv"
import mysql from "mysql"
import Ingredient from "./data/ingredient.js"
import DatabaseService from './services/database-service.js'
import Recipe from "./data/recipe.js"
import SearchHistory from "./data/searchHistory.js"
import Meal from "./data/meal.js"

dotenv.config();

//connect to mysql db setup data objects
let connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DB,
    multipleStatements:true
})
connection.connect((err) => {
    if (err) {
        console.error('Could not connect to SQL database');
    }
    //DatabaseService.injectConn(connection)
    Ingredient.injectConn(connection)
    Recipe.injectConn(connection)
    SearchHistory.injectConn(connection)
    Meal.injectConn(connection)
}) 


const port = process.env.PORT || 8000;
app.listen(port, ()=> {
    console.log(`Listening on port ${port}`)
})
