import { User } from "../../entities/user"


export interface UserRepoInterface {
    getAllUsers( ): Promise<any>

}