import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { CardPostComponent } from './shared/components/card-post/card-post.component';
import { DatePipe } from '@angular/common';


@NgModule({
  imports: [
    HomePageRoutingModule,
    SharedModule,
  ],
  declarations: [
    HomePage,
    CardPostComponent
  ],
  providers: [DatePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePageModule {}
