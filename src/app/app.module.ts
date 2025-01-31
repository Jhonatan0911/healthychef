import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
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

/* This is to set the locale to spanish. */
import localeEsPe from '@angular/common/locales/es-PE';
import { DatePipe, registerLocaleData } from '@angular/common';
import { ImageModalComponent } from './shared/components/image-modal/image-modal.component';
registerLocaleData(localeEsPe, 'es-PE');

@NgModule({
  declarations: [AppComponent, UserLayoutPage, AdminLayoutPage,MenuComponent, ImageModalComponent],
  imports: [
    BrowserModule,
    SharedModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-PE' },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    IonicStorageService,
    DatePipe,
    provideHttpClient()
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
