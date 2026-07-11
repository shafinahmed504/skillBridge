
import { prisma } from "../lib/prisma"

async function seedAdmin(){
    const adminInfo={
        name:`${process.env.ADMIN_NAME}`,
        email:`${process.env.ADMIN_EMAIL}`,
        password:`${process.env.ADMIN_PASS}`,
        image:"kskjdImage.png",
        role:"ADMIN"
    }

    const adminExists=await prisma.user.findUnique({
        where:{
            email:adminInfo.email
        }
    })
    if(adminExists){
        return "Admin Already exists"
    }
    const adminSignUp=await fetch("http://localhost:5000/api/auth/sign-up/email",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            Accept:"application/json",
            origin:"http://localhost:4000"
        },
        body:JSON.stringify(adminInfo)
    })

    if(!adminSignUp.ok){
            throw new Error("Failed to create admin");
    }

    await prisma.user.update({
        where:{
            email:adminInfo.email
        },
        data:{
            role:"ADMIN",
            emailVerified:true
        }
    })
    console.log("Admin seeded successfully")
}

seedAdmin()

    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });