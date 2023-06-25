import {Injectable} from '@angular/core';
import {io} from 'socket.io-client';
import {Observable} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket;
  private apiUrl = `${environment.API_URL}`

  constructor(private http:HttpClient) {
    this.socket = io('http://localhost:5000');  // remplacez 'http://localhost:3000' par l'URL de votre serveur
  }

  // Méthode pour envoyer un message
  sendMessage(message: { recipient: any; message: any; sender: any }) {
    this.socket.emit('new-message', message);
  }

  // Méthode pour écouter les nouveaux messages
  getMessages() {
    return new Observable(observer => {
      this.socket.on('new-message', (message: any) => {
        observer.next(message);
      });
    });
  }


  // Méthode pour récupérer les messages entre utilisateurs depuis le serveur
  getMessagesBetweenUsers(userId1: string, userId2: string) {
    return this.http.get<any[]>(`${this.apiUrl}/messages/${userId1}/${userId2}`);
  }
}
