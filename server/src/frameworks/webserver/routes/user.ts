import express, { Router } from "express"
import { userConteoller } from "../../../adapters/controllers/userController"
import { userRepoMongoDB } from "../../database/mongodb/repositories/userRepoMongoDB"
import { userUseCase } from "../../../app/useCases/user"


export default function userRoute(): Router {
    const router = express.Router()
    const userRepository = new userRepoMongoDB()
    const userUseCaseInstance = new userUseCase(userRepository)
    const userControllerInstance = new userConteoller(userUseCaseInstance)

    router.get(
        "/getAllUsers",
        userControllerInstance.getAllUsers.bind(userControllerInstance)
    )

    return router
}
