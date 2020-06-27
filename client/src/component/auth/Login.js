import React, {Fragment, useState} from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { login } from '../../actions/auth';
import { connect } from 'react-redux';
import {PropTypes} from 'prop-types'; 

const Login =(props)=> {
    const [formData, setFormData] = useState({
        email:"",
        password:""
       
    });
const { email, password} = formData;

const onChange = e=> setFormData({...formData, [e.target.name]: e.target.value});
const onSubmit =  e=>{
    e.preventDefault();

    props.login({email, password});
}
if(props.isAuthenticated){
  return <Redirect to= "/dashboard"/>
}

    return <Fragment>
        <h1 className="large text-primary">Login</h1>
      <p className="lead"><i className="fas fa-user"></i> Sign in to your Account</p>
      <form className="form" onSubmit = {e=>onSubmit(e)}>
             
         
        <div className="form-group">
          <input
           type="email"
           placeholder="Email Address"
           value ={email}
           onChange = {e =>onChange(e)}
           name="email" />
            </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value ={password}
            onChange = {e =>onChange(e)}
            name="password"
            minLength="6"
          />
        </div>
        
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        No account, register One <Link to ='/register' >Register</Link>
      </p>
    </Fragment>
}
   Login.propTypes = {
     login : PropTypes.func.isRequired,
     isAuthenticated: PropTypes.bool.isRequired
   };

   const mapStateToProps = state =>({
     isAuthenticated : state.auth.isAuthenticated
   })
export default connect(mapStateToProps, {login})(Login);
