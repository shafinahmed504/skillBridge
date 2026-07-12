import express from "express"
import middlewareAuth from "../../middleware/middlewareAuth"
import { adminControllers } from "./adminControllers"



const router=express.Router()

router.get("/dashboard",middlewareAuth("ADMIN"),adminControllers.adminDashboard)

router.get("/users",middlewareAuth("ADMIN"),adminControllers.getAllUsers)
router.get("/users/:id",middlewareAuth("ADMIN"),adminControllers.getUserById)


router.get("/tutors",middlewareAuth("ADMIN"),adminControllers.getTutors)
router.get("/tutors/:id",middlewareAuth("ADMIN"),adminControllers.getTutorById)


router.get("/courses",middlewareAuth("ADMIN"),adminControllers.getCourses)
router.get("/courses/:id",middlewareAuth("ADMIN"),adminControllers.getCourseById)
router.delete("/courses/:id",middlewareAuth("ADMIN"),adminControllers.deleteCourse)


router.get("/bookings",middlewareAuth("ADMIN"),adminControllers.getBookings)
router.get(
  "/bookings/:id",middlewareAuth("ADMIN"),adminControllers.getBookingById
);

router.patch(
  "/bookings/:id/status",middlewareAuth("ADMIN"),adminControllers.updateBookingStatus
);

router.delete(
  "/bookings/:id",middlewareAuth("ADMIN"),adminControllers.deleteBooking
);



export const adminRoutes=router