import { prisma } from "../lib/prisma"

type category={
    name:string
}


const createCategories=async(categoryName:category)=>{

    const result=await prisma.categories.create({
        data:{
            name:categoryName.name
        }
    })

    return result


    
}


const getCategories=async()=>{

    const result=await prisma.categories.findMany()
    return result

}




export const categoriesServices={
    createCategories,getCategories

}