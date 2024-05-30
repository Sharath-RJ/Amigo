export interface adminRepository {
    getAllUsers(): Promise<any>
    blockUser(id: any): Promise<any>
    unblockUser(id:any): Promise<any>
}