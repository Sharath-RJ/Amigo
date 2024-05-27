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

  userList: User[] = [];

  ngOnInit(): void {
    console.log('hello');
    this._http
      .get<User[]>('http://localhost:5000/api/user/getAllUsers')
      .subscribe(
        (data: User[]) => {
          console.log(data);
          this.userList = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
