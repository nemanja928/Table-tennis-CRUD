import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { NotificationService } from './notification.service';

@Injectable({
    providedIn: 'root'
})
export class SharedService {

    public API_ROOT = 'http://tte-server.herokuapp.com/API/';
    //public API_ROOT = 'http://localhost:3000/API/';
    //public API_ROOT = 'http://172.16.10.54:3000/API/';

    constructor(
        private notificationService: NotificationService
    ) { }

    handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            console.log('Error while executing operation: ' + operation);
            console.error(error);

            // check connectivity

            let baseErrorMessage: string = error.status + ' ' + error.statusText;
            let errorMessage = '';

            console.log(errorMessage);
            console.log(error);
            console.log(error.error);
            console.log(error.error.msg);
            if (error.msg) {
                errorMessage = errorMessage + error.msg; 
            } else if (error.error && error.error.msg && error.error.msg.errmsg) {
                console.log('1');
                
                errorMessage = errorMessage + error.error.msg.errmsg;
            } else if (error.error && error.error.msg && error.error.msg.error && error.error.msg.error.message) {
                console.log('2');
                
                errorMessage = errorMessage + error.error.msg.error.message;
            } else if (error.error && error.error.msg) {
                console.log('3');
                
                console.log(error.error.msg);
                errorMessage = errorMessage + error.error.msg;
                console.log(errorMessage);
            } else if (error.error && error.error.message) {
                errorMessage = errorMessage + error.error.message;
                console.log(errorMessage);
            }

            if (!errorMessage) {
                errorMessage = baseErrorMessage;
            }

            console.log('Show toast');

            this.notificationService.showToast({message: errorMessage, duration: 4000});

            console.log('Error handling done');

            return of(result as T);
        };
    }

    getHeaders(): any {
        if (localStorage.getItem('token')) {
            return new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            });
        } else {
            return {};
        }
    }

}
