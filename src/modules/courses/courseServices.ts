import { Prisma } from "../../../generated/prisma/client";
import { QueryMode } from "../../../generated/prisma/internal/prismaNamespace";
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

const getCourses=async({search,tags}:{
    search:string,
    tags:string[]
})=>{
    const andConditions=[]

    if(search){
        andConditions.push({
            OR:[
                {
                 name:{
                    contains:search,
                    mode:QueryMode.insensitive
                 }   
                },
                {
                    description:{
                        contains:search,
                        mode:QueryMode.insensitive
                    }
                },
                {
                    tags:{
                        has:search
                    }
                }
            ]
        })

    }

    if(tags?.length>0){
        andConditions.push({
            tags:{
                hasEvery:tags
            }
        })
    }

    const result=await prisma.courses.findMany({
        where:{
            AND:andConditions
        },
        include:{
            _count:{
                select:{
                    review:true
                }
            }
        }
    })
    return result


}



export const courseServices={
    createCourse,getCourses
}