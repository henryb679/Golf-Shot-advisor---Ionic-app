import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HandlerPage } from './handler.page';

// This allows for additional pages to be added to the tab structure at anytime.
// The order of how the tab pages are aligned from L to R can be defined in handler.page.html, by order of preference.
const routes: Routes = [
  {
    path: 'dashboard',
    component: HandlerPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: '../home/home.module#HomePageModule'
          }
        ]
      },
      {
        path: 'startAdvisor',
        children: [
          {
            path: '',
            loadChildren: '../start-advisor/start-advisor.module#StartAdvisorPageModule'
          }
        ]
      },
      {
        path: 'leaderboard',
        children: [
          {
            path: '',
            loadChildren: '../leaderboard/leaderboard.module#LeaderboardPageModule'
          }
        ]
      },
      {
        path: 'settings',
        children: [
          {
            path: '',
            loadChildren: '../settings/settings.module#SettingsPageModule'
          }
        ]
      }
    ]
  },
  // The default home page can be changed here.
  {
    path: '',
    redirectTo: '/dashboard/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HandlerPageRoutingModule {}
