import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  title: 'client-list';
  clients;

  constructor(
    private store: Store<any>
  ) { }

  ngOnInit() {

    this.store.dispatch({type: 'LOAD_CLIENTS'})
    this.store.subscribe(state => (
      this.clients = state.clients.clients
      ));
  }

}
