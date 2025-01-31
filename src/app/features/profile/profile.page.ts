import { Component, OnInit } from '@angular/core';
import { UserService } from '../auth/shared/services/user.service';
import { UserResponse } from '../auth/shared/models/User';
import { PhotoService } from 'src/app/core/services/photo.service';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false
})
export class ProfilePage implements OnInit {

  user: UserResponse | null = null;

  isEditsuccess: boolean = false;

  public alertInputs = [
    {
      label: 'Tomar foto',
      type: 'radio',
      value: 'take',
      handler: () => {
        this.takePhoto('camera');
        this.dismissAlert();
      }
    },
    {
      label: 'Seleccionar foto',
      type: 'radio',
      value: 'upload',
      handler: () => {
        this.takePhoto('gallery');
        this.dismissAlert();
      }
    }
  ];

  constructor(
    private _userService: UserService,
    private _photoService: PhotoService,
    private alertController: AlertController,
    private _navController: NavController
  ) { }

  ngOnInit() {
    this.getUserLoggedIn();
  }

  handleRefresh(event: CustomEvent) {
    setTimeout(() => {
      this.getUserLoggedIn();
      (event.target as HTMLIonRefresherElement).complete();
    }, 2000);
  }

  async takePhoto(type: 'gallery' | 'camera'){

    let photo = await this._photoService.takePhoto(type);

    if(photo.dataUrl){
      this.user!.image = photo.dataUrl;
      this.updateUser();
    }
  }

  async dismissAlert() {
    const alert = await this.alertController.getTop();
    if (alert) {
      await alert.dismiss();
    }
  }

  async getUserLoggedIn(){
    let user_id: number | null = null;

    user_id = await this._userService.getUserIdLoggin();

    this._userService.getUserById(user_id!).then((data) => {
      this.user = data as UserResponse;
    }).catch((error) => {
      console.log(error);
    });
  }

  async updateUser(){
    let user_id: number | null = null;

    user_id = await this._userService.getUserIdLoggin();

    this._userService.updateById(user_id!,this.user!).then((data) => {
      this.isEditsuccess = true;
    }).catch((error) => {
      console.log(error);
    });
  }

  volver(){
    this._navController.navigateForward('/account')
  }



}
