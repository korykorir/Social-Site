import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE,  UPDATE_PROFILE } from "../actions/types";

const initalstate = {
    profile: null,
    profiles: [],
    loading: true,
    error : {}

}

export default function(state= initalstate, action){
    const { type, payload } = action;

    switch(type){
        case GET_PROFILE:
        case UPDATE_PROFILE:
            return {...state,
            profile: payload,
            loading: false   };
        
           
        case PROFILE_ERROR:
            return {...state,
            errors: payload};
        case CLEAR_PROFILE:
            return {...state,
            profile: null}
        default: 
        return state;
}
}