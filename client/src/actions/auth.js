import axios from 'axios';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';

import{
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    CLEAR_PROFILE
} from './types';



//load user

export const loadUser =()=> async dispatch=>{

    if(localStorage.token){
        setAuthToken(localStorage.token);
    }

    try{
        const res = await axios.get('/api/auth');

        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
        
    }catch(err){
        dispatch({
            type: AUTH_ERROR
        })
    }
}

//register user

export const register = ({email,name,password})=>async dispatch =>{
    const config = {
        headers:{
            'content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({email, name, password});

    try{
        const res = await axios.post('/api/users', body,config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser());
    }catch(err){
        const errors = err.response.data.errors;

        if(errors){
            errors.forEach(error =>dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: REGISTER_FAIL
        })

    }
};

//Loging in
export const login = ({email, password})=>async dispatch =>{
    const config = {
        headers:{
            'content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({email, password});

    try{
        const res = await axios.post('/api/auth/login', body,config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser());
    }catch(err){
        const errors = err.response.data.errors;

        if(errors){
            errors.forEach(error =>dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: LOGIN_FAIL
        })

    }
}

//logout

export const logout =()=> dispatch =>{
    dispatch({type: LOGOUT});
    dispatch({type: CLEAR_PROFILE})
}