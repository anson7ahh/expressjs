import express from 'express';
const app = express()
const port = 3000
import dotenv from "dotenv";
dotenv.config()
import bodyParser from 'body-parser';
import { connectDatabase } from './src/config/database.ts';
import { errorMiddleware } from './src/middlewares/error.middleware.ts';
import authRouter from "./src/routers/auth.ts"
connectDatabase();
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(authRouter)
app.use(errorMiddleware)

app.use(bodyParser.json())
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})