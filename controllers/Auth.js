import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
export const Register =async(req,res,next)=>{
    
    try{
        // new password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword =await bcrypt.hash(req.body.password,salt)
        ///create new user
        const newUser=  new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword
    
    
        });
     ///saved user and response
        const savedUser= await newUser.save()
        res.status(200).json(savedUser)

    }catch(err){
        console.log(err)
        res.status(500).json(err)
        
    }
    
};
//LOGIN USER 
export const login =async(req,res,next)=>{
    const user = await User.findOne({email:req.body.email})
    if(!user){
        return res.status(404).json("user not found")
    }
    const ValidPassword = await bcrypt.compare(req.body.password,user.password)
    if(!ValidPassword){
        return res.status(400).json("wrong password")
    }

    const accesstoken = jwt.sign({
        id:user._id,isAdmin:user.isAdmin
    },process.env.JWT,{expiresIn:"3d"})
    const {password,...others} = user._doc
    res.status(200).json({...others,accesstoken})
}