import express, { NextFunction } from "express"
import * as http from "http"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()
import connectDB from "./frameworks/database/mongodb/connection"
import errorHandlingMiddleware from "./frameworks/webserver/middlewares/errorhandlingMiddleware"
import routes from "./frameworks/webserver/routes/routes"
import expressConfig from "./frameworks/webserver/express"
import serverConfig from "./frameworks/webserver/server"
import AppError from "./utils/appError"
import configKeys from "./config"
const app: express.Application = express()
const server: http.Server = http.createServer(app)
app.use(cors())
//connecting DB
connectDB();
//express configuration
expressConfig(app);
//starting server
serverConfig(server).startServer();
//routes
routes(app);
//catch 404 and forward to error handler
app.use(errorHandlingMiddleware)

app.use("*",(req,res, next:NextFunction)=>{
    next(new  AppError('Not found',404))
})