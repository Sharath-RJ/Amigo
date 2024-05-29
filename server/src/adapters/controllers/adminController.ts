import { adminUseCase } from "../../app/useCases/admin";
import { Request, Response } from "express"

export class adminController {
    constructor(private _adminusecase: adminUseCase) {}

    async getAllUsers(req:Request, res:Response):Promise<any>{

        try {
             const users = await this._adminusecase.getAllUsers()
             if (users) res.json(users)
        } catch (error) {
            console.log(error)
        }
    
    }
}