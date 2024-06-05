import express, { Router } from "express"
import { userConteoller } from "../../../adapters/controllers/userController"
import { userRepoMongoDB } from "../../database/mongodb/repositories/userRepoMongoDB"
import { userUseCase } from "../../../app/useCases/user"
import authenticate from "../middlewares/authMiddleware"


export default function userRoute(): Router {
    const router = express.Router()
    const userRepository = new userRepoMongoDB()
    const userUseCaseInstance = new userUseCase(userRepository)
    const userControllerInstance = new userConteoller(userUseCaseInstance)

    router.get(
        "/getAllUsers/:userId",
        userControllerInstance.getAllUsers.bind(userControllerInstance)
    )

           
    router.put("/follow/:followId/:userId",userControllerInstance.followUser.bind(userControllerInstance))
    router.put("/unfollow/:followId/:userId", userControllerInstance.unfollowUser.bind(userControllerInstance))
    router.put("/updateProfilePic/:userId",
        userControllerInstance.updateProfilePic.bind(userControllerInstance)
    )
    router.put("/goLive", authenticate, userControllerInstance.goLive.bind(userControllerInstance))

    return router
}
