const express=require('express')
const app=express()
const userRouter=require("./Routes/userRoutes.js")
const cors=require("cors")
const mongoose = require('mongoose')
require("dotenv").config()

app.use(cors({
    credentials:true,
    origin:process.env.ORIGIN
}))
app.use(express.json())

app.use('/',userRouter)


mongoose.connect(process.env.MONGO_URI).then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log("server lisening on  port 8080")
    })
}).catch((err)=>{
    console.log(err);
})
