import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { IonicStorageService } from '../services/ionic-storage.service';

@Injectable({
  providedIn: 'root'
})
export class WatchedIntroGuard implements CanActivate {

  constructor(
    public _ionicStorageService: IonicStorageService,
    public _router: Router,
  ) { }

  async canActivate(){
    const isWatchedIntro = await this._ionicStorageService.get('watchedIntro');
    if (isWatchedIntro == true) {
      this._router.navigateByUrl('auth/login');
      return false;
    } else {
      return true;
    }
  }

}
