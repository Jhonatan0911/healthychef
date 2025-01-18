import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { IonicStorageService } from './core/services/ionic-storage.service';

register();
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(private _ionicStorageService: IonicStorageService) {}
}
