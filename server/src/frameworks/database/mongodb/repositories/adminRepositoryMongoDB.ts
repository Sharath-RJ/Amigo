import { adminRepository } from "../../../../app/repositories/adminRepository";
import { UserModel } from "../models/userModel";

export class adminRepositoryMongoDB implements adminRepository{
    async getAllUsers(): Promise<any> {
        try {
            const users= await UserModel.find()
            return users
        } catch (error) {
            
        }
    }

    async blockUser(id:any): Promise<any> {
        try {
            const user = await UserModel.findOneAndUpdate({_id:id},{isBlocked:true})
            return user
        } catch (error) {
            console.log(error)
        }
    }

    async unblockUser(id:any): Promise<any> {
        try {
            const user = await UserModel.findOneAndUpdate({_id:id},{isBlocked:false})
            return user
        } catch (error) {
            console.log(error)
        }
    }
}