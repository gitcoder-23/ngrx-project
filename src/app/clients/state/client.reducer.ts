import * as clientActions from "./client.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";

import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

import { Client } from "../client.model";
import * as fromRoot from "../../clientstates/app.state";

export interface ClientState extends EntityState<Client> {
  selectedClientId: number | null;
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface AppState extends fromRoot.AppState {
  clients: ClientState;
}

export const clientAdapter: EntityAdapter<Client> = createEntityAdapter<
  Client
>();

export const defaultClient: ClientState = {
  ids: [],
  entities: {},
  selectedClientId: null,
  loading: false,
  loaded: false,
  error: ""
};

//Define initial state

export const initialState = clientAdapter.getInitialState(defaultClient)

export function clientReducer(
  state = initialState,
  action: clientActions.clientLoadAction
): ClientState {
  switch (action.type) {
      //case one
    /* case clientActions.ClientActionTypes.LOAD_CLIENTS: {
      return {
        ...state,
        loading: true,
      };
    } */
    //case two(List Client)
    case clientActions.ClientActionTypes.LOAD_CLIENTS_SUCCESS:{
      return clientAdapter.addAll(action.payload, {
        ...state,
        loading: false,
        loaded: true
      })
    }
    //case three
    case clientActions.ClientActionTypes.LOAD_CLIENTS_FAIL:{
        return {
            ...state,
            entities: {},
            loading: false,
            loaded: true,
            error: action.payload,
        }
    }

  //New Cases below (Single Client)


    //case two
    case clientActions.ClientActionTypes.LOAD_CLIENT_SUCCESS:{
      return clientAdapter.addOne(action.payload, {
        ...state,
        selectedClientId: action.payload.id
      })
    }
    //case three
    case clientActions.ClientActionTypes.LOAD_CLIENT_FAIL:{
        return {
            ...state,
            error: action.payload,
        }
    }

  //New Cases below (Create Client)

  //case two
  case clientActions.ClientActionTypes.CREATE_CLIENT_SUCCESS:{
    return clientAdapter.addOne(action.payload, state);
  }

  //case three
  case clientActions.ClientActionTypes.CREATE_CLIENT_FAIL:{
      return {
          ...state,
          error: action.payload,
      }
  }

  //New Cases below (Update Client)

  //case two
  case clientActions.ClientActionTypes.UPDATE_CLIENT_SUCCESS:{
    return clientAdapter.updateOne(action.payload, state);
  }
  
  //case three
  case clientActions.ClientActionTypes.UPDATE_CLIENT_FAIL:{
      return {
          ...state,
          error: action.payload,
      }
  }

  //New Cases below (Delete Client)

  //case two
  case clientActions.ClientActionTypes.DELETE_CLIENT_SUCCESS:{
    return clientAdapter.removeOne(action.payload, state);
  }
  
  //case three
  case clientActions.ClientActionTypes.DELETE_CLIENT_FAIL:{
      return {
          ...state,
          error: action.payload,
      }
  }

//Cases end


    default: {
        return state;
    }

  }
}

//Add selectors

const getClientFeatureState = createFeatureSelector<ClientState>(
  'clients'
)

export const getClients = createSelector(
  getClientFeatureState,
  clientAdapter.getSelectors().selectAll
)

export const getClientsLoading = createSelector(
  getClientFeatureState,
  (state: ClientState) => state.loading
)

export const getClientsLoaded = createSelector(
  getClientFeatureState,
  (state: ClientState) => state.loaded
)

export const getError = createSelector(
  getClientFeatureState,
  (state: ClientState) => state.error
)

//After adding add, edit, delete load top
export const getCurrentClientId = createSelector(
  getClientFeatureState,
  (state: ClientState) => state.selectedClientId
)

export const getCurrentClient = createSelector(
  getClientFeatureState,
  getCurrentClientId,
  state => state.entities[state.selectedClientId]
)


/* const initialState = { 
    clients: [
        {
            name: 'Prabhat Kumar',
            phone: '8961857485',
            address: '114 Balia',
            membership: 'Platinum',
            id: 1,

        },
        {
            name: 'Rajiv Kumar',
            phone: '8961857486',
            address: '114 Purba',
            membership: 'Gold',
            id: 2,

        }
       
    ],
    loading: false,
    loaded: true
};

export function clientReducer(state = initialState, action){

    switch(action.type){
        case 'LOAD_CLIENTS':{
            return {
                ...state,
                loading: true, //Property
                loaded: false
            };
             
        }
        default: {
            return state;
        }
    }
} old*/
