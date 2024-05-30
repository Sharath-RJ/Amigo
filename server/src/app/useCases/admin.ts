import { adminRepository } from "../repositories/adminRepository";

export  class adminUseCase {

    constructor(private adminRepository:adminRepository){}
   async getAllUsers():Promise<any>{
     return await this.adminRepository.getAllUsers()
    }

    async blockUser(id:any):Promise<any>{
      return await this.adminRepository.blockUser(id)
    }
    async unblockUser(id:any):Promise<any>{
      return await this.adminRepository.unblockUser(id)
    }
}