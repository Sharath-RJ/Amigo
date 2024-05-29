import { Request, Response } from "express"
import { User } from "../../entities/user"
import { userUseCase } from "../../app/useCases/user"

export class userConteoller {
    static getAllUsers: any


    constructor(private _userUseCase: userUseCase) {}
    async getAllUsers(req:Request,res:Response):Promise<void>{
       try {
           const users = await this._userUseCase.getUsers(req.params.userId)
             console.log(users)
           if (users) {
            console.log(users)
               res.status(200).json(users)
           }
       } catch (error) {
           console.log(error)
       }
    }

    async followUser(req:Request,res:Response):Promise<void>{
        try {
            const {followId, userId} = req.params
            const user = await this._userUseCase.followUser(followId, userId)
            console.log(user)
            if(user){   
                res.status(200).json(user)
            }
        } catch (error) {
            console.log(error)
        }
    }
    async unfollowUser(req:Request,res:Response):Promise<void>{
          try {
            
            const {followId, userId} = req.params   
            const user= await this._userUseCase.unfollowUser(followId, userId)
            if(user){
                res.status(200).json(user)
            }
          } catch (error) {
            console.log(error)
          }
      
        
 
     
        }
    }
