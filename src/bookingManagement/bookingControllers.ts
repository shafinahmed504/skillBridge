
import { Request, Response } from "express";
import { bookingServices } from "./bookingServices";

const createBookings=async(req:Request,res:Response)=>{

    const courseId=req.body
    const userId=req.user?.id 
    const userRole=req.user?.role
    console.log(userRole)

    try{
        const result=await bookingServices.createBookings(courseId,userId as string,userRole as string)

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





export const bookingControllers={
    createBookings
}