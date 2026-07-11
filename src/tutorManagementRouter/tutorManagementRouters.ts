import express from "express"

import { tutorManagementControllers } from "./tutorManagementControllers"
import middlewareAuth from "../middleware/middlewareAuth"



const router=express.Router()


router.post("/",tutorManagementControllers.createTutorProfile)
router.put("/profile",middlewareAuth("TUTOR"),tutorManagementControllers.updateTutorProfile)

router.get("/dashboard",middlewareAuth("TUTOR"),tutorManagementControllers.dashBoard)




export const tutorManagementRouter=router


