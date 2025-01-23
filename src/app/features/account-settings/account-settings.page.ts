import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { IonicStorageService } from 'src/app/core/services/ionic-storage.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.page.html',
  styleUrls: ['./account-settings.page.scss'],
  standalone: false,
})
export class AccountSettingsPage implements OnInit {

  public alertButtons = [
    {
      text: 'Cancelar',
      role: 'cancel'
    },
    {
      text: 'Continuar',
      role: 'confirm',
      handler: () => {
        this.logout()
      },
    },
  ];

  constructor(
    private _ionicStorageService: IonicStorageService,
    private _navController: NavController,
  ) { }

  ngOnInit() {
  }

  async logout(){
    await this._ionicStorageService.remove('user');
    this._navController.navigateForward('/auth/login')
  }

}
