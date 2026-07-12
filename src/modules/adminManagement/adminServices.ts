import { prisma } from "../../lib/prisma"
import { bookingStatus } from "../../../generated/prisma/enums"




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





const getAllusers=async()=>{
    const result=await prisma.user.findMany()
    return result
}


const getUserById=async(id:string)=>{
    const result=await prisma.user.findUnique({
        where:{
            id
        }
    })

    return result

}



const getTutors=async()=>{
    const result=await prisma.user.findMany(
        {
            where:{
                role:"TUTOR"
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



const getCourses = async () => {
  const result = await prisma.courses.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      startDate: true,
      endDate: true,
      category: {
        select: {
          name: true,
        },
      },
      tutor: {
        select: {
          user: {
            select: {
              name: true,
            },
          },
        },
      },
      _count: {
        select: {
          booking: true,
        },
      },
    },
  });

  return result;
};



const getCourseById = async (id: string) => {
  const result = await prisma.courses.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      description: true,
      tags: true,
      price: true,
      dayOfWeek: true,
      startTime: true,
      endTime: true,
      startDate: true,
      endDate: true,
      category: {
        select: {
          name: true,
        },
      },
      tutor: {
        select: {
          user: {
            select: {
              name: true,
              email: true,
              image: true,
            },
          },
        },
      },
      _count: {
        select: {
          booking: true,
          review: true,
        },
      },
    },
  });

  return result;
};


const deleteCourse = async (id: string) => {
  const result = await prisma.courses.delete({
    where: {
      id,
    },
  });

  return result;
};


const getBookings = async () => {
  const result = await prisma.bookings.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      price: true,
      status: true,
      createdAt: true,
      student: {
        select: {
          name: true,
          email: true,
        },
      },
      course: {
        select: {
          id: true,
          name: true,
          tutor: {
            select: {
              user: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return result;
};

const getBookingById = async (id: string) => {
  const result = await prisma.bookings.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      price: true,
      status: true,
      createdAt: true,
      student: {
        select: {
          name: true,
          email: true,
          image: true,
        },
      },
      course: {
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          tutor: {
            select: {
              user: {
                select: {
                  name: true,
                  email: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return result;
};


const updateBookingStatus = async (
  id: string,
  status: bookingStatus
) => {
  const result = await prisma.bookings.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });

  return result;
};

const deleteBooking = async (id: string) => {
  const result = await prisma.bookings.delete({
    where: {
      id,
    },
  });

  return result;
};





export const adminServices={
    adminDashboard,getAllusers,getUserById,getTutors,getTutorById,getCourses,getCourseById,deleteCourse,getBookings,getBookingById,updateBookingStatus,deleteBooking
}