import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { IonicStorageService } from '../services/ionic-storage.service';

@Injectable({
  providedIn: 'root'
})
export class NotWatchedIntroGuard implements CanActivate {

  constructor(
    public _ionicStorageService: IonicStorageService,
    public _router: Router,
  ) { }

  async canActivate(){
    const isWatchedIntro = await this._ionicStorageService.get('watchedIntro');
    if (!isWatchedIntro) {
      this._router.navigateByUrl('intro');
      return false;
    } else {
      return true;
    }
  }

}
