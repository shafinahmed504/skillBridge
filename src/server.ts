import express from "express"
import { prisma } from "./lib/prisma"
import { app } from "./app"



const port=process.env.PORT


async function main() {
    try{
        prisma.$connect()
        console.log("Connected To database Successfully")

        app.listen(port,()=>{
            console.log(`server running on port : ${port}`)
        })

    }catch(error:any){
        console.log(error.message)

        prisma.$disconnect()
        process.exit(1)   

    }
    
}

main()