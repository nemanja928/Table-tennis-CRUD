import { Observable, of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { NotificationService } from './notification.service';

export class ApiService {

    protected API_ROOT = 'http://localhost:3000/API/';

    constructor(
        private notificationService: NotificationService
    ) { }

    //protected authToken = '';//'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjpbeyJfaWQiOiI1YjNhN2I3NzIwM2JlMjI3YzRjNGQ1NGUiLCJuYW1lIjoiYWRtaW4iLCJkZXNjcmlwdGlvbiI6Im1vemUgc3ZlIiwiY3JlYXRlZEF0IjoiMjAxOC0wNy0wMlQxOToyMjozMS4xMTRaIiwidXBkYXRlZEF0IjoiMjAxOC0wNy0wMlQxOToyMjozMS4xMTRaIn0seyJfaWQiOiI1YjNhN2JlNzIwM2JlMjI3YzRjNGQ1NTAiLCJuYW1lIjoibWFuYWdlciIsImRlc2NyaXB0aW9uIjoibW96ZSBza29ybyBzdmUiLCJjcmVhdGVkQXQiOiIyMDE4LTA3LTAyVDE5OjI0OjIzLjM3M1oiLCJ1cGRhdGVkQXQiOiIyMDE4LTA3LTAyVDE5OjI0OjIzLjM3M1oifV0sImdhbWVzIjpbeyJzY29yZSI6IjAgLSAwIiwidGVhbXMiOlsiNWIzYTgzNjNkOTllZWIzZTY0NTcyNjVhIiwiNWIzYmFjYmE3ZGIxNDc0M2UwNmNlNTAzIl0sImFjdGl2ZSI6dHJ1ZSwiX2lkIjoiNWI0Y2U4NjRlZTllZGUzZWI4YjJlYzBjIiwibmFtZSI6Imdyb3VwR2FtZSIsImRlc2NyaXB0aW9uIjoiZ3JvdXBHYW1lIiwiY3JlYXRlZEJ5IjoiNWIzYTgzNjNkOTllZWIzZTY0NTcyNjVhIiwibW9kaWZpZWRCeSI6IjViM2E4MzYzZDk5ZWViM2U2NDU3MjY1YSIsImNyZWF0ZWRBdCI6IjIwMTgtMDctMTZUMTg6NDc6NTkuNjQ2WiJ9LHsic2NvcmUiOiIwIC0gMCIsInRlYW1zIjpbIjViM2E4MzYzZDk5ZWViM2U2NDU3MjY1YSIsIjViM2JhZDE5N2RiMTQ3NDNlMDZjZTUwNCJdLCJhY3RpdmUiOnRydWUsIl9pZCI6IjViNGNlODYzZWU5ZWRlM2ViOGIyZWMwOSIsIm5hbWUiOiJncm91cEdhbWUiLCJkZXNjcmlwdGlvbiI6Imdyb3VwR2FtZSIsImNyZWF0ZWRCeSI6IjViM2E4MzYzZDk5ZWViM2U2NDU3MjY1YSIsIm1vZGlmaWVkQnkiOiI1YjNhODM2M2Q5OWVlYjNlNjQ1NzI2NWEiLCJjcmVhdGVkQXQiOiIyMDE4LTA3LTE2VDE4OjQ3OjU5LjY0NloifSx7InNjb3JlIjoiMCAtIDAiLCJ0ZWFtcyI6WyI1YjNhODM2M2Q5OWVlYjNlNjQ1NzI2NWEiLCI1YjNiYWUxYTQzYmI2NjEyOTQ2NzdlNWMiXSwiYWN0aXZlIjp0cnVlLCJfaWQiOiI1YjRjZTg2MmVlOWVkZTNlYjhiMmVjMDYiLCJuYW1lIjoiZ3JvdXBHYW1lIiwiZGVzY3JpcHRpb24iOiJncm91cEdhbWUiLCJjcmVhdGVkQnkiOiI1YjNhODM2M2Q5OWVlYjNlNjQ1NzI2NWEiLCJtb2RpZmllZEJ5IjoiNWIzYTgzNjNkOTllZWIzZTY0NTcyNjVhIiwiY3JlYXRlZEF0IjoiMjAxOC0wNy0xNlQxODo0Nzo1OS42NDZaIn0seyJzY29yZSI6IjAgLSAwIiwidGVhbXMiOlsiNWIzYTgzNjNkOTllZWIzZTY0NTcyNjVhIiwiNWIzYmFlMmE0M2JiNjYxMjk0Njc3ZTVkIl0sImFjdGl2ZSI6dHJ1ZSwiX2lkIjoiNWI0Y2U4NjFlZTllZGUzZWI4YjJlYzAzIiwibmFtZSI6Imdyb3VwR2FtZSIsImRlc2NyaXB0aW9uIjoiZ3JvdXBHYW1lIiwiY3JlYXRlZEJ5IjoiNWIzYTgzNjNkOTllZWIzZTY0NTcyNjVhIiwibW9kaWZpZWRCeSI6IjViM2E4MzYzZDk5ZWViM2U2NDU3MjY1YSIsImNyZWF0ZWRBdCI6IjIwMTgtMDctMTZUMTg6NDc6NTkuNjQ2WiJ9LHsic2NvcmUiOiIyNCAtIDI2IiwidGVhbXMiOlsiNWIzYTgzNjNkOTllZWIzZTY0NTcyNjVhIiwiNWIzYmFlNGI0M2JiNjYxMjk0Njc3ZTVlIl0sImFjdGl2ZSI6dHJ1ZSwiX2lkIjoiNWI0Y2U4NWZlZTllZGUzZWI4YjJlYzAwIiwibmFtZSI6Im5pamUiLCJkZXNjcmlwdGlvbiI6Im5pamUgREVTQyIsImNyZWF0ZWRCeSI6IjViM2E4MzYzZDk5ZWViM2U2NDU3MjY1YSIsIm1vZGlmaWVkQnkiOiI1YjNhODM2M2Q5OWVlYjNlNjQ1NzI2NWEiLCJjcmVhdGVkQXQiOiIyMDE4LTA3LTE2VDE4OjQ3OjU5LjY0NloiLCJ1cGRhdGVkQXQiOiIyMDE4LTA3LTE4VDIwOjAyOjM5LjcxM1oiLCJ3aW5uZXIiOiI1YjNhODM2M2Q5OWVlYjNlNjQ1NzI2NWEifV0sIl9pZCI6IjViM2E4MzYzZDk5ZWViM2U2NDU3MjY1YSIsIm5hbWUiOiJkYW5pbG8iLCJsYXN0bmFtZSI6Im1vZ2luIiwidXNlcm5hbWUiOiJkYW5pbG8iLCJwYXNzd29yZCI6IiQyYSQxMCRKZ2I3TzVZc0pnSWd5TzRTeEk0SVNlcHhTR0hGS1o0bjUvdEVhS3JWdDQ3WmJITkpseGdqdSIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImFjdGl2ZSI6dHJ1ZSwiRG9CIjoiMTk4Ni85LzI0IiwiYWRkaXRpb25hbEluZm8iOiJkYW5pbG8iLCJjcmVhdGVkQXQiOiIyMDE4LTA3LTAyVDE5OjU2OjE5LjQyMVoiLCJ1cGRhdGVkQXQiOiIyMDE4LTA3LTE4VDIwOjAyOjM5LjkyMVoiLCJfX3YiOjAsIndpblJhdGlvIjoiMjAiLCJtb2RpZmllZEJ5Ijp7InJvbGUiOlsiNWIzYTdiNzcyMDNiZTIyN2M0YzRkNTRlIiwiNWIzYTdiZTcyMDNiZTIyN2M0YzRkNTUwIl0sImdhbWVzIjpbIjViNGNlODY0ZWU5ZWRlM2ViOGIyZWMwYyIsIjViNGNlODYzZWU5ZWRlM2ViOGIyZWMwOSIsIjViNGNlODYyZWU5ZWRlM2ViOGIyZWMwNiIsIjViNGNlODYxZWU5ZWRlM2ViOGIyZWMwMyIsIjViNGNlODVmZWU5ZWRlM2ViOGIyZWMwMCJdLCJfaWQiOiI1YjNhODM2M2Q5OWVlYjNlNjQ1NzI2NWEiLCJuYW1lIjoiZGFuaWxvIiwibGFzdG5hbWUiOiJtb2dpbiIsInVzZXJuYW1lIjoiZGFuaWxvIiwicGFzc3dvcmQiOiIkMmEkMTAkSmdiN081WXNKZ0lneU80U3hJNElTZXB4U0dIRktaNG41L3RFYUtyVnQ0N1piSE5KbHhnanUiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJhY3RpdmUiOnRydWUsIkRvQiI6IjE5ODYvOS8yNCIsImFkZGl0aW9uYWxJbmZvIjoiZGFuaWxvIiwiY3JlYXRlZEF0IjoiMjAxOC0wNy0wMlQxOTo1NjoxOS40MjFaIiwidXBkYXRlZEF0IjoiMjAxOC0wNy0xOFQyMDowMjozOS45MjFaIiwid2luUmF0aW8iOiIyMCIsIm1vZGlmaWVkQnkiOiI1YjNhODM2M2Q5OWVlYjNlNjQ1NzI2NWEifX0.BuKBi4_pwk6Qz-LaFCrI6cyQP44G5d2IxXlIpoigl2c';

    protected handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            console.log('Error while executing operation: ' + operation);
            console.error(error);

            // check connectivity

            let errorMessage: string = error.status + ' ' + error.statusText;

            console.log(errorMessage);
            console.log(error);
            console.log(error.error);
            console.log(error.error.msg);




            if (error.error && error.error.msg) {
                console.log(error.error.msg);

                errorMessage = errorMessage + ' - ' + error.error.msg;
                console.log(errorMessage);

            }

            console.log('Show toast');


            this.notificationService.showToast({ message: errorMessage });

            console.log('Error handling done');


            return of(result as T);
        };
    }

    protected getHeaders(): any {
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
