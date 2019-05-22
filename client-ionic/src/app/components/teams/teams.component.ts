import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, AlertController, IonContent } from '@ionic/angular';
import * as api from '../../services';
import { EditModalTeamsComponent } from '../modal/edit-modal-teams/edit-modal-teams.component';
import { AddModalTeamsComponent } from '../modal/add-modal-teams/add-modal-teams.component';
import { RegisterComponent } from '../register/register.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  searchTerm: string = '';
  users = [];
  showBar: boolean = true;
  loaded: boolean = false;
  filteredData: any[] = [];

  @ViewChild(IonContent) content: IonContent;

  constructor(
    private userService: api.UsersService,
    private modalCtrl: ModalController,
    private alertController: AlertController,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.userService.getUsers().subscribe(response => {
      this.showBar = false;
      this.loaded = true;
      this.users = response;
      this.users.forEach(user => {
        user.fullName = user.name + ' ' + user.lastname;
      });
      console.log('USERS:');
      
      console.log(this.users);
      this.filteredData = this.users;
    });
  }

  ScrollToTop() {
    this.content.scrollToTop(1500);
  }
  ScrollToBottom() {
    this.content.scrollToBottom(1500);
  }

  onSearchChange(event) {
    this.searchTerm = event.value;
    this.setFilteredLocation();
  }

  setFilteredLocation() {
    this.filteredData = this.users.filter((user) => {
      return user.fullName.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
    });
  }

  async openEditModal(user) {
    const modal = await this.modalCtrl.create({
      component: EditModalTeamsComponent,
      componentProps: user,
      cssClass: 'auto-height'
    });

    modal.onDidDismiss()
      .then((data) => {
        if (data.data) {
          this.users[this.users.indexOf(user)] = data.data;
          this.setFilteredLocation();
        }
      });

    return await modal.present();
  }

  async openAddModal() {
    const modal = await this.modalCtrl.create({
      component: AddModalTeamsComponent,
      cssClass: 'auto-height'
    });

    modal.onDidDismiss()
      .then((data) => {
        if (data.data) {
          const newUser = data.data;
          newUser.fullName = newUser.name + ' ' + newUser.lastname;
          this.users.push(newUser);
          this.setFilteredLocation();
        }
      });

    return await modal.present();
  }

  async delete(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    const alert = await this.alertController.create({

      header: 'Delete team',
      // subHeader: 'Delete team?',
      message: 'Are you sure?',
      buttons: [
        {
          text: 'Yes',
          role: 'yes',
          handler: () => {
            console.log('Yes');
          }
        }, {
          text: 'No',
          role: 'no',
          handler: () => {
            console.log('No');
          }
        }
      ]

    });

    await alert.present();
  }

}
