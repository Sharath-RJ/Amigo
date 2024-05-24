// src/app/services/socket.service.ts
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../../environment';


@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io("http://localhost:5000"); // Assuming your API URL is the same as your Socket.IO server
  }

  joinRoom(room: string): void {
    this.socket.emit('joinRoom', room);
  }

  sendMessage(message: any): void {
    this.socket.emit('sendMessage', message);
  }

  onNewMessage(callback: (message: any) => void): void {
    this.socket.on('newMessage', callback);
  }

  disconnect(): void {
    this.socket.disconnect();
  }
}
