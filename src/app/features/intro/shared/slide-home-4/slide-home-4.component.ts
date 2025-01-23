import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicStorageService } from 'src/app/core/services/ionic-storage.service';

@Component({
  selector: 'app-slide-home-4',
  templateUrl: './slide-home-4.component.html',
  styleUrls: ['./slide-home-4.component.scss'],
  standalone: false
})
export class SlideHome4Component  implements OnInit {

  constructor(
    private _ionicStorageService: IonicStorageService,
    private _router: Router
  ) { }

  ngOnInit() {}

  goRegister(){
    this._ionicStorageService.set('watchedIntro', true)
    this._router.navigateByUrl('auth/register')
  }

  goLogin(){
    this._ionicStorageService.set('watchedIntro', true)
    this._router.navigateByUrl('auth/login')
  }

}
