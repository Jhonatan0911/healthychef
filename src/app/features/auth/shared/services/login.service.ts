import { Injectable } from '@angular/core';
import { LoginRequest, LoginResponse } from '../models/Login';
import { ApiService } from 'src/app/core/services/api.service';
import { APIs } from 'src/app/core/constant/apis';
import { BaseResponseUser } from 'src/app/core/models/base-response';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private _apiService: ApiService
  ) { }

  login(data: LoginRequest){
    return new Promise((accept, reject) => {

      this._apiService.post<LoginRequest,BaseResponseUser<LoginResponse>>(APIs.auth.login,data).subscribe((data) => {
        if(data.status && data.status == 'OK'){
          accept(data);
        }else{
          reject(data.errors);
        }
      });

    });
  }
}
