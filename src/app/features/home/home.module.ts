import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { SharedModule } from 'src/app/shared/modules/shared.module';


@NgModule({
  imports: [
    HomePageRoutingModule,
    SharedModule
  ],
  declarations: [
    HomePage
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePageModule {}
