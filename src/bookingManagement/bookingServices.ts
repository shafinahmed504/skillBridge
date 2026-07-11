import { prisma } from "../lib/prisma"

type courseId={
    courseId:string
}

const createBookings=async(courseId:courseId,userId:string,userRole:string)=>{

    
    console.log(courseId)

    if(userRole!=="STUDENT"){
        return "You can not enroll in this course"
    }

    const course=await prisma.courses.findUnique({
        where:{
            id:courseId.courseId
        }
    })
    if (!course) {
  throw new Error("Course not found");
}
    const booking=await prisma.bookings.create({
        data:{
            studentId:userId,
            courseId:courseId.courseId,
            price:course?.price,
            status:"CONFIRMED"
        },
        select:{
            id:true,
            price:true,
            course:{
                select:{
                    name:true,
                    category:{
                        select:{
                            name:true
                        }
                    },
                }
            }
        }
        
    })


    return booking

  




}






export const bookingServices={
    createBookings
}