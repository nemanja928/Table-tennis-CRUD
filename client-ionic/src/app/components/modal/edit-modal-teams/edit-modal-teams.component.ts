import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { UsersService, RolesService } from '../../../services';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-edit-modal-teams',
  templateUrl: './edit-modal-teams.component.html',
  styleUrls: ['./edit-modal-teams.component.scss'],
})
export class EditModalTeamsComponent implements OnInit {

  user: any = {
    active: true
  };

  roles = [];
  currentRoles: any[];

  newPassword = '';
  newPasswordRepeat = '';

  working = false;

  constructor(
    public modalCtrl: ModalController,
    private navParams: NavParams,
    private userService: UsersService,
    public authService: AuthService,
    private notificationService: NotificationService,
    private roleService: RolesService
  ) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.user = this.navParams.data;
    const roleIDs = []
    this.user.role.forEach(role => {
      roleIDs.push(role._id);
    });
    this.currentRoles = roleIDs;
    console.log('CURRENT ROLES');
    
    console.log(this.currentRoles);
    
    if (this.authService.isAdmin()) {
      this.roleService.getRole().subscribe(res => {
        console.log(res);
        
        if (res.findRole) {
          console.log('MODAL ROLES');
          this.roles = res.findRole;
          console.log(this.roles);
        }
      });
    }
    
    console.log(this.user);
  }

  closeModal() {
    this.modalCtrl.dismiss(false);
  }

  saveData() {
    console.log('Updating user');
    console.log(this.user);

    this.user.fullName = this.user.name + ' ' + this.user.lastname;

    this.working = true;

     /*if (this.newPassword) {
      if (this.newPassword !== this.newPasswordRepeat) {
        console.log("Not matching");
        this.working = false;
        this.notificationService.showToast({message: "The passwords don't match"});
        return;
      } else {
        this.user.password = this.newPassword;
      }
    }*/

    this.userService.updateUser(this.user._id, this.user).subscribe(response => { 
     console.log('Response received');
     console.log(response);
     this.working = false;
     if (response && response.success) {
      this.modalCtrl.dismiss(this.user);
      /*this.router.navigate(['/groups/'+response.group._id]);*/
    }
    });
  }

}
