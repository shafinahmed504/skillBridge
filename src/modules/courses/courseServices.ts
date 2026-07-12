import { prisma } from "../../lib/prisma"

type Course = {

  name: string;
  description: string;
  tags: string[];
  tutorId?: string;
  categoryId: string;
  price: number;
  dayOfWeek: string[];
  startTime: number;
  endTime: number;
  startDate: Date;
  endDate: Date;

};




const createCourse=async(courseDeails:Course,userId:string)=>{

    const tutor=await prisma.tutorProfile.findUnique({
        where:{
             userId
        }
        
    })

    

    const result=await prisma.courses.create({
        data:{
            ...courseDeails,
            tutorId:tutor?.id as string
        }
        
        
    })

    return result

    
}



export const courseServices={
    createCourse
}