import { prisma } from "../lib/prisma"

type Course = {

  name: string;
  description: string;
  tags: string[];
  tutorId: string;
  categoryId: string;
  price: number;
  dayOfWeek: string[];
  startTime: number;
  endTime: number;
  startDate: Date;
  endDate: Date;

};




const createCourse=async(courseDeails:Course)=>{

    const result=await prisma.courses.create({
        data:courseDeails
    })

    return result

    
}



export const courseServices={
    createCourse
}