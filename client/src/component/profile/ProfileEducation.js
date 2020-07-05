import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileEducation = ({education : { school, degree, fieldofstudy, from, to, current, description }}) => {
    return (
        <div>
            <p>{school}</p>
    <p> <Moment format = "YYYY/MM/DD">{from}</Moment> - {!to ? "Now": 
    <Moment format = "YYYY/MM/DD">{to}</Moment>}</p>
    <p>Degree: {degree}</p>
    <p>fieldofstudy : {fieldofstudy}</p>
    <p> Description: {description}</p>
        </div>
        
    );
}

export default ProfileEducation;