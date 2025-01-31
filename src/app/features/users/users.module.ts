import { NgModule } from '@angular/core';

import { UsersPageRoutingModule } from './users-routing.module';

import { UsersPage } from './users.page';
import { CardUserComponent } from './shared/components/card-user/card-user.component';
import { SharedModule } from 'src/app/shared/modules/shared.module';

@NgModule({
  imports: [
    SharedModule,
    UsersPageRoutingModule
  ],
  declarations: [
    UsersPage,
    CardUserComponent
  ]
})
export class UsersPageModule {}
