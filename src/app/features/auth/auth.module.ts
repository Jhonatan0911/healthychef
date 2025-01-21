import { NgModule } from '@angular/core';
import { LoginPage } from './login/login.page';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { RegisterPage } from './register/register.page';

@NgModule({
  imports: [
    AuthRoutingModule,
    SharedModule
  ],
  declarations: [
    LoginPage,
    RegisterPage
  ]
})
export class AuthModule { }
