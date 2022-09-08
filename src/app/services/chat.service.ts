import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { HttpClient } from '@angular/common/http';
import { Iidentity } from '../interfaces/identity.interface';
@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private socket: Socket, private httpClient: HttpClient) {}

  checkConnection() {
    return this.socket.fromEvent('connected');
  }
  sendChat(message: string, receiver: string) {
    this.socket.emit('chat', { message, receiver });
  }
  receiveChat() {
    return this.socket.fromEvent('chat');
  }
  getUsers() {
    return this.socket.fromEvent('users');
  }
  sendIdentity(identity: Iidentity) {
    this.socket.emit('identity', identity);
  }
}
