import { Inject, Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';


import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ClientService } from '../client.service';//Service used
import * as clientActions from '../state/client.actions';
import {Client} from '../client.model';
@Injectable()

export class ClientEffect{

    constructor(
        private actions$: Actions,
        private clientService: ClientService
    ){}
//Effect-1(List Value)
    @Effect()
    loadClients$: Observable<Action> = this.actions$.pipe(
        ofType<clientActions.LoadClients>(
            clientActions.ClientActionTypes.LOAD_CLIENTS
        ),
        mergeMap((actions: clientActions.LoadClients) => 
            this.clientService.getClients().pipe(
                map(
                    (clients: Client[])=>
                    new clientActions.LoadClientsSuccess(clients)
                ),
                catchError(err => of(new clientActions.LoadClientsFail(err)))
            )
        )

    );
//Effect-2(Single Client)
@Effect()
    loadClient$: Observable<Action> = this.actions$.pipe(
        ofType<clientActions.LoadClient>(
            clientActions.ClientActionTypes.LOAD_CLIENT
        ),
        mergeMap((action: clientActions.LoadClient) => 
            this.clientService.getClientById(action.payload).pipe(
                map(

                    //Single 'Client' no arrey[]
                    (client: Client)=>
                    new clientActions.LoadClientSuccess(client)
                ),
                catchError(err => of(new clientActions.LoadClientFail(err)))
            )
        )

    );

//Effect-3(Create Client)
@Effect()
    createClient$: Observable<Action> = this.actions$.pipe(
        ofType<clientActions.CreateClient>(
            clientActions.ClientActionTypes.CREATE_CLIENT
        ),
        map((action: clientActions.CreateClient) => action.payload),
        mergeMap((client: Client) => 
            this.clientService.createClient(client).pipe(
                map(

                    //new 'Client' no arrey[]
                    (newClient: Client)=>
                    new clientActions.CreateClientSuccess(newClient)
                ),
                catchError(err => of(new clientActions.CreateClientFail(err)))
            )
        )

    );

//Effect-4(Update Client)
@Effect()
updateClient$: Observable<Action> = this.actions$.pipe(
    ofType<clientActions.UpdateClient>(
        clientActions.ClientActionTypes.UPDATE_CLIENT
    ),
    map((action: clientActions.UpdateClient) => action.payload),
        mergeMap((client: Client) => 
            this.clientService.updateClient(client).pipe(
                map(

                    //new 'Client' no arrey[]
                    (updateClient: Client)=>
                    new clientActions.UpdateClientSuccess({
                        id: updateClient.id,
                        changes: updateClient
                    })
                ),
                catchError(err => of(new clientActions.UpdateClientFail(err)))
            )
        )

    );

//Effect-5(Delete Client)
@Effect()
deleteClient$: Observable<Action> = this.actions$.pipe(
    ofType<clientActions.DeleteClient>(
        clientActions.ClientActionTypes.DELETE_CLIENT
    ),
    map((action: clientActions.DeleteClient) => action.payload),
        mergeMap((id: number) => 
            this.clientService.deleteClient(id).pipe(
                map(()=>
                    new clientActions.DeleteClientSuccess(id)),
                catchError(err => of(new clientActions.DeleteClientFail(err)))
            )
        )

    );






}