import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { SlideHome1Component } from "./shared/slide-home-1/slide-home-1.component";
import { SlideHome2Component } from './shared/slide-home-2/slide-home-2.component';
import { SlideHome3Component } from './shared/slide-home-3/slide-home-3.component';
import { SlideHome4Component } from './shared/slide-home-4/slide-home-4.component';
import { IntroPage } from './intro.page';
import { IntroPageRoutingModule } from './intro-routing.module';


@NgModule({
  imports: [
    IntroPageRoutingModule,
    SharedModule
  ],
  declarations: [
    IntroPage,
    SlideHome1Component,
    SlideHome2Component,
    SlideHome3Component,
    SlideHome4Component
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IntroPageModule {}
