import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient,
    private shared: SharedService
  ) { }

  private API_USER_URL = this.shared.API_ROOT + 'users/';

  getUsers(): Observable<any> {
    return this.http.get<any>(this.API_USER_URL, { headers: this.shared.getHeaders() })
      .pipe(
        catchError(this.shared.handleError<any>('getUsers', { team: [] }))
      );
  }

  createUsers(user: object): Observable<any> {
    return this.http.post<any>(this.API_USER_URL, user, { headers: this.shared.getHeaders() })
      .pipe(
        catchError(this.shared.handleError<any>('createUsers'))
      );

  }
  getUserById(id: string): Observable<any> {
    return this.http.get<any>(this.API_USER_URL + id, { headers: this.shared.getHeaders() })
      .pipe(
        catchError(this.shared.handleError<any>('getUserById'))
      );
  }
  getUserByRole(role: string): Observable<any> {
    return this.http.get<any>(this.API_USER_URL + 'byRole/' + role, { headers: this.shared.getHeaders() })
      .pipe(
        catchError(this.shared.handleError<any>('getUserByRole'))
      );
  }
  updateUser(id: string, user: object): Observable<any> {
    return this.http.put<any>(this.API_USER_URL + id, user, { headers: this.shared.getHeaders() })
      .pipe(
        catchError(this.shared.handleError<any>('updateUser'))
      );
  }
}
