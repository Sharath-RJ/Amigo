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
  p: number = 1;

  userList: User[] = [];
  totalUsers: any;

  ngOnInit(): void {
    console.log('hello');
    this._http
      .get<User[]>('http://localhost:5000/api/admin/getAllUsers')
      .subscribe(
        (data: User[]) => {
          console.log(data);
          this.userList = data;
          this.totalUsers = data.length;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  blockUser(id: any) {
    const index = this.userList.findIndex((user) => user._id === id);
    if (index !== -1) {
      this.userList[index].isBlocked = true; // Optimistic update
      this._http
        .put(`http://localhost:5000/api/admin/blockUser/${id}`, {})
        .subscribe(
          (data: any) => {
            console.log(data);
          },
          (error) => {
            console.log(error);
            this.userList[index].isBlocked = false; // Revert change if error
          }
        );
    }
  }

  unblockUser(id: any) {
    const index = this.userList.findIndex((user) => user._id === id);
    if (index !== -1) {
      this.userList[index].isBlocked = false; // Optimistic update
      this._http
        .put(`http://localhost:5000/api/admin/unblockUser/${id}`, {})
        .subscribe(
          (data:any) => {
            console.log(data);
          },
          (error) => {
            console.log(error);
            this.userList[index].isBlocked = true; // Revert change if error
          }
        );
    }
  }
}
