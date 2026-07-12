import express from "express"
import { courseControllers } from "./courseControllers"
import middlewareAuth from "../../middleware/middlewareAuth"


const router=express.Router()


router.post("/",middlewareAuth("TUTOR"),courseControllers.createCourse)







export const 
courseRouters=router