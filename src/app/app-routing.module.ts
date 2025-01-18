import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AccesoGuard } from './core/guards/acceso.guard';
import { WatchedIntroGuard } from './core/guards/watchedIntro.guard';
import { ValidAuthGuard } from './core/guards/validAuth.guard';
import { NotWatchedIntroGuard } from './core/guards/notWatchedIntro.guard';

const routes: Routes = [
  {
    path: 'intro',
    loadChildren: () => import('./features/intro/intro.module').then( m => m.IntroPageModule),
    canActivate: [WatchedIntroGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./features/home/home.module').then( m => m.HomePageModule),
    canActivate: [AccesoGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then( m => m.AuthModule),
    canActivate: [ValidAuthGuard, NotWatchedIntroGuard]
  },
  {
    path: '',
    redirectTo: 'intro',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
