import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/Login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  login(data: LoginRequest){
    return new Promise((accept, reject) => {
      if(data.email == "jpina@gmail.com" && data.password == "010203Jp*"){
        accept(true);
      }else{
        reject(false);
      }
    });
  }
}
