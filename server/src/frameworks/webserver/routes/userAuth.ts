
import express, { Router } from "express"
import { AuthController } from "../../../adapters/controllers/userAuthControllers"
import { AuthUseCase } from "../../../app/useCases/auth/userAuth"
import { UserRepositoryMongo } from "../../../frameworks/database/mongodb/repositories/userRepositoryMongoDB"

export default function AuthRouter(): Router {
    const router = express.Router()
    const userRepository = new UserRepositoryMongo() 
    const authUseCase = new AuthUseCase(userRepository)
    const authController = new AuthController(authUseCase)

    router.post("/register", authController.register.bind(authController))
    router.post("/login", authController.login.bind(authController))

    return router
}
