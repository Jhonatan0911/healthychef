import { Injectable } from '@angular/core';
import { LoginResponse } from '../models/Login';
import { IonicStorageService } from 'src/app/core/services/ionic-storage.service';
import { APIs } from 'src/app/core/constant/apis';
import { PostResponse } from 'src/app/features/home/shared/models/Posts';
import { ApiService } from 'src/app/core/services/api.service';
import { UserRequest, UserResponse } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private _ionicStorageService: IonicStorageService,
    private _apiService: ApiService
  ) { }


  async setUserIdLoggin(id: number){
    await this._ionicStorageService.set('user_id', id)
  }

  async getUserIdLoggin(): Promise<number | null>{
    return await this._ionicStorageService.get('user_id');
  }

  getUserById(id: number){
    return new Promise((accept, reject) => {

      this._apiService.get<UserResponse[]>(APIs.user.getById+id).subscribe((data) => {
        if(data){
          accept(data);
        }else{
          reject(data);
        }
      });

    });
  }

  updateById(id: number, data: UserResponse){
    return new Promise((accept, reject) => {

      this._apiService.post<UserRequest,boolean>(APIs.user.updateById+id,{user: data}).subscribe((data) => {
        if(data){
          accept(data);
        }else{
          reject(data);
        }
      });

    });
  }




}
