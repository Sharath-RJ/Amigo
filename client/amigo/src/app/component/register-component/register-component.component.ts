import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../../environment';
import { Router } from '@angular/router';
declare var google:any
@Component({
  selector: 'app-register-component',
  templateUrl: './register-component.component.html',
  styleUrls: ['./register-component.component.css'],
})
export class RegisterComponentComponent implements OnInit {
  constructor(
    private _http: HttpClient,
    private _snackBar: MatSnackBar,
    private _router: Router
  ) {}

  username!: string ;
  email!: string ;
  password!: string;
  confirmPassword!: string ;
  phoneNumber!: string ;
  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id:
        '803863524285-ogjv1ng34vv97mk60gmfkco5fs0jhr4a.apps.googleusercontent.com',
      callback: (response: any) => {
        this.handleLLogin(response);
      },
    });
    google.accounts.id.renderButton(document.getElementById('google-btn'), {
      theme: 'filled_black',
      size: 'large',
      shape: 'rectangle',
      width: 350,
    });
  }
  handleLLogin(response: any) {
    const payload = this.decodetoken(response.credential);
    sessionStorage.setItem('loggedInUser', JSON.stringify(payload));
    this._router.navigate(['/home']);
  }
  private decodetoken(token: String) {
    return JSON.parse(atob(token.split('.')[1]));
  }
 
  
  register() {
    
   
    this._http
      .post(`${environment.apiUrl}/user-auth/send-otp`, {
        username: this.username,
        email: this.email,
        password: this.password,
        phoneNumber: this.phoneNumber,
      })
      .subscribe(
        (data) => {
         this._router.navigate(['/otpVerify'], {
           state: { phoneNumber: this.phoneNumber },
         });
          console.log(data);
        },

        (error) => {
          console.error('Registration error', error);
        }
      );
  }
}
