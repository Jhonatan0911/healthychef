import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class IonicStorageService {

  constructor(
    private _storage: Storage
  ) {
    this.create();
  }

  private async create(){
    this._storage.create();
  }

  public async set(propierty: string, value:any){
    this._storage.set(propierty,value);
  }

  public async get(propierty: string){
    return this._storage.get(propierty);
  }

  public async remove(propierty: string){
    return this._storage.remove(propierty);
  }
}
