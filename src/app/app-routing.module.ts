import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AccesoGuard } from './core/guards/acceso.guard';
import { WatchedIntroGuard } from './core/guards/watchedIntro.guard';
import { ValidAuthGuard } from './core/guards/validAuth.guard';
import { NotWatchedIntroGuard } from './core/guards/notWatchedIntro.guard';
import { UserLayoutPage } from './shared/layouts/user-layout/user-layout.page';
import { AdminLayoutPage } from './shared/layouts/admin-layout/admin-layout.page';

const routes: Routes = [
  {
    path: 'intro',
    loadChildren: () => import('./features/intro/intro.module').then( m => m.IntroPageModule),
    canActivate: [WatchedIntroGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then( m => m.AuthModule),
    canActivate: [ValidAuthGuard, NotWatchedIntroGuard]
  },
  {
    path: 'dashboard',
    canActivate: [AccesoGuard],
    component: AdminLayoutPage,
  },
  {
    path: 'app',
    canActivate: [AccesoGuard],
    component: UserLayoutPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./features/home/home.module').then( m => m.HomePageModule),
      },
      {
        path: 'users',
        loadChildren: () => import('./features/users/users.module').then( m => m.UsersPageModule)
      },
      {
        path: 'account',
        loadChildren: () => import('./features/account-settings/account-settings.module').then( m => m.AccountSettingsPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./features/profile/profile.module').then( m => m.ProfilePageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: 'intro',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
