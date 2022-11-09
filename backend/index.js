import app from "./server.js"
import dotenv from "dotenv"
import mysql from "mysql"
import Ingredient from "./data/ingredient.js"

dotenv.config();

//connect to mysql db and pre-fetch user-related data
let connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DB
})

console.log(process.env.DB_HOST)
console.log(process.env.DB_PORT)
console.log(process.env.DB_USER,)
console.log(process.env.DB_PASS,)
console.log(process.env.DB_DB)

connection.connect((err)=> {
    if (err) {
        console.log(err)
        return console.error('Could not connect to SQL database')
    }

    (async () => {
        await Ingredient.GetAllIngredients(connection)
        connection.end((err) => {
            if (err) {
                return console.error('Could not gracefully end DB connection')
            }
        })
    })(); 
})



const port = process.env.PORT || 8000;
app.listen(port, ()=> {
    console.log(`Listening on port ${port}`)
})