import { Injectable } from '@angular/core';
import { RegisterRequest } from '../models/Register';
import { IonicStorageService } from 'src/app/core/services/ionic-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private _ionicStorageService: IonicStorageService
  ) { }

  async register(data: RegisterRequest){
    await this._ionicStorageService.set('userRegisterRequest', data)
  }
}
