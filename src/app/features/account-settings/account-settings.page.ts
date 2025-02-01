import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { IonicStorageService } from 'src/app/core/services/ionic-storage.service';
import { UserService } from '../auth/shared/services/user.service';
import { ThemeToggleService } from 'src/app/core/utils/theme-toggle.service';
import { UserResponse } from '../auth/shared/models/User';

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

  user: UserResponse | null = null;

  constructor(
    private themeToggleService: ThemeToggleService,
    private _ionicStorageService: IonicStorageService,
    private _navController: NavController,
    private _userService: UserService,
  ) { }

  ngOnInit() {
    this.getUserLoggedIn();
  }

  async getUserLoggedIn(){

    let user_id: number | null = null;

    user_id = await this._userService.getUserIdLoggin();

    this._userService.getUserById(user_id!).then((data: UserResponse) => {
      this.user = data;
    }).catch((error) => {
      console.log(error);
    });
  }

  public toggleTheme(): void {
    this.themeToggleService.toggleTheme();
  }

  async logout(){
    await this._ionicStorageService.remove('user');
    this._navController.navigateForward('/auth/login')
  }

  goToPerfil(){
    this._navController.navigateForward('/app/profile')
  }

}
