import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";

import { Observable } from "rxjs";

import * as clientActions from "../state/client.actions";
import * as fromClient from "../state/client.reducer";
import { Client } from "../client.model";

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.css']
})
export class ClientEditComponent implements OnInit {
  clientForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<fromClient.AppState>
  ) { }

ngOnInit() {
    this.updateClientValidation();

    //Get single value 
    const client$: Observable<Client> = this.store.select(
      fromClient.getCurrentClient
    )
      //Subscribe for update
    client$.subscribe(currentClient => {
      if (currentClient) {
        this.clientForm.patchValue({
          name: currentClient.name,
          phone: currentClient.phone,
          address: currentClient.address,
          membership: currentClient.membership,
          id: currentClient.id
        });
      }
    })
}

//Update function
updateClient() {
  const updatedClient: Client = {
    name: this.clientForm.get("name").value,
    phone: this.clientForm.get("phone").value,
    address: this.clientForm.get("address").value,
    membership: this.clientForm.get("membership").value,
    id: this.clientForm.get("id").value
  };

  this.store.dispatch(new clientActions.UpdateClient(updatedClient));
  this.clientForm.reset();
}

//Validation
  updateClientValidation(){

    this.clientForm = this.fb.group({
      name: ["", Validators.required],
      phone: ["", Validators.required],
      address: ["", Validators.required],
      membership: ["", Validators.required],
      id: null
    })
    
  }
  

}
