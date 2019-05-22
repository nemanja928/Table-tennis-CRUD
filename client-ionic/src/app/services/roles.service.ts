import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  roles: any;

  private API_ROLES_URL = this.shared.API_ROOT + 'roles/';

  constructor(
    private http: HttpClient,
    private shared: SharedService
  ) { }

  retrieveRoles() {
    return this.roles;
  }

  setRoles(roles) {
    this.roles = roles;
  }

  getRole(): Observable<any> {

    return this.http.get<any>(this.API_ROLES_URL, { headers: this.shared.getHeaders() })
      .pipe(
        catchError(this.shared.handleError<any>('getRole'))
      );
  }

  createRole(role: object): Observable<any> {
    return this.http.post<any>(this.API_ROLES_URL, role, { headers: this.shared.getHeaders() })
      .pipe(
        catchError(this.shared.handleError<any>('createRole'))
      );

  }

  getRoleById(id: string): Observable<any> {
    return this.http.get<any>(this.API_ROLES_URL + id, { headers: this.shared.getHeaders() })
      .pipe(
        catchError(this.shared.handleError<any>('getRoleById'))
      );
  }

  updateRole(id: string, role: object): Observable<any> {
    return this.http.put<any>(this.API_ROLES_URL + id, role, { headers: this.shared.getHeaders() })
      .pipe(
        catchError(this.shared.handleError<any>('updateRole'))
      );
  }

}
