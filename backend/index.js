import app from "./server.js"
import dotenv from "dotenv"
import mysql from "mysql"
import Ingredient from "./data/ingredient.js"
import TokenHandler from "./data/token-handler.js"
import DataController from "./api/dataController.js"
import DatabaseService from './services/database-service.js'

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
    DatabaseService.injectConn(connection)
    DatabaseService.dummyCommand()
    //Ingredient.injectConn(connection) 
    //Meal.inject
    //Recipe.inject
    //const output = Ingredient.getAllIngredients()
    //console.log(output)
}) 


//little tests
//const output = await Ingredient.fetchIngredientByID(33691)
//console.log(output.food.servings)
//const output = await DataController.apigetIngredient({query:{id:33691}})
//console.log(output)

const port = process.env.PORT || 8000;
app.listen(port, ()=> {
    console.log(`Listening on port ${port}`)
})
