import express from "express"
import jwt from "jsonwebtoken"

export const VerifyToken = (req,res,next)=>{
    const authHeader = req.headers.token
    if(authHeader){
        const token = authHeader.split(" ")[1]
        jwt.verify(token,process.env.JWT,(err,user)=>{
            if(err) res.status(403).json("token isn't valid")
                req.user = user;
            next()
        })
    }

}
export const VerifyTokenAndAuth = (req,res,next)=>{
    VerifyToken(req,res,next,()=>{
        if(req.user.id===req.params.id || req.user.isAdmin){
            next()
        }else{
            res.status(403).json("You're not allowed to do that!")
        }
    })
}

export const VerifyFollowers =(req,res,next)=>{
    VerifyToken(req,res,next,()=>{
        if (req.user.id !==req.params.id){

        }else{
            res.status(403).json("You can't follow yourself!")
        }
    })
}


