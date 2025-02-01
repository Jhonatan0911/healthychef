import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertService } from 'src/app/core/services/alert.service';
import { UserFollowRequest, UserResponse } from 'src/app/features/auth/shared/models/User';
import { UserService } from 'src/app/features/auth/shared/services/user.service';
import { ImageModalComponent } from 'src/app/shared/components/image-modal/image-modal.component';

@Component({
  selector: 'app-card-user',
  templateUrl: './card-user.component.html',
  styleUrls: ['./card-user.component.scss'],
  standalone: false
})
export class CardUserComponent  implements OnInit {

  @Input() user!: UserResponse;

  userLogged!: UserResponse;

  constructor(
    private modalController: ModalController,
    private _userService: UserService,
    private _alertService: AlertService,
  ) {
    this.getUserLoggedIn();
  }

  ngOnInit() {
  }

  async getUserLoggedIn(){

    let user_id: number | null = null;

    user_id = await this._userService.getUserIdLoggin();

    this._userService.getUserById(user_id!).then((data: UserResponse) => {
      this.userLogged = data;
    }).catch((error) => {
      console.log(error);
    });
  }

  isFollowing(user_id: number): boolean {
    return this.userLogged!.followees.some((follow) => follow.id == user_id)
  }

  toggleFollow() {
    if (this.isFollowing(this.user.id)) {
      this.unfollow();
    } else {
      this.follow();
    }
  }

  follow(){
    this._userService.follow(this.userLogged.id, this.user.id).then(async res => {
      if(res){
        console.log(res)
        this.userLogged.followees.push({
          id: this.user.id,
          name: this.user.name,
          email: this.user.email
        })
        this.user.followers.push({
          id: this.userLogged.id,
          name: this.userLogged.name,
          email: this.userLogged.email
        })
      }
    }).catch(err =>{
      this._alertService.showAlert('Alerta','','Ha ocurrido un error por favor intente de nuevo')
    });
  }


  unfollow(){
    this._userService.unfollow(this.userLogged.id, this.user.id).then(async res => {
      if(res){
        console.log(res)
        this.userLogged.followees = this.userLogged.followees.filter((follow) => follow.id !== this.user.id);
        this.user.followers = this.user.followers.filter((follow) => follow.id !== this.userLogged.id);
      }
    }).catch(err =>{
      this._alertService.showAlert('Alerta','','Ha ocurrido un error por favor intente de nuevo')
    });
  }

  async openImageModal(imageUrl: string) {
    const modal = await this.modalController.create({
      component: ImageModalComponent,
      componentProps: { imageUrl },
      cssClass: 'image-modal',
    });
    return await modal.present();
  }

  setDefaultImage(event: any) {
    event.target.src = 'assets/images/upload-image.svg';
  }
}
