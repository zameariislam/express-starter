
import dotenv from "dotenv"
import path from "path"

dotenv.config({
    path: path.join(process.cwd(),'.env')

})

export default{
    port:process.env.PORT,
    db_url:process.env.DB_URL,
    default_user_password:process.env.DEFAULT_USER_PASSWORD,
    env:process.env.NODE_ENV


}