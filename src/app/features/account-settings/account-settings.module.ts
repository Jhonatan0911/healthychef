import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { AccountSettingsPage } from './account-settings.page';
import { AccountSettingsPageRoutingModule } from './account-settings-routing.module';


@NgModule({
  imports: [
    AccountSettingsPageRoutingModule,
    SharedModule
  ],
  declarations: [
    AccountSettingsPage
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AccountSettingsPageModule {}
