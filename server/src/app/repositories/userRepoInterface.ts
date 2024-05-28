import { User } from "../../entities/user"


export interface UserRepoInterface {
    getAllUsers(): Promise<any>
    followUser(followId: string, userId: string): Promise<any>
}