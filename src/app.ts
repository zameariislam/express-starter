import express, { Application,NextFunction,Request, Response } from 'express';



import dotenv from 'dotenv';
import cors from 'cors'

import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
import { userRoutes } from './app/modules/users/user.route';
import { ApiError } from './errors/ApiError';


dotenv.config();

const app: Application = express();

app.use(cors())
// parser 

app.use(express.json())
app.use(express.urlencoded({extended:true}))

// testing route 

//  application routes

app.use('/api/v1/users',userRoutes)




app.get('/',(req: Request, res: Response,next:NextFunction) => {
  // Promise.reject(new Error("Unhandled promose rejection"))
  // console.log(x)

   throw new  ApiError(400,'Api Error ! huh !')
  //  throw new Error('thamun! ami error amar ekon status code o ase ! huh !')
 
  // res.send('Working Successfully');
  // next("thamun! ami error amar ekon status code o ase ! huh !")
});


// Global error handler 

app.use(globalErrorHandler)

export default app

