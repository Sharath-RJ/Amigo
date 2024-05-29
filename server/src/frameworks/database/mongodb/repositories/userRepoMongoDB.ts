import { UserRepoInterface } from "../../../../app/repositories/userRepoInterface"
import { UserModel } from "../models/userModel"




export class userRepoMongoDB implements UserRepoInterface {
    async getAllUsers(id:string): Promise<any> {
        try {
              const loggedInUserId = id 
              const users = await UserModel.find({ _id: { $ne: loggedInUserId } }).lean();
              const usersWithFollowStatus = await Promise.all(
                  users.map(async (user) => {
                      // Check if the logged-in user is following this user
                      const isFollowing = await UserModel.exists({
                          _id: loggedInUserId,
                          following: user._id,
                      })
                      console.log(isFollowing)
                      // Add follow status to user object
                      return { ...user, isFollowing: isFollowing }
                  })
              )
              console.log(usersWithFollowStatus)
              return usersWithFollowStatus
              
        } catch (error) {
            console.log(error)
        }
    }

    async followUser(followId: string, userId: string): Promise<any> {
        try {
            const updatedUser = await UserModel.findByIdAndUpdate(
                followId,
                { $push: { followers: userId } },
                { new: true }
            )
            await UserModel.findByIdAndUpdate(
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
    async unfollowUser(followId: string, userId: string): Promise<any> {
        try {
            const updatedUser = await UserModel.findByIdAndUpdate(
                followId,
                { $pull: { followers: userId } },
                { new: true }
            )
            await UserModel.findByIdAndUpdate(
                userId,
                { $pull: { following: followId } },
                { new: true }
            )
            return updatedUser
        } catch (error) {   
            console.error("Error unfollowing user:", error)
            throw error
        }
    }   
}
