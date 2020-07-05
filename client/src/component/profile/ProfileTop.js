import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProfileTop = ({ profile : { user : { name,avatar}, social,skills, bio, company, website, location, status}}) => {
    return (
        <Fragment>
     
        <div className="profile-top bg-primary p-2">
          <img
            className="round-img my-1"
            src={avatar}
            alt=""
          />
          <h1 className="large">{name}</h1>
          <p className="lead">{status} {company && <span> at {company}</span>}</p>
          <p>{location && <span> {location} </span>}</p>

          {
              website && (
                <a href={website} target="_blank" rel="noopener noreferrer">
                <i className="fas fa-globe fa-2x"></i>
              </a>

              )
          }

<div className="icons my-1">

          {
              social && social.twitter &&(
                <a href={social.twitter} target="_blank" rel="noopener noreferrer">
                <i class="fab fa-twitter"></i>
                twiiter
              </a>

              )
          }
            

            {
                social && social.facebook &&(
                    <a href={social.facebook} target="_blank" rel="noopener noreferrer">
                    <i class="fab fa-facebook"></i>
                    facebook
                  </a>
                )

            }
         
            
            
            {
                social && social.linkedin &&(
                    <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
                    <i class="fab fa-linkedin"></i>
                    linkedin
                  </a>
                )

            }
            
            {
                social && social.youtube &&(
                    <a href={social.youtube} target="_blank" rel="noopener noreferrer">
                    <i class="fab fa-youtube"></i>
                    youtube
                  </a>
                )

            }
            {
                social && social.instagram &&(
                    <a href={social.instagram} target="_blank" rel="noopener noreferrer">
                    <i class="fab fa-instagram"></i>
                    instagram
                  </a>
                )

            }

            
          </div>
        </div>
          

               
        </Fragment>



        
    );
}

ProfileTop.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileTop;