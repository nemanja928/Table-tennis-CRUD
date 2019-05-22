import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CupsService, GroupsService } from '../../../services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-modal-cups',
  templateUrl: './add-modal-cups.component.html',
  styleUrls: ['./add-modal-cups.component.scss'],
})
export class AddModalCupsComponent implements OnInit {

  cup: any = {
    name: '',
    description: '',
    groups: [],
    active: true
  };

  groups: any[] = [];

  loaded = false;

  working = false;

  constructor(
    public modalCtrl: ModalController,
    private cupsService: CupsService,
    private groupsService: GroupsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.groupsService.getGroup().subscribe(response => {
      this.groups = response.group;
      console.log(this.groups);
      console.log(this.cup);

      this.loaded = true;
    });
  }

  closeModal() {
    this.modalCtrl.dismiss(false);
  }

  addCup() {
    console.log("Adding cup");
    console.log(this.cup);
    this.working = true;
    this.cupsService.createCup(this.cup).subscribe(response => {
      console.log(response);
      this.working = false;
      if (response && response.success) {
        this.modalCtrl.dismiss(response.cup);
        //this.router.navigate(['/cups/' + response.cup._id]);
      }
    });
  }

}
