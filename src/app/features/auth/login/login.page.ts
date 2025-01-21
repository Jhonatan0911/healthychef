import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorService } from 'src/app/core/services/error.service';
import { IonicStorageService } from 'src/app/core/services/ionic-storage.service';
import { LoginService } from '../shared/services/login.service';
import { LoginRequest } from '../shared/models/Login';
import { NavController } from '@ionic/angular';
import { AlertService } from 'src/app/core/services/alert.service';

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
    private _ionicStorageService: IonicStorageService,
    private _errorService: ErrorService,
    private _loginService: LoginService,
    private _navController: NavController,
    private _alertService: AlertService
  ) { }

  ngOnInit() {}

  login(){
    if(this.form.valid){

      const formValue = this.form.getRawValue();

      let loginRequest: LoginRequest = {
        email: formValue.email!,
        password: formValue.password!
      }

      this._loginService.login(loginRequest).then(async res => {
        if(res){
          await this._ionicStorageService.set('user', this.form.value)
          this._navController.navigateForward('/home')
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
