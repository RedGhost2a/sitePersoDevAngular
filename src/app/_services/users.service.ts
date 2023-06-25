import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, BehaviorSubject, map} from 'rxjs';
import { Users } from '../_models/users';
import { environment } from "../../environments/environment";
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = `${environment.API_URL}/users`
  private currentUserSubject!: BehaviorSubject<Users >;
  public currentUser!: Observable<Users >;

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser){
    const userParse =JSON.parse(storedUser)
    this.currentUserSubject  = new BehaviorSubject<Users >( userParse);
    this.currentUser = this.currentUserSubject.asObservable();

    }
  }

  public get currentUserValue(): any | null {
    return this.currentUserSubject.value;
  }
  isLoggedIn(): boolean {
    const user = localStorage.getItem('currentUser');


    // Si aucun token n'est trouvé
    if (!user) {
      return false;
    }

    try {
      const userObject = JSON.parse(user);

      // Extraire le token de l'utilisateur
      const token = userObject.user.token;
      // Décoder le token
      const decoded: any = jwt_decode(token);

      // Obtenir la date courante
      const currentDate = new Date();

      // Si la date d'expiration du token est inférieure à la date courante, le token a expiré
      if (decoded.exp < currentDate.getTime() / 1000) {
        return false;
      } else {
        return true;
      }
    } catch (e) {
      return false;
    }
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password })
      .pipe(map(user => {
        console.log(user.user.token)
        if (user && user.user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return user;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null!);
  }

  getUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(this.apiUrl);
  }
  getAllUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(this.apiUrl);
  }

  getUser(id: string): Observable<Users> {
    return this.http.get<Users>(`${this.apiUrl}/${id}`);
  }

  createUser(user: Users): Observable<Users> {
    return this.http.post<Users>(`${this.apiUrl}/new`, user);
  }

  updateUser(id: number, user: Users): Observable<Users> {
    return this.http.put<Users>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<Users> {
    return this.http.delete<Users>(`${this.apiUrl}/${id}`);
  }
}
