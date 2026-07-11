import { any, success } from "better-auth";
import { Request, Response } from "express";
import { categoriesServices } from "./categoriesServices";

const createCategories=async(req:Request,res:Response)=>{
    try{
        console.log(req.body)
        const result=await categoriesServices.createCategories(req.body)
        res.status(200).json({
            success:true,
            data:result
        })
    }
    catch(error:any){
        res.status(500).json({
            success:false,
            error:error.message
        })
    }
    
}


const getCategories=async(req:Request,res:Response)=>{
        try{
     
        const result=await categoriesServices.getCategories()
        res.status(200).json({
            success:true,
            data:result
        })
    }
    catch(error:any){
        res.status(500).json({
            success:false,
            error:error.message
        })
    }

    



}




export const categoriesControllers={
    createCategories,getCategories

}