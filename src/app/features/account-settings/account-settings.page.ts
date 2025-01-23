import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { IonicStorageService } from 'src/app/core/services/ionic-storage.service';
import { UserService } from '../auth/shared/services/user.service';
import { LoginResponse } from '../auth/shared/models/Login';
import { ThemeToggleService } from 'src/app/core/utils/theme-toggle.service';

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

  user: LoginResponse | null = null;

  constructor(
    private themeToggleService: ThemeToggleService,
    private _ionicStorageService: IonicStorageService,
    private _navController: NavController,
    private _userService: UserService,
  ) { }

  ngOnInit() {
    this._userService.getUser().then(res => {
      this.user = res;
    });
  }

  public toggleTheme(): void {
    this.themeToggleService.toggleTheme();
  }

  async logout(){
    await this._ionicStorageService.remove('user');
    this._navController.navigateForward('/auth/login')
  }

}
