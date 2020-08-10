import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity'; //Needed for update
import { Client } from '../client.model';


export enum ClientActionTypes{
    //Define all loads 'For List'
    LOAD_CLIENTS = '[Client] Load Clients',
    LOAD_CLIENTS_SUCCESS = '[Client] Load Clients Success',
    LOAD_CLIENTS_FAIL = '[Client] Load Clients Fail',

    //Define all loads for 'Single client (Single_value)'
    LOAD_CLIENT = '[Client] Load Client',
    LOAD_CLIENT_SUCCESS = '[Client] Load Client Success',
    LOAD_CLIENT_FAIL = '[Client] Load Client Fail',

    //Define all loads for 'Create client(Insert)'
    CREATE_CLIENT = '[Client] Create Client',
    CREATE_CLIENT_SUCCESS = '[Client] Create Client Success',
    CREATE_CLIENT_FAIL = '[Client] Create Client Fail',

    //Define all loads for 'Update client(Update)'
    UPDATE_CLIENT = '[Client] Update Client',
    UPDATE_CLIENT_SUCCESS = '[Client] Update Client Success',
    UPDATE_CLIENT_FAIL = '[Client] Update Client Fail',

    //Define all loads for 'Delete client(Delete)'
    DELETE_CLIENT = '[Client] Delete Client',
    DELETE_CLIENT_SUCCESS = '[Client] Delete Client Success',
    DELETE_CLIENT_FAIL = '[Client] Delete Client Fail',

}

//Action one (List)
export class LoadClients implements Action {
    
    readonly type = ClientActionTypes.LOAD_CLIENTS;
}

//Action two (List)
export class LoadClientsSuccess implements Action {
    
    readonly type = ClientActionTypes.LOAD_CLIENTS_SUCCESS;
    //Define payload 'Client[]' thaken from client.model
    constructor(public payload: Client[]){}

}

//Action three(List)
export class LoadClientsFail implements Action {
    readonly type = ClientActionTypes.LOAD_CLIENTS_FAIL;

    constructor(public payload: string){}
}


//Single Action one(Single_value)
export class LoadClient implements Action {
    
    readonly type = ClientActionTypes.LOAD_CLIENT;
    constructor(public payload: number){}
}

//Single Action two(Single_value)
export class LoadClientSuccess implements Action {
    
    readonly type = ClientActionTypes.LOAD_CLIENT_SUCCESS;
    //Define payload 'Client' taken from client.model
    constructor(public payload: Client){} //Single value no array[]

}

//Single Action three(Single_value)
export class LoadClientFail implements Action {
    readonly type = ClientActionTypes.LOAD_CLIENT_FAIL;
    constructor(public payload: string){}
}


//Create Action one(Create)
export class CreateClient implements Action {
    
    readonly type = ClientActionTypes.CREATE_CLIENT;
    constructor(public payload: Client){}
}

//Create Action two(Create)
export class CreateClientSuccess implements Action {
    
    readonly type = ClientActionTypes.CREATE_CLIENT_SUCCESS;
    //Define payload 'Client' taken from client.model
    constructor(public payload: Client){} //Single value no array[]

}

//Create Action three(Create)
export class CreateClientFail implements Action {
    readonly type = ClientActionTypes.CREATE_CLIENT_FAIL;
    constructor(public payload: string){}
}

//Update Action one(Update)
export class UpdateClient implements Action {
    
    readonly type = ClientActionTypes.UPDATE_CLIENT;
    constructor(public payload: Client){}
}

//Update Action two(Update)
export class UpdateClientSuccess implements Action {
    
    readonly type = ClientActionTypes.UPDATE_CLIENT_SUCCESS;
    //Define payload 'Client' taken from client.model
    constructor(public payload: Update<Client>){}//'Update' taken from entity library 

}

//Update Action three(Update)
export class UpdateClientFail implements Action {
    readonly type = ClientActionTypes.UPDATE_CLIENT_FAIL;
    constructor(public payload: string){}
}

//Delete Action one(Delete)
export class DeleteClient implements Action {
    
    readonly type = ClientActionTypes.DELETE_CLIENT;
    constructor(public payload: number){}
}

//Delete Action two(Delete)
export class DeleteClientSuccess implements Action {
    
    readonly type = ClientActionTypes.DELETE_CLIENT_SUCCESS;
    //Define payload 'Client' taken from client.model
    constructor(public payload: number){}//'Update' taken from entity library 

}

//Delete Action three(Delete)
export class DeleteClientFail implements Action {
    readonly type = ClientActionTypes.DELETE_CLIENT_FAIL;
    constructor(public payload: string){}
}

//Declare all as union
export type Action = 
LoadClients | 
LoadClientsSuccess | 
LoadClientsFail |
LoadClient |
LoadClientSuccess | 
LoadClientFail | 
CreateClient |
CreateClientSuccess |
CreateClientFail | 
UpdateClient | 
UpdateClientSuccess |
UpdateClientFail | 
DeleteClient |
DeleteClientSuccess |
DeleteClientFail;




























