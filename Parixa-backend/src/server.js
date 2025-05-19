import express from "express"
import cors  from "cors"
import mcqroutes from './routes/mcqroutes.js'
import mcqsetsroutes from './routes/mcqroutes.js'
import connectDB from "./config/db.js";
import dotenv from "dotenv"



dotenv.config();
const app =  express();
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 5001 


app.use("/api/mcq", mcqroutes)
app.use("/api/mcq/sets", mcqsetsroutes)

app.use(
   cors({
      origin: "http://localhost:3000",
   })
)

connectDB().then(()=>{
app.listen(PORT, ()=>{
   console.log("App is listining at port", PORT)
})
})

