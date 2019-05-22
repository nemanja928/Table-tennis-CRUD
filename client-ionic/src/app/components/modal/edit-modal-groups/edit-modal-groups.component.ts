import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { GroupsService } from '../../../services/groups.service';

@Component({
  selector: 'app-edit-modal-groups',
  templateUrl: './edit-modal-groups.component.html',
  styleUrls: ['./edit-modal-groups.component.scss'],
})
export class EditModalGroupsComponent implements OnInit {
  group: any;

  working = false;

  constructor(public modalCtrl: ModalController,
    private navParams: NavParams,
    private groupService: GroupsService
  ) { }

  ngOnInit() {
    this.group = this.navParams.data;
    console.log(this.group);
  }

  closeModal() {
    this.modalCtrl.dismiss(false);
  }
  saveData() {
    this.working = true;
    this.groupService.updateGroup(this.group._id, this.group).subscribe(response => {
      console.log(response);
      this.working = false;
      if (response && response.success) {
        this.modalCtrl.dismiss(response.group);
      }
    });
  }
}