import  { ErrorRequestHandler} from 'express';
import config from '../../config';
import { IGenericErrorMessage } from '../../interfaces/error';
import handleValidationError from '../../errors/handleValidationError';
import { ApiError } from '../../errors/ApiError';
import { ZodError } from 'zod';
import handleZodError from '../../errors/handleZodError';


 export const globalErrorHandler:ErrorRequestHandler  =(error,req,res,next)=>{
  let statusCode=500
  let message="Something Went wrong"
  let errorMessages:IGenericErrorMessage[]=[]

  if (error?.name==="ValidationError"){
    
    const simplifiedError=handleValidationError (error)
    statusCode=simplifiedError.statusCode;
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  }
  else if (error instanceof ZodError) {
    console.log("I am in Zod error")
    
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  }
  else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  }

  else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  }


  res.status(statusCode).json({
    success:false,
    message,
    errorMessages,
    stack:config.env==="development"?error?.stack:undefined

  })
  next()

}