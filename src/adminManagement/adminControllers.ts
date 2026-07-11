import { Request, Response } from "express";
import { adminServices } from "./adminServices";

const adminDashboard=async(req:Request,res:Response)=>{
    const userDetails=req.user
    if(!userDetails){
        return "No user Found"
    }
    const userRole=userDetails.role

 

    

    try{
        const result=await adminServices.adminDashboard()
        res.status(200).json(result)
    }catch(error:any){
        res.status(500).json(error.message)
    }
}




export const adminControllers={
    adminDashboard
}