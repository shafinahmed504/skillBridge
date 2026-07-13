import { Request, Response } from "express"
import { tutorServices } from "./tutorServices"





const getTutors=async(req:Request,res:Response)=>{
    const {name}=req.query
    const nameString= typeof name ==='string' ? name: undefined
    if(nameString==undefined){
        return
    }
    try{
        const result=await tutorServices.getTutors({name:nameString})
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