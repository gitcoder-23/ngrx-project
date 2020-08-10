import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Store, State, select } from "@ngrx/store";
import * as clientActions from "../state/client.actions";
import * as fromClient from "../state/client.reducer";
import { Client } from "../client.model";


@Component({
  selector: 'app-client-add',
  templateUrl: './client-add.component.html',
  styleUrls: ['./client-add.component.css']
})
export class ClientAddComponent implements OnInit {

  clientForm: FormGroup;


  constructor(
    private fb: FormBuilder,
    private store: Store<fromClient.AppState>
  ) { }

  ngOnInit() {
    this.clientValidation();
  }

clientValidation(){
  this.clientForm = this.fb.group({
    name: ["", Validators.required],
    phone: ["", Validators.required],
    address: ["", Validators.required],
    membership: ["", Validators.required]
  });
}

  //Insert or Create
  createClient() {
    const newClient: Client = {
      name: this.clientForm.get("name").value,
      phone: this.clientForm.get("phone").value,
      address: this.clientForm.get("address").value,
      membership: this.clientForm.get("membership").value
    };

    //make action for create
  this.store.dispatch(new clientActions.CreateClient(newClient));

  this.clientForm.reset();

  }

  
  

}
