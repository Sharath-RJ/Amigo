import AuthRouter from "./userAuth"
import postRoute from "./posts"

import { Application } from "express"


const routes = (app: Application) => {

    app.use("/api/user-auth", AuthRouter())
    app.use("/api/post",postRoute())
    
}

export default routes
