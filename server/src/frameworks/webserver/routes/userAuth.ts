
import express, { Router } from "express"
import { AuthController } from "../../../adapters/controllers/userAuthControllers"
import { AuthUseCase } from "../../../app/useCases/auth/userAuth"
import { UserRepositoryMongo } from "../../../frameworks/database/mongodb/repositories/userRepositoryMongoDB"

import { AuthService } from "../../../frameworks/services/authService"
export default function AuthRouter(): Router {
    const router = express.Router()
    const userRepository = new UserRepositoryMongo()
    const authService = new AuthService()
    const authUseCase = new AuthUseCase(userRepository,authService)
    const authController = new AuthController(authUseCase)

    router.post("/register", authController.register.bind(authController))
    router.post("/login", authController.login.bind(authController))
    router.get("/generateOtp", authController.generateOtp.bind(authController))

    return router
}
