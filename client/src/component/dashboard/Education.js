import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment'
import { deleteEducation} from '../../actions/profile';
import { connect } from 'react-redux';

const Education = ({education, deleteEducation}) => {

    const educations = education.map(item=> (<tr><td key = {item._id}>{item.school}</td>
       <td className ="hide-sm">
    {item.degree}
    </td>
    <td>
        <Moment format ="YYYY/MM/DD">{item.from}</Moment> - {' '}
        {item.to=== null ? (' Now'): ( <Moment format = "YYYY/MM/DD">{item.to}</Moment>)}
    </td>
    <td button className ="btn btn-danger" onClick = {()=> deleteEducation(item._id)}>Delete</td>
    
    </tr>))
    return (
        <Fragment>
            <h2 className ="my-2">Education credentials</h2>
            <table className ="table">
                <thead>
                    <tr>
                        <th>School</th>
                        <th className = "hide-sm">Degree</th>
                        <th className = "hide-sm">Years</th>
                        <th ></th>
                    </tr>
                </thead>
                <tbody>
                    {educations}
                </tbody>
            </table>

        </Fragment>
        
    );
}





export default connect(null, {deleteEducation})(Education);