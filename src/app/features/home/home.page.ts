import { Component, OnInit } from '@angular/core';
import { PostsService } from './shared/services/posts.service';
import { PostRequest, PostResponse } from './shared/models/Posts';
import { UserService } from '../auth/shared/services/user.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { ModalController } from '@ionic/angular';
import { CreatePostComponent } from './shared/components/create-post/create-post.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  standalone: false,
})
export class HomePage implements OnInit {

  posts: PostResponse[] = [];
  page: number = 1;
  limit: number = 10;
  hasMore: boolean = true;

  isLoadingPost: boolean = false;

  constructor(
    private _postsService: PostsService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit(){
    this.loadPost();
  }

  handleRefresh(event: CustomEvent) {
    this.posts = [];
    this.page = 1;
    setTimeout(() => {
      this.loadPost();
      (event.target as HTMLIonRefresherElement).complete();
    }, 2000);
  }

  loadPost(event?: any){
    this.isLoadingPost = true;
    this._postsService.getPostsPagination(this.page,this.limit).then((data: any) => {
      if(data.length > 0){
        this.posts = [...this.posts,...data];
        this.page++;
        this.isLoadingPost = false;
      }else{
        this.hasMore = false;
      }

      if(event){
        event.target.complete();
      }

    }).catch((error) => {
      this.posts = [];
      if(event){
        event.target.complete();
      }
      this.isLoadingPost = false;
    });
  }

  async openModalCreate(){
    const modal = await this.modalCtrl.create({
      component: CreatePostComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.page = 1;
      this.loadPost();
    }
  }
}
