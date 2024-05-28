import { promises } from "dns";
import { UserRepoInterface } from "../repositories/userRepoInterface";


export class userUseCase {
    constructor(private _userRepoInterface: UserRepoInterface) {}

    async getUsers(){
       return await  this._userRepoInterface.getAllUsers()
    }

    async followUser(followId:string, userId:string){
        return await this._userRepoInterface.followUser(followId, userId)
    }
}