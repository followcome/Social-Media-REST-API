import express from "express";
import bcrypt from "bcrypt"
import User from "../models/User.js";

//update user
export const updateUser =async(req,res,next)=>{
     if(req.body.password){
        try{
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password,salt)
        }catch(err){
            console.log(err)
            return res.status(500).json(err)
           
        }
     }
    try{
        const user = await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
       return res.status(200).json(user)

    }catch(err){
        console.log(err)
      return  res.status(500).json(err)
    }

}

 
// delete user
export const deleteUser=async(req,res,next)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id)
       return res.status(200).json("User has been deleted!")

    }catch(err){
        console.log(err)
      return  res.status(500).json(err)
    }

}
//get a user

export const getUser=async(req,res,next)=>{
    try{
        const user = await User.findById(req.params.id)
        
        res.status(200).json(user)

    }catch(err){
        console.log(err)
        return  res.status(500).json(err)
    }
}
//follow a user 

export const follow = async (req,res,next)=>{
    try{
        const userToFollow = await User.findById(req.params.id)
        const currentUser = await User.findById(req.user.id)
        if(!userToFollow.followers.includes(req.user.id))
            await userToFollow.updateOne({$push:{followers:req.user.id}})
            await currentUser.updateOne({$push:{followings:req.params.id}})
            res.status(200).json("User has been followed")
    }catch(err){
        return  res.status(500).json(err)

    }
}
// unfollow a user
export const unfollow = async (req,res,next)=>{
    try{
        const userToFollow = await User.findById(req.params.id)
        const currentUser = await User.findById(req.user.id)
        if(userToFollow.followers.includes(req.user.id))
            await userToFollow.updateOne({$pull:{followers:req.user.id}})
            await currentUser.updateOne({$pull:{followings:req.params.id}})
            res.status(200).json("User has been unfollowed")
    }catch(err){
        return  res.status(500).json(err)

    }
}