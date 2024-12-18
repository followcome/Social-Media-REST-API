import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import morgan from "morgan";
import userRoute from "./routes/users.js"
import AuthRoute from "./routes/auth.js"

import  dotenv,{config} from "dotenv";
const app = express()
dotenv.config();
try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Mongo Db connected")
  } catch (error) {
    console.log(error)
  }
  //middleware

  app.use(express.json())
  app.use(helmet())
  app.use(morgan("common"))
  app.use("/api/users",userRoute)
  app.use("/api/auth",AuthRoute)





app.listen(7008,()=>{
    console.log("backend server is running")

})