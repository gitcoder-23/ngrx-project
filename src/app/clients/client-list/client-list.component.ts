import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';//Needed
import { Observable } from 'rxjs'; //Needed

import * as clientActions from '../state/client.actions';//Needed
import * as fromClient from '../state/client.reducer';//Needed
import { Client } from '../client.model';
import { t } from '@angular/core/src/render3';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  title: 'client-list';
  clients$: Observable<Client[]>;
  error$: Observable<String>;

  constructor(
    private store: Store<fromClient.AppState>
  ) { }

  ngOnInit() {

    this.store.dispatch(new clientActions.LoadClients());
    this.clients$ = this.store.pipe(select(fromClient.getClients));
    this.error$ = this.store.pipe(select(fromClient.getError));
  }

  deleteClient(client: Client){
    if (confirm('Do you want to delete??')){
      this.store.dispatch(new clientActions.DeleteClient(client.id));
    }
  }

  editClient(client: Client){
    if (confirm('Do you want to edit??')){
      this.store.dispatch(new clientActions.LoadClient(client.id));
    }
  }

}
