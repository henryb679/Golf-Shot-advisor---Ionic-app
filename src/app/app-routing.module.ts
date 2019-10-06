import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AngularFireAuthGuard } from '@angular/fire/auth-guard';

const routes: Routes = [
    { path: '', loadChildren: './login/login.module#LoginPageModule' },
//  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
    { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
    { path: '', loadChildren: './dashboard/handler/handler.module#HandlerPageModule' },
    { path: 'dashboard', loadChildren: './dashboard/handler/handler.module#HandlerPageModule', canActivate: [AngularFireAuthGuard]},
    // { path: 'handler', loadChildren: './dashboard/handler/handler.module#HandlerPageModule' },
    { path: 'home', loadChildren: './dashboard/home/home.module#HomePageModule', canActivate: [AngularFireAuthGuard]},
    { path: 'start-advisor', loadChildren: './dashboard/start-advisor/start-advisor.module#StartAdvisorPageModule', canActivate: [AngularFireAuthGuard]},
    { path: 'settings', loadChildren: './dashboard/settings/settings.module#SettingsPageModule', canActivate: [AngularFireAuthGuard]},
    { path: 'weather-modal', loadChildren: './weather-modal/weather-modal.module#WeatherModalPageModule', canActivate: [AngularFireAuthGuard]},
    { path: 'leaderboard', loadChildren: './dashboard/leaderboard/leaderboard.module#LeaderboardPageModule', canActivate: [AngularFireAuthGuard]},
  { path: 'user-result', loadChildren: './user-result/user-result.module#UserResultPageModule', canActivate: [AngularFireAuthGuard]},

    // { path: 'module', loadChildren: './module.module#ModulePageModule' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ], exports: [RouterModule]
})

export class AppRoutingModule {}
