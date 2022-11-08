import express from "express"
import cors from "cors"
import dataRouter from "./api/dataRouter.js"
import userRouter from "./api/userRouter.js"

const app = express()
app.use(express.json())
app.use(cors())

app.use("/api/v1/meal-planner", dataRouter)
app.use("/api/v1/users", userRouter)
app.use('*', (req, res) => {
    res.status(404).json({error:'Page not Found'})
})

export default app