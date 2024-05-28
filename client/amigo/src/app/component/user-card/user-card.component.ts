import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../../environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css',
})
export class UserCardComponent implements OnInit {
  @Input() user!: {
    _id: any | string;
    profilePicture: string;
    username: string;
  };
  constructor(private _http: HttpClient, private _snackBar: MatSnackBar) {}
  userId!: string;

  ngOnInit(): void {
    const loggedInUser = sessionStorage.getItem('loginedInUser');
    if (loggedInUser) {
      this.userId = JSON.parse(loggedInUser)._id;
    }
    console.log('user', this.userId);
  }

  followUser(followId: string): any {
    console.log('follow id', followId);
    this._http
      .put(
        `${environment.apiUrl}/user/follow/` + followId + '/' + this.userId,
        {}
      )
      .subscribe((data) => {
        console.log(data);
        this._snackBar.open('Your are following now', '', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['green-snackbar'],
        });
      });
  }
}
