import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/modules/shared.module';
import { IonicStorageModule } from '@ionic/storage-angular';
import { IonicStorageService } from './core/services/ionic-storage.service';
import { UserLayoutPage } from './shared/layouts/user-layout/user-layout.page';
import { AdminLayoutPage } from './shared/layouts/admin-layout/admin-layout.page';
import { MenuComponent } from './shared/components/menu/menu.component';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, UserLayoutPage, AdminLayoutPage,MenuComponent],
  imports: [
    BrowserModule,
    SharedModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    IonicStorageService,
    provideHttpClient()
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
