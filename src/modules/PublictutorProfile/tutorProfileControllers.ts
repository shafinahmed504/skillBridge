import { Request, Response } from "express"
import { tutorServices } from "./tutorServices"




const getTutors=async(req:Request,res:Response)=>{
    try{
        const result=await tutorServices.getTutors()
        console.log(result)
        res.status(200).json({
            success:true,
            data:result
            
        })
   

    }catch(error:any){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

const getTutorById=async(req:Request,res:Response)=>{
    const{id}=req.params

  

    try{
        const result=await tutorServices.getTutorById(id as string)
        
        res.status(200).json({
            success:true,
            data:result
            
        })

    }catch(error:any){
            res.status(500).json({
            success:false,
            message:error.message
        })

    }
}






export const tutorProfileControllers={
    getTutors,getTutorById
}