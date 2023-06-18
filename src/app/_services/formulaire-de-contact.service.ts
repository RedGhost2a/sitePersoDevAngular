import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Contact} from "../_models/contact";

@Injectable({
  providedIn: 'root'
})
export class FormulaireDeContactService {
  private apiUrl=`${environment.API_URL}/contact`

  constructor(private http: HttpClient) { }

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.apiUrl}/messageList`);
  }

  deleteContacts(id:number): Observable<Contact[]> {
    return this.http.delete<Contact[]>(`${this.apiUrl}/:${id}`);
  }

  newContacts(data:Contact): Observable<Contact[]> {
    return this.http.post<Contact[]>(`${this.apiUrl}/`,data);
  }



}
