import { Request, Response } from "express";
import { courseServices } from "./courseServices";

const createCourse=async(req:Request,res:Response)=>{

    try{
        const userId=req.user?.id
        
        const result=await courseServices.createCourse(req.body,userId as string)
        res.status(200).json(result)
    }catch(error:any){
        res.status(500).json(error.message)
    }
    
}


const getCourses=async(req:Request,res:Response)=>{
    const {search}=req.query


    const searchString=typeof search ==='string'?search : undefined
        if(!searchString){
        return 
    }

    const tags=req.query.tags ? (req.query.tags as string).split(","):[]

    
        try{   
        const result=await courseServices.getCourses({search:searchString,tags})
        res.status(200).json(result)
    }catch(error:any){
        res.status(500).json(error.message)
    }

}





export const courseControllers={
    createCourse,getCourses
}