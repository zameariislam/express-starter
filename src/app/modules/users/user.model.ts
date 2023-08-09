
import {  Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';




 export const userSchema = new Schema<IUser,UserModel>({

  id:{
    type:String,
    unique:true,
    required:true
  },
  role:{
    type:String,
    required:true
  },
  password:{
    type:String
   
  }


},{timestamps:true});



export  const User = model<IUser,UserModel>('User', userSchema);

