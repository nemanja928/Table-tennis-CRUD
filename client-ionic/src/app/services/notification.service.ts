import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private toastController: ToastController
  ) { }

  async showToast(options = {}) {
    console.log('showToast');

    const defaultOptions: any = {
      message: 'Default message',
      duration: 2000,
      position: 'bottom',
      cssClass: 'notificationToast',
      color: 'primary'
    };
    console.log(defaultOptions);

    const toast = await this.toastController.create(
      { ...defaultOptions, ...options }
    );
    console.log('Toast created');

    toast.present();

    console.log('Toast presented');


  }
}
