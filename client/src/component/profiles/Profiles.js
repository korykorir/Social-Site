import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner.gif';
import PropTypes from 'prop-types';
import { getProfiles} from '../../actions/profile';
import ProfileItem from './ProfileItem';


const Profiles = ({getProfiles, profile: { profiles, loading}}) => {

    useEffect (()=>{
        getProfiles()
    }, [getProfiles])
    return (
        <Fragment>
           
            <Fragment>
                <h1 className = "large text-primary"> Developers</h1>
                <p className= "lead">Browse and connect with developers</p>

                <div className = "developers">
                    {profiles.length > 0 ? (
                        profiles.map((profile)=>(
                            <ProfileItem key = {profile.id} profile = {profile}/>
                        ) )

                    ): <h4>No profiles found ... </h4>}
                </div> 
                
            </Fragment> 

            </Fragment>

        
    );
}

Profiles.propTypes = {
    profile: PropTypes.object.isRequired,
    getProfiles :PropTypes.func.isRequired
}

const mapStateToProps = state =>({
    profile :state.profile
})

export default connect(mapStateToProps, {getProfiles})(Profiles);