import express, { Router } from "express"
import { adminRepositoryMongoDB } from "../../database/mongodb/repositories/adminRepositoryMongoDB"
import { adminUseCase } from "../../../app/useCases/admin"
import { adminController } from "../../../adapters/controllers/adminController"

export default function adminRouter(){
   const router= express.Router()
   const adminRepository = new adminRepositoryMongoDB()
   const adminUseCaseInstance =  new adminUseCase(adminRepository)
   const adminControllerInstance = new adminController(adminUseCaseInstance)

   router.get("/getAllUsers",adminControllerInstance.getAllUsers.bind(adminControllerInstance))

   
   return router
}