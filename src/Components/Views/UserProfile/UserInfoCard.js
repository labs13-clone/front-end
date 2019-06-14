import React from 'react';
import './UserProfile.css';

const UserInfoCard = (props) => {
  return (
    <div>
        <div className="card-wrapper">
            <img src="https://img.icons8.com/color/1600/circled-user-male-skin-type-1-2.png" className="user-avatar"/>
            <h3>User Name</h3>
            <p className="joined-date">Joined 10 days ago</p>
            <h2 className="xp">{props.auth.user.xp} XP</h2>
            <p>Tell us something about yourself.</p>
            <div className="button-wrapper">
                <button className="btn-edit">Edit Profile</button>
            </div>
        </div>
    </div>
  );
}

export default UserInfoCard;