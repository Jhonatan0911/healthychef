import { Injectable } from '@angular/core';
import { AlertButton, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private alertController: AlertController) {}

  async showAlert(header:string,subHeader?: string,message?: string,buttons?:string[]) {
    const alert = await this.alertController.create({
      header: header || undefined,
      subHeader: subHeader || undefined,
      message: message || undefined,
      buttons: buttons || undefined,
    });

    await alert.present();
  }
}
