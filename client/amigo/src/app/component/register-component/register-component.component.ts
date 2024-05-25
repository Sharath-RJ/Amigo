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

  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  PhoneNumber: string = '';
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
    // Validate username
    if (!this.username || this.username.length < 3) {
      this._snackBar.open('Username must be at least 3 characters long.', '', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
      return;
    }

    // Validate email
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!this.email || !emailPattern.test(this.email)) {
      this._snackBar.open('Please enter a valid email address.', '', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
      return;
    }

    // Validate password
    if (!this.password || this.password.length < 6) {
      this._snackBar.open('Password must be at least 6 characters long.', '', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
      return;
    }

    // Validate confirm password
    if (this.password !== this.confirmPassword) {
      this._snackBar.open('Passwords do not match.', '', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
      return;
    }

    // Validate phone number
    const phoneNumberPattern = /^\d{10}$/;
    if (!this.PhoneNumber || !phoneNumberPattern.test(this.PhoneNumber)) {
      this._snackBar.open('Please enter a valid phone number.', '', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
      return;
    }

    // If all validations pass, proceed with registration
    this._http
      .post(`${environment.apiUrl}/user-auth/register`, {
        username: this.username,
        email: this.email,
        password: this.password,
        PhoneNumber: this.PhoneNumber,
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
          this.confirmPassword = '';
          this.PhoneNumber = '';

        this._router.navigate(['/otpVerify']);
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
