import { Component, OnInit } from '@angular/core';
import { UserPaginationResponse, UserResponse } from '../auth/shared/models/User';
import { UserService } from '../auth/shared/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  standalone: false
})
export class UsersPage implements OnInit {

  users: UserResponse[] = [];
  page: number = 1;
  limit: number = 5;
  hasMore: boolean = true;
  query: string = '';

  isLoadingUsers: boolean = false;

  constructor(
    private _userService: UserService,
  ) {}

  ngOnInit(){
    this.loadUsers();
  }

  handleRefresh(event: CustomEvent) {
    this.users = [];
    this.page = 1;
    setTimeout(() => {
      this.loadUsers();
      (event.target as HTMLIonRefresherElement).complete();
    }, 2000);
  }

  loadUsers(event?: any){
    this.isLoadingUsers = true;
    this._userService.getUsersPagination(this.page,this.limit, this.query).then((data: UserPaginationResponse) => {
      if(data.users.length > 0){
        this.users = [...this.users,...data.users];
        this.page++;
        this.isLoadingUsers = false;
      }else{
        this.hasMore = false;
      }

      if(event){
        event.target.complete();
      }

    }).catch((error) => {
      if(event){
        event.target.complete();
      }
      this.isLoadingUsers = false;
    });
  }

  searchUsers(event: any){
    this.query = event.target.value || '';
    this.page = 1;
    this.users = [];
    this.hasMore = true;
    this.loadUsers();
  }


}
