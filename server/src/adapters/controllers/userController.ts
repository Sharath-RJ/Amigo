import { Request, Response } from "express"
import { User } from "../../entities/user"
import { userUseCase } from "../../app/useCases/user"

export class userConteoller {
    static getAllUsers: any


    constructor(private _userUseCase: userUseCase) {}
    async getAllUsers(req:Request,res:Response):Promise<void>{
       try {
           const users = await this._userUseCase.getUsers()
             console.log(users)
           if (users) {
            console.log(users)
               res.status(200).json(users)
           }
       } catch (error) {
           console.log(error)
       }
    }
 
}
