import { Component, OnInit } from '@angular/core';
import { Iidentity } from '../../interfaces/identity.interface';
import { ChatService } from '../../services/chat.service';

interface messenge {
  sender: string;
  content: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})
export class HomeComponent implements OnInit {
  public users: Iidentity[] = [];
  public message: string = '';
  public status: string = '';
  public identity: string = '';

  public messenge: messenge[] = [];
  constructor(private chatService: ChatService) {}
  ngOnInit() {
    this.chatService.receiveChat().subscribe((message) => {
      const newMessage: messenge = {
        sender: 'other',
        content: <any>message,
      };
      this.messenge.push(newMessage);
    });
    this.chatService.getUsers().subscribe((users) => {
      this.users = <any>users;
      console.log('this.users', users);
    });

    this.chatService.checkConnection().subscribe((message) => {
      this.identity = <any>message;
    });
  }
  // addChat() {
  //   console.log('add chat');

  //   this.messages.push('test');
  //   this.chatService.sendChat('test');
  //   this.message = '';
  // }

  callPhone(message: string, receiver: string): void {
    console.log('receiver', receiver);

    const newMessage: messenge = {
      sender: 'me',
      content: <any>message,
    };
    this.messenge.push(newMessage);
    this.chatService.sendChat(message, receiver);
    this.message = '';
  }
  sendIdentity(name: string): void {
    const identity: Iidentity = {
      id: this.identity,
      name: name,
    };
    this.chatService.sendIdentity(identity);
  }
}
