import { NgModule } from '@angular/core';
import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { EditUserComponent } from './shared/components/edit-user/edit-user.component';
import { SharedModule } from 'src/app/shared/modules/shared.module';

@NgModule({
  imports: [
    SharedModule,
    ProfilePageRoutingModule
  ],
  declarations: [ProfilePage, EditUserComponent]
})
export class ProfilePageModule {}
