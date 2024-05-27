import { UserRepoInterface } from "../../../../app/repositories/userRepoInterface"
import { UserModel } from "../models/userModel"




export class userRepoMongoDB implements UserRepoInterface {
   async getAllUsers():Promise<any>{
    try {
       const users= UserModel.find() 
       return users
    } catch (error) {
        console.log(error)
    }
   }
}
