import express from "express"
import { courseRouters } from "./modules/courses/courseRouters"
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from "cors"
import { categoriesRouters } from "./modules/categories/categoriesRouters";
import { tutorManagementRouter } from "./tutorManagementRouter/tutorManagementRouters";
import { publicTutorRoutes } from "./modules/PublictutorProfile/tutorProfileRoutes";
import { bookingRoutes } from "./modules/bookingManagement/bookingRoutes";
import { studentDashboardRoutes } from "./studentDashboard/studentDashboardRoutes";
import { adminRoutes } from "./modules/adminManagement/adminRoutes";


export const app=express()

app.use(cors({
    origin:process.env.APP_URL||"http://localhost:4000",
    credentials:true
}))

app.use(express.json())
app.all("/api/auth/*splat", toNodeHandler(auth));

app.use("/courses",courseRouters)
app.use("/tutors",publicTutorRoutes)
app.use("/tutor",tutorManagementRouter)
app.use("/categories",categoriesRouters)
app.use("/bookings",bookingRoutes)
app.use("/dashboard",studentDashboardRoutes)
app.use("/admin",adminRoutes)