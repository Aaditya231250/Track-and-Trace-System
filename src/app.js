import cors from "cors"
import express from "express"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({limit : "16kb", extended : true}))
app.use(cookieParser())

// import routes

import clientRouter from "./routes/clients.route.js"

// routes declaration

app.use("/api/v1/clients", clientRouter)

export {app}