import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UsersService } from '../../../services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-modal-teams',
  templateUrl: './add-modal-teams.component.html',
  styleUrls: ['./add-modal-teams.component.scss'],
})
export class AddModalTeamsComponent implements OnInit {

  team: any;

  constructor(
    public modalCtrl: ModalController,
    private userService: UsersService,
    private fb: FormBuilder,
    private _auth: AuthService
  ) { }

  myForm: FormGroup;
  errorMsg;

  working = false;

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

  addTeam() {

    if (this.myForm.valid) {

      console.log('this.myForm');
      console.log(this.myForm);

      this.working = true;

      this._auth.registerUser(this.myForm.value)
        .subscribe(
          response => {
            this.working = false;
            if (response && response.success) {
              this.modalCtrl.dismiss(response.user);
            }
          }
        );
    }

  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

}
