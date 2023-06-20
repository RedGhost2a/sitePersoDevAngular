import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChatService } from '../_services/chat.service';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent implements OnInit {
  messageForm!: FormGroup;
  messages: string[] = [];

  constructor(private formBuilder: FormBuilder, private chatService: ChatService) { }

  ngOnInit() {
    this.messageForm = this.formBuilder.group({
      sender: ['', Validators.required],
      recipient: ['', Validators.required],
      message: ['', Validators.required]
    });

    // Souscrire aux messages en direct
    this.chatService.getMessages().subscribe((message: any) => {
      this.messages.push(JSON.stringify(message)); // Convertir l'objet en une chaîne JSON
    });

  }

  sendMessage() {
    if (this.messageForm.invalid) {
      return;
    }

    const message = this.messageForm.getRawValue();
    console.log(message)
    this.chatService.sendMessage(message);
    this.messageForm.reset();
  }
}
