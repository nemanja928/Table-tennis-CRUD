import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SharedService } from './shared.service';
import { NotificationService } from './notification.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_AUTH_URL = this.shared.API_ROOT + 'auth/';

  constructor(
    private http: HttpClient,
    private router: Router,
    private shared: SharedService,
    private notificationService: NotificationService
  ) { }

  /*setToken(token: string): void {
    this.authToken = token;
    console.log('Set token: ' + this.authToken);
  }

  getToken(): string {
    return this.authToken;
  }*/

  registerUser(user: object): Observable<any> {
    return this.http.post<any>(this.API_AUTH_URL + 'register', user)
      .pipe(
        catchError(this.shared.handleError<any>('registerUser'))
      )
  }

  loginUser(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.API_AUTH_URL + 'login', { username: username, password: password })
      .pipe(
        catchError(this.shared.handleError<any>('loginUser'))
      );
  }

  logoutUser() {
    localStorage.removeItem('admin');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    this.notificationService.showToast({ message: `Goodbye!` });

  }

  isLoggedIn() {
    return localStorage.getItem('token');
  }

  isAdmin() {
    return localStorage.getItem('admin');
  }

  getCurrentUserID() {
    return localStorage.getItem('userID');
  }

  getCurrentUsername() {
    return localStorage.getItem('username');
  }

}
