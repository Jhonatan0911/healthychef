import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorService } from 'src/app/core/services/error.service';
import { LoginService } from '../shared/services/login.service';
import { LoginRequest, LoginResponse } from '../shared/models/Login';
import { NavController } from '@ionic/angular';
import { AlertService } from 'src/app/core/services/alert.service';
import { UserService } from '../shared/services/user.service';
import { BaseResponseUser } from 'src/app/core/models/base-response';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage  implements OnInit {

  form = new FormGroup ({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  })

  constructor(
    private _errorService: ErrorService,
    private _loginService: LoginService,
    private _navController: NavController,
    private _alertService: AlertService,
    private _userService: UserService
  ) { }

  ngOnInit() {}

  login(){
    if(this.form.valid){

      const formValue = this.form.getRawValue();

      let loginRequest: LoginRequest = {
        user: {
          email: formValue.email!,
          password: formValue.password!
        }
      }

      this._loginService.login(loginRequest).then(async res => {
        if(res){
          let resMap = res as BaseResponseUser<LoginResponse>;
          this._userService.setUserIdLoggin(resMap.user!.id!);
          this._navController.navigateForward('/app/home')
        }
      }).catch(err =>{
        this._alertService.showAlert('Datos Invalidos','','Por favor revise su correo y contraseña')
      });
    }
  }

  validate(nameInput: string) {
    return this._errorService.validateInput(this.form, nameInput);
  }

  check(nameInput: string) {
    return this._errorService.checkInput(this.form, nameInput);
  }


}
