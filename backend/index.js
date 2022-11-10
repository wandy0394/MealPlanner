import app from "./server.js"
import dotenv from "dotenv"
import mysql from "mysql"
import Ingredient from "./data/ingredient.js"
import TokenHandler from "./data/token-handler.js"
import DataController from "./api/dataController.js"

dotenv.config();

//connect to mysql db setup data objects
let connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DB
})
connection.connect((err) => {
    if (err) {
        console.error('Could not connect to SQL database');
    }
    Ingredient.injectConn(connection) 
    //Meal.inject
    //Recipe.inject
    //const output = Ingredient.GetAllIngredients()
    //console.log(output)
}) 


//little tests
//const output = await Ingredient.FetchIngredientByID(33691)
//console.log(output.food.servings)
//const output = await DataController.apiGetIngredient({query:{id:33691}})
//console.log(output)

const port = process.env.PORT || 8000;
app.listen(port, ()=> {
    console.log(`Listening on port ${port}`)
})
