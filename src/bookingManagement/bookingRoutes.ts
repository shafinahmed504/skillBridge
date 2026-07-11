import express from "express"
import { bookingControllers } from "./bookingControllers"
import middlewareAuth from "../middleware/middlewareAuth"

const router=express.Router()


router.post("/createBookings",middlewareAuth("STUDENT"),bookingControllers.createBookings)



export const bookingRoutes=router