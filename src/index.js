import dotenv from 'dotenv'
import connectdB from "./db/index.js";
dotenv.config({
    path:'./env'
})

connectdB()






/*
import express from express
const app=express()
;(
    async()=>{
        try{
await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
app.on("error",(error)=>{
    console.log("ERR",error);
    throw error
})
app.listen(process.env.PORT,()=>{
    console.log(`App is listening on port ${process.env.PORT}`)
})
        }
        catch(error){
console.log("error",error)
throw err
        }
    }
)()
    */