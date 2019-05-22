import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { RolesService } from 'src/app/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  showBar: boolean = false;
  user: any = {
    username: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router, private notificationService: NotificationService,
    private roleService: RolesService) { }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/cups']);
    }
  }

  login() {
    this.showBar = true;
    this.authService.loginUser(this.user.username, this.user.password).subscribe(response => {
      this.showBar = false;
      console.log(response);
      if (response.success) {
        const role = response.msg.role;
        localStorage.setItem('admin', '');
        role.forEach(r => {
          if (r.name === 'admin') {
            localStorage.setItem('admin', 'true')
          }
        });
        localStorage.setItem('token', response.msg.token.replace('JWT ', ''));
        localStorage.setItem('userID', response.msg._id);
        localStorage.setItem('username', this.user.username);
        /*this.roleService.getRole().subscribe(res => {
          console.log('roles');
          console.log(res);
          this.roleService.setRoles(res.findRole);
        })*/
        this.router.navigate(['/cups']);
        this.notificationService.showToast({message: `Welcome ${this.user.username}!`});
      }
    });
  }
}
