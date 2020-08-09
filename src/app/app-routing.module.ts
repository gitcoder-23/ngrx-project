import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

import { HomeComponent } from "./home/home.component";

//import { RoomComponent } from './room/room.component';//New Created

const appRoutes: Routes = [
  
  { path: "", component: HomeComponent },
 // { path: "", component: RoomComponent },
  {
    path: 'clients',
    loadChildren: '../app/clients/clients.module#ClientsModule'
  },
  
  {
    path: "customers",
    loadChildren: "../app/customers/customers.module#CustomersModule"
  }
];

@NgModule({
  imports: [
    CommonModule, 
    RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {}
