import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { IonicStorageService } from '../services/ionic-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AccesoGuard implements CanActivate {

  constructor(
    public _ionicStorageService: IonicStorageService,
    public _router: Router,
  ) { }

  async canActivate(){
    const acceso = await this._ionicStorageService.get('user');

    if (acceso) {
      return true;
    } else {
      alert('Pagina protegida. Inicia sesión')
      this._router.navigateByUrl('auth/login');
      return false;
    }
  }

}
