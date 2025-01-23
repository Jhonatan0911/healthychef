import { Injectable } from '@angular/core';
import { LoginResponse } from '../models/Login';
import { IonicStorageService } from 'src/app/core/services/ionic-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private _ionicStorageService: IonicStorageService
  ) { }


  async setUser(resData: LoginResponse){
    await this._ionicStorageService.set('user', resData)
  }

  async getUser(): Promise<LoginResponse | null>{
    return await this._ionicStorageService.get('user');
  }




}
