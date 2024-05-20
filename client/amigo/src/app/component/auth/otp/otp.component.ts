import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css'],
})
export class OtpComponent implements OnInit {
  otp: string[] = ['', '', '', ''];

  constructor(private _http: HttpClient) {}

  ngOnInit(): void {
    this._http.get('http://localhost:5000/api/user-auth/generateOtp').subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  submitOtp(): void {
    const otpCode = this.otp.join('');
    this._http
      .post('http://localhost:5000/api/auth/verifyOtp', { otp: otpCode })
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
