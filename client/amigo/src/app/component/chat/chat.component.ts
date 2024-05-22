import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environment';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  content: string = '';
  receiverId: string | null = null;
  senderId: string | null = null;
  messages: any = [];
  roomId!: string;

  constructor(
    private _router: Router,
    private route: ActivatedRoute,
    private _http: HttpClient
  ) {}

  ngOnInit(): void {
    // Get receiverId from query parameters
    this.route.paramMap.subscribe((params) => {
      this.receiverId = params.get('receiverId');
      if (!this.receiverId) {
        console.warn('Receiver ID not found in route parameters');
      }
    });

    // Get senderId from session storage
    const loggedInUser = sessionStorage.getItem('loginedInUser');
    if (loggedInUser) {
      try {
        this.senderId = JSON.parse(loggedInUser)._id;
      } catch (e) {
        console.error('Error parsing loggedInUser from sessionStorage', e);
      }
    }
    console.log(this.senderId, ' ', this.receiverId, ' ', this.content);

    //getting alll messages between users
    this._http
      .get(
        environment.apiUrl +
          '/chat/getAllMessages/' +
          this.senderId +
          '/' +
          this.receiverId
      )
      .subscribe(
        (data) => {
          this.messages = data;
        },
        (error) => {
          console.error(error);
        }
      );
  }

  sendMessage(): void {
    if (!this.senderId) {
      console.error('Sender ID is undefined');
      return;
    }

    if (!this.receiverId) {
      console.error('Receiver ID is undefined');
      return;
    }

    console.log(this.senderId, ' ', this.receiverId, ' ', this.content);

    this._http
      .post(environment.apiUrl + '/chat/send', {
        sender: this.senderId,
        receiver: this.receiverId,
        content: this.content,
      })
      .subscribe(
        (data) => {
          console.log('Message sent successfully', data);
        },
        (error) => {
          console.error('Error sending message', error);
        }
      );
  }
  randomID(len: number) {
    let result = '';
    if (result) return result;
    var chars =
        '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
      maxPos = chars.length, i;
    len = len || 5;
    for (i = 0; i < len; i++) {
      result += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return result;
  }


  connectToVideoCall() {
    this.roomId=this.randomID(8)
    this._router.navigate(['/videocall', this.roomId]);
  }
}
