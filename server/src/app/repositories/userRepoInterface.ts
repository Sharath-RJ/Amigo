import { StepInstance } from "twilio/lib/rest/studio/v1/flow/engagement/step"
import { User } from "../../entities/user"


export interface UserRepoInterface {
    getAllUsers(id: string): Promise<any>
    followUser(followId: string, userId: string): Promise<any>
    unfollowUser(followId: string, userId: string): Promise<any>
}