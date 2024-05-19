import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../../environment';

@Component({
  selector: 'app-register-component',
  templateUrl: './register-component.component.html',
  styleUrls: ['./register-component.component.css'],
})
export class RegisterComponentComponent {
  constructor(private _http: HttpClient, private _snackBar: MatSnackBar) {}

  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  phoneNumber:string=''

  register() {
    this._http
      .post(`${environment.apiUrl}/user-auth/register`, {
        username: this.username,
        email: this.email,
        password: this.password,
      })
      .subscribe(
        (data) => {
          console.log(data);
          this._snackBar.open('Registration Successful!', '', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });

          this.username = '';
          this.email = '';
          this.password = '';
        },
        (error) => {
          //console.error(error);
          this._snackBar.open(
            'An error occurred. Please try again later.',
            '',
            {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            }
          );
        }
      );
  }
}
