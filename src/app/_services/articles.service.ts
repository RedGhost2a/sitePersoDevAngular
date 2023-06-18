import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Contact} from "../_models/contact";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Articles} from "../_models/articles";

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  private apiUrl=`${environment.API_URL}/articles`


  constructor(private http: HttpClient) { }


  getArticle(): Observable<Articles[]> {
    return this.http.get<Articles[]>(`${this.apiUrl}/`);
  }

  deleteArticle(id:number): Observable<Articles[]> {
    return this.http.delete<Articles[]>(`${this.apiUrl}/:${id}`);
  }

  getArticleById(id:number): Observable<Articles[]> {
    return this.http.get<Articles[]>(`${this.apiUrl}/:${id}`);
  }

  newArticle(data:Contact): Observable<Articles[]> {
    return this.http.post<Articles[]>(`${this.apiUrl}/`,data);
  }
}
