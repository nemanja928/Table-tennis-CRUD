import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GamesService } from '../../services';
import { EditModalGamesComponent } from '../modal/edit-modal-games/edit-modal-games.component';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent implements OnInit {

  game: any = [];
  showBar: boolean = true;
  loaded = false;

  constructor(
    private route: ActivatedRoute,
    private gamesService: GamesService,
    private modalCtrl: ModalController,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    const id = this.route.snapshot.paramMap.get('id');
    this.gamesService.getGameById(id).subscribe(response => {
      this.game = response.game;
      this.loaded = true;
      this.showBar = false;
      console.log(this.game);
    });
  }

  async openGameEditModal() {
    const modal = await this.modalCtrl.create({
      component: EditModalGamesComponent,
      componentProps: this.game,
      cssClass: 'auto-height'
    });

    modal.onDidDismiss()
      .then((data) => {
        if (data.data) {
          this.game = data.data;
        }
      });

    return await modal.present();
  }

}
