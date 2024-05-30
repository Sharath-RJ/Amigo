import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environment';
import { User } from '../../user-list/user-list.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'], // Fixed typo from 'styleUrl' to 'styleUrls'
})
export class UsersListComponent implements OnInit {

  
  constructor(private _http: HttpClient) {}
  p:number=1

  userList: User[] = [];
  totalUsers:any

  ngOnInit(): void {
    console.log('hello');
    this._http
      .get<User[]>('http://localhost:5000/api/admin/getAllUsers')
      .subscribe(
        (data: User[]) => {
          console.log(data);
          this.userList = data;
          this.totalUsers=data.length
        },
        (error) => {
          console.log(error);
        }
      );
  }
  
  blockUser(id:any){
     this._http.put<User[]>(`http://localhost:5000/api/admin/blockUser/${id}`,{}).subscribe((data)=>{
       this.userList = data
     },(error)=>{
       console.log(error)
     })
  }

  unblockUser(id:any){
    this._http.put<User[]>(`http://localhost:5000/api/admin/unblockUser/${id}`,{}).subscribe((data)=>{
      this.userList=data
    },(error)=>{
      console.log(error)
    })
 }
}
