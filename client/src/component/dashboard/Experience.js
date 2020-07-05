import React, { Fragment } from 'react';
import { deleteExperience} from '../../actions/profile';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Experience = ({experience, deleteExperience}) => {

    const experiences = experience.map(exp=> (<tr><td key = {exp._id}>{exp.company}</td>
       <td className ="hide-sm">
    {exp.title}
    </td>
    <td>
        <Moment format ="YYYY/MM/DD">{exp.from}</Moment> - {' '}
        {exp.to=== null ? (' Now'): ( <Moment format = "YYYY/MM/DD">{exp.to}</Moment>)}
    </td>
    <td button className ="btn btn-danger" onClick ={()=> deleteExperience(exp._id)}>Delete</td>
    
    </tr>))
    return (
        <Fragment>
            <h2 className ="my-2">Experience credentials</h2>
            <table className ="table">
                <thead>
                    <tr>
                        <th>company</th>
                        <th className = "hide-sm">Title</th>
                        <th className = "hide-sm">Years</th>
                    </tr>
                </thead>
                <tbody>
                    {experiences}
                </tbody>
            </table>

        </Fragment>
        
    );
}

Experience.propTypes = {
    deleteExperience : PropTypes.func.isRequired
}



export default connect(null,{deleteExperience}) (Experience);