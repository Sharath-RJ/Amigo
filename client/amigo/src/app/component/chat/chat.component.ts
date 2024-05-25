import { Component, OnInit, OnDestroy, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SocketService } from '../../services/socketio.service';
import { environment } from '../../../../environment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewChecked {
  content: string = '';
  receiverId: string | null = null;
  senderId: string | null = null;
  messages: any = [];
  roomId!: string;
  chattedUsers: any = [];

  @ViewChild('chatContainer') private chatContainer!: ElementRef;

  constructor(
    private _router: Router,
    private route: ActivatedRoute,
    private _http: HttpClient,
    private socketService: SocketService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.receiverId = params.get('receiverId');
      if (!this.receiverId) {
        console.warn('Receiver ID not found in route parameters');
      }
    });

    const loggedInUser = sessionStorage.getItem('loginedInUser');
    if (loggedInUser) {
      try {
        this.senderId = JSON.parse(loggedInUser)._id;
      } catch (e) {
        console.error('Error parsing loggedInUser from sessionStorage', e);
      }
    }
    console.log(this.senderId, ' ', this.receiverId, ' ', this.content);

    this._http
      .get(
        `${environment.apiUrl}/chat/getAllMessages/${this.senderId}/${this.receiverId}`
      )
      .subscribe(
        (data) => {
          this.messages = data;
        },
        (error) => {
          console.error(error);
        }
      );

    this._http
      .get(`${environment.apiUrl}/chat/getChatUsers/${this.senderId}`)
      .subscribe(
        (data) => {
          this.chattedUsers = data;
        },
        (error) => {
          console.error(error);
        }
      );

    if (this.senderId && this.receiverId) {
      this.socketService.joinRoom(this.receiverId);
      this.socketService.onNewMessage((message: any) => {
        this.messages.push(message);
        this.scrollToBottom();
      });
    }

    
  }

  ngOnDestroy(): void {
    this.socketService.disconnect();
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop =
        this.chatContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Scroll to bottom error', err);
    }
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

    const message = {
      sender: this.senderId,
      receiver: this.receiverId,
      content: this.content,
    };

    this.socketService.sendMessage(message);

    this._http.post(`${environment.apiUrl}/chat/send`, message).subscribe(
      (data) => {
        console.log('Message sent successfully', data);
      },
      (error) => {
        console.error('Error sending message', error);
      }
    );
  }

  randomID(len: number): string {
    let result = '';
    const chars =
      '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP';
    const maxPos = chars.length;
    for (let i = 0; i < len; i++) {
      result += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return result;
  }

  connectToVideoCall(): void {
    this.roomId = this.randomID(8);

    if (!this.senderId || !this.receiverId) {
      console.error('Sender ID or Receiver ID is undefined');
      return;
    }

   

    this._router.navigate(['/videocall', this.roomId]);
  }
}
