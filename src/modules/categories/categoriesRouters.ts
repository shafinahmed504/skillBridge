import express from "express"
import { categoriesControllers } from "./categoriesControllers"
import middlewareAuth from "../../middleware/middlewareAuth"

const router=express.Router()


router.post("/",middlewareAuth("ADMIN"),categoriesControllers.createCategories)

router.get("/",categoriesControllers.getCategories)










export const categoriesRouters=router