import { Component, OnInit } from '@angular/core';
import * as api from '../../services';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../services';
import { EditModalGroupsComponent } from '../modal/edit-modal-groups/edit-modal-groups.component';
import { ModalController, AlertController } from '@ionic/angular';

import * as _ from 'lodash';
import { EditModalGamesComponent } from '../modal/edit-modal-games/edit-modal-games.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent implements OnInit {

  group: any = {};
  loaded = false;
  showBar: boolean = true;

  private teams: any[];
  private addTeamsSelect: any[] = [];

  constructor(
    private groupsService: api.GroupsService,
    private teamsService: UsersService,
    private route: ActivatedRoute,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {

    const id = this.route.snapshot.paramMap.get('id');
    this.groupsService.getGroupById(id).subscribe(response => {
      this.group = response.group;
      this.showBar = false;

      /* retrieving lost teams
      let teams = [];
      this.group.score.forEach(s => {
        if (!teams.includes(s.teams[0])) {
          teams.push(s.teams[0]);
        }
        if (!teams.includes(s.teams[1])) {
          teams.push(s.teams[1]);
        }
      })
      console.log(JSON.stringify(teams));
      console.log(teams);
      */

      console.log(this.group.teams);
      this.loaded = true;

      console.log(this.group.score);
      let i = 0;
      this.group.teams.forEach(team => {
        team.position = ++i;
        team.fullName = team.name + ' ' + team.lastname;
        this.addTeamsSelect.push(team);
      });

      this.group.score.forEach(game => {
        game.sortTeam1 = game.score[0].teamName;
        game.sortTeam2 = game.score[1].teamName;
        game.scoreString = game.score[0].teamPoints + ' - ' + game.score[1].teamPoints;
      });

    });

    this.teamsService.getUsers().subscribe(response => {
      this.teams = response;
      this.teams.forEach(team => {
        team.fullName = team.name + ' ' + team.lastname;
      })
      console.log(this.teams);
    });

  }

  changeTeams(group) {

    console.log(`changeTeams... `);
    this.showBar = true;
    const updatedGroup = { ...this.group };
    updatedGroup.teams = this.addTeamsSelect;
    this.groupsService.updateGroup(group._id, updatedGroup).subscribe(response => {
      // console.log(`response`);
      // console.log(response);
      this.showBar = false;
      if (response.success) {
        /*const newTeams = [];
        let i = 0;
        this.addTeamsSelect.forEach(id => {
          const newTeam = this.teams.find(team => {
            return team._id === id;
          })
          newTeam.position = ++i;
          newTeams.push(newTeam);
        });*/
        const teams = response.group.teams;
        const score = response.group.score;;
        let i = 0;
        teams.forEach(team => {
          team.position = ++i;
          team.fullName = team.name + ' ' + team.lastname;
        });
        score.forEach(game => {
          game.sortTeam1 = game.score[0].teamName;
          game.sortTeam2 = game.score[1].teamName;
          game.scoreString = game.score[0].teamPoints + ' - ' + game.score[1].teamPoints;
        });
        this.group.teams = teams;
        this.addTeamsSelect = [];
        this.group.teams.forEach(team => {
          this.addTeamsSelect.push(team);
        });
        this.group.score = score;
      }
    });

  }

  async openGroupEditModal() {
    const modal = await this.modalCtrl.create({
      component: EditModalGroupsComponent,
      componentProps: this.group,
      cssClass: 'auto-height'
    });

    modal.onDidDismiss()
      .then((data) => {
        if (data.data) {

          this.group = data.data;

          this.addTeamsSelect = [];
          let i = 0;
          this.group.teams.forEach(team => {
            team.position = ++i;
            team.fullName = team.name + ' ' + team.lastname;
            this.addTeamsSelect.push(team);
          });

          this.group.score.forEach(game => {
            game.sortTeam1 = game.score[0].teamName;
            game.sortTeam2 = game.score[1].teamName;
            game.scoreString = game.score[0].teamPoints + ' - ' + game.score[1].teamPoints;
          });
        }
      });

    return await modal.present();
  }

  async openGameEditModal(game) {
    const modal = await this.modalCtrl.create({
      component: EditModalGamesComponent,
      componentProps: game,
      cssClass: 'auto-height'
    });

    modal.onDidDismiss()
      .then((data) => {
        if (data.data) {
          this.group.score[this.group.score.indexOf(game)] = data.data;
        }
      });

    return await modal.present();

  }

  async deleteGroup() {
    const alert = await this.alertCtrl.create({

      header: 'Delete group',
      // subHeader: 'Delete group?',
      message: 'Are you sure?',
      buttons: [
        {
          text: 'Yes',
          role: 'yes',
          handler: () => {
            this.showBar = true;
            this.groupsService.deleteGroup(this.group._id).subscribe(response => {
              console.log(response);
              if (response.success) {
                this.showBar = false;
                this.router.navigate(['/groups']);
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
