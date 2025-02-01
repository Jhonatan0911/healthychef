import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ErrorService } from 'src/app/core/services/error.service';
import { UserResponse } from 'src/app/features/auth/shared/models/User';
import { UserService } from 'src/app/features/auth/shared/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
  standalone: false
})
export class EditUserComponent  implements OnInit {

  isEditSuccess: boolean = false;

  user!: UserResponse;


  form = new FormGroup({
    name: new FormControl<string | null>(null, [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/), Validators.maxLength(50)]),
    lastname: new FormControl<string | null>(null, [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/), Validators.maxLength(50)]),
    email: new FormControl<string | null>(null, [Validators.required, Validators.email])
  });

  constructor(
    private modalCtrl: ModalController,
    private _errorService: ErrorService,
    private _userService: UserService,
  ) {
  }

  ngOnInit() {
    this.getUserLoggedIn();
  }

  async getUserLoggedIn(){
    let user_id: number | null = null;

    user_id = await this._userService.getUserIdLoggin();

    this._userService.getUserById(user_id!).then((data: UserResponse) => {

      this.user = data;

      this.form.controls['name'].setValue(this.user.name);
      this.form.controls['lastname'].setValue(this.user.last_name);
      this.form.controls['email'].setValue(this.user.email);

    }).catch((error) => {
      console.log(error);
    });
  }


  async updateUser(){
    if(this.form.valid){
      let user_id: number | null = null;

      user_id = await this._userService.getUserIdLoggin();

      let formValue = this.form.getRawValue();

      let userRequest: UserResponse = {
        id: this.user.id,
        email: formValue.email!,
        name: formValue.name!,
        last_name: formValue.lastname!,
        image: this.user.image,
        username: this.user.username,
        followees: this.user.followees,
        followers: this.user.followers
      }

      this._userService.updateById(user_id!,userRequest).then((data) => {
        this.isEditSuccess = true;
        this.modalCtrl.dismiss(null,'confirm');
      }).catch((error) => {
        console.log(error);
      });
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
