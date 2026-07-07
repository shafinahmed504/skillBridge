import { NextFunction, Request, Response } from "express"
import { auth } from "../lib/auth"


declare global{
    namespace Express{
        interface Request{
            user?:{
                id:string,
                email:string,
                name:string,
                role:string,
                emailVerified:boolean

            }
        }
    }
}

const middlewareAuth=(...roles:string[])=>{
    return async(req:Request,res:Response,next:NextFunction)=>{
        const session= await auth.api.getSession({
            headers:req.headers as any
    })
    if(!session){
            if(!session){
        return res.status(401).json({
            message:"unauthorized"
        })
    }
    }

    if(!session.user?.emailVerified){
        return res.status(401).json({
        success:false,
        message:"unverified"
            })

    }

            req.user={
            id:session?.user.id as string,
            email:session?.user.email as string,
            name:session?.user.name as string,
            role:session?.user.role as string,
            emailVerified:session?.user.emailVerified as boolean

        }

        if(roles.length && !roles.includes(req.user.role)){
            return res.status(401).json({
            success:false,
            message:"forbidden"
            })
        }

        next()


    }
}


export default middlewareAuth