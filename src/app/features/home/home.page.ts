import { Component, OnInit } from '@angular/core';
import { PostsService } from './shared/services/posts.service';
import { PostRequest, PostResponse } from './shared/models/Posts';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../auth/shared/services/user.service';
import { LoginResponse } from '../auth/shared/models/Login';
import { AlertService } from 'src/app/core/services/alert.service';
import { ErrorService } from 'src/app/core/services/error.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  standalone: false,
})
export class HomePage implements OnInit {

  user: LoginResponse | null = null;
  posts: PostResponse[] = [];

  form = new FormGroup ({
    description: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(255)]),
    image: new FormControl(null, [Validators.required]),
  })

  constructor(
    private _postsService: PostsService,
    private _userService: UserService,
    private _alertService: AlertService,
    private _errorService: ErrorService
  ) {}

  ngOnInit(){
    this._userService.getUser().then(res => {
      this.user = res;
    });
    this.getAllPosts();
  }

  handleRefresh(event: CustomEvent) {
    setTimeout(() => {
      this.getAllPosts();
      (event.target as HTMLIonRefresherElement).complete();
    }, 2000);
  }

  getAllPosts(){
    this._postsService.getAll().then((data) => {
      this.posts = data as PostResponse[];
    }).catch((error) => {
      this.posts = [];
    });
  }

  addImage() {
    if (this.form.valid) {

      const formValue = this.form.getRawValue();

      const postRequest: PostRequest = {
        post: {
          description: formValue.description!,
          image: formValue.image!,
          user_id: this.user?.id!
        }
      };

      this._postsService.create(postRequest).then(async res => {
        if(res){
          this.getAllPosts();
          this.form.reset();
        }
      }).catch(err =>{
        this._alertService.showAlert('Alerta','','Ha ocurrido un error por favor intente de nuevo')
      });


    } else {
      alert('Por favor, completa todos los campos.');
    }
  }

  validate(nameInput: string) {
    return this._errorService.validateInput(this.form, nameInput);
  }

  check(nameInput: string) {
    return this._errorService.checkInput(this.form, nameInput);
  }
}
