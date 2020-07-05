import React, {Fragment, useState} from 'react';
import PropTypes from 'prop-types';
import {addExperience} from '../../actions/profile';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { withRouter, Link } from 'react-router-dom';

const AddExperience = ({addExperience, history}) => {

    const [ formData, setFormData] = useState({
        title:'', 
        location:'', 
        to:'', 
        current:false,
        description:'', 
        company:'', 
        from:''
    });

    const [toDateDisabled, toggleDisabled] = useState(false);

    const {title, location, to, current,description, company, from} = formData

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

    const onSubmit = (e)=>{
        e.preventDefault();
        addExperience(formData, history)
    }

console.log(formData);

    return (
        <Fragment>
        <form className="form" onSubmit = { e=>onSubmit(e)}>
            <div className="form-group">
            <input 
            type="text" 
            placeholder="* Job Title" 
            name="title" 
            value = {title}
            onChange ={e => onChange(e)}
            required />
            </div>
            <div className="form-group">
            <input 
            type="text" 
            placeholder="* Company" 
            name="company"
            value = {company}
            onChange ={e => onChange(e)} 
            required />
            </div>
            <div className="form-group">
            <input 
            type="text" 
            placeholder="Location" 
            value = {location}
            onChange ={e => onChange(e)}
            name="location" />
            </div>
            <div className="form-group">
            <h4>From Date</h4>
            <input 
            type="date" 
            value = {from}
            onChange ={e => onChange(e)}
            name="from" />
            </div>
            <div className="form-group">
            <p><input 
            type="checkbox" 
            name="current" 
            value = {current}
            onChange = { e=>{
                setFormData({ ...formData, current: !current});
                toggleDisabled(!toDateDisabled)
            }} 
            
        /> { ' '}Current Job</p>
            </div>
            <div className="form-group">
            <h4>To Date</h4>
            <input 
            type="date"
             name="to" 
             value = {to}
             onChange ={e => onChange(e)}
             disabled = { toDateDisabled ? 'disabled' : ''}
             />
            </div>
            <div className="form-group">
            <textarea
                name="description"
                cols="30"
                rows="5"
                placeholder="Job Description"
                value = {description}
                onChange ={e => onChange(e)}
            ></textarea>
            </div>
            <input type="submit" className="btn btn-primary my-1" />
            <Link to = '/dashboard' className="btn btn-light my-1" >Go Back</Link>
      </form>
        </Fragment>
        
    );
}

AddExperience.propTypes = {
    addExperience : PropTypes.func.isRequired
}

export default connect(null, {addExperience})(withRouter(AddExperience));