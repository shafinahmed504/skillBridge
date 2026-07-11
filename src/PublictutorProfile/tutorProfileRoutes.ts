import express from "express"
import { tutorProfileControllers } from "./tutorProfileControllers"


const router=express.Router()






router.get("/",tutorProfileControllers.getTutors)

router.get("/:id",tutorProfileControllers.getTutorById)








export const publicTutorRoutes=router

