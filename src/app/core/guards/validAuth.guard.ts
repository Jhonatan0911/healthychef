import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { IonicStorageService } from '../services/ionic-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ValidAuthGuard implements CanActivate {

  constructor(
    public _ionicStorageService: IonicStorageService,
    public _router: Router,
  ) { }

  async canActivate(){
    const isLogged = await this._ionicStorageService.get('user_id');

    if (isLogged) {
      this._router.navigateByUrl('home');
      return false;
    } else {
      return true;
    }
  }

}
