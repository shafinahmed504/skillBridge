import { prisma } from "../lib/prisma"

const adminDashboard=async()=>{



    const totalUsers=await prisma.user.count()

    const totalStudents=await prisma.user.count({
        where:{
        
                    role:"STUDENT"
             
        }
    })
    const totalTutors=await prisma.user.count({
        where:{
         
                    role:"TUTOR"
                
            
        }
    })
    const totalCourses=await prisma.courses.count()
    const totalBookings=await prisma.bookings.count()
    const totalRevenue=await prisma.bookings.aggregate({
        _sum:{
            price:true
        }
    })

    const recentBookings=await prisma.bookings.findMany({
        take:5,
        orderBy:{
            createdAt:"desc"
        }

    })


return {
    stat:{
  totalUsers,
  totalStudents,
  totalTutors,
  totalCourses,
  totalBookings,
  totalRevenue: totalRevenue._sum.price ?? 0
    },
    recentBookings:{
        recentBookings
    }
    

};

  

}





export const adminServices={
    adminDashboard
}