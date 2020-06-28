import axios from 'axios';
import { setAlert} from './alert';
import { GET_PROFILE, PROFILE_ERROR, CREATE_PROFILE } from './types';

//get current users profile

export const getCurrentProfile =()=> async dispatch=>{

    try {

        const res = await axios.get('/api/profile/me');

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
        
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText, 
                status: err.response.status
            }
        })

        
    };

};
//create profile

export const createProfile =(formData, history, edit =false)=> async dispatch=>{


    

    try {
        const config = {
            headers:{
                'Content-Type' :'application/json'
            }
        }
        const res = await axios.post('/api/profile', formData, config );

        dispatch({
            type: GET_PROFILE,
            payload: res.data

        });
        dispatch(setAlert(edit ? 'Profile Updated': 'Profile created'));

        if(!edit){
            history.push('/dashboard')
        }


        
    } catch (err) {

        

        const errors = err.response.data.errors;

        if(errors){
            errors.forEach(error =>dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText, 
                status: err.response.status
            }
        })
        
    }



};

//Add experience

export const addExperience =(formData, history) => async dispatch =>{

    console.log(formData);

    try {
        const config = {
            headers:{
                'Content-Type' :'application/json'
            }
        }
        const res = await axios.put('/api/profile/experience', formData, config );

        dispatch({
            type: GET_PROFILE,
            payload: res.data

        });
        dispatch(setAlert('experience added'));

        
            history.push('/dashboard')
        


        
    } catch (err) {

        

        const errors = err.response.data.errors;

        if(errors){
            errors.forEach(error =>dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText, 
                status: err.response.status
            }
        })
        
    }

};

//Add education


export const addEducation=(formData, history) => async dispatch =>{

    try {
        const config = {
            headers:{
                'Content-Type' :'application/json'
            }
        }
        const res = await axios.put('/api/profile/education', formData, config );

        dispatch({
            type: GET_PROFILE,
            payload: res.data

        });
        dispatch(setAlert('education added'));

        
            history.push('/dashboard')
        


        
    } catch (err) {

        

        const errors = err.response.data.errors;

        if(errors){
            errors.forEach(error =>dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText, 
                status: err.response.status
            }
        })
        
    }

};