const initialState = {
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
}