import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { RouterModule,Routes } from '@angular/router'; //Needed
import { StoreModule } from '@ngrx/store';//Needed
import { EffectsModule, Actions } from '@ngrx/effects';//Needed

import { clientReducer } from './state/client.reducer';
import { ClientEffect } from './state/client.effects';//Needed

import { ClientComponent } from './client/client.component';
import { ClientAddComponent } from './client-add/client-add.component';
import { ClientEditComponent } from './client-edit/client-edit.component';
import { ClientListComponent } from './client-list/client-list.component';
//Without any client-routing.module.ts
//So use in module file use child as lazyloading
const clientRoutes: Routes = [
  { path: '', component: ClientComponent }
]; 

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(
      clientRoutes
    ),
    StoreModule.forFeature('clients', clientReducer),
    EffectsModule.forFeature([ClientEffect])
  ],
  declarations: [
    ClientComponent, 
    ClientAddComponent, 
    ClientEditComponent, 
    ClientListComponent
  ]
})
export class ClientsModule { }
