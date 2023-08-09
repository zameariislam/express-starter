import mongoose from "mongoose";
import app from "./app";
import config from "./config";

import {Server} from "http"


process.on("uncaughtException",()=>{
    console.log("uncought exception is detected....")
    process.exit(1)
})



let server:Server;
async function bootStrap() {

    try{
        await mongoose.connect(config.db_url as string);
        
        console.log("Database is connected sucessfully")
      server=app.listen(config.port, () => {
            console.log(` app listening on port ${config.port}`)
          })


    }
    catch(err){
        console.log('Failed to connect database',err)

    }

    process.on("unhandledRejection",(error)=>{
        console.log("unhandled rejection is detected,we are closing our server ...")
        if(server){
            server.close(()=>{
                console.log(error)
                process.exit(1)

            })

        }
        else{
            process.exit(1)
        }
        
    })

   
    }
    bootStrap()

   
    process.on("SIGTERM",()=>{
        console.log("sigterm is received");
        if(server){
            server.close()

        }

    })
   
   
  
    
  