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
}