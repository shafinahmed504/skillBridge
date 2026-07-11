
import { prisma } from "../lib/prisma"

type updateFields={
    name?:string,
    bio?:string
}


const createTutorProfile=async(bio:string,userId:string)=>{
    

    const tutorExists=await prisma.user.findUnique({
        where:{
            id:userId  
        }
    })
    if(!tutorExists){
        return "user not found"
    }

    if(tutorExists.role!=="TUTOR"){
        return "Your are not a tutor"
    }

    const result=await prisma.tutorProfile.create({
        data:{
            bio,
           userId
  
        }
  
    })

    return result

    
}


const updateTutorProfile=async(userId:string,updateFields:updateFields)=>{
    const user=await prisma.user.findUnique({
        where:{
            id:userId,

        }

    })

    if(user?.role!=="TUTOR"){
        return "You cannot update this"
    }



    if (updateFields.name !== undefined) {
  await prisma.user.update({
    where: { id: userId },
    data: {
      name: updateFields.name,
    },
  });
}

if (updateFields.bio !== undefined) {
    try {
        await prisma.tutorProfile.update({
            where: { userId },
            data: {
                bio: updateFields.bio,
            },
        });
    } catch (err) {
        console.log(err);
        throw err;
    }
}
    const updatedProfile=await prisma.tutorProfile.findUnique({
        where:{
            userId:userId
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

    return updatedProfile

}



const dashBoard=async(userId:string,role:string)=>{

    const tutorProfile=await prisma.tutorProfile.findUnique({
        where:{
            userId:userId
        }
    })

    if(!tutorProfile){
        return "tutorProfile not found"
    }

    const bookings=await prisma.bookings.findMany(
        {
            where:{
                course:{
                    
                    tutorId:tutorProfile?.id,
                    
                },
            },
            include:{
                
                course:{
                    select:{
                        name:true,
                    }
                },
                student:{
                    select:{
                        name:true,
                        
                    }
                }
            }
        }
    )

    return bookings



}




export const tutorManagementServices={
    createTutorProfile,updateTutorProfile,dashBoard
}
