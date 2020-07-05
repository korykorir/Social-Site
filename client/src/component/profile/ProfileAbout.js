import React from 'react';

const ProfileAbout = ({ profile : { user : { name}, skills, bio}}) => {
    return (
        <div className="profile-about bg-light p-2">
          <h2 className="text-primary">{name} bio</h2>
          <p>
            {bio && <span> {bio}</span>}
          </p>
          <div className="line"></div>
          <h2 className="text-primary">Skill Set</h2>
          <div className="skills">
              <ul>
              {
                  skills.slice(0, 4).map((skill, index)=>(
                      <li key = {index}><i className= "fa fa-check"></i>{skill}</li>
                  ))
              }
                  
              </ul>

              
            
          </div>
        </div>
        
    );
}

export default ProfileAbout;



