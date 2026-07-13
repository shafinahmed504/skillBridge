

import { prisma } from "../../lib/prisma"





const getTutors=async({name}:{name:string})=>{

    const result=await prisma.user.findMany(
        {
            where:{
                role:"TUTOR",
                AND:[
                    {
                        name:{
                            contains:name
                        }
                    }
                ]
            },
            
            select:{
                name:true,
                email:true,
                image:true
            }
        }
    )

    return result
}



const getTutorById=async(tutorId:string)=>{
    const result=await prisma.tutorProfile.findUnique({
        where:{
            id:tutorId
        },
        select:{
            
            user:{
                select:{
                    name:true,
                    email:true,
                    image:true,
                    role:true
                }
            },
            bio:true
            
        }
    })

    return result
}









export const tutorServices={
    getTutors,getTutorById
}