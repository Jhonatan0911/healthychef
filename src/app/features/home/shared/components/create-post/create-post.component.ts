import { Component, OnInit } from '@angular/core';
import { ErrorService } from 'src/app/core/services/error.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/features/auth/shared/services/user.service';
import { PostRequest } from '../../models/Posts';
import { AlertService } from 'src/app/core/services/alert.service';
import { PostsService } from '../../services/posts.service';
import { AlertController, ModalController } from '@ionic/angular';
import { PhotoService } from 'src/app/core/services/photo.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
  standalone: false
})
export class CreatePostComponent  implements OnInit {

  isCreateSuccess: boolean = false;

  form = new FormGroup ({
    description: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(255)]),
    image: new FormControl('assets/images/upload-image.svg', [Validators.required]),
  })

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
    private _errorService: ErrorService,
    private _alertService: AlertService,
    private _postsService: PostsService,
    private modalCtrl: ModalController,
    private _photoService: PhotoService,
    private alertController: AlertController
  ) { }

  ngOnInit() {}

  async takePhoto(type: 'gallery' | 'camera'){

    let photo = await this._photoService.takePhoto(type);

    if(photo.dataUrl){
      this.form.controls['image'].setValue(photo.dataUrl);
    }
  }

  async dismissAlert() {
    const alert = await this.alertController.getTop();
    if (alert) {
      await alert.dismiss(null, 'cancel');
    }
  }

  async addPost() {
    if (this.form.valid && this.form.controls['image'].value !== 'assets/images/upload-image.svg') {

      const formValue = this.form.getRawValue();
      let user_id: number | null = null;

      user_id = await this._userService.getUserIdLoggin();

      if(user_id){
        const postRequest: PostRequest = {
          post: {
            description: formValue.description!,
            image: formValue.image!,
            user_id: user_id
          }
        };

        this._postsService.create(postRequest).then(async res => {
          if(res){
            this.isCreateSuccess = true;
            this.modalCtrl.dismiss(null,'confirm');
          }
        }).catch(err =>{
          this._alertService.showAlert('Alerta','','Ha ocurrido un error por favor intente de nuevo')
        });
      }else{
        this._alertService.showAlert('Alerta','','Ha ocurrido un error por favor intente de nuevo')
      }

    } else {
      this._alertService.showAlert('Alerta','','Por favor, completa todos los campos.')
    }
  }

  cancel() {
    return this.modalCtrl.dismiss(false);
  }

  validate(nameInput: string) {
    return this._errorService.validateInput(this.form, nameInput);
  }

  check(nameInput: string) {
    return this._errorService.checkInput(this.form, nameInput);
  }

}
