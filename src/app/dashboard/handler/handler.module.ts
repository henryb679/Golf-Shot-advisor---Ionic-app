import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { HandlerPage } from './handler.page';

import { HandlerPageRoutingModule } from './hander.router.module';

const routes: Routes = [
  {
    path: '',
    component: HandlerPage
  }
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HandlerPageRoutingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HandlerPage]
})
export class HandlerPageModule { }
