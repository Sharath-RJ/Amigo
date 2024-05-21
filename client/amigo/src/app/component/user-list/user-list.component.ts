import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environment';


export interface User {
  _id: number;
  name: string;
  email: string;
  profilePicture: string;
  username: string;
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.http.get<User[]>(`${environment.apiUrl}/user/getAllUsers`).subscribe(
      (data: User[]) => {
        this.users = data;
        console.log(data);
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }
}
