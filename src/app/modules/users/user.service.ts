import config from "../../../config"
import { ApiError } from "../../../errors/ApiError"
import { IUser } from "./user.interface"
import { User } from "./user.model"
import { generateUserId } from "./user.utils"


 const createUser= async (user:IUser):Promise<null|IUser>=>{


  if(!user?.id){
    user.password=config.default_user_password as string
  }
  const id= await generateUserId()

  user.id=id

  

  const createdUser=await User.create(user )


  console.log("created User",createdUser)

  if(!createUser){
    // throw new Error("Failed to create User")
    throw new ApiError(400,"Failed to create User")
 

  }
  else {
    return createdUser
  }
  

 }

 export  const userService= {

createUser
 }

 

