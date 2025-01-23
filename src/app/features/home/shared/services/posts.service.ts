import { Injectable } from '@angular/core';
import { APIs } from 'src/app/core/constant/apis';
import { ApiService } from 'src/app/core/services/api.service';
import { PostRequest, PostResponse } from '../models/Posts';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
    private _apiService: ApiService
  ) { }

  getAll(){
    return new Promise((accept, reject) => {

      this._apiService.get<PostResponse[]>(APIs.posts.getAll).subscribe((data) => {
        if(data.length > 0){
          accept(data);
        }else{
          reject(data);
        }
      });

    });
  }

  create(data: PostRequest){
    return new Promise((accept, reject) => {

      this._apiService.post<PostRequest,PostResponse>(APIs.posts.create,data).subscribe((data) => {
        if(data){
          accept(data);
        }else{
          reject(data);
        }
      });

    });
  }
}
