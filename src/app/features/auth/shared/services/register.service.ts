import { Injectable } from '@angular/core';
import { RegisterRequest } from '../models/Register';
import { IonicStorageService } from 'src/app/core/services/ionic-storage.service';
import { ApiService } from 'src/app/core/services/api.service';
import { BaseResponseUser } from 'src/app/core/models/base-response';
import { LoginResponse } from '../models/Login';
import { APIs } from 'src/app/core/constant/apis';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private _apiService: ApiService
  ) { }

  register(data: RegisterRequest){
    return new Promise((accept, reject) => {

      this._apiService.post<RegisterRequest,BaseResponseUser<LoginResponse>>(APIs.auth.register,data).subscribe((data) => {
        if(data.status && data.status == 'OK'){
          accept(data);
        }else{
          reject(data.errors);
        }
      });

    });
  }
}
