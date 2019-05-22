import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { GamesService } from '../../../services/games.service';

@Component({
  selector: 'app-edit-modal-games',
  templateUrl: './edit-modal-games.component.html',
  styleUrls: ['./edit-modal-games.component.scss'],
})
export class EditModalGamesComponent implements OnInit {

  game: any = {};

  working = false;

  constructor(
    public modalCtrl: ModalController,
    private navParams: NavParams,
    private gameService: GamesService
  ) { }

  ngOnInit() {
    this.game = this.navParams.data;
    console.log(this.navParams.data);
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
  saveData() {
    console.log(this.game);
    this.game.scoreString = this.game.score[0].teamPoints + ' - ' + this.game.score[1].teamPoints;
    this.working = true;
    this.gameService.updateGame(this.game._id, this.game).subscribe(response => {
      console.log('Response recieved');
      console.log(response);
      this.working = false;
      if (response && response.success) {
        this.modalCtrl.dismiss(this.game);
      }
    });
  }

}
