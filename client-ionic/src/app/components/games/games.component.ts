import { Component, OnInit, ViewChild } from '@angular/core';
import { GamesService } from '../../services';
import { EditModalTeamsComponent } from '../modal/edit-modal-teams/edit-modal-teams.component';
import { ModalController, AlertController, IonContent } from '@ionic/angular';
import { EditModalGamesComponent } from '../modal/edit-modal-games/edit-modal-games.component';
import { AddModalGamesComponent } from '../modal/add-modal-games/add-modal-games.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  searchTerm: string = '';
  games: any[] = [];
  showBar: boolean = true;
  loaded: boolean = false;
  filteredData: any[] = [];

  @ViewChild(IonContent) content: IonContent;

  constructor(
    private gamesService: GamesService,
    private modalCtrl: ModalController,
    private alertController: AlertController,
    private authService: AuthService
  ) { }


  ngOnInit() {
  }

  ionViewWillEnter() {
    this.gamesService.getGames().subscribe(response => {
      this.games = response.game;
      this.games.forEach(game => {
        game.scoreString = game.score[0].teamPoints + ' - ' + game.score[1].teamPoints;
      });
      this.showBar = false;
      this.loaded = true;
      console.log(this.games)
      this.filteredData = this.games;
    });
  }
  ScrollToTop() {
    this.content.scrollToTop(1500);
  }
  ScrollToBottom() {
    this.content.scrollToBottom(1500);
  }
  // logScrollStart(){
  //   console.log("logScrollStart : When Scroll Starts");
  // }

  // logScrolling(){
  //   console.log("logScrolling : When Scrolling");
  // }

  // logScrollEnd(){
  //   console.log("logScrollEnd : When Scroll Ends");
  // }

  onSearchChange(event) {
    this.searchTerm = event.value;
    this.setFilteredLocation();
  }

  setFilteredLocation() {
    this.filteredData = this.games.filter((game) => {
      return game.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
    });
  }

  async openEditModal(game) {
    const modal = await this.modalCtrl.create({
      component: EditModalGamesComponent,
      componentProps: game,
      cssClass: 'auto-height'
    });

    modal.onDidDismiss()
      .then((data) => {
        if (data.data) {
          this.games[this.games.indexOf(game)] = data.data;
          this.setFilteredLocation();
        }
      });

    return await modal.present();
  }

  async openAddModal() {
    const modal = await this.modalCtrl.create({
      component: AddModalGamesComponent,
      cssClass: 'auto-height'
    });

    modal.onDidDismiss()
      .then((data) => {
        if (data.data) {
          console.log("Received game:");
          console.log(data.data);

          const newGame = data.data;
          newGame.scoreString = '0 - 0';
          this.games.push(newGame);
          this.setFilteredLocation();
        }
      });

    return await modal.present();
  }

  async delete(event: Event, game) {
    event.preventDefault();
    event.stopPropagation();

    const alert = await this.alertController.create({

      header: 'Delete game?',
      // subHeader: 'Delete game?',
      message: 'Are you sure?',
      buttons: [
        {
          text: 'Yes',
          role: 'yes',
          handler: () => {
            this.showBar = true;
            this.gamesService.deleteGame(game._id).subscribe(response => {
              console.log(response);
              this.showBar = false;
              if (response.success) {
                this.games = this.games.filter(elem => elem !== game);
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
