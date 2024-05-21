import AuthRouter from "./userAuth"
import postRoute from "./posts"
import { Application } from "express"
import ChatRouter from "./chat"
import userRoute from "./user"


const routes = (app: Application) => {

    app.use("/api/user-auth", AuthRouter())
    app.use("/api/post",postRoute())
    app.use("/api/chat",ChatRouter())
    app.use("/api/user", userRoute())
    
}

export default routes
