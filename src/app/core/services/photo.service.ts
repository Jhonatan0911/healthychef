import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';


@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor() { }

  public async takePhoto(type: 'gallery' | 'camera'): Promise<Photo> {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: type == 'camera' ? CameraSource.Camera : CameraSource.Photos,
      quality: 100
    });

    return capturedPhoto;
  }
}
