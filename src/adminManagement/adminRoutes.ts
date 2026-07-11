import express from "express"
import middlewareAuth from "../middleware/middlewareAuth"
import { adminControllers } from "./adminControllers"


const router=express.Router()

router.get("/dashboard",middlewareAuth("ADMIN"),adminControllers.adminDashboard)





export const adminRoutes=router