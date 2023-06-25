import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChatService } from '../_services/chat.service';
import {UsersService} from "../_services/users.service";
import {Users} from "../_models/users";

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnInit {
  messageForm!: FormGroup;
  messages: any[] = [];
  users:Users[]=[]
  userId!:any
  activeUser: any;
  recipient!:string;
  userById!: Users;



  constructor(private formBuilder: FormBuilder,
              private chatService: ChatService,
              private usersService:UsersService) {
    this.messageForm = this.formBuilder.group({
      message: ['', Validators.required]
    });


  }

  ngOnInit() {
    this.userId=this.usersService.currentUserValue.user._id
    this.chatService.getMessages().subscribe((message: any) => {
      this.messages.push(message);
    });
    this.usersService.getAllUsers().subscribe((users: Users[]) => {
      this.users = users;
      if (users.length > 0) {
        this.selectUser(users[0]._id);  // Set the first user as the active user
      }
    });

  }


  selectUser(user: any) {
    this.activeUser = user;
    this.chatService.getMessagesBetweenUsers(this.userId,user).subscribe((messages: any[]) => {
      this.recipient = user
      this.messages = messages;
      this.getUserById()
    });
  }
  getUserById():void
  {
    this.usersService.getUser(this.recipient).subscribe(data=>{
      this.userById = data
      console.log(this.userById)
    })
  }
  sendMessage() {
    if (this.messageForm.invalid) {
      return;
    }
    const messages = this.messageForm.getRawValue().message
    const message = {
      sender:this.userId,
      recipient: this.recipient,
      message: messages
    };
    this.chatService.sendMessage( message);
    this.messageForm.reset();
  }

}
