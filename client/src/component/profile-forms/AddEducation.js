import React, {Fragment, useState} from 'react';
import PropTypes from 'prop-types';
import {addEducation} from '../../actions/profile';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { withRouter, Link } from 'react-router-dom';

const AddEducation = ({addEducation, history}) => {

    const [ formData, setFormData] = useState({
        school:'', 
        degree:'', 
        fieldofstudy:'',
        to:'', 
        current:false,
        description:'',         
        from:''
    });

    const [toDateDisabled, toggleDisabled] = useState(false);

    const {school, degree, fieldofstudy, to, current,description,  from} = formData

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

    const onSubmit = (e)=>{
        e.preventDefault();
        addEducation(formData, history)
    }

console.log(formData);

    return (
        <Fragment>
        <form className="form" onSubmit = { e=>onSubmit(e)}>
            <div className="form-group">
            <input 
            type="text" 
            placeholder="* Job school" 
            name="school" 
            value = {school}
            onChange ={e => onChange(e)}
            required />
            </div>
            <div className="form-group">
            <input 
            type="text" 
            placeholder="* Fiel of Study" 
            name="fieldofstudy"
            value = {fieldofstudy}
            onChange ={e => onChange(e)} 
            required />
            </div>
            <div className="form-group">
            <input 
            type="text" 
            placeholder="degree" 
            value = {degree}
            onChange ={e => onChange(e)}
            name="degree" />
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
            
        /> { ' '}Current School</p>
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
                placeholder="School Description"
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

AddEducation.propTypes = {
    addEducation : PropTypes.func.isRequired
}

export default connect(null, {addEducation})(withRouter(AddEducation));