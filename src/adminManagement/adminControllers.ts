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



const getAllUsers=async(req:Request,res:Response)=>{
        try{
        const result=await adminServices.getAllusers()
        res.status(200).json(result)
    }catch(error:any){
        res.status(500).json(error.message)
    }

}

const getUserById=async(req:Request,res:Response)=>{
    const {id}=req.params

     try{
        const result=await adminServices.getUserById(id as string)
        res.status(200).json(result)
    }catch(error:any){
        res.status(500).json(error.message)
    }

    

}



const getTutors=async(req:Request,res:Response)=>{
    try{
        const result=await adminServices.getTutors()
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
        const result=await adminServices.getTutorById(id as string)
        
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


const getCourses = async (req: Request, res: Response) => {
  try {
    const result = await adminServices.getCourses();

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const getCourseById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await adminServices.getCourseById(id as string);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteCourse = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await adminServices.deleteCourse(id as string);

    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getBookings = async (req: Request, res: Response) => {
  try {
    const result = await adminServices.getBookings();

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getBookingById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await adminServices.getBookingById(id as string);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateBookingStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const result = await adminServices.updateBookingStatus(id as string, status);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteBooking = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await adminServices.deleteBooking(id as string);

    res.status(200).json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};






export const adminControllers={
    adminDashboard,getAllUsers,getUserById,getTutors,getTutorById,getCourses,getCourseById,deleteCourse,getBookings,getBookingById,updateBookingStatus,deleteBooking
}