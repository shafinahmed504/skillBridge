import { Request, Response } from "express"
import { tutorManagementServices } from "./tutorManagementServices"




const createTutorProfile=async(req:Request,res:Response)=>{
    try{
        const{bio}=req.body
        const userId=req.user?.id as string

        

        const result=await tutorManagementServices.createTutorProfile(bio,userId)
        res.status(200).json(result)
    }catch(error:any){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }

}

const updateTutorProfile=async(req:Request,res:Response)=>{
    try{

        console.log(req.user)


        if(!req.user){
            return res.status(401).json({ message: "Unauthorized" });
        }

        const{id}=req.user

        

        const result=await tutorManagementServices.updateTutorProfile(id,req.body)

       res.status(200).json(result)

        
        
    }catch(error:any){
        res.status(500).json(error.message)
    }
}

const dashBoard=async(req:Request,res:Response)=>{
    const userId=req.user?.id
    const role=req.user?.role

    if(userId==undefined){
        return "id undefined"
    }
    if(role==undefined){
        return "role undefined"
    }

    try{
    const result=await tutorManagementServices.dashBoard(userId,role)
        res.status(200).json(result)
    }catch(error:any){
         res.status(500).json(error.message)

    }
}



export const tutorManagementControllers={
    createTutorProfile,updateTutorProfile,dashBoard
}
