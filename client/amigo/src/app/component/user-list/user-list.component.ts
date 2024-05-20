import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit {
  // users = [
  //   { profilePicture: 'https://via.placeholder.com/150', username: 'User1' },
  //   { profilePicture: 'https://via.placeholder.com/150', username: 'User2' },
  //   { profilePicture: 'https://via.placeholder.com/150', username: 'User3' },
  // ];
  constructor(private _http:HttpClient){}
  ngOnInit(): void {
    this._http.get("")
  }
}
