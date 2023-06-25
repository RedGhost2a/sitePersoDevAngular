import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Récupération du token JWT du localStorage
    let storedUser = localStorage.getItem('currentUser');
    let currentUser = storedUser ? JSON.parse(storedUser) : null;
    console.log(storedUser)

    if (currentUser && currentUser.token) {
      // Clonage de la requête et ajout de l'en-tête d'autorisation avec le token JWT
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`
        }
      });
    }

    return next.handle(request);
  }
}
