import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket;

  constructor() {
    this.socket = io('http://localhost:5000');  // remplacez 'http://localhost:3000' par l'URL de votre serveur
  }

  // Méthode pour envoyer un message
  sendMessage(message: { text: string }) {
    this.socket.emit('new-message', message);
  }

  // Méthode pour écouter les nouveaux messages
  getMessages() {
    let observable = new Observable(observer => {
      this.socket.on('new-message', (message: any) => {
        observer.next(message);
      });
    });
    return observable;
  }
}
