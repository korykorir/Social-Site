import axios from 'axios';
import { setAlert} from './alert';
import { GET_PROFILE, 
    PROFILE_ERROR, 
    ACCOUNT_DELETED, 
    UPDATE_PROFILE,
     CLEAR_PROFILE,
    GET_PROFILES } from './types';

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

//Get all profiles
export const getProfiles =()=> async dispatch=>{

    dispatch({type: CLEAR_PROFILE});

    try {

        const res = await axios.get('/api/profile');

        dispatch({
            type: GET_PROFILES,
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


//get profile by id
export const getProfileById =(id)=> async dispatch=>{

    try {

        const res = await axios.get(`/api/profile/user/${id}`);

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

//delete experience

export const deleteExperience = Exp_id => async dispatch=>{

    try {
        
const res = await axios.delete(`api/profile/experience/${Exp_id}`);

dispatch({
    type: UPDATE_PROFILE,
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
        
    }
}


//Delete Education



export const deleteEducation = Exp_id => async dispatch=>{

    try {
        
const res = await axios.delete(`api/profile/education/${Exp_id}`);

dispatch({
    type: UPDATE_PROFILE,
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
        
    }
}

//Delete Account 


export const deleteAccount = () => async dispatch=>{

    if(window.confirm('Are you sure')){

        try {
        
            const res = await axios.delete('api/profile');
            
            dispatch({ type: CLEAR_PROFILE});
            dispatch({ type: ACCOUNT_DELETED})
            
            dispatch(setAlert('Your account has been permanently deleted'))
            
                } catch (err) {
            
                    dispatch({
                        type: PROFILE_ERROR,
                        payload: {
                            msg: err.response.statusText, 
                            status: err.response.status
                        }
                    })
                    
                }

    }

    
}