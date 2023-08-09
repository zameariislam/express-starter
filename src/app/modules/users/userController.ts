 
 import  {RequestHandler } from 'express';
import { userService } from './user.service';


  const createUser:RequestHandler= async (req,res,next)=>{


    try{

      // request validsation    

      const {user}  =req.body

    const result=await userService.createUser(user)
    res.status(200).json({
      success:true,
      message:'user created successfully !',
      data:result

    })



    }
    catch(error){
      
      // res.status(400).json({
      //   success:false,
      //   message:err

      // })
      console.log(error)
      
      next(error)

    }

   }

   export const userController= {
    createUser
  }