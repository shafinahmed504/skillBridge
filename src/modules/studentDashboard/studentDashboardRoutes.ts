import express from "express"
import { studentDashBoardControllers } from "./studentDashboardControllers"
import middlewareAuth from "../middleware/middlewareAuth"

const router=express.Router()


router.get("/",studentDashBoardControllers.getOverview)
router.get("/bookings",middlewareAuth("STUDENT"),studentDashBoardControllers.getMyBookings),
router.put("/profile",middlewareAuth("STUDENT"),studentDashBoardControllers.editProfile)











export const studentDashboardRoutes=router