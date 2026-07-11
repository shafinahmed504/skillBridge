import { Request, Response } from "express";
import { studentDashBoardServices } from "./studentDashboardServices";


const getOverview=async(req:Request,res:Response)=>{
    const studentId=req.user?.id
    try{
        const result=await studentDashBoardServices.getOverview(studentId as string)
        res.status(200).json(result)
    }catch(error:any){
        res.status(200).json(error.message)
    }
}



const getMyBookings=async(req:Request,res:Response)=>{
    const studentId=req.user?.id
    const role=req.user?.role
    try{
        const result=await studentDashBoardServices.getMyBookings(studentId as string,role as string)

        res.status(200).json(result)

    }catch(error:any){
         res.status(200).json(error.message)

    }
}




const editProfile=async(req:Request,res:Response)=>{

    const studentId=req.user?.id 

        try{
        const result=await studentDashBoardServices.editProfile(studentId as string,req.body)
        res.status(200).json(result)
    }catch(error:any){
        res.status(200).json(error.message)
    }


}




export const studentDashBoardControllers={
    getOverview,getMyBookings,editProfile
}