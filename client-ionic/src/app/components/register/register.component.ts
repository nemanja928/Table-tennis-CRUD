import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  showBar: boolean = false;
  myForm: FormGroup;
  errorMsg;

  constructor(
    private _auth: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private notificationService: NotificationService
  ) 
  { }

  ngOnInit() {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      DoB: ['', Validators.required],
      role: ['player', Validators.required],
      active: [true],
      additionalInfo: []



    })

  }

  register() {
    this.showBar = true;
    if (this.myForm.valid) {

      console.log('this.myForm');
      console.log(this.myForm);

      this._auth.registerUser(this.myForm.value)
        .subscribe(
          res => {
            this.showBar = false;
            if (res && res.success) {
              console.log(res);
              this.notificationService.showToast({message: `Registration successful!`})
              this.router.navigate(['/login']);
            }
          }
        );
    }

  }
}
