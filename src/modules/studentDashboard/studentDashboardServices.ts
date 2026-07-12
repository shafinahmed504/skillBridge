
import { Prisma } from "../../generated/prisma/client";
import { prisma } from "../lib/prisma"

const getOverview = async (studentId: string) => {
  const totalBookings = await prisma.bookings.count({
    where: {
      studentId,
    },
  });

  return {
    totalBookings,
  };
};



const getMyBookings=async(studentId:string,role:string)=>{


    if(role!=="STUDENT"){
        return "Unauthorized user"
    }



    const result=await prisma.bookings.findMany({
        where:{
            studentId
        },
        select:{
            course:{
                select:{
                    name:true,
                    tutor:{
                     select:{
                        user:{
                            select:{
                                name:true
                            }
                        }
                     }
                    }
                }
            }
        }
    })

    return result

}


type editDetails={
    name?:string,
    address?:string,
    dateOfBirth?:string
}


const editProfile=async(studentId:string,editDetails:editDetails)=>{
    const data:Prisma.UserUpdateInput={}
    if(editDetails.name!==undefined){
        data.name=editDetails.name
    }
    if(editDetails.address!==undefined){
        data.address=editDetails.address
    }
    if(editDetails.dateOfBirth!==undefined){
        data.dateOfBirth=editDetails.dateOfBirth 
    }
    const result=await prisma.user.update({
        where:{
            id:studentId
        },
        data
        
    })
    return result
}




export const studentDashBoardServices={
    getOverview,getMyBookings,editProfile
}