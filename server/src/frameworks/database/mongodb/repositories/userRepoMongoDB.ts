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
    async followUser(followId: string, userId: string): Promise<any> {
      try {
        const updatedUser = await UserModel.findByIdAndUpdate(
          userId,
          { $push: { following: followId } },
          { new: true }
        )
        return updatedUser
      } catch (error) {
        console.error("Error following user:", error)
        throw error
      }
   }
}
