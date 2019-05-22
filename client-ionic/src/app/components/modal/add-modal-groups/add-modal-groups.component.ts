import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GroupsService, UsersService } from 'src/app/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-modal-groups',
  templateUrl: './add-modal-groups.component.html',
  styleUrls: ['./add-modal-groups.component.scss'],
})
export class AddModalGroupsComponent implements OnInit {

  group = {
    name: '',
    description: '',
    teams: [],
    active: true
  };

  teams: any[] = [];

  working = false;

  constructor(public modalCtrl: ModalController,
    private groupsService: GroupsService,
    private teamsService: UsersService,
    private router: Router
  ) { }

  ngOnInit() {
    this.teamsService.getUsers().subscribe(response => {
      const teams = response;
      teams.forEach(team => {
        team.fullName = team.name + ' ' + team.lastname;
      });
      this.teams = teams;
    });
  }

  closeModal() {
    this.modalCtrl.dismiss(false);
  }

  addGroup() {
    console.log("Adding group");
    console.log(this.group);

    this.working = true;

    this.group.teams = this.group.teams.map(team => team.username);

    this.groupsService.createGroup(this.group).subscribe(response => {
      this.working = false;
      if (response && response.success) {
        this.modalCtrl.dismiss(response.group);
        /*this.router.navigate(['/groups/'+response.group._id]);*/
      }
    });
  }

}
