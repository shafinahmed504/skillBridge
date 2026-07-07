import express from "express"
import { courseRouters } from "./courses/courseRouters"
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from "cors"


export const app=express()

app.use(cors({
    origin:process.env.APP_URL||"http://localhost:4000",
    credentials:true
}))

app.use(express.json())
app.all("/api/auth/*splat", toNodeHandler(auth));

app.use("/courses",courseRouters)