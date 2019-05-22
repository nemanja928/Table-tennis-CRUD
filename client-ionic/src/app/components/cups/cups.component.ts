import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import * as api from '../../services';
import { EditModalCupsComponent } from '../modal/edit-modal-cups/edit-modal-cups.component';
import { AddModalCupsComponent } from '../modal/add-modal-cups/add-modal-cups.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cups',
  templateUrl: './cups.component.html',
  styleUrls: ['./cups.component.css']
})
export class CupsComponent implements OnInit {
  searchTerm: string = '';
  cups: any[] = [];
  showBar: boolean = true;
  loaded: boolean = false;
  filteredData: any[] = [];


  constructor(
    private cupsService: api.CupsService,
    private modalCtrl: ModalController,
    private alertController: AlertController,
    private authService: AuthService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    console.log('Geting cups');
    this.cupsService.getCups().subscribe(response => {

      console.log(response);
      if (response) {
        this.cups = response.cup;
        this.filteredData = this.cups;
      }/* else {
        alert("ERROR!");
      }*/

      this.showBar = false;
      this.loaded = true;

    });
  }

  onSearchChange(event) {
    this.searchTerm = event.value;
    this.setFilteredLocation();
  }

  setFilteredLocation() {
    this.filteredData = this.cups.filter((cup) => {
      return cup.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
    });
  }

  async openEditModal(event: Event, cup) {

    event.stopPropagation();
    event.preventDefault();

    const modal = await this.modalCtrl.create({
      component: EditModalCupsComponent,
      componentProps: cup,
      cssClass: 'auto-height'
    });

    modal.onDidDismiss()
      .then((data) => {
        if (data.data) {
          this.cups[this.cups.indexOf(cup)] = data.data;
          this.setFilteredLocation();
        }
      });


    return await modal.present();

  }

  async openAddModal() {
    const modal = await this.modalCtrl.create({
      component: AddModalCupsComponent,
      componentProps: {
        cups: { ...this.cups }
      },
      cssClass: 'auto-height'
    });

    modal.onDidDismiss()
      .then((data) => {
        console.log(data);

        if (data.data) {
          const cup = data.data;
          this.cups.push(cup);
          this.setFilteredLocation();
        }
      });

    return await modal.present();
  }

  async delete(event: Event, cup: any) {
    event.preventDefault();
    event.stopPropagation();

    const alert = await this.alertController.create({

      header: 'Delete cup?',
      // subHeader: 'Delete cup?',
      message: 'Are you sure?',
      buttons: [
        {
          text: 'Yes',
          role: 'yes',
          handler: () => {
            this.showBar = true;
            this.cupsService.deleteCup(cup._id).subscribe(response => {
              console.log(response);
              this.showBar = false;
              if (response.success) {
                this.cups = this.cups.filter(elem => elem !== cup);
                this.setFilteredLocation();
              }
            });
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
