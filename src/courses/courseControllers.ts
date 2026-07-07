import { Request, Response } from "express";
import { courseServices } from "./courseServices";

const createCourse=async(req:Request,res:Response)=>{

    try{
        
        const result=await courseServices.createCourse(req.body)
        res.status(200).json(result)
    }catch(error:any){
        res.status(500).json(error.message)
    }
    
}





export const courseControllers={
    createCourse
}