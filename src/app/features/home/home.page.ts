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

  isLoadingPost: boolean = false;

  constructor(
    private _postsService: PostsService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit(){
    this.getAllPosts();
  }

  handleRefresh(event: CustomEvent) {
    setTimeout(() => {
      this.getAllPosts();
      (event.target as HTMLIonRefresherElement).complete();
    }, 2000);
  }

  getAllPosts(){
    this.isLoadingPost = true;
    this._postsService.getAll().then((data) => {
      this.posts = data as PostResponse[];
      this.isLoadingPost = false;
    }).catch((error) => {
      this.posts = [];
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
      this.getAllPosts();
    }
  }
}
