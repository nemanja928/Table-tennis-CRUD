import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { CupsService, GroupsService } from '../../../services';

@Component({
  selector: 'app-edit-modal-cups',
  templateUrl: './edit-modal-cups.component.html',
  styleUrls: ['./edit-modal-cups.component.scss'],
})
export class EditModalCupsComponent implements OnInit {

  cup: any;

  groups: any[];
  //private addGroupsSelect: any[] = [];

  working = false;

  constructor(
    public modalCtrl: ModalController,
    private navParams: NavParams,
    private cupsService: CupsService,
    private groupsService: GroupsService
  ) { }

  ngOnInit() {
    this.cup = this.navParams.data;
    console.log(this.cup);

    /*this.cup.groups.forEach(group => {
      this.addGroupsSelect.push(group._id);
    });
    console.log('addGroupSelect:');
    console.log(this.addGroupsSelect);*/

    this.groupsService.getGroup().subscribe(response => {
      this.groups = response.group;
      console.log(this.groups);
    });

  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  saveData() {
    console.log('UPDATING CUP');
    console.log(this.cup);
    //return;
    //this.cup.groups = this.addGroupsSelect;
    this.working = true;
    this.cupsService.updateCup(this.cup._id, this.cup).subscribe(response => {
      console.log('RESPONSE RECEIVED');
      console.log(response);
      this.working = false;
      if (response && response.success) {
        this.modalCtrl.dismiss(response.cup);
      }
    });
  }

}
