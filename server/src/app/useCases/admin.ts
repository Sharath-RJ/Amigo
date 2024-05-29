import { adminRepository } from "../repositories/adminRepository";

export  class adminUseCase {

    constructor(private adminRepository:adminRepository){}
   async getAllUsers():Promise<any>{
     return await this.adminRepository.getAllUsers()
    }
}